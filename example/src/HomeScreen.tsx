import React, { useEffect } from 'react';
import { authenticateFlourish } from 'flourish-sdk-react-native';
import { StyleSheet, View, Text } from 'react-native';

const HomeScreen = () => {
  useEffect(() => {
    const customerCode = process.env.CUSTOMER_CODE;
    authenticateFlourish(customerCode);
  });

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default HomeScreen;
