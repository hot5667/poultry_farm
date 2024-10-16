'use client';

import Comment from './Comment';
import CommentButton from './CommentButton';
import { SetStateAction, useState } from 'react';
import browserClient from '@/util/supabase/client';
import { feed } from '@/type/comunity';
import { useQuery } from '@tanstack/react-query';

const Post = () => {
  const [mysearch, setSearch] = useState('');
  async function fetchSearchPost(): Promise<feed[]> {
    const { data, error } = await browserClient
      .from('feed')
      .select('*, User(*), Comment(*)')
      .ilike('Category', `%${mysearch}%`);
    if (error) {
      throw new Error();
    } else {
      return data;
    }
  }

  const { data, isError, isLoading, refetch, isFetching } = useQuery<feed[]>({
    queryKey: ['post'],
    queryFn: fetchSearchPost,
  });

  console.log(data);

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  function onClickSearch() {
    refetch();
  }

  if (isLoading) return <h2>데이터 로딩중</h2>;
  if (!data) return <h2>데이터가 없습니다</h2>;
  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  return (
    <>
      <input
        className="border"
        type="text"
        value={mysearch}
        onChange={handleSearch}
      />
      <button onClick={onClickSearch}>검색하기</button>
      <div className="flex gap-16 m-[20px]">
        {data?.map((post) => (
          <div className="p-[20px] border" key={post.User_ID}>
            <strong className="block text-[32px]">{post.Category}</strong>
            <strong className="block text-[32px]">{post.User?.NickName}</strong>
            <span className="text-[24px] mb-[10px] mt-[10px] block">
              {post.User?.User_Challenge}
            </span>
            <p>{post.Category}</p>
            <p>{post.Feed_Content}</p>
            <ul>
              <li>시작날: {post.Challenge_start_progress}</li>
              <li>종료날: {post.Challenge_end_progress}</li>
            </ul>
            {post.Comment.map((comment) => (
              <div className="flex" key={comment.Comment_ID}>
                <div>
                  <p>{comment.Comment_Content}</p>
                </div>
                <CommentButton
                  id={comment.Comment_ID}
                  userID={comment.User_ID}
                />
              </div>
            ))}
            <Comment feedID={post.User_feed_ID} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
