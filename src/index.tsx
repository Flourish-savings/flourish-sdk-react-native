import React, { useEffect, useState } from 'react';
import { api } from './service/api';
import { onEventReceived } from './events/eventManager';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import ErrorScreen from './components/ErrorScreen';

type ConfigProps = {
  partnerId: string;
  partnerSecret: string;
  customerCode: string;
  environment: string;
  eventCallback: (data: string) => void;
};

const Flourish: React.FC<ConfigProps> = (props: ConfigProps) => {
  const [token, setToken] = useState<string>('');

  const authenticate = async (access_token: string): Promise<boolean> => {
    const response = await api.signIn(access_token, props.environment);
    return response.isValid;
  };

  const getToken = async () => {
    const response = await api.authenticate(
      props.partnerId,
      props.partnerSecret,
      props.customerCode,
      props.environment
    );
    if (response.access_token) {
      setToken(response.access_token);
      authenticate(response.access_token);
    } else {
      console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
    }
  };

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    onEventReceived(props.eventCallback);
    getToken();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {() => <HomePage token={token} environment={props.environment} />}
        </Stack.Screen>
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Flourish;
