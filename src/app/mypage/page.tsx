import { createClient } from '@/util/supabase/server';
import Card from './_components/Card';
import Profile from './_components/Profile';
import { Metadata } from 'next';
import { redirect } from 'next/navigation'; // useRouter 제거
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center items-center">
        <section className="flex flex-col items-center mt-56 md:w-1/3 md:mt-40">
          <Profile user={user} session={session} />
        </section>
        <section className="w-full md:w-1/3 mt-4 md:mt-0">
          <Card user={user} />
        </section>
      </div>
    </HydrationBoundary>
  );
};

export default MyPage;