import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ErrorScreen = () => {

  return (
    <View style={styles.errorContainer}>
    <Image source={require('./path/to/image.png')} style={styles.image} />
    <Text style={styles.title}>No internet connection</Text>
    <Text style={styles.message}>
      Please, make sure your internet connection is working and try again!
    </Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Try again</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ErrorScreen;
