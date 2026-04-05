import baseRequest from '@utils/baseRequest.ts';

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
  return baseRequest(orderConfig.endPoint, {
    method: 'POST',
    headers: orderConfig.headers,
    body: JSON.stringify({ ingredients: ingredients }),
  });
};
