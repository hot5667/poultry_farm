'use client';

import { comment } from '@/type/comunity';
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const CommentList = (id) => {
  const fetchPost = async (): Promise<comment[]> => {
    const { data, error } = await browserClient
      .from('Comment')
      .select('*')
      .eq('User_ID', id);
    if (error) {
      throw new Error();
    } else {
      return data;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['commentList'],
    queryFn: fetchPost,
  });

  if (isError) return <h2>데이터를 불러오지 못했습니다.</h2>;

  console.log(data);

  return (
    <div>
      {/* {data.Comment.map((comment) => (
        <div key={comment.User_ID}>
          <p>{comment.Comment_Content}</p>
        </div>
      ))} */}
    </div>
  );
};

export default CommentList;
