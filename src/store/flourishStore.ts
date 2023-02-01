import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLanguage = async (language: string) => {
  await AsyncStorage.setItem('language', language);
};

export const setPartnerId = async (partnerId: string) => {
  await AsyncStorage.setItem('partnerId', partnerId);
};

export const setPartnerSecret = async (partnerSecret: string) => {
  await AsyncStorage.setItem('partnerSecret', partnerSecret);
};

export const setEnvironment = async (environment: string) => {
  await AsyncStorage.setItem('environment', environment);
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};
