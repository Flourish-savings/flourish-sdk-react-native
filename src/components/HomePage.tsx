import React, { useState, useEffect } from 'react';
import { emitEvent } from '../events/eventManager';
import { WebView } from 'react-native-webview';
import Config from '../config';
import type { WebViewOptions } from './CustomWebView';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  token: string;
  environment: string;
  language: string;
  webViewProps: WebViewOptions | undefined;
};

const HomePage = (props: Props) => {
  const [url, setUrl] = useState('');
  const [hasError, setHasError] = useState(false);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorButtonText, setErrorButtonText] = useState('');


  switch (props.language) {
    case 'en':
      setErrorTitle('No internet \n connection');
      setErrorDescription('Please, make sure your internet \n connection is working and try again!');
      setErrorButtonText('Try again');
      break;
  
    default:
      break;
  }
  
  useEffect(() => {
    const baseURL = Config.FRONTEND_API_URL.get(props.environment);
    const tokenPath = `?token=${props.token}`;
    const languagePath = `&lang=${props.language}`;
    const versionPath = `&sdk_version=${
      Config.FLOURISH_SDK_APP_VERSION.get(props.environment) as string
    }`;
    const completeURL = `${baseURL}${tokenPath}${languagePath}${versionPath}`;
    if (baseURL !== undefined && props.token !== undefined) setUrl(completeURL);
  }, [props.environment, props.language, props.token]);

  const handleError = (event: WebViewErrorEvent) => {
    const { nativeEvent } = event;
    console.warn('WebView error: ', nativeEvent);
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
  };

  return (
    <View style={styles.container}>
    {hasError ? (
      <View style={styles.errorContainer}>
        <Image source={require('../resource/no-wifi.png')} style={styles.image} />
        <Text style={styles.title}>{errorTitle}</Text>
        <Text style={styles.message}>
          {errorDescription}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>{errorButtonText}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <>
      {url !== '' && (
        <WebView
          source={{
            uri: `${url}`,
          }}
          androidLayerType={props.webViewProps?.androidLayerType || 'none'}
          scalesPageToFit={props.webViewProps?.scalesPageToFit || false}
          domStorageEnabled={props.webViewProps?.domStorageEnabled || false}
          scrollEnabled={props.webViewProps?.scrollEnabled || false}
          setBuiltInZoomControls={props.webViewProps?.setBuiltInZoomControls || false}
          bounces={props.webViewProps?.bounces || false}
          injectedJavaScript={props.webViewProps?.injectedJavaScript || ''}
          style={props.webViewProps?.style || ''}
          onError={handleError}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            emitEvent(data);
          }}
        />
      )}
    </>
    )}
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default HomePage;
