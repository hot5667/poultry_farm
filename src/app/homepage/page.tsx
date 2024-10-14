'use client';
import React, { useState } from 'react';

import DdayList from './_component/D-Day';
import Timer from './_component/timer';
import FocusOn from './_component/focusOn';

const HomePage = () => {
  const [selectedDdayId, setSelectedDdayId] = useState<number | null>(null);
  const [ddayTimes, setDdayTimes] = useState<{ [key: number]: number }>({});

  const handleSelectDday = (id: number) => {
    setSelectedDdayId(id); // 디데이를 선택하면 해당 ID를 저장
  };

  // 타이머가 종료되면 누적 시간을 업데이트하는 함수
  const handleTimeUpdate = (id: number, time: number) => {
    setDdayTimes((prevTimes) => ({
      ...prevTimes,
      [id]: (prevTimes[id] || 0) + time, // 선택된 D-Day에 누적 시간 추가
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/4">
        <DdayList
          onSelectDday={handleSelectDday}
          selectedDdayId={selectedDdayId}
          ddayTimes={ddayTimes}
        />
      </div>
      <div className="w-3/4 flex flex-col items-center">
        <Timer
          selectedDdayId={selectedDdayId}
          onTimeUpdate={handleTimeUpdate}
        />
        <FocusOn />
      </div>
    </div>
  );
};

export default HomePage;
