'use client';

import {
  useDeleteMutation,
  useUpdateMutation,
} from '@/mutations/comment-mutations';
import { getCommentUserInfo } from '@/quries/useGetCommentUserQuery';
import { SetStateAction, useState } from 'react';
// import Cookies from 'js-cookie';

interface data {
  id: number;
  userID: string;
}

const CommentButton = ({ id, userID }: data) => {
  const [comment, setComment] = useState('');
  // const cookiestore = Cookies;
  // const cookie = cookiestore.get('sb-ipybojcftcgitunzyror-auth-token');
  const { data } = getCommentUserInfo();

  const loginUserID = data?.id;

  const handleUpdate = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };
  const { mutate: delet } = useDeleteMutation();
  const { mutate: update } = useUpdateMutation();

  if (!data) return;

  return (
    <div>
      {userID === loginUserID ? (
        <>
          <button onClick={() => delet({ commentID: id })}>삭제</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(id, comment);
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
