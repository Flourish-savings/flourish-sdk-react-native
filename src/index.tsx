import React, { useEffect } from 'react';
import { api } from './service/api';
import { onEventReceived } from './events/eventManager';
import HomePage from './components/HomePage';
import {
  setEnvironment,
  setLanguage,
  setPartnerId,
  setPartnerSecret,
  setToken,
} from './store/flourishStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type ConfigProps = {
  eventCallback: (data: string) => void;
};

export const initializeFlourish = async (
  partner: string,
  secret: string,
  language: string,
  environment: string
) => {
  setLanguage(language);
  setEnvironment(environment);
  setPartnerId(partner);
  setPartnerSecret(secret);
};

export const authenticateFlourish = (clientCustomerCode: string) => {
  auth(clientCustomerCode);
};

const signIn = async (access_token: string): Promise<boolean> => {
  const environment = (await AsyncStorage.getItem('environment')) || '';
  const response = await api.signIn(access_token, environment);
  return response.isValid;
};

const auth = async (clientCustomerCode: string) => {
  const partnerId = (await AsyncStorage.getItem('partnerId')) || '';
  const partnerSecret = (await AsyncStorage.getItem('partnerSecret')) || '';
  const environment = (await AsyncStorage.getItem('environment')) || '';

  const response = await api.authenticate(
    partnerId,
    partnerSecret,
    environment,
    clientCustomerCode
  );
  if (response.access_token) {
    setToken(response.access_token);
    signIn(response.access_token);
  } else {
    console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
  }
};

const Flourish: React.FC<ConfigProps> = (props: ConfigProps) => {
  const [token, setTokenState] = useState('');
  const [environment, setEnvironmentState] = useState('');
  const [language, setLanguageState] = useState('');

  useEffect(() => {
    const getLocalParams = async () => {
      const localToken = (await AsyncStorage.getItem('token')) || '';
      const localEnvironment =
        (await AsyncStorage.getItem('environment')) || '';
      const localLanguage = (await AsyncStorage.getItem('language')) || '';
      setTokenState(localToken);
      setEnvironmentState(localEnvironment);
      setLanguageState(localLanguage);
    };
    getLocalParams();
    onEventReceived(props.eventCallback);
  });
  return (
    <HomePage token={token} environment={environment} language={language} />
  );
};

export default Flourish;
