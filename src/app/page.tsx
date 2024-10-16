import MainComponent from '@/components/Main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '양계장 - 목표 관리 및 타이머 챌린지',
  description:
    '양계장은 사용자가 자신의 목표를 설정하고, D-day와 누적 시간을 관리하며, 가장 중요한 일에 집중하도록 도와주는 목표 관리 플랫폼입니다.',
  keywords:
    '목표 설정, D-day 관리, 누적 시간 타이머, 목표 집중, 메모장, 챌린지 관리',
};

const Home = () => {
  return <MainComponent />;
};

export default Home;
