import fetchWithRefresh from '@utils/auth/fetchWithRefresh.js';
import baseRequest from '@utils/baseRequest.js';
import { defaultOptions } from '@utils/constants.js';

const getUser = async () => {
  const result = await fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('accessToken'),
    },
  });
  return result.user;
};
const login = async (data) => {
  const response = await defaultAuthRequest('auth/login', data);
  setTokens(response);
  return response.user;
};
export const logout = async () => {
  const response = await defaultAuthRequest('auth/logout', {
    token: localStorage.getItem('refreshToken'),
  });

  clearTokens();
  return response;
};
export const register = async (data) => {
  const response = await defaultAuthRequest('auth/register', data);

  setTokens(response);
  return response.user;
};
export const resetPassword = async (data) => {
  return await defaultAuthRequest('password-reset', data);
};
export const newPassword = async (data) => {
  return await defaultAuthRequest('password-reset/reset', data);
};
export const changeUserData = async (data) => {
  const response = await fetchWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },

    body: JSON.stringify(data),
  });

  return response.user;
};
async function defaultAuthRequest(endpoint, data) {
  return baseRequest(endpoint, {
    ...defaultOptions,
    body: JSON.stringify(data),
  });
}

function setTokens(data) {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
}
function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const authApi = {
  getUser,
  login,
  logout,
  register,
  resetPassword,
  newPassword,
  changeUserData,
};
