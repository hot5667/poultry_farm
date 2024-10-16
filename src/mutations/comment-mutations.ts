import browserClient from '@/util/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addComment = async (comment: {
  userId: string;
  feedID: string;
  comment: string;
}) => {
  return await browserClient
    .from('Comment')
    .insert({
      User_ID: comment.userId,
      Feed_ID: comment.feedID,
      Comment_Content: comment.comment,
    })
    .select();
};

export const useAddMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const deleteComment = async (commentID: { commentID: number }) => {
  return await browserClient
    .from('Comment')
    .delete()
    .eq('Comment_ID', commentID.commentID);
};

export const useDeleteMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const updateComment = async (updateData: {
  comment: string;
  commentID: number;
}) => {
  return await browserClient
    .from('Comment')
    .update({ Comment_Content: updateData.comment })
    .eq('Comment_ID', updateData.commentID);
};

export const useUpdateMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['post'] });
    },
  });
};
