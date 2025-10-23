import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Flourish, { initialize } from 'flourish-sdk-react-native';

const App = () => {
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const uuid = '';
    const secret = '';
    const language = '';
    const environment = '';
    const customerCode = '';

    const printInitializationCallback = (data: string): void => {
      console.log('Auth callback', data);
    };

    initialize(
      uuid,
      secret,
      language,
      environment,
      customerCode,
      undefined, // Optional: WebViewOptions
      printInitializationCallback, // Optional: Event callback
      undefined, // Optional: PageName
    );
  }, []);

  const printEventsCallback = (data: string): void => {
    console.log('Events callback', data);
  };

  const handleOpenFlourish = () => {
    setShowWebView(true);
  };

  const handleGoBack = () => {
    setShowWebView(false);
  };

  if (showWebView) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
        <Flourish 
          genericEventCallback={printEventsCallback}
        />
      </View>
    );
  }

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Flourish Example App</Text>
      <Text style={styles.subtitle}>Integration teste</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleOpenFlourish}>
        <Text style={styles.buttonText}>Open Flourish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    paddingVertical: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default App;