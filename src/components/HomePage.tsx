import React, { useState, useEffect, useRef } from 'react';
import { emitEvent } from '../events/eventManager';
import { WebView } from 'react-native-webview';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { WebViewOptions } from 'flourish-sdk-react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PageName } from '../utils/pageMapper';
import { mapPageName } from '../utils/pageMapper';

type Props = {
  token: string;
  url: string;
  environment: string;
  language: string;
  webViewProps: WebViewOptions | undefined;
  pageName?: PageName;
  onTokenError?: () => void;
};

const HomePage = (props: Props) => {
  const webViewRef = useRef<WebView>(null);
  const [url, setUrl] = useState('');
  const [hasError, setHasError] = useState(false);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorButtonText, setErrorButtonText] = useState('');

  useEffect(() => {
    if (props.url && props.token !== undefined) {
      let completeURL = `https://${props.url}?token=${props.token}`;

      if (props.pageName) {
        const mappedPageName = mapPageName(props.pageName);
        if (mappedPageName) {
          completeURL += `&redirectTo=${mappedPageName}`;
        }
      }

      setUrl(completeURL);
    }

    switch (props.language) {
      case 'en':
        setErrorTitle('No internet \n connection');
        setErrorDescription(
          'Please, make sure your internet \n connection is working and try again!'
        );
        setErrorButtonText('Try again');
        break;
      case 'es':
        setErrorTitle('No hay conexión \n a internet');
        setErrorDescription(
          'Por favor, asegúrese de que su conexión a \n internet esté funcionando correctamente \n e intente nuevamente.'
        );
        setErrorButtonText('Intentar  nuevamente');
        break;
      case 'pt':
        setErrorTitle('Não há conexão \n de internet');
        setErrorDescription(
          'Por favor, assegura-se de que sua \n conexão com a internet está funcionando \n corretamente e tente novamente'
        );
        setErrorButtonText('Tentar novamente');
        break;

      default:
        break;
    }
  }, [
    props.environment,
    props.language,
    props.token,
    props.url,
    props.pageName,
  ]);

  const handleError = (event: WebViewErrorEvent) => {
    const { nativeEvent } = event;
    console.warn('WebView error: ', nativeEvent);
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
  };

  const checkAccessDenied = `
    (function() {
      const navigationEntry = window.performance.getEntries().find(e => e.entryType === "navigation");
      const statusCode = navigationEntry ? navigationEntry.responseStatus : null;
      const content = document.documentElement.innerText;
      
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'ACCESS_CHECK',
        statusCode: statusCode,
        content: content
      }));
    })();
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ACCESS_CHECK') {
        if (data.statusCode === 403 && data.content.includes('AccessDenied')) {
          props.onTokenError?.();
        }
      } else {
        emitEvent(data);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <View style={styles.container}>
      {hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.title}>{errorTitle}</Text>
          <Text style={styles.message}>{errorDescription}</Text>
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
              cacheEnabled={false}
              androidLayerType={props.webViewProps?.androidLayerType || 'none'}
              scalesPageToFit={props.webViewProps?.scalesPageToFit || false}
              domStorageEnabled={props.webViewProps?.domStorageEnabled || false}
              scrollEnabled={props.webViewProps?.scrollEnabled || false}
              setBuiltInZoomControls={
                props.webViewProps?.setBuiltInZoomControls || false
              }
              bounces={props.webViewProps?.bounces || false}
              style={(props.webViewProps?.style as StyleProp<ViewStyle>) || {}}
              onError={handleError}
              onMessage={handleMessage}
              onLoadEnd={() => {
                webViewRef.current?.injectJavaScript(checkAccessDenied);
              }}
              ref={webViewRef}
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomePage;
