'use client';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(
    user.user_metadata?.nickname || user.email
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleOut = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-[200px] h-auto p-2 md:ml-7">
      <Image
        src="/assets/default-profile.jpg"
        width={200}
        height={200}
        alt="default-image
      "
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-baseline justify-center mt-2">
          <h2 className="font-black text-2xl md:text-3xl">{user.email}</h2>
          <span>님,</span>
        </div>

        <p className="mt-1">오늘도 화이팅!</p>
        <p className="text-gray-300 font-medium">{user.email}</p>

        {isEditing ? (
          <form>
            <input
              className="border border-gray-500"
              type="text"
              placeholder="새로운 닉네임을 입력하세요"
            />
            <button className="p-2 border border-gray-500">저장</button>
            <button onClick={handleOut} className="p-2 border border-gray-500">
              취소
            </button>
          </form>
        ) : (
          <button onClick={handleEdit}>수정</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
