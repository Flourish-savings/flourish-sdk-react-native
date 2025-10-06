import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flourish SDK Example</Text>
      <Text style={styles.subtitle}>Choose how to open Flourish:</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Open Flourish (Default)"
          onPress={() => navigation.navigate('Reward', { pageName: undefined })}
        />

        <Button
          title="Open Missions Page"
          onPress={() =>
            navigation.navigate('Reward', { pageName: 'missions' })
          }
        />

        <Button
          title="Open Daily Rewards"
          onPress={() =>
            navigation.navigate('Reward', { pageName: 'dailyRewards' })
          }
        />

        <Button
          title="Open Help Page"
          onPress={() => navigation.navigate('Reward', { pageName: 'help' })}
        />

        <Button
          title="Open Trivia Games"
          onPress={() => navigation.navigate('Reward', { pageName: 'trivia' })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
});

export default HomeScreen;
