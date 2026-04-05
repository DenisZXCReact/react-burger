import baseRequest from '@utils/baseRequest.ts';

import { defaultOptions } from './constants.ts';
export type TTokensResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export function isTokenExist(): boolean {
  return !!localStorage.getItem('accessToken');
}

export async function refreshToken(): Promise<TTokensResponse> {
  const refreshToken = localStorage.getItem('refreshToken');
  const response: TTokensResponse = await baseRequest('auth/token', {
    ...defaultOptions,
    body: JSON.stringify({ token: refreshToken }),
  });

  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
}
