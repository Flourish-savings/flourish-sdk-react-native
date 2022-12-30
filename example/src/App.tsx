import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import RewardsScreen from './RewardsScreen';

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: HomeScreen,
    albums: RewardsScreen,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
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
