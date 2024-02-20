import * as React from 'react';
import Flourish from 'flourish-sdk-react-native';

const printGenericEventData = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  return <Flourish genericEventCallback={printGenericEventData} />;
};

export default RewardsScreen;
