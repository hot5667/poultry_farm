'use client';

import { useState } from 'react';
import Comment from './Comment';
import CommentSearch from './CommentSearch';
import { getComunityInfo } from '@/quries/useGetComunityQuery';

const CommentPost = () => {
  const [mySearch, setSearch] = useState('');

  const { data: user, isLoading, isError, refetch } = getComunityInfo(mySearch);

  if (isLoading) return <h2>데이터 로딩중</h2>;
  if (!user) return <h2>데이터가 없습니다</h2>;
  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  return (
    <>
      <div className="my-[40px]">
        <CommentSearch
          mySearch={mySearch}
          setSearch={setSearch}
          refetch={refetch}
        />
      </div>
      <div className="flex flex-wrap justify-between">
        {user?.map((post) => <Comment key={post.User_ID} data={post} />)}
      </div>
    </>
  );
};

export default CommentPost;
