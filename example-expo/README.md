# Flourish SDK React Native - Expo 53 Example

This is an example application demonstrating how to integrate and test the Flourish SDK React Native library using Expo 53.

## Prerequisites

- Node.js >= 20
- npm or yarn
- Expo CLI (optional, but recommended)
- iOS Simulator (for iOS testing) or Android Emulator (for Android testing)

## Setup

1. **Navigate to the example-expo directory:**

```bash
cd example-expo
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Configure the SDK:**

Open `App.tsx` and update the initialization parameters with your Flourish credentials:

```typescript
const uuid = 'YOUR_UUID';
const secret = 'YOUR_SECRET';
const language = 'YOUR_LANGUAGE'; // e.g., 'pt-BR', 'en-US'
const environment = 'YOUR_ENVIRONMENT'; // e.g., 'staging', 'production'
const customerCode = 'YOUR_CUSTOMER_CODE';
```

## Running the App

### Start the Expo development server:

```bash
npm start
# or
yarn start
```

### Run on specific platforms:

**iOS:**
```bash
npm run ios
# or
yarn ios
```

**Android:**
```bash
npm run android
# or
yarn android
```

**Web:**
```bash
npm run web
# or
yarn web
```

## How It Works

This example app demonstrates the same integration pattern as the React Native CLI example:

1. **Initialization**: The SDK is initialized in the `useEffect` hook with your credentials
2. **Event Callbacks**: The app sets up callbacks to listen for SDK events
3. **WebView Integration**: When you tap "Open Flourish", the SDK's WebView component is rendered
4. **Navigation**: A back button allows you to return to the home screen

## Features Tested

- ✅ SDK initialization with configuration
- ✅ WebView rendering
- ✅ Event callbacks for initialization and generic events
- ✅ Navigation between screens
- ✅ Safe area handling
- ✅ TypeScript support

## Troubleshooting

### Missing assets error

If you encounter errors about missing assets (icon.png, splash.png, etc.), you can either:

1. Add your own assets to the `assets/` directory
2. Or run the app with Expo Go which will use default assets

### Dependency issues

Make sure you're using Node.js version 20 or higher:

```bash
node --version
```

If you encounter peer dependency warnings, try:

```bash
npm install --legacy-peer-deps
# or
yarn install --ignore-engines
```

## Differences from React Native CLI Example

- Uses Expo's managed workflow instead of bare React Native
- Includes `expo-status-bar` for status bar management
- Uses Expo's routing and build system
- Simplified project structure
- No need to manage native iOS/Android projects directly

## Learn More

- [Flourish SDK Documentation](https://github.com/Flourish-savings/flourish-sdk-react-native)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
