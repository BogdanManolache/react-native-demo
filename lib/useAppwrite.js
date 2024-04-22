import { useEffect, useState } from 'react';

export default function useAppwrite(callback) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const data = await callback();

      setData(data);

      if (!data) throw new Error();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
}
