import * as React from 'react';
import Flourish from 'flourish-sdk-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Reward'>;

const RewardsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { pageName } = route.params || {};

  console.log('Opening Flourish with pageName:', pageName);

  const printGenericEventData = (data: string): void => {
    console.log('Event Client side', data);

    const event = JSON.parse(JSON.stringify(data));

    if (event.eventName === 'HOME_BACK_BUTTON_PRESSED') {
      navigation.navigate('Home');
    }
  };

  const printBackButtonData = (data: string): void => {
    console.log('Back button pressed:', data);
    navigation.navigate('Home');
  };

  return (
    <Flourish
      pageName={pageName}
      genericEventCallback={printGenericEventData}
      backButtonEventCallback={printBackButtonData}
    />
  );
};

export default RewardsScreen;
