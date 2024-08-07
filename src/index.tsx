import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RefreshTokenScreen from './components/RefreshTokenScreen';
import { createStore } from 'zustand/vanilla';
import { api } from './service/api';
import GenericErrorScreen from './components/GenericErrorScreen';
import {
  onGenericEventReceived,
  onBackButtonReceived,
  onHomeBackButtonReceived,
  onTriviaGameFinishedReceived,
  onMissionActionReceived,
  onTriviaClosedReceived,
  onReferralCopyReceived,
  onHomeBannerActionReceived,
  onGiftCardCopyReceived,
} from './events/eventManager';


type ConfigProps = {
  genericEventCallback?: (data: string) => void;
  backButtonEventCallback?: (data: string) => void;
  homeBackButtonEventCallback?: (data: string) => void;
  triviaGameFinishedEventCallback?: (data: string) => void;
  missionActionEventCallback?: (data: string) => void;
  triviaClosedEventCallback?: (data: string) => void;
  referralCopyEventCallback?: (data: string) => void;
  homeBannerActionEventCallback?: (data: string) => void;
  giftCardCopyEventCallback?: (data: string) => void;
};

type State = {
  partner: string;
  secret: string;
  language: string;
  environment: string;
  token: string;
  customerCode?: string;
  webViewProps?: WebViewOptions;
  isError: boolean;
};

export const sdkStore = createStore<State>(() => ({
  partner: '',
  secret: '',
  language: '',
  environment: '',
  token: '',
  webViewProps: null || undefined,
  isError: false,
}));

export type WebViewOptions = {
  androidLayerType?: 'none' | 'software' | 'hardware';
  scalesPageToFit?: boolean;
  domStorageEnabled?: boolean;
  scrollEnabled?: boolean;
  setBuiltInZoomControls?: boolean;
  bounces?: boolean;
  injectedJavaScript?: string;
  style?: string;
};

export const initialize = async (
  partner: string,
  secret: string,
  language: string,
  environment: string,
  clientCustomerCode: string,
  category?: string,
  webViewProps?: WebViewOptions,
  authCallback?: (data: any) => void
) => {
  sdkStore.setState({
    partner: partner,
    secret: secret,
    language: language,
    environment: environment,
    webViewProps: webViewProps
  });

  await authenticate(clientCustomerCode, category, authCallback);
};

export const authenticate = async (
  clientCustomerCode: string,
  category?: string,
  authCallback?: (data: any) => void
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
    if (authCallback) {
      authCallback({
        success: 'The authentication process worked successfully',
      });
    }
    return signResponse;
  } else {
    if (authCallback) {
      authCallback({eventName:'AUTHENTICATION_FAILURE'});
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

  const { language, environment, token, webViewProps } = sdkStore.getState();

  const callback = (state: any) => {
    setComponentToken(state.token);
    setError(state.isError);
  };

  sdkStore.subscribe(callback);

  if (props?.genericEventCallback)
    onGenericEventReceived(props.genericEventCallback);
  if (props?.backButtonEventCallback)
    onBackButtonReceived(props.backButtonEventCallback);
  if (props?.homeBackButtonEventCallback)
    onHomeBackButtonReceived(props.homeBackButtonEventCallback);
  if (props?.triviaGameFinishedEventCallback)
    onTriviaGameFinishedReceived(props.triviaGameFinishedEventCallback);
  if (props?.missionActionEventCallback)
    onMissionActionReceived(props.missionActionEventCallback);
  if (props?.triviaClosedEventCallback)
    onTriviaClosedReceived(props.triviaClosedEventCallback);
  if (props?.referralCopyEventCallback)
    onReferralCopyReceived(props.referralCopyEventCallback);
  if (props?.homeBannerActionEventCallback)
    onHomeBannerActionReceived(props.homeBannerActionEventCallback);
  if (props?.giftCardCopyEventCallback)
    onGiftCardCopyReceived(props.giftCardCopyEventCallback);

  if(!token && !error){
    if(props.genericEventCallback){
      const data = JSON.stringify({"eventName":"AUTHENTICATION_FAILURE"});
      props.genericEventCallback(data);
    }
    return <GenericErrorScreen onBackButtonEvent={props.genericEventCallback} />
  }

  if(error){
    return <RefreshTokenScreen />
  }

  return (
    <>
      {componentToken !== '' && !error && (
        <HomePage token={token} environment={environment} language={language} webViewProps={webViewProps}/>
      )}
      {error && <RefreshTokenScreen />}
    </>
  );

};

export default Flourish;
