import { Challenge } from '@/type/challenge';

export const progressImages = [
  '/assets/0.png', // 0% 이미지
  '/assets/25.png', // 25% 이미지
  '/assets/50.png', // 50% 이미지
  '/assets/75.png', // 75% 이미지
  '/assets/100.png', // 100% 이미지
];

// 진행률에 따라 이미지를 렌더링하는 함수
export const renderProgressImages = (progress: number) => {
  const imageCount = Math.floor(progress / 25) + 1; // 0%와 현재 진행률 이미지를 포함
  return (
    <div className="flex gap-2">
      {Array.from({ length: imageCount }, (_, index) => (
        <img
          key={index}
          src={progressImages[index * 1]} // index에 따라 이미지 소스 결정
          alt={`${index * 25}%`}
          className="w-12 h-12 -ml-1 mt-3"
        />
      ))}
    </div>
  );
};

// 날짜를 초기화하는 함수
const resetTimeToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정
  return newDate;
};

// 진행률 계산
export const calculateProgress = (challengeData: Challenge) => {
  const start = resetTimeToMidnight(new Date(challengeData.Start_Date));
  const end = resetTimeToMidnight(new Date(challengeData.End_Date));
  const today = resetTimeToMidnight(new Date());

  // 전체 기간 계산
  const totalDuration = end.getTime() - start.getTime();
  const totalDays = Math.round(totalDuration / (1000 * 60 * 60 * 24)) + 1; // 전체 일수 (+1)로 반올림

  // 챌린지가 시작되기 전인 경우
  const comingChallenge = today.getTime() - start.getTime();
  if (comingChallenge < 0) {
    // console.log('챌린지가 시작되지 않았습니다.');
    return 0;
  }

  // 진행 기간 계산
  const progressDuration =
    Math.min(today.getTime(), end.getTime()) - start.getTime();
  const progressDays = Math.round(progressDuration / (1000 * 60 * 60 * 24)) + 1; // 진행 일수 (+1)로 반올림

  // const daysLeft = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));

  // 계산된 진행률
  const calculatedProgress = (progressDays / totalDays) * 100;

  // 0%, 25%, 50%, 75%, 100%으로 구분하여 반환
  if (calculatedProgress < 25) return 0;
  if (calculatedProgress < 50) return 25;
  if (calculatedProgress < 75) return 50;
  if (calculatedProgress < 100) return 75;
  return 100;
};
