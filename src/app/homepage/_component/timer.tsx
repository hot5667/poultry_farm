'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface TimerProps {
  selectedDdayId: string | null;
  onTimeUpdate: (id: string, time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ selectedDdayId, onTimeUpdate }) => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentDdayId, setCurrentDdayId] = useState<string | null>(null);
  let interval: number | undefined;

  // 타이머 시작/정지
  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  // Supabase에 누적 시간 업데이트 함수
  const updateAccumulatedTime = async (ddayId: string, addedTime: number) => {
    try {
      const { data, error } = await supabase
        .from('Challenge')
        .select('Accumulated_Time')
        .eq('Challenge_ID', ddayId)
        .single();

      if (error) {
        console.error(
          '현재 누적 시간을 가져오는 데 실패했습니다:',
          error.message
        );
        return;
      }

      const currentAccumulatedTime = parseInt(data?.Accumulated_Time) || 0;
      const newAccumulatedTime = currentAccumulatedTime + addedTime;

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

  // 시간 포맷 변환
  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // 타이머 리셋 및 누적 시간 업데이트
  const resetTimer = async (ddayId: string | null) => {
    /*
      //ddayList 상태관리를 전역 상태관리로 변경
      전역 상태관리에 특정 ddayId의 accumulatedTime 초 더해서 반영
      const [ddayList, setDdayList] = useState<DdayItem[]>([]);
    */
    if (ddayId) {
      onTimeUpdate(ddayId, time);
      await updateAccumulatedTime(ddayId, time);
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
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (selectedDdayId && currentDdayId && selectedDdayId !== currentDdayId) {
      resetTimer(currentDdayId);
    }
    setCurrentDdayId(selectedDdayId);
  }, [selectedDdayId]);

  return (
    <div className="flex flex-col items-center justify-center m-10">
      <h1 className="text-9xl font-semibold mt-20 text-soft">
        {formatTime(time)}
      </h1>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={toggleTimer}
          className="p-2 rounded hover:text-soft transition-colors duration-300"
        >
          {isActive ? 'STOP' : 'START'}
        </button>
        <button
          onClick={() => resetTimer(currentDdayId)}
          className="p-2 rounded hover:text-soft transition-colors duration-300"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default Timer;
