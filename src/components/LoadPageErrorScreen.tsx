import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoadPageErrorScreen = () => {
  return (
  <View style={styles.errorContainer}>
    <Image source={require('../resource/no-wifi.png')} style={styles.image} />
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#ddd',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoadPageErrorScreen;
