import { createClient } from '@/util/supabase/server';
import Card from './_components/Card';
import Heatmap from './_components/Heatmap';
import Profile from './_components/Profile';
import browserClient from '@/util/supabase/client';

const MyPage = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(data);
  if (!user) return;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* 프로필 섹션 */}
      <section className="md:col-span-1 place-items-center md:mt-16">
        <div className="flex flex-col justify-center items-center">
          <Profile user={user} session={session} />
        </div>
      </section>

      {/* 히트맵 섹션 */}
      <section className="grid-start-2 col-span-2 w-full px-3 m-auto place-items-center md:-mx-24">
        <Heatmap />
      </section>

      {/* 카드 섹션 */}
      <section className="col-span-3">
        <Card user={user} />
      </section>
    </div>
  );
};
export default MyPage;
