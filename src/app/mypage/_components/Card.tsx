'use client';
import browserClient from '@/util/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

interface CardProps {
  user: User;
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const mypageFeeds = feeds?.find((feed) => feed.User_feed_ID === user.id);
  // 디데이 계산
  const calculateDDay = (targetDate: string) => {
    const targetDay = new Date(targetDate);
    const today = new Date();
    const gap = targetDay.getTime() - today.getTime();
    return Math.ceil(gap / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-1/4 mx-auto">
      {mypageFeeds && (
        <div className="bg-[#a0d683] rounded-md p-4 mb-2 text-[#864c3f]">
          {(() => {
            const dDay = calculateDDay(mypageFeeds.Challenge_end_progress);
            return (
              <span className="font-bold">D-{dDay}</span> // dDay 표시
            );
          })()}
          <p>카테고리: {mypageFeeds.Category}</p>
          <p>{mypageFeeds.Challenge_Comment}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
