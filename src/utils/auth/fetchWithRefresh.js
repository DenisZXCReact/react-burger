import baseRequest from '@utils/baseRequest.js';
import { refreshToken } from '@utils/tokens.js';

export default async function fetchWithRefresh(endpoint, options) {
  try {
    return await baseRequest(endpoint, options);
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      const refreshData = await refreshToken(endpoint, options);
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
