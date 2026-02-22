import baseRequest from '@utils/baseRequest.js';

export const fetchIngredients = async () => {
  return await baseRequest('ingredients').then((result) => result.data);
};
