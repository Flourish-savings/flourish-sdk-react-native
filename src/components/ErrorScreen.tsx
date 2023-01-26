import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const ErrorScreen = () => {
  const errorText = 'Too long out. Renewing your experience';

  return (
    <View>
      <Text style={styles.baseText}>
        <Text numberOfLines={5}>{errorText}</Text>
      </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ErrorScreen;
