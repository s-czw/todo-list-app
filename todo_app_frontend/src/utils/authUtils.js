import { postRequest } from '../utils/apiUtils';

export const performLogin = async (email, password) => {
  const { token, refreshToken } = await postRequest('/auth/login', { email, password })
    .then((response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    });
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const performLogout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
