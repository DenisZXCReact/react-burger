import baseRequest from '@utils/baseRequest.js';

const orderConfig = {
  endPoint: `orders`,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getOrderDetails = async (data) => {
  return baseRequest(orderConfig.endPoint, {
    method: 'POST',
    headers: orderConfig.headers,
    body: JSON.stringify(data),
  });
};
