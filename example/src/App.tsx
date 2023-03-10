import React, { useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import RewardsScreen from './RewardsScreen';
import FavoriteScreen from './FavoriteScreen';
import NotificationScreen from './NotificationScreen';
import { initializeFlourish } from 'flourish-sdk-react-native';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'history',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
    {
      key: 'rewards',
      title: 'Rewards',
      focusedIcon: 'gift',
      unfocusedIcon: 'gift-outline',
    },
  ]);

  useEffect(() => {
    const partnerId = process.env.PARTNER_ID;
    const partnerSecret = process.env.PARTNER_SECRET;
    const language = process.env.LANGUAGE;
    const environment = process.env.ENVIRONMENT;
    initializeFlourish(partnerId, partnerSecret, language, environment);
  }, []);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    history: FavoriteScreen,
    notifications: NotificationScreen,
    rewards: RewardsScreen,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
