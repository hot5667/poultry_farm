'use client';
import React, { useState } from 'react';

import DdayList from './_component/D-Day';

import Memo from './_component/Memo';
import Timer from './_component/Timer';
import FocusOn from './_component/FocusOn';

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
          <Memo />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

//페이지에는 css만 남기도록 수정하기!
// 수정삭제는 디테일 페이지로 넘어가도록!
// 오늘 목데이터 만들어서 명언 랜덤 설정까지 하기!!
