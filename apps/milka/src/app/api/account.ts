import axios from 'axios';
import { UpdateProfileType } from './../../../../../organism/src/lib/account-information/account-information-schema';
import { ChangePasswordType } from './../../../../../organism/src/lib/change-password/change-password-schema';

// Base URL for the API
const BASE_URL = 'https://api.fcmilka.de/UserManagement';

// Update profile information
export const updateProfileInfo = async (data: UpdateProfileType, token: string) => {
  try {
    const formData = new FormData();

    // Append all the data fields to formData
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    // Append the token to formData
    formData.append('token', token);

    const response = await axios.post(
      `${BASE_URL}/UpdateProfileInfo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Axios handles this automatically, but it's good to be explicit
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No data received from API');
    }
  } catch (error: any) {
    console.error('Error updating profile info:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Change password
// In your account API file

export const changePassword = async (data: ChangePasswordType, token: string) => {
  // Include the token in the data payload if necessary
  const payload = {
    ...data,
    token, // Add the token to the payload (optional)
  };

  const response = await axios.post(`${BASE_URL}/ResetPassword`, payload, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers as well
    },
  });
  return response.data;
};


// Delete account
export const deleteAccount = async (token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/DeleteAccount`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No data received from API');
    }
  } catch (error: any) {
    console.error('Error fetching profile info promo:', error.response ? error.response.data : error.message);
    throw error;
  }
};
// Get profile information promo
export const GetProfileInfoPromo = async (token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/GetProfileInfoPromo`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('No data received from API');
    }
  } catch (error: any) {
    console.error('Error fetching profile info promo:', error.response ? error.response.data : error.message);
    throw error;
  }
};