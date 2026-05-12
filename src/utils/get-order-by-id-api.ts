import baseRequest from '@utils/baseRequest.ts';

import type { TFeedOrder } from '@/types/types.ts';

type TOrderByIdResponse = {
  success: boolean;
  orders: TFeedOrder[];
};

export async function getOrderByIdApi(id: string): Promise<TFeedOrder> {
  const response = await baseRequest<TOrderByIdResponse>(`orders/${id}`);
  return response.orders[0];
}
