'use client';

import AuthPage from '../../../components/autoAuthComponents'; // AuthPage 컴포넌트 임포트

const SignClient = () => {
  const authType = 'signup'; // 또는 'login'으로 변경

  return (
    <div>
      <AuthPage type={authType} />
    </div>
  );
};

export default SignClient;
