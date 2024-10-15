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

const deleteComment = async (commentId: number) => {
  return await browserClient.from('Comment').delete().eq('User_ID', commentId);
};

export const useDeleteMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => deleteComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['Comment'] });
    },
  });
};

const updateComment = async (commentId: number, comment: string) => {
  return await browserClient
    .from('Comment')
    .update({ Comment_Content: comment })
    .eq('User_ID', commentId);
};

export const useUpdateMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async () => await updateComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['Comment'] });
    },
  });
};
