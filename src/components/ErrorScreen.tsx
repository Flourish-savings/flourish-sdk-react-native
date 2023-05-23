import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const ErrorScreen = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.baseText}>
        <Text>Too long out{'\n'}Renewing your experience</Text>
      </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 26,
    marginBottom: 20,
  },
});

export default ErrorScreen;
