'use client';

import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import quotesData from '@/mockData';

const FocusOn = () => {
  const [task, setTask] = useState('');
  const [submittedTask, setSubmittedTask] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 로컬 스토리지에서 값을 로드하는 함수
  const loadFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  };

  // 로컬 스토리지에 값을 저장하는 함수
  const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  // 엔터 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedTask(task);
      setIsEditing(false);
      saveToLocalStorage('submittedTask', task);
    }
  };

  const fetchNickname = async () => {
    try {
      const { data: userData, error: userError } =
        await browserClient.auth.getUser();
      if (userError)
        throw new Error('로그인된 사용자 정보를 가져오는 데 실패했습니다');

      const userId = userData?.user?.id;
      if (userId) {
        const { data, error } = await browserClient
          .from('User')
          .select('NickName')
          .eq('UserID', userId)
          .single();

        if (error) throw new Error('닉네임을 가져오는 데 실패했습니다');
        return data?.NickName || 'guest';
      }
      throw new Error('로그인된 사용자가 없습니다');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('알 수 없는 오류 발생', error);
      }
      return 'guest';
    }
  };

  // useQuery를 사용하여 닉네임 데이터를 가져옴
  const { data: nickname } = useQuery({
    queryKey: ['nickname'],
    queryFn: fetchNickname,
  });

  // 명언 불러오기
  const fetchRandomQuote = () => {
    try {
      const randomIndex = Math.floor(Math.random() * quotesData.length);
      setRandomQuote(quotesData[randomIndex]);
    } catch (error) {
      console.error('명언을 불러오는 중 에러 발생:', error);
    }
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 로드
  useEffect(() => {
    const savedTask = loadFromLocalStorage('task');
    const savedSubmittedTask = loadFromLocalStorage('submittedTask');

    if (savedTask) {
      setTask(savedTask);
    }

    if (savedSubmittedTask) {
      setSubmittedTask(savedSubmittedTask);
    }
    fetchRandomQuote();
  }, []);

  // task 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveToLocalStorage('task', task);
  }, [task]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="mb-6 text-xl text-gray-500">
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
        <p className="text-soft text-xl absolute bottom-10 w-full text-center mb-8">
          "{randomQuote.quote}" - {randomQuote.author}
        </p>
      )}
      <p className="text-gray-200 text-xs absolute bottom-10 w-full text-center">
        ⓒ 2024, 美치기7조전 - 내배캠 심화프로젝트
      </p>
    </div>
  );
};

export default FocusOn;
