'use client';

import { useAddMutation } from '@/mutations/comment-mutations';
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchSession = async () => {
  const { data, error } = await browserClient.from('Comment').select('*');

  return data;
};

const Comment = () => {
  const [isLogin, useLogin] = useState();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Comment'],
    queryFn: fetchSession,
  });

  const { mutate } = useAddMutation();

  console.log(data);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        {!isLogin ? null : <button>추가하기</button>};
      </form>
    </div>
  );
};

export default Comment;
