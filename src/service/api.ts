import Config from '../config';

export class Api {
  async authenticate(
    partnerId: string,
    partnerSecret: string,
    environment: string,
    customerCode: string,
    language: string
  ): Promise<{ session_token: ''; url: '' }> {
    try {
      const sdkVersion = Config.FLOURISH_SDK_APP_VERSION.get(
        environment
      ) as string;

      let body = {
        uuid: partnerId,
        secret: partnerSecret,
        customer_code: customerCode,
        metadata: {
          sdk_version: sdkVersion,
          platform: 'react-native',
          language: language,
        },
      };

      const response = await fetch(
        `${Config.BACKEND_API_URL.get(environment)}/authentication`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
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
