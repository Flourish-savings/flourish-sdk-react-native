import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GenericErrorScreenProps {
  language: string;
  onBackButtonEvent?: (data: string) => void;
}

const GenericErrorScreen: React.FC<GenericErrorScreenProps> = ({ language, onBackButtonEvent = () => {} }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSupportText, setErrorSupportText] = useState('');

  useEffect(() => {
    switch (language) {
      case 'en':
        setErrorMessage('Oops, something went wrong!');
        setErrorSupportText('Please, contact us through support.');
        break;
      case 'es':
        setErrorMessage('Huy! Algo salió mal.');
        setErrorSupportText('Por favor, contacta con soporte.');
        break;  
      case 'pt':
        setErrorMessage('Opa, algo deu errado.');
        setErrorSupportText('Por favor, contate o nosso suporte.');
        break;  
    
      default:
        break;
    }
  }, [language]);

  const handleBackPress = () => {
    if (onBackButtonEvent) {
      const data = JSON.stringify({"eventName":"ERROR_BACK_BUTTON_PRESSED"});
      onBackButtonEvent(data);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={
          handleBackPress
        }>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>{errorMessage}</Text>
      <Text style={styles.supportText}>{errorSupportText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 30,
    color: '#000',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: 5,
    textAlign: 'center',
  },
  supportText: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
  },
});

export default GenericErrorScreen;
