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
        
        if (error) {
          throw error;
        }

        if (!user) {
          router.push('/signup');
          return;
        }

        const { data: userData, error: userError } = await browserClient
          .from('User')
          .select('NickName, User_Introduction')
          .eq('UserID', user.id)
          .single();

        if (userError) {
          throw userError;
        }

        // 기존 데이터가 있다면 폼에 설정
        if (userData) {
          setNickname(userData.NickName);
          setIntroduction(userData.User_Introduction || '');
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
        .upsert([
          { 
            UserID: user.id, 
            NickName: nickname, 
            User_Introduction: introduction || null 
          }
        ], 
        { onConflict: 'UserID' });

      if (error) throw error;

      console.log('UserID:', user.id);
      console.log('닉네임:', nickname);
      console.log('한줄 소개:', introduction || '한줄 소개 없음');

      // 성공 시 다음 페이지로 이동하거나 성공 메시지 표시
      router.push('/'); // 또는 다른 페이지로 이동

    } catch (error) {
      console.error('데이터 저장 중 오류 발생:', error);
      setError('데이터 저장 중 오류가 발생했습니다.');
    }
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