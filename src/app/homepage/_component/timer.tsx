'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface TimerProps {
  selectedDdayId: string | null; // UUID로 사용하므로 string 타입
  onTimeUpdate: (id: string, time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ selectedDdayId, onTimeUpdate }) => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentDdayId, setCurrentDdayId] = useState<string | null>(null);
  let interval: number | undefined;

  // 타이머 시작/정지
  const toggle = () => {
    setIsActive(!isActive);
  };

  // Supabase에 누적 시간 업데이트 함수
  const updateAccumulatedTime = async (ddayId: string, addedTime: number) => {
    try {
      // 현재 누적 시간을 가져오기
      const { data, error } = await supabase
        .from('Challenge')
        .select('Accumulated_Time')
        .eq('Challenge_ID', ddayId)
        .single();

      console.log('현재 누적 시간 가져오기 결과:', data, error); // 로그 추가

      if (error) {
        console.error(
          '현재 누적 시간을 가져오는 데 실패했습니다:',
          error.message
        );
        return;
      }

      // 현재 누적 시간을 숫자로 변환
      const currentAccumulatedTime = parseInt(data?.Accumulated_Time) || 0;

      // 새로운 누적 시간 계산
      const newAccumulatedTime = currentAccumulatedTime + addedTime;

      // 새로운 누적 시간 업데이트
      const { error: updateError } = await supabase
        .from('Challenge')
        .update({ Accumulated_Time: newAccumulatedTime })
        .eq('Challenge_ID', ddayId);

      if (updateError) {
        console.error(
          '누적 시간을 업데이트하는 데 실패했습니다:',
          updateError.message
        );
      } else {
        console.log('누적 시간 업데이트 성공');
      }
    } catch (e) {
      console.error('오류 발생:', e);
    }
  };

  // 00:00:00으로 변환
  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // 타이머 리셋(이전 D-day에 시간 누적)
  const reset = async (ddayId: string | null) => {
    if (ddayId !== null) {
      onTimeUpdate(ddayId, time);
      await updateAccumulatedTime(ddayId, time); // Supabase에 누적 시간 업데이트
    }
    setTime(0);
    setIsActive(false);
    clearInterval(interval);
  };

  useEffect(() => {
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // 다른 챌린지 선택 시, 타이머 자동 누적
  useEffect(() => {
    if (
      selectedDdayId !== null &&
      currentDdayId !== null &&
      selectedDdayId !== currentDdayId
    ) {
      reset(currentDdayId);
    }
    setCurrentDdayId(selectedDdayId);
  }, [selectedDdayId]);

  // 00:00:00으로 변환
  // const formatTime = (time: number) => {
  //   const getSeconds = `0${time % 60}`.slice(-2);
  //   const minutes = Math.floor(time / 60);
  //   const getMinutes = `0${minutes % 60}`.slice(-2);
  //   const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  //   return `${getHours}:${getMinutes}:${getSeconds}`;
  // };

  return (
    <div className="flex flex-col items-center justify-center m-10 ">
      <h1 className="text-9xl font-semibold mt-20 text-soft">
        {formatTime(time)}
      </h1>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={toggle}
          className="p-2 rounded hover:text-soft transition-colors duration-300"
        >
          {isActive ? 'STOP' : 'START'}
        </button>
        <button
          onClick={() => reset(currentDdayId)}
          className="p-2 rounded hover:text-soft transition-colors duration-300"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Timer;
