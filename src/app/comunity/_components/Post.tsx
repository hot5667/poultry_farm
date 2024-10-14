'use client';

import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchPost = async () => {
  const { data, error } = await browserClient.from('feed').select('*');
  return data;
};

const Post = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['Comment'],
    queryFn: fetchPost,
  });

  return (
    <div>
      {data?.map((post) => (
        <div key={post.User_ID}>
          <p>{post.Category}</p>
          <p>{post.Feed_Content}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
