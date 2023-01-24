import * as React from 'react';
import Flourish from 'flourish-sdk-react-native';

const printEventData = (data: string): void => {
  console.log('Event Client side', data);
};

const RewardsScreen = () => {
  const partnerId = process.env.PARTNER_ID;
  const partnerSecret = process.env.PARTNER_SECRET;
  const customerCode = process.env.CUSTOMER_CODE;
  const environment = process.env.ENVIRONMENT;
  return (
    <Flourish
      partnerId={partnerId}
      partnerSecret={partnerSecret}
      customerCode={customerCode}
      environment={environment}
      eventCallback={printEventData}
    />
  );
};

export default RewardsScreen;
