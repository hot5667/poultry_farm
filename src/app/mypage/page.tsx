import React from 'react';
import Heatmap from './_components/Heatmap';
import Profile from './_components/Profile';

const MyPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-1 place-items-center mt-10 md:mt-16">
        <div className="flex flex-col justify-center items-center">
          <Profile />
        </div>
      </div>

      <div className="md:col-start-2 md:col-span-3 my-auto mt-5 md:mt-10">
        <Heatmap />
      </div>

      {/* feed 카드 */}

      <div className="flex flex-col md:flex-row gap-4"></div>
    </div>
  );
};

export default MyPage;
