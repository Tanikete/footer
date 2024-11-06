import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'; 
import { RegistrationLoginType } from 'organism/src/lib/register-login/register-login-schema';

const registerLogin = process.env.NEXT_PUBLIC_REGISTER_LOGIN_API || 'https://api-fcmilka-de.mdlzapps.cloud/UserManagement/LoginPromo';

export const postData = async (data: RegistrationLoginType): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(registerLogin, data, {
      headers: { 'Content-Type': 'application/json' },
    });

   
    if (response.data && response.data.token) {
      
      Cookies.set('token', response.data.token, { expires: 7 }); 
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};