import React from 'react';
import DdayList from './_component/D-Day';
import Timer from './_component/timer';
import FocusOn from './_component/focusOn';

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/4">
        <DdayList />
      </div>
      <div className="w-3/4 flex flex-col items-center">
        <Timer />
        <FocusOn />
      </div>
    </div>
  );
};

export default HomePage;
