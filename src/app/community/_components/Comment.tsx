'use client';

import { feed } from '@/type/comunity';
import CommentButton from './CommentButton';
import CommentInput from './CommentInput';
import { useState } from 'react';
import Button from './Button';

type PostData = {
  data: feed;
};

const Comment = ({ data }: PostData) => {
  const [isComment, setComment] = useState(true);

  return (
    <div className="w-[31%] mb-[40px] p-[20px] border flex flex-col justify-between">
      <div>
        <strong className="block text-[32px]">{data.Category}</strong>
        <p className="block text-[24px]">{data.Challenge_Comment}</p>
      </div>
      <div className="flex justify-between">
        <strong className="block text-[14px]">{data.User?.NickName}</strong>
        <p>{data.Feed_Content}</p>
        <ul>
          <li>시작날: {data.Challenge_start_progress}</li>
          <li>종료날: {data.Challenge_end_progress}</li>
        </ul>
      </div>
      {!isComment
        ? data.Comment.map((comment) => (
            <div
              className="flex mt-[6px] items-center"
              key={comment.Comment_ID}
            >
              <div>
                <p>{comment.Comment_Content}</p>
              </div>
              <CommentButton id={comment.Comment_ID} userID={comment.User_ID} />
            </div>
          ))
        : null}
      {!isComment ? (
        <Button type="button" onClick={() => setComment(true)}>
          댓글닫기
        </Button>
      ) : (
        <Button type="button" onClick={() => setComment(false)}>
          댓글보기
        </Button>
      )}
      <CommentInput feedID={data.User_feed_ID} />
    </div>
  );
};

export default Comment;