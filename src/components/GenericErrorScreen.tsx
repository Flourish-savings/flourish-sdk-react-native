import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GenericErrorScreenProps {
  onBackButtonEvent?: (data: string) => void;
}

const GenericErrorScreen: React.FC<GenericErrorScreenProps> = ({ onBackButtonEvent = () => {} }) => {
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
      <Text style={styles.message}>Oops, something went wrong!</Text>
      <Text style={styles.supportText}>Please, contact us through support.</Text>
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
