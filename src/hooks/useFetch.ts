import { useEffect, useState } from 'react';

type TUseFetchError = { name: string; message: string };
type TUseFetchReturn<T> = {
  result: null | T;
  loading: boolean;
  error: null | TUseFetchError;
};

function useFetch<T>(api: string): TUseFetchReturn<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<null | T>(null);
  const [error, setError] = useState<null | TUseFetchError>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const startFetch = async (): Promise<void> => {
      try {
        const response = await fetch(api, { signal: controller.signal });
        if (!response.ok) throw new Error(String(response.status));
        const json = await response.json();
        setResult(json.data);
        setLoading(false);
      } catch (err) {
        if ((err as TUseFetchError).name === 'AbortError') return;
        setError(err as TUseFetchError);
        setLoading(false);
      }
    };
    startFetch();
    return (): void => {
      controller.abort();
    };
  }, [api]);
  return { result, loading, error };
}
export default useFetch;
