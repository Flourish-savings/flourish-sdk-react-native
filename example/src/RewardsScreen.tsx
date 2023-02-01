import * as React from 'react';
import Flourish from 'flourish-sdk-react-native';

const printEventData = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  return <Flourish eventCallback={printEventData} />;
};

export default RewardsScreen;
