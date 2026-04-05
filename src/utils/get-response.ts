export default function getResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}
