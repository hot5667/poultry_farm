'use client';

import {
  useDeleteMutation,
  useUpdateMutation,
} from '@/mutations/comment-mutations';
import { SetStateAction, useState } from 'react';

interface data {
  id: number;
  text: string;
}

const CommentButton = ({ id, text }: data) => {
  const [comment, setComment] = useState('');

  const handleUpdate = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };
  const { mutate: delet } = useDeleteMutation();
  const { mutate: update } = useUpdateMutation();

  return (
    <div>
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
    </div>
  );
};

export default CommentButton;
