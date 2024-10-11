import React from 'react';

import FocusOn from './_component/FocusOn';
import DdayList from './_component/dDay';
import Timer from './_component/timer';

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
