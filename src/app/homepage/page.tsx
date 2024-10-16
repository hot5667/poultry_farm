// pages/homepage/page.tsx
'use client';
import React from 'react';
import DdayList from './_component/D-Day';
import Memo from './_component/Memo';
import FocusOn from './_component/FocusOn';

import DdayController from './_component/DdayController';
import Timer from './_component/timer';

const HomePage = () => {
  return (
    <DdayController>
      {({ selectedDdayId, ddayTimes, handleSelectDday, handleTimeUpdate }) => (
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
                handleSelectDday={handleSelectDday} // handleSelectDday 함수를 전달
                onTimeUpdate={handleTimeUpdate}
              />
              <FocusOn />
            </div>
            <div className="w-1/4 flex items-start justify-end mt-10">
              <Memo />
            </div>
          </div>
        </div>
      )}
    </DdayController>
  );
};

export default HomePage;
