import React from 'react';
import { Metadata } from 'next';
import AuthPage from '../../components/AuthForm'; 

export const metadata: Metadata = {
  title: '회원가입 페이지',
  description: '회원가입의 간단한 설명입니다.',
};

const SignPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthPage type="signup" />
    </div>
  );
};

export default SignPage;