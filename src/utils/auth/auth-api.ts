import fetchWithRefresh from '@utils/auth/fetchWithRefresh.ts';
import baseRequest from '@utils/baseRequest.ts';
import { defaultOptions } from '@utils/constants.ts';

import type { TUser } from '@/types/types.ts';
import type { TTokensResponse } from '@utils/tokens.ts';

type TAuthResponse = {
  success: boolean;
  user: TUser;
} & TTokensResponse;

type TSimpleResponse = {
  success: boolean;
  message: string;
};

type TGetUserResponse = Omit<TAuthResponse, 'accessToken' | 'refreshToken'>;
export type TNewPasswordArg = Required<Pick<TUser, 'password'>> & { token: string };
export type TResetPasswordArg = Pick<TUser, 'email'>;
export type TLoginArg = Required<Pick<TUser, 'email' | 'password'>>;

const getUser = async (): Promise<TUser> => {
  const result = await fetchWithRefresh<TGetUserResponse>('auth/user', {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('accessToken')!,
    },
  });
  return result.user;
};
const login = async (data: TLoginArg): Promise<TUser> => {
  const response = await defaultAuthRequest<TAuthResponse, TLoginArg>(
    'auth/login',
    data
  );
  setTokens(response);
  return response.user;
};
export const logout = async (): Promise<TSimpleResponse> => {
  const response = await defaultAuthRequest<TSimpleResponse, { token: string }>(
    'auth/logout',
    {
      token: localStorage.getItem('refreshToken')!,
    }
  );

  clearTokens();
  return response;
};
export const register = async (data: TUser): Promise<TUser> => {
  const response = await defaultAuthRequest<TAuthResponse, TUser>('auth/register', data);

  setTokens(response);
  return response.user;
};
export const resetPassword = async (
  data: TResetPasswordArg
): Promise<TSimpleResponse> => {
  return await defaultAuthRequest<TSimpleResponse, TResetPasswordArg>(
    'password-reset',
    data
  );
};
export const newPassword = async (data: TNewPasswordArg): Promise<TSimpleResponse> => {
  return await defaultAuthRequest('password-reset/reset', data);
};
export const changeUserData = async (data: Partial<TUser>): Promise<TUser> => {
  const response = await fetchWithRefresh<TAuthResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },

    body: JSON.stringify(data),
  });

  return response.user;
};
async function defaultAuthRequest<T, D>(endpoint: string, data: D): Promise<T> {
  return baseRequest(endpoint, {
    ...defaultOptions,
    body: JSON.stringify(data),
  });
}

function setTokens(data: TTokensResponse): void {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
}
function clearTokens(): void {
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
