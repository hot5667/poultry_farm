'use client';

import { useAddMutation } from '@/mutations/comment-mutations';
import { getCommentQuery } from '@/quries/useGetCommentQuery';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';

interface id {
  feedID: string;
}

const Comment = ({ feedID }: id) => {
  const [isLogin, setLogin] = useState();
  const [comment, setComment] = useState<string>('');
  const { data, isLoading, isError } = getCommentQuery();
  const { data: user } = getCommentUserInfo();

  const { mutate } = useAddMutation();

  const handleComment = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  // console.log(data);
  // console.log('////');
  // console.log(user);

  if (!data || !user) return <h2>데이터가 없습니다.</h2>;

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
        {isLogin ? null : <button type="submit">추가하기</button>}
      </form>
    </div>
  );
};

export default Comment;
