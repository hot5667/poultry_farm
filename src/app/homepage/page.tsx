'use client';
import React, { useState } from 'react';

import DdayList from './_component/D-Day';
import Timer from './_component/timer';
import FocusOn from './_component/focusOn';

const HomePage = () => {
  const [selectedDdayId, setSelectedDdayId] = useState<number | null>(null);
  const [ddayTimes, setDdayTimes] = useState<{ [key: number]: number }>({});

  const handleSelectDday = (id: number) => {
    setSelectedDdayId(id);
  };

  // 누적 시간을 업데이트하는 함수
  const handleTimeUpdate = (id: number, time: number) => {
    setDdayTimes((prevTimes) => ({
      ...prevTimes,
      [id]: (prevTimes[id] || 0) + time,
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
      <div className="w-3/4 flex flex-row items-start justify-between">
        <div className="w-2/4 flex  flex-col items-center">
          <Timer
            selectedDdayId={selectedDdayId}
            onTimeUpdate={handleTimeUpdate}
          />
          <FocusOn />
        </div>
        <div className="w-1/4 flex items-start justify-end">
          {/* <FocusOn /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
