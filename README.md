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
<br>
<br>

### About the SDK

The integration with us works as follows, the client authenticates himself in our backend
and we return an access token that allows him to load our webview, given that,
the sdk serves to encapsulate and help in loading this webview.

### Using the SDK
___

First foremost, it is necessary to initialize the SDK providing the variables: `partnerId`, `secret`, `env` and `language`.

```js
  import { initializeFlourish } from 'flourish-sdk-react-native';

  const partnerId = process.env.PARTNER_ID;
  const partnerSecret = process.env.PARTNER_SECRET;
  const language = process.env.LANGUAGE;
  const environment = process.env.ENVIRONMENT;

  initializeFlourish(partnerId, partnerSecret, language, environment);
```

Then, with the SDK instance initialized, it is time to perform the authentication in our backend,
to do this, it's required that you pass a `customer_code`, and you can also pass a `category` this one isn't required.

```js
  import { authenticate } from 'flourish-sdk-react-native';

  const customerCode = process.env.CUSTOMER_CODE;
  const customerCode = process.env.CATEGORY;

  authenticate(customerCode, category);
```

Finally after initialization, you will be able to import and adding our Flourish component inside your screen, but remember
that all our functionalities are displayed through a webview.

```js
  import Flourish from 'flourish-sdk-react-native';

  return (
    <Flourish/>
  );
```

After a successful rendering, you should see something like this.

<img width="363" src="https://raw.githubusercontent.com/Flourish-savings/flourish-sdk-flutter/main/images/flourish_home.png"/>
<br>
<br>
<img width="363" src="https://raw.githubusercontent.com/Flourish-savings/flourish-sdk-flutter/main/images/flourish_wheel.png"/>
<br>
<br>

---


## EVENTS
___
You can register for some events to know when something happens within our platform.

### Listen our events
To listen to our events, you will pass a callback function to our Flourish component when you add it to your screen.

```js
import Flourish from 'flourish-sdk-react-native';

const printEventData = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  return <Flourish eventCallback={printEventData} />;
};
```
### Events to listen
here you have all events we will return

| event name      | description                                                                                |
|-----------------|--------------------------------------------------------------------------------------------|
| GoToAutoPayment | When you need to know when the user clicks to set up an automatic payment on our platform. |
| GoToPayment     | When you need to know when the user clicks to set up a payment on our platform.            |
| TriviaFinished  | When you need to know when the user finishes a Trivia game on our platform.                |
| GoBack          | When you need to know when the user clicks on the back menu button on our platform.        |




## Examples
___
Inside this repository, you have an example app to show how to integrate with us:

https://github.com/Flourish-savings/flourish-sdk-react-native/tree/main/example
<br>
