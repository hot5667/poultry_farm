'use client';
import browserClient from '../../../util/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import UploadImage from './UploadImage';
import { useNicknameStore } from '../../../store/useNicknameStore';

interface ProfileProps {
  user: User;
  session: Session;
}

const Profile = ({ user, session }: ProfileProps) => {
  const queryClient = useQueryClient();
  // 주스탠드 스토어에서 상태 가져오기
  const { nickname, isEditing, setNickname, toggleEditing } =
    useNicknameStore();

  // User 테이블 데이터 가져오기
  const {
    data: userInfo,
    error: userInfoError,
    isLoading: userInfoIsLoading,
  } = useQuery({
    queryKey: ['users', user.id],
    queryFn: async () => {
      const { data, error } = await browserClient
        .from('User')
        .select('*')
        .eq('UserID', user.id);
      if (!data) return;
      return data[0];
    },
  });

  // 닉네임 변경
  const updateUser = async (newNickname: string) => {
    if (!session) {
      throw new Error('사용자가 인증되지 않았습니다.');
    }
    const { data, error } = await browserClient
      .from('User')
      .update({ NickName: newNickname })
      .eq('UserID', user.id)
      .select();
    if (error) {
      throw new Error(`닉네임 수정 오류: ${error.message}`);
    }
    setNickname(newNickname); // 주스탠드 스토어에서 닉네임 업데이트
    toggleEditing(); // 닉네임 수정 모드 토글
  };

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', user.id],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(nickname);
  };

  // 로딩 중 상태 표시
  if (userInfoIsLoading) {
    return (
      <div className="w-72 flex flex-col justify-center items-center h-auto p-4 rounded-lg shadow-md bg-white mb-10">
        <Image
          src="/assets/default-profile.jpg"
          width={200}
          height={200}
          alt="기본 이미지"
        />
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="w-72 flex flex-col justify-center items-center h-auto p-3 rounded-lg shadow-md bg-white">
      {isEditing ? (
        <UploadImage
          uid={user.id}
          currentUserImage={userInfo?.UserImage}
          session={session}
        />
      ) : (
        <Image
          src={userInfo?.UserImage || '/assets/default-profile.jpg'}
          width={200}
          height={200}
          alt="User Image"
        />
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-baseline justify-center mt-2">
          <h2 className="font-black text-2xl md:text-3xl">
            <p>{userInfo?.NickName ? userInfo.NickName : user.email}</p>
          </h2>
          <span>님,</span>
        </div>

        <p className="mt-1">오늘도 화이팅!</p>
        <p className="p-1 text-gray-300 font-medium">{user.email}</p>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="text-center w-48 p-1 underline underline-offset-2 mb-2 placeholder:text-sm text-gray-500 focus:outline-none"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="새로운 닉네임을 입력하세요"
            />

            <div className="flex flex-row justify-center items-center gap-1">
              <button
                type="submit"
                className="p-1 text-sm border border-gray-500"
              >
                저장
              </button>
              <button
                onClick={toggleEditing}
                type="button"
                className="p-1 text-sm border border-gray-500"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={toggleEditing}
            className="p-1 text-sm border border-gray-500"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
