'use client';

import { useAddMutation } from '@/mutations/comment-mutations';
import { getCommentQuery } from '@/quries/useGetCommentQuery';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';
import Button from './Button';

interface Id {
  feedID: string;
}

const CommentInput = ({ feedID }: Id) => {
  const [comment, setComment] = useState<string>('');
  const { data, isError } = getCommentQuery();
  const { data: user } = getCommentUserInfo();

  const { mutate } = useAddMutation();

  const handleComment = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  if (!user) return <h2>댓글을 달려면 로그인을 해주세요</h2>;
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
      feedID: feedID,
      comment: comment,
    });
    setComment('');
  };

  return (
    <div className="my-[20px]">
      <form className="flex justify-end" onSubmit={handleSubmit}>
        <input
          className="btn w-[80%]"
          type="text"
          value={comment}
          onChange={handleComment}
        />
        <Button type={'submit'} className={'ml-[10px]'}>
          추가하기
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
