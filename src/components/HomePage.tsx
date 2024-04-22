import React, { useState, useEffect } from 'react';
import { emitEvent } from '../events/eventManager';
import { WebView } from 'react-native-webview';
import Config from '../config';

type Props = {
  token: string;
  environment: string;
  language: string;
};

const HomePage = (props: Props) => {
  const [url, setUrl] = useState('');

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

  return (
    <>
      {url !== '' && (
        <WebView
          source={{
            uri: `${url}`,
          }}
          javaScriptEnabled={true}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            emitEvent(data);
          }}
        />
      )}
    </>
  );
};

export default HomePage;
