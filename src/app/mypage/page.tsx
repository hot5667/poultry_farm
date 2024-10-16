import { createClient } from '@/util/supabase/server';
import Card from './_components/Card';
import Heatmap from './_components/Heatmap';
import Profile from './_components/Profile';
import { Metadata } from 'next';
import { redirect, useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: '양계장 마이페이지',
};

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

  return (
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
  );
};
export default MyPage;
