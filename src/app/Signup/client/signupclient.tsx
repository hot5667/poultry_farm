'use client';

import AuthPage from '../../../components/autoAuthComponents'; // AuthPage 컴포넌트 임포트

const SignClient = () => {
  const authType = 'signup';

  return (
    <div>
      <AuthPage type={authType} />
    </div>
  );
};

export default SignClient;