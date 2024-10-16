import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const {
    data: { user },
  } = await browserClient.auth.getUser();
  console.log(user);
  return user;
};

export const getCommentUserInfo = () => {
  return useQuery({
    queryKey: ['Commentuser'],
    queryFn: fetchUser,
  });
};
