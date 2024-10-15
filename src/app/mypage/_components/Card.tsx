'use client';
import { User } from '@supabase/supabase-js';
import { getChallengeData } from '@/quries/useGetChallengeQuery';
import { calculateProgress, renderProgressImages } from '../Progress';

interface CardProps {
  user?: User;
}
const Card = ({ user }: CardProps) => {
  // Challenge 테이블 정보 가져오기
  if (!user) return;
  // console.log(user);
  const { data: challengeData, isLoading, isError } = getChallengeData(user.id);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div>Error</div>;

  const progressData = challengeData?.map((data) => ({
    ...data,
    progress: calculateProgress(data),
  }));

  const dDay = (endProgress: string) => {
    const targetDate = endProgress; // 종료일
    const targetDay = new Date(targetDate);
    const today = new Date();
    const gap = targetDay.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  };
  // console.log(challengeData);
  return (
    <div className="w-72 mx-auto">
      <div className="flex flex-row gap-10 justify-center items-center">
        {challengeData && challengeData.length > 0 ? (
          challengeData.map((data) => {
            const progress = calculateProgress(data); // 각 카드마다 개별적으로 진행률 계산
            return (
              <div
                key={data.Challenge_ID}
                className="w-full bg-[#a0d683] rounded-md p-4 mb-2 text-[#908987]"
              >
                <div className="min-w-64 flex flex-row gap-2 items-end">
                  <p className="text-lg font-black">D-{dDay(data.End_Date)}</p>
                  <p>{data.Title}</p>
                </div>
                <p>누적 시간: {data.Accumulated_Time}</p>
                <p>memo: {data.Memo}</p>
                <p>진행률: {progress}%</p>
                {/* <p>시작: {data.Start_Date}</p>
                <p>끝: {data.End_Date}</p> */}
                {renderProgressImages(progress)}{' '}
              </div>
            );
          })
        ) : (
          <>챌린지 정보가 없습니다.</>
        )}
      </div>
    </div>
  );
};

export default Card;
