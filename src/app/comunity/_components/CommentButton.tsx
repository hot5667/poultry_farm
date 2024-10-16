'use client';

import {
  useDeleteMutation,
  useUpdateMutation,
} from '@/mutations/comment-mutations';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';

interface data {
  id: number;
  userID: string;
}

const CommentButton = ({ id, userID }: data) => {
  const [comment, setComment] = useState('');
  const { data } = getCommentUserInfo();

  const loginUserID = data?.id;

  const handleUpdate = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };
  const { mutate: delet } = useDeleteMutation();
  const { mutate: update } = useUpdateMutation();
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      delet({ commentID: id });
    }
  };

  if (!data) return;

  return (
    <div>
      {userID === loginUserID ? (
        <>
          <button onClick={() => handleDelete(id)}>삭제</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setComment('');
              update({
                commentID: id,
                comment: comment,
              });
            }}
          >
            <input
              className="border"
              type="text"
              value={comment}
              onChange={handleUpdate}
            />
            <button type="submit">수정하기</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default CommentButton;
