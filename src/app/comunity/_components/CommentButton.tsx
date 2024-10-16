'use client';

import {
  useDeleteMutation,
  useUpdateMutation,
} from '@/mutations/comment-mutations';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';
import Button from './Button';
import { commentButton } from '@/type/comunity';

const CommentButton = ({ id, userID }: commentButton) => {
  const [comment, setComment] = useState('');
  const { data } = getCommentUserInfo();
  const { mutate: deleteComment } = useDeleteMutation();
  const { mutate: updateComment } = useUpdateMutation();
  const loginUserId = data?.id;

  const handleUpdate = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      deleteComment({ commentID: id });
    }
  };

  if (!data) return;

  return (
    <div className="flex">
      {userID === loginUserId ? (
        <>
          <Button onClick={() => handleDelete(id)}>삭제</Button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setComment('');
              updateComment({
                commentID: id,
                comment: comment,
              });
            }}
          >
            <input
              className="btn w-[100px] p-[4px]"
              type="text"
              value={comment}
              onChange={handleUpdate}
            />
            <Button type="submit">수정하기</Button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default CommentButton;
