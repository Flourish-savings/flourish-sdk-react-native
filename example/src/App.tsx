import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import HomeScreen from './HomeScreen';
import RewardsScreen from './RewardsScreen';
import { WebViewOptions, initialize } from 'flourish-sdk-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const uuid = process.env.PARTNER_ID;
    const secret = process.env.PARTNER_SECRET;
    const language = process.env.LANGUAGE;
    const environment = process.env.ENVIRONMENT;
    const customerCode = process.env.CUSTOMER_CODE;

    const webViewOptions: WebViewOptions = {
      androidLayerType: 'software',
      scalesPageToFit: true,
      domStorageEnabled: true,
      scrollEnabled: true,
      setBuiltInZoomControls: true,
      bounces: true,
      style: 'marginTop: 20',
    };

    const printInitializationCallback = (data: string): void => {
      console.log('Auth callback', data);
    };

    initialize(
      uuid,
      secret,
      language,
      environment,
      customerCode,
      webViewOptions,
      printInitializationCallback
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reward" component={RewardsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
