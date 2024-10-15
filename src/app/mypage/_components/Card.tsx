'use client';
import browserClient from '@/util/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { progressImages } from '../progress';

interface CardProps {
  user: User;
}

// types 폴더로 이동
interface MyPageFeed {
  User_feed_ID: string;
  User_ID: string | null; // User_ID가 null일 수도 있으므로
  Challenge_end_progress: string;
  Category: string;
  Challenge_Comment: string;
  Challenge_Images: string | null;
  progress_icon: string | null;
  Feed_Content: string | null;
  Challenge_start_progress: string;
}

const fetchFeeds = async () => {
  let { data: feed, error } = await browserClient.from('feed').select('*');
  return feed;
};

const Card = ({ user }: CardProps) => {
  const {
    data: feeds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div>Error</div>;

  const mypageFeeds = feeds?.find((feed) => feed.User_feed_ID === user.id);

  // 디데이 계산
  const calculateDDay = (targetDate: string) => {
    const targetDay = new Date(targetDate);
    const today = new Date();
    const gap = targetDay.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  };

  // 진행률 계산
  const calculateProgress = (mypageFeed: MyPageFeed) => {
    const start = new Date(mypageFeed.Challenge_start_progress); // 시작일을 mypageFeed에서 가져옴
    const end = new Date(mypageFeed.Challenge_end_progress); // 종료일을 mypageFeed에서 가져옴
    const today = new Date();
    // 전체 기간 계산
    const totalDuration = end.getTime() - start.getTime();
    const comingChallenge = today.getTime() - start.getTime(); // 도전 시작 이전
    if (comingChallenge < 0) return 0;
    // 계산된 진행률
    const progress = Math.min((comingChallenge / totalDuration) * 100, 100); // 100%를 초과하지 않도록
    if (progress < 25) return 0;
    if (progress < 50) return 25;
    if (progress < 75) return 50;
    if (progress < 100) return 75;
    return 100;
  };

  const progress = calculateProgress(mypageFeeds);
  return (
    <div className="w-1/4 mx-auto">
      {mypageFeeds && (
        <div className="bg-[#a0d683] rounded-md p-4 mb-2 text-[#864c3f]">
          {(() => {
            const dDay = calculateDDay(mypageFeeds.Challenge_end_progress);
            return <span className="font-bold">D-{dDay}</span>;
          })()}
          <p>카테고리: {mypageFeeds.Category}</p>
          <p>{mypageFeeds.Challenge_Comment}</p>
          <p>진행률: {progress}%</p>
          <img
            src={progressImages[progress / 25]}
            alt={`${progress}%`}
            className="w-12 h-12 -ml-2"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
