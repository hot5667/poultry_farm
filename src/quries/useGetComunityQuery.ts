'use client';

import { comment, feed } from '@/type/comunity';
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

async function fetchPost(): Promise<feed[]> {
  const { data, error } = await browserClient
    .from('feed')
    .select(`*, User(*), Comment(*)`);
  if (error) {
    throw new Error();
  } else {
    return data;
  }
}

// export const getComunityInfo = () => {
//   return useQuery<feed[]>({
//     queryKey: ['post'],
//     queryFn: fetchPost,
//   });
// };

async function fetchSearchPost(mysearch: string): Promise<feed[]> {
  const { data, error } = await browserClient
    .from('feed')
    .select('*, User(*), Comment(*)')
    .ilike('Category', `%${mysearch}%`);
  if (error) {
    throw new Error();
  } else {
    return data;
  }
}

export const getComunityInfo = () => {
  return useQuery<feed[]>({
    queryKey: ['post'],
    queryFn: fetchSearchPost,
  });
};
