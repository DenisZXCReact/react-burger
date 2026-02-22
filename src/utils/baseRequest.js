import { BASE_URL } from '@utils/constants.js';
import getResponse from '@utils/get-response.js';

export default async function baseRequest(endPoint, options = {}) {
  const response = await fetch(`${BASE_URL}/${endPoint}`, options);
  return getResponse(response);
}
