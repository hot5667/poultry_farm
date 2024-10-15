'use client';
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface DdayItem {
  id: string;
  title: string;
  dday: number;
  accumulatedTime?: number;
}

interface DdayListProps {
  onSelectDday: (id: string) => void;
  selectedDdayId: string | null;
  ddayTimes: { [key: string]: number };
}

const DdayList: React.FC<DdayListProps> = ({
  onSelectDday,
  selectedDdayId,
  ddayTimes,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  //ddayList 상태관리를 전역 상태관리로 변경
  const [ddayList, setDdayList] = useState<DdayItem[]>([]);

  // D-day 계산
  const calculateDday = (selectedDate: string) => {
    const today = new Date();
    const targetDate = new Date(selectedDate);
    const timeDifference = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  // Supabase에서 새로운 D-day 항목을 추가하는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not authenticated');
      return;
    }

    const newDday = {
      Title: title,
      Start_Date: new Date().toISOString(),
      End_Date: date,
      Accumulated_Time: 0,
      User_ID: user.id,
    };

    const { data, error } = await supabase
      .from('Challenge')
      .insert(newDday)
      .select();

    if (error) {
      console.error('D-day 추가에 실패했습니다:', error.message);
      return;
    }
    if (data && Array.isArray(data) && data.length > 0) {
      const newItem = {
        id: data[0].Challenge_ID,
        title: data[0].Title,
        dday: calculateDday(data[0].End_Date),
      };

      setDdayList((prevList) => [...prevList, newItem]);
      onSelectDday(data[0].Challenge_ID);
    }

    setTitle('');
    setDate('');
    setFormVisible(false);
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };
  function formatTimeSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  // Supabase에서 Challenge 데이터를 가져오는 함수
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
      .eq('User_ID', user.id);

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
    <div className="m-10">
      <h1 className="text-2xl font-bold">Challenge</h1>

      <div className="my-4">
        {ddayList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDday(item.id)}
            className={`flex flex-col items-start justify-between py-2 px-4 rounded-lg mb-2 w-40 ${
              selectedDdayId === item.id
                ? 'bg-soft text-black '
                : 'border border-soft text-black'
            }`}
          >
            <div>
              <span className="font-bold text-lg">D-{item.dday}</span>
              <span className="font-normal ml-2">{item.title}</span>
            </div>
            <span className="text-sm text-gray-500">
              누적 시간: {formatTimeSeconds(item.accumulatedTime ?? 0)}
            </span>
          </div>
        ))}
      </div>

      <button
        className="bg-gray-300 px-4 py-2 rounded"
        onClick={() => setFormVisible(true)}
      >
        +
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-start"
        >
          <input
            type="text"
            placeholder="목표"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded mr-2 mb-3"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded mr-2 mb-3"
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <button
            type="submit"
            className="p-2 rounded hover:text-soft transition-colors duration-300"
          >
            저장
          </button>
        </form>
      )}
    </div>
  );
};

export default DdayList;
