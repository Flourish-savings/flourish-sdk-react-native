import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const RefreshTokenScreen = () => {
  return (
    <View style={styles.centered}>
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

export default RefreshTokenScreen;
