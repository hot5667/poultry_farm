import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FocusOn = () => {
  const [task, setTask] = useState('');
  const [submittedTask, setSubmittedTask] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 엔터입력
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedTask(task);
      // setTask('');
      setIsEditing(false);
    }
  };

  const fetchNickname = async () => {
    // 로그인한 유저ID 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError)
      throw new Error('로그인된 사용자 정보를 가져오는 데 실패했습니다');

    const userId = userData?.user?.id;
    if (userId) {
      // User테이블에서 UserID가 일치하는 닉네임 검색
      const { data, error } = await supabase
        .from('User')
        .select('NickName')
        .eq('UserID', userId)
        .single();

      if (error) throw new Error('닉네임을 가져오는 데 실패했습니다');
      return data?.NickName || '';
    }
    throw new Error('로그인된 사용자가 없습니다');
  };

  // useQuery를 사용하여 닉네임 데이터를 가져옴
  const { data: nickname } = useQuery({
    queryKey: ['nickname'],
    queryFn: fetchNickname,
  });

  // 명언 불러오기
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:4000/quotes');
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    } catch (error) {
      console.error('명언을 불러오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
    fetchNickname();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="mb-2 text-xl text-gray-500">
        {nickname
          ? `${nickname}님, 오늘 가장 중요한 일은 뭔가요?`
          : '로딩 중...'}
      </h1>

      {(!submittedTask || isEditing) && (
        <input
          className="border-b p-2 w-64 text-center outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}

      {submittedTask && !isEditing && (
        <div
          onClick={() => {
            setIsEditing(true);
            setTask(submittedTask);
          }}
        >
          <p className="text-4xl font-semibold">{submittedTask}</p>
        </div>
      )}

      {randomQuote && (
        <p className="text-gray-200 text-sm absolute bottom-10 w-full text-center">
          "{randomQuote.quote}" - {randomQuote.author}
        </p>
      )}
    </div>
  );
};

export default FocusOn;
