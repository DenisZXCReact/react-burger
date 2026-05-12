import { BASE_URL } from '@utils/constants.ts';
import getResponse from '@utils/get-response.js';

export default async function baseRequest<T>(
  endPoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endPoint}`, options);
  return getResponse<T>(response);
}
