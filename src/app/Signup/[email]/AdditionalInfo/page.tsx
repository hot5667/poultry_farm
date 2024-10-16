'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInputStore } from '../../../../store/inputstore';

interface AdditionalInfoProps {
  params: {
    email: string;
  };
}

const AdditionalInfo = ({ params }: AdditionalInfoProps) => {
  const { email } = params;
  const router = useRouter();

  const nickname = useInputStore(state => state.nickname);
  const introduction = useInputStore(state => state.introduction);
  const setNickname = useInputStore(state => state.setNickname);
  const setIntroduction = useInputStore(state => state.setIntroduction);
  const error = useInputStore(state => state.error);
  const setError = useInputStore(state => state.setError);

  useEffect(() => {
    if (!email || typeof email !== 'string') {
      router.push('/signup');
    }
  }, [email, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    console.log('이메일:', email);
    console.log('닉네임:', nickname);
    console.log('한줄 소개:', introduction || '한줄 소개 없음');
    
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">추가 정보 입력</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <label>
          닉네임 (필수):
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </label>
        <label>
          한줄 소개 (선택):
          <input
            type="text"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="p-2 border rounded"
            placeholder="자기소개를 입력하세요 (선택)"
          />
        </label>

        {error && <p className="text-red-500">{error}</p>} 
        
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
