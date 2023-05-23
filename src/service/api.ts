import Config from '../config';

interface BodyApi {
  partner_uuid: string;
  partner_secret: string;
  customer_code: string;
  [category: string]: any;
}
export class Api {
  async authenticate(
    partnerId: string,
    partnerSecret: string,
    environment: string,
    customerCode: string,
    category?: string
  ): Promise<{ access_token: '' }> {
    try {
      let body: BodyApi = {
        partner_uuid: partnerId,
        partner_secret: partnerSecret,
        customer_code: customerCode,
      };

      if (category) {
        body = {
          ...body,
          category: category,
        };
      }

      const response = await fetch(
        `${Config.BACKEND_API_URL.get(environment)}/access_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const res = await response.json();
      console.log('flourish sdk successfully authenticated');
      return { access_token: res.access_token };
    } catch (error) {
      console.error(error);
      return { access_token: '' };
    }
  }

  async signIn(
    access_token: string,
    environment: string
  ): Promise<{ isValid: boolean }> {
    try {
      const response = await fetch(
        `${Config.BACKEND_API_URL.get(environment)}/sign_in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
        }
      );
      console.log('flourish sdk successfully logged in');
      return response.status === 200 ? { isValid: true } : { isValid: false };
    } catch (error) {
      console.error(error);
      return { isValid: false };
    }
  }
}

export const api = new Api();
