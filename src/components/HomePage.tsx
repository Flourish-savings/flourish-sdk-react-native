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
    const endURL = `/?token=${props.token}`;
    const completeURL = `${baseURL}${props.language}${endURL}`;
    if (baseURL !== undefined && props.token !== undefined) setUrl(completeURL);
  }, [props.environment, props.language, props.token]);

  return (
    <>
      {url !== '' && (
        <WebView
          source={{
            uri: `${url}`,
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
      )}
    </>
  );
};

export default HomePage;
