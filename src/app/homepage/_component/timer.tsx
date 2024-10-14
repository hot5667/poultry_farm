'use client';
import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  selectedDdayId: number | null;
  onTimeUpdate: (id: number, time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ selectedDdayId, onTimeUpdate }) => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentDdayId, setCurrentDdayId] = useState<number | null>(null);
  let interval: number | undefined;

  // 타이머 시작/정지
  const toggle = () => {
    setIsActive(!isActive);
  };

  // 타이머 리셋(이전 D-day에 시간 누적)
  const reset = (ddayId: number | null) => {
    if (ddayId !== null) {
      onTimeUpdate(ddayId, time);
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

  // 다른 챌린지 선택시, 타이머 자동누적
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

  //00:00:00으로 변환
  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center m-10 border-2 border-soft rounded-full w-80 h-80 p-10">
      <h1 className="text-5xl font-semibold mt-20">{formatTime(time)}</h1>
      <div className="flex flex-row items-center justify-center mt-20">
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
