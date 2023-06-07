import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ErrorScreen from './components/ErrorScreen';
import { createStore } from 'zustand/vanilla';
import { api } from './service/api';
import { onEventReceived } from './events/eventManager';

type ConfigProps = {
  eventCallback: (data: string) => void;
};

type State = {
  partner: string;
  secret: string;
  language: string;
  environment: string;
  token: string;
  customerCode?: string;
  isError: boolean;
};

export const sdkStore = createStore<State>(() => ({
  partner: '',
  secret: '',
  language: '',
  environment: '',
  token: '',
  isError: false,
}));

export const initializeFlourish = async (
  partner: string,
  secret: string,
  language: string,
  environment: string
) => {
  sdkStore.setState({
    partner: partner,
    secret: secret,
    language: language,
    environment: environment,
  });
};

export const authenticateFlourish = async (
  clientCustomerCode: string,
  category?: string,
  eventCallback?: (data: any) => void
) => {
  const { partner, secret, environment, language } = sdkStore.getState();

  const response = await api.authenticate(
    partner,
    secret,
    environment,
    clientCustomerCode,
    category
  );
  if (response.access_token) {
    sdkStore.setState({
      partner: partner,
      secret: secret,
      language: language,
      environment: environment,
      token: response.access_token,
      customerCode: clientCustomerCode,
      isError: false,
    });
    const signResponse = await signIn(response.access_token);
    if (eventCallback) {
      eventCallback({
        success: 'The authentication process worked successfully',
      });
    }
    return signResponse;
  } else {
    console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
    if (eventCallback) {
      eventCallback({ error: 'The authentication process failed' });
    }
    return false;
  }
};

const signIn = async (access_token: string): Promise<boolean> => {
  const { environment } = sdkStore.getState();
  const response = await api.signIn(access_token, environment);
  return response.isValid;
};

const Flourish: React.FC<ConfigProps> = (props: ConfigProps) => {
  const [componentToken, setComponentToken] = useState();
  const [error, setError] = useState(false);

  const { language, environment, token } = sdkStore.getState();

  const callback = (state: any) => {
    setComponentToken(state.token);
    setError(state.isError);
  };

  sdkStore.subscribe(callback);
  onEventReceived(props.eventCallback);

  return (
    <>
      {componentToken !== '' && !error && (
        <HomePage token={token} environment={environment} language={language} />
      )}
      {error && <ErrorScreen />}
    </>
  );
};

export default Flourish;
