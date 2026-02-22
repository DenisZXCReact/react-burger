import { INGREDIENTS_API } from '@utils/constants.js';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};
export const fetchIngredients = async () => {
  const fetchIngredients = await fetch(INGREDIENTS_API);
  const res = await getResponse(fetchIngredients);
  return res.data;
};
