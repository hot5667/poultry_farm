'use client';
import browserClient from '@/util/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import UploadImage from './UploadImage';

interface ProfileProps {
  user: User;
  session: Session;
}

const Profile = ({ user, session }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const queryClient = useQueryClient();

  // User 테이블 데이터 가져오기
  const {
    data: userInfo,
    error: userInfoError,
    isLoading: userInfoIsLoading,
  } = useQuery({
    queryKey: ['users', user.id],
    queryFn: async () => {
      const { data, error } = await browserClient
        .from('User')
        .select('*')
        .eq('UserID', user.id);
      if (!data) return;
      return data[0];
    },
  });

  // 닉네임 변경
  const updateUser = async (newNickname: string) => {
    if (!session) {
      throw new Error('사용자가 인증되지 않았습니다.');
    }
    const { data, error } = await browserClient
      .from('User')
      .update({ NickName: newNickname })
      .eq('UserID', user.id)
      .select();
    if (error) {
      throw new Error(`닉네임 수정 오류: ${error.message}`);
    }
    setNickname(newNickname);
    setIsEditing(false);
  };

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', user.id],
      });
    },
  });

  // 닉네임 수정 form 토글
  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(nickname);
  };
  console.log(userInfo);
  return (
    <div className="w-[200px] h-auto p-2 md:ml-7">
      {isEditing ? (
        <UploadImage uid={user.id} currentUserImage={userInfo?.UserImage} />
      ) : (
        <Image
          src={userInfo?.UserImage || '/assets/default-profile.jpg'}
          width={200}
          height={200}
          alt="User Image"
        />
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-baseline justify-center mt-2">
          <h2 className="font-black text-2xl md:text-3xl">
            <p>{userInfo?.NickName}</p>
          </h2>
          <span>님,</span>
        </div>

        <p className="mt-1">오늘도 화이팅!</p>
        <p className="text-gray-300 font-medium">{user.email}</p>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="border border-gray-500 mb-2"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="새로운 닉네임을 입력하세요"
            />

            <div className="flex flex-row justify-center items-center gap-1">
              <button
                type="submit"
                className="p-1 text-sm border border-gray-500"
              >
                저장
              </button>
              <button
                onClick={handleToggleEdit}
                type="button"
                className="p-1 text-sm border border-gray-500"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={handleToggleEdit}
            className="p-2 border border-gray-500"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
