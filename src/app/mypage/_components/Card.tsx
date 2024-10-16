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
  const { data: challengeData, isLoading, isError } = getChallengeData(user.id);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div>Error</div>;

  const dDay = (endProgress: string) => {
    const targetDate = endProgress; // 종료일
    const targetDay = new Date(targetDate);
    const today = new Date();
    const gap = targetDay.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="w-80 mx-auto">
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {challengeData && challengeData.length > 0 ? (
          challengeData.map((data, index) => {
            const progress = calculateProgress(data); // 각 카드마다 개별적으로 진행률 계산
            const isEven = index % 2 === 0;
            const backgroundColor = isEven ? 'bg-[#a0d683]' : 'bg-[#d3ee98]';
            return (
              <div
                key={data.Challenge_ID}
                className={`flex flex-col justify-between ${backgroundColor} w-full h-48 rounded-md p-4 mb-2 text-[#823835]`}
              >
                <div className="min-w-64 flex flex-row gap-2 items-end">
                  <p className="text-lg font-black">D-{dDay(data.End_Date)}</p>
                  <p>{data.Title}</p>
                </div>
                <p>누적 시간: {data.Accumulated_Time} hour</p>
                {data.Memo && <p>메모: {data.Memo}</p>}
                <p>진행률: {progress}%</p>
                <div>{renderProgressImages(progress)} </div>
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
