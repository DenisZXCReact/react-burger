export default function getResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
}
