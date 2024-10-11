'use client';
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  let interval: number | undefined;

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTotalTime((prevTotal) => prevTotal + time);
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

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>누적 시간: {formatTime(totalTime)}</h2>
      <h1>{formatTime(time)}</h1>
      <div className="flex flex-row items-center justify-center">
        <button onClick={toggle}>{isActive ? 'STOP' : 'START'}</button>
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;
