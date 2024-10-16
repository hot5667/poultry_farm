'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DdayController from '../app/homepage/_component/DdayController';
import DdayList from '../app/homepage/_component/D-Day';
import Timer from '../app/homepage/_component/timer';
import FocusOn from '../app/homepage/_component/focusOn';
import Memo from '../app/homepage/_component/Memo';

export interface DdayItem {
  id: string;
  title: string;
  dday: number;
  accumulatedTime?: number;
}

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
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not authenticated');
      return;
    }

    const { data, error } = await supabase
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
        <div className="flex justify-center">
          <div className="w-1/4 mt-10">
            <DdayList
              onSelectDday={handleSelectDday}
              selectedDdayId={selectedDdayId}
              ddayList={ddayList}
              calculateDday={calculateDday}
              setDdayList={setDdayList}
            />
          </div>
          <div className="w-3/4 flex flex-row items-start justify-between mt-10">
            <div className="w-2/4 flex flex-col items-center mt-10">
              <Timer
                selectedDdayId={selectedDdayId}
                handleSelectDday={handleSelectDday}
                onTimeUpdate={handleTimeUpdate}
                fetchChallenges={fetchChallenges}
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

export default MainComponent;
