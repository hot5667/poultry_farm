'use client';

import { useAddMutation } from '@/mutations/comment-mutations';
import { getCommentQuery } from '@/quries/useGetCommentQuery';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';

interface id {
  feedID: string;
}

const Comment = ({ feedID }: id) => {
  const [comment, setComment] = useState<string>('');
  const { data, isLoading, isError } = getCommentQuery();
  const { data: user } = getCommentUserInfo();

  const { mutate } = useAddMutation();

  console.log(feedID);

  const handleComment = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  if (!user) return <h2>댓글을 달려면 로그인을 해주세요</h2>;
  if (!data) return <h2>데이터 오류</h2>;
  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            userId: user.id,
            feedID: feedID,
            comment: comment,
          });
        }}
      >
        <input
          className="border"
          type="text"
          value={comment}
          onChange={handleComment}
        />
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};

export default Comment;
