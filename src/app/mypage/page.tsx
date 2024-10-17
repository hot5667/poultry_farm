import { createClient } from '../../util/supabase/server';
import Card from './_components/Card';
import Profile from './_components/Profile';
import { Metadata } from 'next';
import { redirect } from 'next/navigation'; // useRouter 제거
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchChallenge } from '@/quries/useGetChallengeQuery';
import {
  calculateDDay,
  calculateProgress,
  dDay,
  formatTime,
  renderProgressImages,
} from './Progress';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '마이 페이지',
  description:
    '양계장 마이페이지에서는 사용자가 자신의 닉네임과 프로필 사진을 자유롭게 수정할 수 있습니다...',
};

// QueryClient를 함수 외부로 이동하고 옵션 추가
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // SSR을 위한 기본 옵션
      staleTime: 60 * 1000, // 1분
      gcTime: 60 * 1000, // 1분
    },
  },
});

const MyPage = async () => {
  const supabase = createClient();

  // 세션 체크
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/signin');
  }

  // 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  // User 테이블 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['users', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('UserID', user.id)
        .single(); // single() 사용하여 단일 결과 반환

      if (error) throw error;
      return data;
    },
  });

  // 챌린지 데이터 가져오기
  const challengeData = await fetchChallenge(user.id);
  const latestData = challengeData[0];
  const time = formatTime(latestData.Accumulated_Time);

  const progress = calculateProgress(latestData);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center items-center w-full">
        <section className="mt-56 md:w-full md:mt-40 gap-10 grid grid-cols-1 md:grid-cols-5 ">
          {latestData ? (
            <>
              <div className="col-start-1 col-span-2 h-[360px] flex items-center justify-center">
                <Profile user={user} session={session} />
              </div>
              <div className="col-start-1 md:col-start-3 col-span-2 md:col-span-3 h-auto text-[#823835]">
                <Link href={'/detail'}>
                  <div className="flex flex-col justify-between bg-gray-200 w-full md:w-[90%] h-full p-4 rounded-md">
                    <div className="flex flex-row items-end gap-2">
                      <p className="font-black text-base md:text-9xl">
                        {dDay(latestData.End_Date)}
                      </p>
                      <p className="text-base md:text-3xl">
                        {latestData.Title}
                      </p>
                    </div>
                    <p className="font-bold">누적 시간: {time}</p>
                    {latestData.Memo && <p>메모: {latestData.Memo}</p>}
                    <div className="mt-4">
                      <p className="font-bold">진행률: {progress}%</p>
                    </div>

                    <div className="p-1">
                      {renderProgressImages(progress, 'w-20 h-20')}
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="col-span-4 flex flex-col items-center">
              <Profile user={user} session={session} />
              <p className="mt-4">최신 챌린지 데이터가 없습니다.</p>
            </div>
          )}
        </section>
        {/* 카드 섹션 */}
        <section className="w-full flex justify-center mt-24">
          <Card user={user} />
        </section>
      </div>
    </HydrationBoundary>
  );
};
export default MyPage;
