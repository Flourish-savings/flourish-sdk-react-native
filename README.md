[<img width="400" src="https://github.com/Flourish-savings/flourish-sdk-flutter/blob/main/images/logo_flourish.png?raw=true"/>](https://flourishfi.com)
<br>
<br>
# Flourish React Native SDK

This React Native SDK will enable communication between the visual implementation of Flourish functionality.
<br>
<br>

Table of contents
=================

<!--ts-->
   * [Getting Started](#getting-started)
     * [About the SDK](#about-the-sdk)
     * [Using the SDK](#using-the-sdk)
     * [Direct Page Navigation](#direct-page-navigation)
   * [Events](#events)
   * [Examples](#examples)
<!--te-->
<br>

## Getting Started
___

### Adding Flourish to your project

In your project's `package.json` file, add the latest version of the Flourish React Native SDK to your dependencies.

```json
"dependencies": {
  "flourish-sdk-react-native": "*.*.*"
}
```
or install directly from the terminal using npm or yarn:

```sh
npm install flourish-sdk-react-native
```

```sh
yarn add flourish-sdk-react-native
```

### SDK internal requirements

To use this SDK, you will need these elements:

- uuid: a unique identifier that will be provided by Flourish
- secret: a string that represents a key, also provided by Flourish
- customerCode: a string that represents your identifier
- language: a string that represents which language will be used (en, es, pt)

This plugin can be run in two different environments:

- staging: In this environment, you can test the functionality without impacting any real data
- production: this environment is for running the app with real data
<br>
<br>

### About the SDK

The integration with us works as follows: the client authenticates themselves in our backend,
and we return an access token that allows them to load our webview. Therefore,
the SDK serves to encapsulate and help in loading this webview.

### Using the SDK
___

### 1 - Initialization

##<span style="color:red;">IMPORTANT❗</span>

<div style="border: 1px solid grey; padding: 10px;">

**For the flow to work correctly and for us to have the correct metrics to show our value, it is extremely important to initialize our SDK when opening your App, for example at startup or on the home screen. The most important thing is that it is not initialized at the same time as opening our module.**

</div>

___

First and foremost, it is necessary to initialize the SDK by providing the variables: `uuid`, `secret`, `env`, `language`, `customerCode`, and optionally `trackingId`.

```javascript
import { initialize } from 'flourish-sdk-react-native';

const initialize = async () => {
  await initialize({
    uuid: 'HERE_YOU_WILL_USE_YOUR_PARTNER_ID',
    secret: 'HERE_YOU_WILL_USE_YOUR_SECRET',
    environment: 'staging', // or 'production'
    language: 'en', // 'en', 'es', or 'pt'
    customerCode: 'HERE_YOU_WILL_USE_YOUR_CUSTOMER_CODE',
    trackingId: 'HERE_YOU_WILL_USE_YOUR_GOOGLE_ANALYTICS_KEY_THIS_IS_NOT_REQUIRED',
    pageName: 'missions' // Optional: Open directly to a specific page
  });
};
```

The `trackingId` variable is used if you want to pass your Google Analytics key to be able to monitor the use of our platform by your users.

### 2 - Open Flourish module

Finally, you can use the Flourish component in your screen:

```javascript
import { Flourish } from 'flourish-sdk-react-native';

const YourScreen = () => {
  return <Flourish />;
};
```

### 3 - Direct Page Navigation
___

You can navigate directly to specific pages within the Flourish platform by using the `pageName` parameter. This feature allows you to open the SDK already positioned on a particular screen, improving user experience and reducing navigation steps.

#### Using pageName in the initialize function:

```javascript
import { initialize } from 'flourish-sdk-react-native';

const initializeWithPage = async () => {
  await initialize({
    uuid: 'YOUR_PARTNER_ID',
    secret: 'YOUR_SECRET',
    environment: 'staging',
    language: 'en',
    customerCode: 'YOUR_CUSTOMER_CODE',
    pageName: 'dailyRewards' // Opens directly to daily rewards page
  });
};
```

#### Using pageName in the Flourish component:

```javascript
import { Flourish } from 'flourish-sdk-react-native';

const YourScreen = () => {
  return <Flourish pageName="missions" />; // Opens directly to missions page
};
```

#### Available pages:

| Page Name | Description |
|-----------|-------------|
| `onboarding` | User onboarding flow |
| `pendingRewards` | Pending rewards page |
| `dailyRewards` | Daily rewards page |
| `welcomeMission` | Welcome mission page |
| `home` | Home page |
| `help` | Help and support page |
| `missions` | Missions overview |
| `missionDetail` | Mission detail page |
| `progress` | User progress page |
| `missionHistory` | Mission history |
| `voucherHistory` | Voucher history |
| `activityHistory` | Activity history |
| `cashback` | Cashback page |
| `cashbackCategory` | Cashback categories |
| `wheel` | Wheel page |
| `wheelGameplay` | Wheel gameplay |
| `trivia` | Trivia games |
| `triviaGameplay` | Trivia gameplay |
| `triviaFinish` | Trivia completion |
| `giftCardHistory` | Gift card history |
| `giftCard` | Gift card page |


**Note**: If no `pageName` is specified, the platform will open on the default home page.

## EVENTS
___

### Listen to generic events

```javascript
const YourScreen = () => {
  const onGenericEvent = (data) => {
    console.log('Event received:', data);
  };

  return <Flourish genericEventCallback={onGenericEvent} />;
};
```

### Example with pageName and events

```javascript
const YourScreen = () => {
  const onGenericEvent = (data) => {
    console.log('Event received:', data);
    // Handle specific events like Trivia completion, back button, etc.
  };

  const onBackButton = (data) => {
    console.log('Back button pressed:', data);
    // Navigate back in your app
  };

  return (
    <Flourish 
      pageName="missions" // Open directly to missions page
      genericEventCallback={onGenericEvent}
      backButtonEventCallback={onBackButton}
    />
  );
};
```

### Events to listen
Here you have all events we will return:

| Event name                     | Description                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------|
| BACK_BUTTON_PRESSED            | When you need to know when the user clicks on the back menu button on our platform.                               |
| ERROR_BACK_BUTTON_PRESSED      | When you need to know when the user clicks on the back menu button on our error page.                             |
| HOME_BACK_BUTTON_PRESSED       | When you need to know when the user clicks on the back menu button when on the home screen of our platform.       |
| ONBOARDING_BACK_BUTTON_PRESSED | When you need to know when the user clicks on the back menu button when on the onboarding screen of our platform. |
| TERMS_ACCEPTED                 | When you need to know when the user clicks to accept the terms.                                                   |
| TRIVIA_GAME_FINISHED           | When you need to know when the user finishes a Trivia game on our platform.                                       |
| TRIVIA_CLOSED                  | When you need to know when the user closed the Trivia game on our platform.                                       |
| REFERRAL_COPY                  | When you need to know when the user copies the referral code to the clipboard area.                               |
| REFERRAL_FINISHED             | When you need to know when the referral has finished.                                                             |
| REFERRAL_REWARD_REDEEMED      | When you need to know when the user redeems the referral rewards.                                                |
| REFERRAL_REWARD_SKIPPED       | When you need to know when the user skipped the referral rewards.                                                |
| GIFT_CARD_COPY                | When you need to know when the user copies the Gift Card code to the clipboard area.                              |
| HOME_BANNER_ACTION            | When you need to know when the user clicks on the home banner.                                                    |
| MISSION_ACTION                | When you need to know when the user clicks on a mission card.                                                     |
| AUTHENTICATION_FAILURE        | When you need to know when the Authentication failed.                                                             |
| ERROR                         | When you need to know when a not mapped error happened.                                                           |

## Examples
Inside this repository, you have an example app to show how to integrate with us:

https://github.com/Flourish-savings/flourish-sdk-react-native/tree/main/example
<br>
