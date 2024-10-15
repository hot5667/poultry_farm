'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdditionalInfoProps {
  params: {
    email: string;
  };
}

const AdditionalInfo = ({ params }: AdditionalInfoProps) => {
  const { email } = params;
  const router = useRouter();
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (!email) {
      router.push('/signup');
    }
  }, [email, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('추가 정보:', info);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">추가 정보 입력</h1>
      <p className="text-sm">이메일: {email}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <label>
          추가 정보:
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="p-2 border rounded"
          />
        </label>
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