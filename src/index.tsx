import React, { useEffect, useState } from 'react';
import { api } from './service/api';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

interface Props {
  partnerId: string;
  partnerSecret: string;
  customerCode: string;
}

const Flourish: React.FC<Props> = ({
  partnerId,
  partnerSecret,
  customerCode,
}) => {
  const [token, setToken] = useState<string>('');

  const authenticate = async (access_token: string): Promise<boolean> => {
    const response = await api.signIn(access_token);
    return response.isValid;
  };

  const getToken = async () => {
    const response = await api.authenticate(
      partnerId,
      partnerSecret,
      customerCode
    );
    if (response.access_token) {
      setToken(response.access_token);
      authenticate(response.access_token);
    } else {
      console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
    }
  };

  useEffect(() => {
    getToken();
  });

  return (
    <WebView
      source={{ uri: `https://flourish-app-stg.flourishfi.com?token=${token}` }}
      style={{ marginTop: 45 }}
    />
  );
};

export default Flourish;
