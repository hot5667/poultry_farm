'use client';

import React, { useEffect, useState } from 'react';
import browserClient from '../util/supabase/client';
import DdayController from '../app/homepage/_component/DdayController';
import DdayList from '../app/homepage/_component/D-Day';

import FocusOn from '../app/homepage/_component/focusOn';
import Memo from '../app/homepage/_component/Memo';
import Timer from '@/app/homepage/_component/timer';

export interface DdayItem {
  id: string;
  title: string;
  dday: number;
  accumulatedTime?: number;
}

const MainComponent = () => {
  const [ddayList, setDdayList] = useState<DdayItem[]>([]);

  // D-day 계산
  const calculateDday = (selectedDate: string) => {
    const today = new Date();
    const targetDate = new Date(selectedDate);
    const timeDifference = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  const fetchChallenges = async () => {
    const {
      data: { user },
      error: userError,
    } = await browserClient.auth.getUser();
    if (userError || !user) {
      console.error('User not authenticated');
      return;
    }

    const { data, error } = await browserClient
      .from('Challenge')
      .select('*')
      .eq('User_ID', user.id)
      .order('User_ID', { ascending: true });

    if (error) {
      console.error(
        'Challenge 데이터를 불러오는 데 실패했습니다:',
        error.message
      );
      return;
    }

    if (data) {
      console.log(data);
      const formattedData = data.map((item: any) => ({
        id: item.Challenge_ID,
        title: item.Title,
        dday: calculateDday(item.End_Date),
        accumulatedTime: item.Accumulated_Time,
      }));
      setDdayList(formattedData);
    }
  };
  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <DdayController>
      {({ selectedDdayId, handleSelectDday, handleTimeUpdate }) => (
        <div className="flex justify-center w-full">
          <div className="flex w-full mt-20">
            <div className="w-1/4">
              <DdayList
                onSelectDday={handleSelectDday}
                selectedDdayId={selectedDdayId}
                ddayList={ddayList}
                calculateDday={calculateDday}
                setDdayList={setDdayList}
              />
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <Timer
                selectedDdayId={selectedDdayId}
                handleSelectDday={handleSelectDday}
                onTimeUpdate={handleTimeUpdate}
                fetchChallenges={fetchChallenges}
              />
              <FocusOn />
            </div>
            <div className="w-1/4 flex items-start justify-end">
              <Memo />
            </div>
          </div>
        </div>
      )}
    </DdayController>
  );
};

export default MainComponent;
