const orderConfig = {
  url: 'https://new-stellarburgers.education-services.ru/api/orders',
  headers: {
    'Content-Type': 'application/json',
  },
};
function getResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
}
export const getOrderDetails = async (data) => {
  console.log(data);
  const postOrder = await fetch(orderConfig.url, {
    method: 'POST',
    headers: orderConfig.headers,
    body: JSON.stringify(data),
  });
  const orderDetails = await getResponse(postOrder);

  return orderDetails;
};
