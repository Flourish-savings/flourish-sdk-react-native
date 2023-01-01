import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorite Screen</Text>
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

export default FavoriteScreen;
