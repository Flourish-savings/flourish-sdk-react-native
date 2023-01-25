import Config from '../config';
export class Api {
  async authenticate(
    partnerId: string,
    partnerSecret: string,
    customerCode: string,
    environment: string
  ): Promise<{ access_token: '' }> {
    try {
      const response = await fetch(
        `${Config.BACKEND_API_URL.get(environment)}/access_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            partner_uuid: partnerId,
            partner_secret: partnerSecret,
            customer_code: customerCode,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
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
