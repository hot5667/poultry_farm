import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메인 페이지',
  description: '메인 페이지의 간단한 설명입니다.',
};

const Home = () => {
  return <div>메인 페이지 입니다.</div>;
};

export default Home;