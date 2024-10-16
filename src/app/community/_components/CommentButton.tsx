'use client';

import {
  useDeleteMutation,
  useUpdateMutation,
} from '@/mutations/comment-mutations';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';
import Button from './Button';
import { commentButton } from '@/type/comunity';

const CommentButton = ({ id, userID, comentContent }: commentButton) => {
  const { data } = getCommentUserInfo();
  const [comment, setComment] = useState(comentContent);
  const [isUpdate, setUpdate] = useState(false);
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (comment === '') {
      alert('내용을 입력해주세요~');
      return;
    } else {
      updateComment({
        commentID: id,
        comment: comment,
      });
      setComment('');
      setUpdate(false);
    }
  };

  if (!data) return;

  return (
    <div className="flex">
      {userID === loginUserId ? (
        <>
          <Button className="p-1" onClick={() => handleDelete(id)}>
            삭제
          </Button>
          <form onSubmit={handleSubmit}>
            {isUpdate ? (
              <>
                <input
                  className="input btn w-[100px] p-[4px]"
                  type="text"
                  value={comment}
                  onChange={handleUpdate}
                />
                <Button type="submit">수정하기</Button>
              </>
            ) : (
              <Button
                type="button"
                className="p-1 ml-[8px]"
                onClick={() => setUpdate(true)}
              >
                수정
              </Button>
            )}
          </form>
        </>
      ) : null}
    </div>
  );
};

export default CommentButton;
