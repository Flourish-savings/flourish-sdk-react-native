import type { ApiConfig } from './api.types';

const BASE_API_URL = 'https://staging.flourishsavings.com/api/v1';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: BASE_API_URL,
  timeout: 10000,
};

export class Api {
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  async authenticate(
    partnerId: string,
    partnerSecret: string,
    customerCode: string
  ): Promise<{ access_token: '' }> {
    try {
      const response = await fetch(`${BASE_API_URL}/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partner_uuid: partnerId,
          partner_secret: partnerSecret,
          customer_code: customerCode,
        }),
      });
      const res = await response.json();
      console.log(res);
      return { access_token: res.access_token };
    } catch (error) {
      console.error(error);
      return { access_token: '' };
    }
  }

  async signIn(access_token: string): Promise<{ isValid: boolean }> {
    try {
      const response = await fetch(`${BASE_API_URL}/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      });
      const res = await response.json();
      console.log(res);
      return response.status === 200 ? { isValid: true } : { isValid: false };
    } catch (error) {
      console.error(error);
      return { isValid: false };
    }
  }
}

export const api = new Api();
