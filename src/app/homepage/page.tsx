import React from 'react';
import Timer from './_component/timer';
import FocusOn from './_component/FocusOn';
import DdayList from './_component/dDay';

const HomePage = () => {
  return (
    <div>
      <h1>homepage</h1>
      <Timer />
      <DdayList />
      <FocusOn />
    </div>
  );
};

export default HomePage;
