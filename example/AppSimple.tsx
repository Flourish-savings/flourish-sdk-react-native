import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SimpleWebView from 'simple-webview-lib';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleWebView 
        url="https://www.google.com" 
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;