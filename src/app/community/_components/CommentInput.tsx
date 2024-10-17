'use client';

import { useAddMutation } from '@/mutations/comment-mutations';
import { getCommentQuery } from '@/quries/useGetCommentQuery';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';
import Button from './Button';

interface Id {
  feedID: string;
  Challenge_ID: string;
}

const CommentInput = ({ feedID, Challenge_ID }: Id) => {
  const [comment, setComment] = useState<string>('');
  const { data, isError } = getCommentQuery();
  const { data: user } = getCommentUserInfo();

  const { mutate } = useAddMutation();

  const handleComment = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  if (!user)
    return (
      <p className="my-[10px] text-center">댓글을 달려면 로그인을 해주세요</p>
    );
  if (!data) return <h2>데이터 오류</h2>;
  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (comment === '') {
      alert('내용을 입력해주세요~');
      return;
    }
    mutate({
      userId: user.id,
      comment: comment,
      Challengeid: Challenge_ID,
    });
    setComment('');
  };

  return (
    <div className="mt-[15px]">
      <form className="flex items-end relative" onSubmit={handleSubmit}>
        <input
          className="input "
          type="text"
          value={comment}
          onChange={handleComment}
        />
        <span className="underline"></span>
        <Button type={'submit'} className={'ml-[10px]'}>
          추가하기
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
