'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TimerProps {
  selectedDdayId: string | null;
  handleSelectDday: (id: string) => void;
  onTimeUpdate: (id: string, time: number) => void;
  fetchChallenges: () => Promise<void>;
}

const Timer: React.FC<TimerProps> = ({
  selectedDdayId,
  onTimeUpdate,
  fetchChallenges,
}) => {
  const queryClient = useQueryClient();
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentDdayId, setCurrentDdayId] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // 타이머 시작/정지
  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  // Supabase에 누적 시간 업데이트를 처리하는 useMutation
  const mutation = useMutation({
    mutationFn: async ({
      ddayId,
      addedTime,
    }: {
      ddayId: string;
      addedTime: number;
    }) => {
      const { data, error } = await supabase
        .from('Challenge')
        .select('Accumulated_Time')
        .eq('Challenge_ID', ddayId)
        .single();

      if (error) {
        throw new Error('현재 누적 시간을 가져오는 데 실패했습니다');
      }

      const currentAccumulatedTime = parseInt(data?.Accumulated_Time) || 0;
      const newAccumulatedTime = currentAccumulatedTime + addedTime;

      const { error: updateError } = await supabase
        .from('Challenge')
        .update({ Accumulated_Time: newAccumulatedTime })
        .eq('Challenge_ID', ddayId);

      if (updateError) {
        throw new Error('누적 시간을 업데이트하는 데 실패했습니다');
      }
    },
    onSuccess: () => {
      fetchChallenges();
      if (selectedDdayId) {
        queryClient.invalidateQueries({
          queryKey: ['challenge', selectedDdayId],
        });
      }
    },
  });

  // 타이머 리셋 및 누적 시간 업데이트
  const resetTimer = async (ddayId: string | null) => {
    if (ddayId) {
      onTimeUpdate(ddayId, time);
      mutation.mutate({ ddayId, addedTime: time });
    }
    setTime(0);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 타이머 상태 업데이트
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // 선택된 D-day 변경에 따른 상태 업데이트
  useEffect(() => {
    if (selectedDdayId && currentDdayId !== selectedDdayId) {
      if (currentDdayId) {
        resetTimer(currentDdayId);
      }
      setCurrentDdayId(selectedDdayId);

      queryClient.setQueryData(
        ['challenge', selectedDdayId],
        (prevData: any) => {
          return prevData || 0;
        }
      );

      const cachedTime = queryClient.getQueryData<number>([
        'challenge',
        selectedDdayId,
      ]);
      if (cachedTime !== undefined) {
        setTime(cachedTime);
      }
    }
  }, [selectedDdayId, currentDdayId, resetTimer, queryClient]);

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

// 시간 포맷 변환 함수
const formatTime = (time: number) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = Math.floor(time / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

export default Timer;
