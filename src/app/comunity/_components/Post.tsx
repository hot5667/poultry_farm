'use client';

import Comment from './Comment';
import { getComunityInfo } from '@/quries/useGetComunityQuery';
import CommentButton from './CommentButton';

const Post = () => {
  const { data, isError } = getComunityInfo();
  console.log(data);

  if (!data) return <h2>데이터가 없습니다</h2>;

  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  console.log(data);
  return (
    <div>
      {data?.map((post) => (
        <div key={post.User_ID}>
          <strong>{post.User?.NickName}</strong>
          <span>{post.User?.User_Challenge}</span>
          <p>{post.Category}</p>
          <p>{post.Feed_Content}</p>
          <ul>
            <li>시작날: {post.Challenge_start_progress}</li>
            <li>종료날: {post.Challenge_end_progress}</li>
          </ul>
          {post.Comment.map((comment) => (
            <div key={comment.Comment_ID}>
              <div>
                <p>{comment.Comment_Content}</p>
              </div>
              <CommentButton
                id={comment.Comment_ID}
                text={comment.Comment_Content}
              />
            </div>
          ))}
          <Comment feedID={post.User_feed_ID} />
        </div>
      ))}
    </div>
  );
};

export default Post;
