import baseRequest from '@utils/baseRequest.ts';
import { refreshToken } from '@utils/tokens.ts';

type TFetchError = {
  status: number;
};

export default async function fetchWithRefresh<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  try {
    return await baseRequest(endpoint, options);
  } catch (error) {
    if ((error as TFetchError).status === 401 || (error as TFetchError).status === 403) {
      const refreshData = await refreshToken();
      return baseRequest(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
}
