import Heatmap from './_components/Heatmap';
import Profile from './_components/Profile';

const MyPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* 프로필 섹션 */}
      <section className="md:col-span-1 place-items-center md:mt-16">
        <div className="flex flex-col justify-center items-center">
          <Profile />
        </div>
      </section>

      {/* 히트맵 섹션 */}
      <section className="grid-start-2 col-span-2 w-full px-3 m-auto place-items-center md:-mx-24">
        <Heatmap />
      </section>

      {/* 카드 섹션 */}
    </div>
  );
};
export default MyPage;
