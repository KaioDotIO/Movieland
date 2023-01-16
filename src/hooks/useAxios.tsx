import useSWR from 'swr';
import api from '@/services/api';

export const useAxios = (URL: string) => {
  const { data, error, isLoading } = useSWR(URL, async (url: string) => {
    const response = await api.get(url);

    return response.data;
  });

  return { data, error, isLoading };
};
