import baseRequest from '@utils/baseRequest.js';

export const fetchIngredients = async () => {
  const result = await baseRequest('ingredients');
  return result.data;
};
