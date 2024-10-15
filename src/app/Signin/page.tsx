import React from 'react';
import { Metadata } from 'next';
import AuthPage from '../../components/autoAuthComponents'; // AuthPage 컴포넌트 임포트

export const metadata: Metadata = {
  title: '로그인 페이지',
  description: '로그인 페이지의 간단한 설명입니다.',
};

const Signin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <AuthPage type="login" />
    </div>
  );
};

export default Signin;