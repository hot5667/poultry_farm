import browserClient from '@/util/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addComment = async (userId: string, feedID: number, comment: string) => {
  return await browserClient
    .from('Comment')
    .insert({ User_ID: userId, Comment_Content: comment, feed_ID: feedID })
    .select();
};

export const useAddMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => addComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['Comment'] });
    },
  });
};
