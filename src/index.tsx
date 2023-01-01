import React, { useEffect } from 'react';
import { api } from './service/api';

import { StyleSheet, View, Text } from 'react-native';

interface Props {
  partnerId: string;
  partnerSecret: string;
  customerCode: string;
}

const Flourish: React.FC<Props> = ({
  partnerId,
  partnerSecret,
  customerCode,
}) => {
  const authenticate = async (access_token: string): Promise<boolean> => {
    const response = await api.signIn(access_token);
    return response.isValid;
  };

  const getToken = async () => {
    const response = await api.authenticate(
      partnerId,
      partnerSecret,
      customerCode
    );
    if (response.access_token) {
      authenticate(response.access_token);
    } else {
      console.error(`Error fetching token: ${JSON.stringify(response)}`, []);
    }
  };

  useEffect(() => {
    getToken();
  });

  return (
    <View style={styles.container}>
      <Text>Thw WebView will be rendered here</Text>
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

export default Flourish;
