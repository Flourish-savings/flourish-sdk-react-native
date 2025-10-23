import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { initialize } from 'flourish-sdk-react-native';
import type { WebViewOptions } from 'flourish-sdk-react-native';
import Flourish from 'flourish-sdk-react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    const uuid = '98ad1219-d7f1-4f2a-bdbe-0d347239528f';
    const secret = '23becf67b17e1d18c928c92495adfda8';
    const language = 'es';
    const environment = 'staging';
    const customerCode = '123';

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
    <View style={styles.container}>
      <Text style={styles.title}>Flourish SDK Test App</Text>
      <Flourish />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;