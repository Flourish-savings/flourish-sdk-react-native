import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RefreshTokenScreen from './components/RefreshTokenScreen';
import { createStore } from 'zustand/vanilla';
import { api } from './service/api';
import GenericErrorScreen from './components/GenericErrorScreen';
import type { PageName } from './utils/pageMapper';
import {
  onGenericEventReceived,
  onBackButtonReceived,
  onHomeBackButtonReceived,
  onTriviaGameFinishedReceived,
  onMissionActionReceived,
  onTriviaClosedReceived,
  onReferralCopyReceived,
  onHomeBannerActionReceived,
  onGiftCardCopyReceived,
} from './events/eventManager';

export type { PageName } from './utils/pageMapper';

type ConfigProps = {
  pageName?: PageName;
  genericEventCallback?: (data: string) => void;
  backButtonEventCallback?: (data: string) => void;
  homeBackButtonEventCallback?: (data: string) => void;
  triviaGameFinishedEventCallback?: (data: string) => void;
  missionActionEventCallback?: (data: string) => void;
  triviaClosedEventCallback?: (data: string) => void;
  referralCopyEventCallback?: (data: string) => void;
  homeBannerActionEventCallback?: (data: string) => void;
  giftCardCopyEventCallback?: (data: string) => void;
};

type State = {
  uuid: string;
  secret: string;
  language: string;
  environment: string;
  token: string;
  url: string;
  customerCode?: string;
  webViewProps?: WebViewOptions;
  pageName?: PageName;
  isError: boolean;
};

export const sdkStore = createStore<State>(() => ({
  uuid: '',
  secret: '',
  language: '',
  environment: '',
  token: '',
  url: '',
  webViewProps: undefined,
  pageName: undefined,
  isError: false,
}));

export type WebViewOptions = {
  androidLayerType?: 'none' | 'software' | 'hardware';
  scalesPageToFit?: boolean;
  domStorageEnabled?: boolean;
  scrollEnabled?: boolean;
  setBuiltInZoomControls?: boolean;
  bounces?: boolean;
  injectedJavaScript?: string;
  style?: string;
};

export const initialize = async (
  uuid: string,
  secret: string,
  language: string,
  environment: string,
  clientCustomerCode: string,
  webViewProps?: WebViewOptions,
  authCallback?: (data: any) => void,
  pageName?: PageName
) => {
  sdkStore.setState({
    uuid: uuid,
    secret: secret,
    language: language,
    environment: environment,
    webViewProps: webViewProps,
    pageName: pageName,
  });

  await authenticate(clientCustomerCode, authCallback);
};

export const authenticate = async (
  clientCustomerCode: string,
  authCallback?: (data: any) => void
) => {
  const { uuid, secret, environment, language } = sdkStore.getState();

  const response = await api.authenticate(
    uuid,
    secret,
    environment,
    clientCustomerCode,
    language
  );
  if (response.session_token && response.url) {
    sdkStore.setState({
      uuid: uuid,
      secret: secret,
      language: language,
      environment: environment,
      token: response.session_token,
      url: response.url,
      customerCode: clientCustomerCode,
      isError: false,
    });
    if (authCallback) {
      console.log('Auth callback', {
        success: 'The authentication process worked successfully',
        store: sdkStore.getState(),
        response: response,
      });
      authCallback({
        success: 'The authentication process worked successfully',
      });
    }
    return response;
  } else {
    if (authCallback) {
      authCallback({ eventName: 'AUTHENTICATION_FAILURE' });
    }
    return false;
  }
};

const Flourish: React.FC<ConfigProps> = (props: ConfigProps) => {
  const [componentToken, setComponentToken] = useState();
  const [error, setError] = useState(false);

  const { language, environment, token, url, webViewProps, pageName } =
    sdkStore.getState();

  const callback = (state: any) => {
    setComponentToken(state.token);
    setError(state.isError);
  };

  sdkStore.subscribe(callback);

  if (props?.genericEventCallback)
    onGenericEventReceived(props.genericEventCallback);
  if (props?.backButtonEventCallback)
    onBackButtonReceived(props.backButtonEventCallback);
  if (props?.homeBackButtonEventCallback)
    onHomeBackButtonReceived(props.homeBackButtonEventCallback);
  if (props?.triviaGameFinishedEventCallback)
    onTriviaGameFinishedReceived(props.triviaGameFinishedEventCallback);
  if (props?.missionActionEventCallback)
    onMissionActionReceived(props.missionActionEventCallback);
  if (props?.triviaClosedEventCallback)
    onTriviaClosedReceived(props.triviaClosedEventCallback);
  if (props?.referralCopyEventCallback)
    onReferralCopyReceived(props.referralCopyEventCallback);
  if (props?.homeBannerActionEventCallback)
    onHomeBannerActionReceived(props.homeBannerActionEventCallback);
  if (props?.giftCardCopyEventCallback)
    onGiftCardCopyReceived(props.giftCardCopyEventCallback);

  if (!token && !error) {
    if (props.genericEventCallback) {
      const data = JSON.stringify({ eventName: 'AUTHENTICATION_FAILURE' });
      props.genericEventCallback(data);
    }
    return (
      <GenericErrorScreen
        language={language}
        onBackButtonEvent={props.genericEventCallback}
      />
    );
  }

  if (error) {
    return <RefreshTokenScreen />;
  }

  return (
    <>
      {componentToken !== '' && !error && (
        <HomePage
          token={token}
          url={url}
          environment={environment}
          language={language}
          webViewProps={webViewProps}
          pageName={pageName}
        />
      )}
      {error && <RefreshTokenScreen />}
    </>
  );
};

export default Flourish;
