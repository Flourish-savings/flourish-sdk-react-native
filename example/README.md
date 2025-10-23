# Flourish SDK React Native - Example App

Este é um aplicativo de exemplo para testar o **Flourish SDK React Native** localmente durante o desenvolvimento.

## 📦 Instalação e Configuração

### 1. Instalar dependências

Da raiz do projeto principal, execute:

```bash
# Instalar dependências da biblioteca
yarn install

# Instalar dependências do exemplo
yarn example install
```

### 2. Testar a biblioteca compilada localmente

Para testar a biblioteca como será publicada no npm (usando o código compilado em `lib/`):

```bash
# Na raiz do projeto
./scripts/pack-for-test.sh

# No diretório do exemplo
cd example
yarn remove flourish-sdk-react-native
yarn cache clean
yarn add ../flourish-sdk-react-native-*.tgz --force
rm -rf android/app/build android/build
```

## 🚀 Executando o App

### Android

```bash
cd example
npx react-native run-android
```

### iOS

```bash
cd example
npx react-native run-ios
```

## 🔄 Workflow de Desenvolvimento

1. **Fazer mudanças na biblioteca** (`src/`)
2. **Recompilar e empacotar**:
   ```bash
   ./scripts/pack-for-test.sh
   ```
3. **Reinstalar no exemplo**:
   ```bash
   cd example
   yarn remove flourish-sdk-react-native
   yarn add ../flourish-sdk-react-native-*.tgz --force
   ```
4. **Limpar caches e reiniciar**:
   ```bash
   rm -rf android/app/build android/build
   npx react-native start --reset-cache
   ```

## 📝 Notas

- O app de exemplo usa a biblioteca instalada via tarball (.tgz) em vez de `yarn link` para simular o comportamento real quando publicada no npm
- Certifique-se de sempre recompilar a biblioteca (`yarn build`) antes de testar mudanças
- Para desenvolvimento rápido sem recompilar, você pode modificar diretamente os arquivos em `node_modules/flourish-sdk-react-native/src/` (não recomendado para testes finais)

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
