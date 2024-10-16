'use client';

import { feed } from '@/type/comunity';
import CommentButton from './CommentButton';
import CommentInput from './CommentInput';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Image from 'next/image';

type PostData = {
  data: feed;
};

const Comment = ({ data }: PostData) => {
  const [isComment, setComment] = useState(true);

  const elementRef = useRef<HTMLDivElement>(null); // DOM에 접근하기 위한 ref 생성
  const [elementHeight, setElementHeight] = useState<number>(0); // 높이값을 저장할 state

  useEffect(() => {
    if (elementRef.current) {
      setElementHeight(elementRef.current.clientHeight); // 또는 offsetHeight
    }
  }, []);
  console.log(data);

  return (
    <div className="flex">
      <div className="relative min-w-[800px] max-w-[80%] mb-[40px] flex flex-col justify-between p-[20px] border  min-h-[380px]">
        <div>
          <strong className="block text-[#A0D683] text-[32px]">
            {data.Category}
          </strong>
          <p className="block text-[24px]">{data.Challenge_Comment}</p>
        </div>
        <div className="absolute top-[15px] right-[15px] flex flex-col items-center">
          <div className="overflow-hidden rounded-[50%]">
            <Image
              src={data.User?.UserImage || '/assets/default-profile.jpg'}
              width={30}
              height={30}
              alt="User Image"
            />
          </div>
          <strong className="block text-[14px]">{data.User?.NickName}</strong>
        </div>

        <div>
          <div>
            <p>{data.Feed_Content}</p>
            <p>{`챌린지 날짜 : ${data.Challenge_start_progress} ~ ${data.Challenge_end_progress}`}</p>
          </div>
          <CommentInput feedID={data.User_feed_ID} />
          {!isComment ? (
            <Button
              type="button"
              className={'btn mt-[20px]'}
              onClick={() => setComment(true)}
            >
              댓글닫기
            </Button>
          ) : (
            <Button
              type="button"
              className={'btn mt-[20px]'}
              onClick={() => setComment(false)}
            >
              댓글보기
            </Button>
          )}
        </div>
      </div>
      <div
        ref={elementRef}
        className={
          !isComment
            ? elementHeight >= 470
              ? 'h-[380px] overflow-y-scroll p-4 box-border'
              : 'max-h-[380px] max-w[300px] overflow-y-scroll border border-l-0 p-4'
            : ''
        }
      >
        {!isComment
          ? data.Comment.map((comment) => (
              <div
                className="flex mt-[6px] justify-between items-center relative min-h-[50px]"
                key={comment.Comment_ID}
              >
                <div>
                  <p className="w-[200px]">{comment.Comment_Content}</p>
                </div>
                <CommentButton
                  id={comment.Comment_ID}
                  userID={comment.User_ID}
                  comentContent={comment.Comment_Content}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Comment;
