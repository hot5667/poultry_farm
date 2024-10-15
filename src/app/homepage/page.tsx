'use client';
import React, { useState } from 'react';
import DdayList from './_component/D-Day';
import Memo from './_component/Memo';

import FocusOn from './_component/focusOn';
import Timer from './_component/timer';

const HomePage = () => {
  // 타입을 number에서 string으로 변경
  const [selectedDdayId, setSelectedDdayId] = useState<string | null>(null);
  const [ddayTimes, setDdayTimes] = useState<{ [key: string]: number }>({}); // key 타입도 string으로 변경

  // D-day 선택 핸들러 수정
  const handleSelectDday = (id: string) => {
    setSelectedDdayId(id);
  };

  // 누적 시간을 업데이트하는 함수
  const handleTimeUpdate = (id: string, time: number) => {
    setDdayTimes((prevTimes) => ({
      ...prevTimes,
      [id]: (prevTimes[id] || 0) + time,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/4 mt-10">
        <DdayList
          onSelectDday={handleSelectDday}
          selectedDdayId={selectedDdayId}
          ddayTimes={ddayTimes}
        />
      </div>
      <div className="w-3/4 flex flex-row items-start justify-between mt-10">
        <div className="w-2/4 flex flex-col items-center mt-10">
          <Timer
            selectedDdayId={selectedDdayId}
            onTimeUpdate={handleTimeUpdate}
          />
          <FocusOn />
        </div>
        <div className="w-1/4 flex items-start justify-end mt-10">
          <Memo />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
