'use client';
import { User } from '@supabase/supabase-js';
import { progressImages } from '../progress';
import { MyPageFeed } from '@/type/mypage';
import { getComunityInfo } from '@/quries/useGetComunityQuery';

interface CardProps {
  user?: User;
}
const Card = ({ user }: CardProps) => {
  // feed테이블 정보 가져오기
  const { data: feeds, isLoading, isError } = getComunityInfo();
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div>Error</div>;

  // 디데이 계산
  const calculateDDay = (targetDate: string) => {
    const targetDay = new Date(targetDate);
    const today = new Date();
    const gap = targetDay.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  };

  // 진행률 계산
  const calculateProgress = (mypageFeed: MyPageFeed) => {
    // 시작일과 종료일이 null이 아님을 단언
    const start = new Date(mypageFeed.Challenge_start_progress!);
    const end = new Date(mypageFeed.Challenge_end_progress!);
    const today = new Date();

    // 날짜 유효성 확인
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    // 전체 기간 계산
    const totalDuration = end.getTime() - start.getTime();
    const comingChallenge = today.getTime() - start.getTime();
    if (comingChallenge < 0) return 0;

    // 계산된 진행률
    const progress = Math.min((comingChallenge / totalDuration) * 100, 100);
    if (progress < 25) return 0;
    if (progress < 50) return 25;
    if (progress < 75) return 50;
    if (progress < 100) return 75;
    return 100;
  };

  // user가 작성한 feed 가져오기
  const mypageFeed = feeds?.find((feed) => feed.User_feed_ID === user?.id);
  // console.log(mypageFeed);
  // console.log(feeds);
  // mypageFeeds가 undefined, null이면 return
  if (!mypageFeed) {
    return <></>;
  }
  const progress = calculateProgress(mypageFeed);

  return (
    <div className="w-72 mx-auto">
      {mypageFeed && (
        <div className="bg-[#a0d683] rounded-md p-4 mb-2 text-[#864c3f]">
          {(() => {
            if (!mypageFeed.Challenge_end_progress) return;
            const dDay = calculateDDay(mypageFeed.Challenge_end_progress);
            return <span className="font-bold">D-{dDay}</span>;
          })()}
          <p>카테고리: {mypageFeed.Category}</p>
          <p>{mypageFeed.Challenge_Comment}</p>
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
