import React, { useEffect, useState } from 'react';
import { api } from './service/api';
import { emitEvent, onEventReceived } from './events/eventManager';
import { WebView } from 'react-native-webview';
import Config from './config';
interface Props {
  partnerId: string;
  partnerSecret: string;
  customerCode: string;
  environment: string;
  eventCallback: (data: string) => void;
}

const Flourish: React.FC<Props> = ({
  partnerId,
  partnerSecret,
  customerCode,
  environment,
  eventCallback,
}) => {
  const [token, setToken] = useState<string>('');

  const authenticate = async (access_token: string): Promise<boolean> => {
    const response = await api.signIn(access_token, environment);
    return response.isValid;
  };

  const getToken = async () => {
    const response = await api.authenticate(
      partnerId,
      partnerSecret,
      customerCode,
      environment
    );
    if (response.access_token) {
      setToken(response.access_token);
      authenticate(response.access_token);
    } else {
      console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
    }
  };

  useEffect(() => {
    console.log('PARTNER_ID', partnerId);
    console.log('PARTNER_SECRET', partnerSecret);
    console.log('CUSTOMER_CODE', customerCode);
    console.log('ENVIRONMENT', environment);
    onEventReceived(eventCallback);
    getToken();
  });

  return (
    // @ts-ignore
    <WebView
      source={{
        uri: `${Config.FRONTEND_API_URL.get(environment)}?token=${token}`,
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        marginTop: 45,
      }}
      javaScriptEnabled={true}
      onMessage={(event) => {
        console.log(event);
        const data = JSON.parse(event.nativeEvent.data);
        console.log('Event in WebView Component', data);
        emitEvent(data);
      }}
    />
  );
};

export default Flourish;
