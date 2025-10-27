import Config from '../config';
import axios, { AxiosError } from 'axios';

export class Api {
  async authenticate(
    uuid: string,
    secret: string,
    environment: string,
    customerCode: string,
    language: string
  ): Promise<{ session_token: ''; url: '' }> {
    try {
      const sdkVersion = Config.FLOURISH_SDK_APP_VERSION.get(
        environment
      ) as string;

      const endpoint = Config.BACKEND_API_URL.get(environment);

      const body = {
        uuid: uuid,
        secret: secret,
        customer_code: customerCode,
        metadata: {
          sdk_version: sdkVersion,
          platform: 'react-native',
          language: language,
        },
      };

      const response = await axios.post(`${endpoint}/authentication`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        session_token: response.data.session_token,
        url: response.data.url,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error when try to retrieve token', axiosError.message);
      if (axiosError.response) {
        console.error('Response data:', axiosError.response.data);
        console.error('Response status:', axiosError.response.status);
      }
      return { session_token: '', url: '' };
    }
  }
}

export const api = new Api();
