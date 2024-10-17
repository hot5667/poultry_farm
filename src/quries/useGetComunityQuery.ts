'use client';

import { feed } from '../type/comunity';
import browserClient from '../util/supabase/client';
import { useQuery } from '@tanstack/react-query';

// .select('*, User(*), Comment(*)')
async function fetchSearchPost(mysearch: string): Promise<feed[]> {
  const { data, error } = await browserClient
    .from('Challenge')
    .select('*, User(*), Comment(*)')
    .ilike('Title', `%${mysearch}%`);
  if (error) {
    throw new Error();
  } else {
    return data;
  }
}

export const getComunityInfo = (mysearch: string) => {
  return useQuery<feed[]>({
    queryKey: ['post'],
    queryFn: () => fetchSearchPost(mysearch),
  });
};
