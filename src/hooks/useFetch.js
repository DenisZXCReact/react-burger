import { useEffect, useState } from 'react';

function useFetch(api) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let controller = new AbortController();
    const startFetch = async () => {
      try {
        const response = await fetch(api, { signal: controller.signal });
        if (!response.ok) throw new Error(response.status);
        const json = await response.json();
        setResult(json.data);
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
        setLoading(false);
      }
    };
    startFetch();
    return () => {
      controller.abort();
    };
  }, [api]);
  return { result, loading, error };
}
export default useFetch;
