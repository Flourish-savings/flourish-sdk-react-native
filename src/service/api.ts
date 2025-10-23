import Config from '../config';

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

      let body = {
        uuid: uuid,
        secret: secret,
        customer_code: customerCode,
        metadata: {
          sdk_version: sdkVersion,
          platform: 'react-native',
          language: language,
        },
      };

      const response = await fetch(`${endpoint}/authentication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      return {
        session_token: res.session_token,
        url: res.url,
      };
    } catch (error) {
      console.error('Error when try to retrieve token', error);
      return { session_token: '', url: '' };
    }
  }
}

export const api = new Api();
