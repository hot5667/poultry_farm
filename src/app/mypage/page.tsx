import { createClient } from '@/util/supabase/server';
import Card from './_components/Card';
import Heatmap from './_components/Heatmap';
import Profile from './_components/Profile';
import { Metadata } from 'next';
import { redirect, useRouter } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export const metadata: Metadata = {
  title: '마이 페이지',
  description:
    '양계장 마이페이지에서는 사용자가 자신의 닉네임과 프로필 사진을 자유롭게 수정할 수 있습니다. 또한, 사용자가 참여 중인 챌린지를 한눈에 확인할 수 있으며, 각 챌린지 카드에서는 날짜별 진행 상황을 시각적으로 확인할 수 있습니다. 진행률에 따라 알이 단계적으로 부화하는 애니메이션을 제공하여 목표 달성을 더욱 직관적으로 추적할 수 있습니다.',
};

const queryClient = new QueryClient();

const MyPage = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/Signin');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // 서버 컴포넌트에서 User 테이블 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['users', user.id],
    queryFn: async () => {
      const { data, error } = await supabase // browserClient 사용
        .from('User')
        .select('*')
        .eq('UserID', user.id);
      if (!data) return;
      return data[0];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center items-center">
        {/* 프로필 섹션 */}
        <section className="flex flex-col items-center mt-56 md:w-1/3 md:mt-40">
          <Profile user={user} session={session} />
        </section>

        {/* 히트맵 섹션 */}
        {/* <section className="w-full md:w-1/3 px-3 m-auto mt-4 md:mt-0">
        <Heatmap />
      </section> */}

        {/* 카드 섹션 */}
        <section className="w-full md:w-1/3 mt-4 md:mt-0">
          <Card user={user} />
        </section>
      </div>
    </HydrationBoundary>
  );
};
export default MyPage;
