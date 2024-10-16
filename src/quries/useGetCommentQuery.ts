import { comment } from '@/type/comunity';
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchSession = async (): Promise<comment[]> => {
  const { data, error } = await browserClient.from('Comment').select('*');
  if (error) {
    throw new Error();
  } else {
    return data;
  }
};

export const getCommentQuery = () => {
  return useQuery({
    queryKey: ['Comment'],
    queryFn: fetchSession,
  });
};
