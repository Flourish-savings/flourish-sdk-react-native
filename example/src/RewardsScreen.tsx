import * as React from 'react';
import Flourish from 'flourish-sdk-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Reward'>;

const RewardsScreen: React.FC<Props> = ({ navigation, route }) => {
  console.log(route);
  
  const printGenericEventData = (data: string): void => {
    console.log('Event Client side', data);
  
    const event = JSON.parse(JSON.stringify(data));

    if(event.eventName === 'HOME_BACK_BUTTON_PRESSED'){
      navigation.navigate('Home');
    }
  };

  return <Flourish genericEventCallback={printGenericEventData} />;
};

export default RewardsScreen;
