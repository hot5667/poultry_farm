import { Challenge } from '@/type/challenge';
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const fetchChallenge = async (userId: string): Promise<Challenge[]> => {
  let { data: challengeData, error } = await browserClient
    .from('Challenge')
    .select('*')
    .eq('User_ID', userId);
  if (error) {
    console.error('fetchChallenge 에러', error);
  }
  return challengeData as Challenge[];
};

export const getChallengeData = (userId: string) => {
  return useQuery({
    queryKey: ['challenge', userId],
    queryFn: () => fetchChallenge(userId),
  });
};
