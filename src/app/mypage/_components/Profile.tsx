'use client';
import browserClient from '@/util/supabase/client';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
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

        <button>수정</button>
      </div>
    </div>
  );
};

export default Profile;
