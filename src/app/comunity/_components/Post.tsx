'use client';

import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { feed } from '@/type/comunity';
import { getComunityInfo } from '@/quries/useGetComunityQuery';

const fetchPost = async (): Promise<feed[]> => {
  const { data, error } = await browserClient
    .from('feed')
    .select(`*, User(*), Comment(*)`);
  if (error) {
    throw new Error();
  } else {
    return data;
  }
};

const Post = () => {
  const { data, isLoading, isError } = useQuery<feed[]>({
    queryKey: ['post'],
    queryFn: fetchPost,
  });

  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  return (
    <div>
      {data?.map((post) => (
        <div key={post.User_ID}>
          <strong>{post.User.NickName}</strong>
          <span>{post.User.User_Challenge}</span>
          <p>{post.Category}</p>
          <p>{post.Feed_Content}</p>
          <ul>
            <li>시작날: {post.Challenge_start_progress}</li>
            <li>종료날: {post.Challenge_end_progress}</li>
          </ul>
          {post.Comment.map((comment) => (
            <div key={comment.User_ID}>
              <p>{comment.Comment_Content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Post;
