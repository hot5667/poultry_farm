'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInputStore } from '../../../../store/inputstore';
import browserClient from '../../../../util/supabase/client';

interface AdditionalInfoProps {
  params: {
    uuid: string;
  };
}

const AdditionalInfo = ({ params }: AdditionalInfoProps) => {
  const { uuid } = params;
  const router = useRouter();

  const nickname = useInputStore((state) => state.nickname);
  const introduction = useInputStore((state) => state.introduction);
  const setNickname = useInputStore((state) => state.setNickname);
  const setIntroduction = useInputStore((state) => state.setIntroduction);
  const error = useInputStore((state) => state.error);
  const setError = useInputStore((state) => state.setError);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await browserClient.auth.getUser();

        if (error) throw error;
        if (!user) {
          router.push('/signup');
          return;
        }

      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
        setError('유저 정보를 가져오는데 실패했습니다.');
      }
    };

    getUser();
  }, [router, setNickname, setIntroduction, setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    try {
      const { data: { user }, error: authError } = await browserClient.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('유저 정보를 찾을 수 없습니다.');

      const { error } = await browserClient
        .from('User')
        .upsert([{ UserID: user.id, NickName: nickname, User_Introduction: introduction || null }],
          { onConflict: 'UserID' });

      if (error) throw error;

      router.push('/');
    } catch (error) {
      console.error('데이터 저장 중 오류 발생:', error);
      setError('데이터 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-4 mx-auto rounded-lg  sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-4">추가 정보 입력</h1>

        {/* 인풋 필드 */}
        <div className="rounded-lg overflow-hidden border-2 border-gray-300">
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="peer p-4 w-full bg-transparent focus:outline-none border-b border-gray-300"
              placeholder=" "
              required
            />
            <label
              className={`absolute left-4 top-4 text-gray-500 transition-all 
    ${nickname ? 'top-1 text-sm text-[#03C75A]' :
                  'peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#03C75A]'}`}
            >
              닉네임 (필수)
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="peer p-4 w-full bg-transparent focus:outline-none"
              placeholder=" "
            />
            <label
              className={`absolute left-4 top-4 text-gray-500 transition-all 
    ${introduction ? 'top-1 text-sm text-[#03C75A]' :
                  'peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#03C75A]'}`}
            >
              한줄 소개 (선택)
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="p-4 w-full text-white bg-[#03C75A] rounded-lg mt-4 hover:bg-[#00B140] transition-colors"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;