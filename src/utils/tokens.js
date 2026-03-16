import baseRequest from '@utils/baseRequest.js';

import { defaultOptions } from './constants.js';

export function isTokenExist() {
  return !!localStorage.getItem('accessToken');
}
export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await baseRequest('auth/token', {
    ...defaultOptions,
    body: JSON.stringify({ token: refreshToken }),
  });

  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
}
