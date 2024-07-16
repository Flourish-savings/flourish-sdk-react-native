[<img width="400" src="https://github.com/Flourish-savings/flourish-sdk-flutter/blob/main/images/logo_flourish.png?raw=true"/>](https://flourishfi.com)
<br>
<br>
# Flourish React Native SDK

This React Native library will allow the communication between the visual implementation of Flourish functionality.
<br>
<br>

Table of contents
=================

<!--ts-->
   * [Getting Started](#getting-started)
     * [About the SDK](#about-the-sdk)
     * [Using the SDK](#using-the-sdk)
   * [Events](#events)
   * [Examples](#examples)
<!--te-->
<br>

## Getting Started
___

### Adding Flourish to your project

In your project's `package.json` file, add the last version of Flourish Flutter SDK to your dependencies.
```json

"dependencies": {
  "flourish-sdk-react-native": "*.*.*"
}
```
or install directly from terminal using npm or yarn

```sh
npm install flourish-sdk-react-native
```

```sh
yarn add flourish-sdk-react-native
```


### SDK internal requirements

To use this SDK, you will need these elements:

- partnerId: a unique identifier that will be provided by Flourish
- secret: a string that represents a key, also provided by Flourish
- language: a string that will represents witch language will be used (en, es, pt)

This plugin can be run in two different environments:

- staging: In this environment, you can test the functionality without impacting any real data
- production: this environment is for running the app with the real data

### About the SDK

The integration with us works as follows, the client authenticates himself in our backend
and we return an access token that allows him to load our webview, given that,
the sdk serves to encapsulate and help in loading this webview.

### Using the SDK
___

First foremost, it is necessary to initialize the SDK providing the variables: `partnerId`, `secret`, `env`, `language` and `customer_code`.

You can also pass a `category` this one isn't required.

```js
  import { initialize } from 'flourish-sdk-react-native';

  const partnerId = process.env.PARTNER_ID;
  const partnerSecret = process.env.PARTNER_SECRET;
  const language = process.env.LANGUAGE;
  const environment = process.env.ENVIRONMENT;
  const customerCode = 'YOUR-CUSTOMER-CODE';
  const category = 'CATEGORY-VALUE';

  initialize(partnerId, partnerSecret, language, environment, customerCode, category);
```

### WebView options

You can customize the webview component if you prefer, just initialize one of our configuration objects (WebViewOptions) and pass it in the initialization as the last parameter::

```js
  import type { WebViewOptions } from 'src/components/
  CustomWebView';

  const webViewOptions: WebViewOptions = {
    androidLayerType: 'software',
    scalesPageToFit: true,
    domStorageEnabled: true,
    scrollEnabled: true,
    setBuiltInZoomControls: true,
    bounces: true,
    style: 'marginTop: 20',
  };

  initialize(partnerId, partnerSecret, language, environment, customerCode, category, webViewOptions);
```


Finally after initialization, you will be able to import and adding our Flourish component inside your screen, but remember
that all our functionalities are displayed through a webview.

```js
  import Flourish from 'flourish-sdk-react-native';

  return (
    <Flourish/>
  );
```

---

## EVENTS
___
You can register for some events to know when something happens within our platform.

### Listen all our events
To listen all our events, you will pass a generic callback function to our Flourish component when you add it to your screen.

```js
import Flourish from 'flourish-sdk-react-native';

const genericEventCallback = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  return <Flourish genericEventCallback={genericEventCallback} />;
};
```

### Listen only to a specific event
To listen to only a specific event you will pass a function to an attribute referring to the event you want to listen to.

For example, if you want to be notified when a Trivia game ends, you can pass a callback function in the attribute called: "triviaGameFinishedEventCallback"

```js
import Flourish from 'flourish-sdk-react-native';

const triviaGameFinishedEventCallback = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  return (
    <Flourish
      triviaGameFinishedEventCallback={triviaGameFinishedEventCallback}
    />
  );
};
```



### Events to listen
here you have all events we will return

| Event name      | Description                                                                                                       |
|-----------------|-------------------------------------------------------------------------------------------------------------------|
| BACK_BUTTON_PRESSED | When you need to know when the user clicks on the back menu button on our platform.
| HOME_BACK_BUTTON_PRESSED | When you need to know when the user clicks on the back menu button when on the home screen of our platform.           |
| ONBOARDING_BACK_BUTTON_PRESSED | When you need to know when the user clicks on the back menu button when on the onboarding screen of our platform.           |
| MISSION_ACTION     | When you need to know when the user clicks on a mission card                                |
| TRIVIA_GAME_FINISHED  | When you need to know when the user finishes a Trivia game on our platform.                                       |
| TRIVIA_CLOSED  | When you need to know when the user closed the Trivia game on our platform.                                       |
| GIFT_CARD_COPY  | When you need to know when the user copy the Gift code to the clipboard area.                                       |
| REFERRAL_COPY          | When you need to know when the user copy the referral code to the clipboard area.                             |
| HOME_BANNER_ACTION      | When you need to know when the user clicks on the home banner.       |
| ERROR      | When you need to know when a error happened.      |




## Examples
___
Inside this repository, you have an example app to show how to integrate with us:

https://github.com/Flourish-savings/flourish-sdk-react-native/tree/main/example
<br>
