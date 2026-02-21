import { useEffect, useState } from 'react';
import api from '../services/api';

export const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    () => {
      let isMounted = true;

      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await api.get(url);
          if (isMounted) {
            setData(response.data.data);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.response?.data?.message || 'Error fetching data');
            setData(null);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    },
    dependencies.length > 0 ? dependencies : [url]
  );

  return { data, loading, error };
};
