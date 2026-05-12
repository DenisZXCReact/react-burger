import fetchWithRefresh from '@utils/auth/fetchWithRefresh.ts';

const orderConfig = {
  endPoint: `orders`,
  headers: {
    'Content-Type': 'application/json',
  },
};
export type TOrderDetailsResponse = {
  name: string;
  order: { number: number };
  success: true;
};

export const getOrderDetails = async (
  ingredients: string[]
): Promise<TOrderDetailsResponse> => {
  console.log(ingredients);
  return fetchWithRefresh<TOrderDetailsResponse>(orderConfig.endPoint, {
    method: 'POST',
    headers: {
      ...orderConfig.headers,
      authorization: localStorage.getItem('accessToken')!,
    },
    body: JSON.stringify({ ingredients: ingredients }),
  });
};
