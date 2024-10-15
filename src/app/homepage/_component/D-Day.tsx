'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface DdayItem {
  id: string;
  title: string;
  dday: number;
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
      Start_Date: new Date().toISOString(), // 시작 날짜를 현재 날짜로 설정합니다.
      End_Date: date, // 사용자가 입력한 종료 날짜
      Accumulated_Time: 0, // 누적 시간 초기값 설정
      User_ID: user.id, // 현재 사용자 ID 추가
    };

    // Supabase에 새로운 D-day 데이터 추가
    const { data, error } = await supabase
      .from('Challenge')
      .insert(newDday)
      .select();

    if (error) {
      console.error('D-day 추가에 실패했습니다:', error.message);
      return;
    }
    if (data && Array.isArray(data) && data.length > 0) {
      console.log('추가된 데이터:', data);

      const newItem = {
        id: data[0].Challenge_ID, // 데이터베이스에서 반환된 ID 사용
        title: data[0].Title,
        dday: calculateDday(data[0].End_Date),
      };

      setDdayList((prevList) => [...prevList, newItem]);
      onSelectDday(data[0].Challenge_ID); // 추가된 D-day를 선택 상태로 업데이트
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
      .eq('User_ID', user.id); // 현재 사용자 ID에 해당하는 데이터만 가져오기

    if (error) {
      console.error(
        'Challenge 데이터를 불러오는 데 실패했습니다:',
        error.message
      );
      return;
    }

    if (data) {
      console.log('가져온 Challenge 데이터:', data);

      const formattedData = data.map((item: any) => ({
        id: item.Challenge_ID,
        title: item.Title,
        dday: calculateDday(item.End_Date),
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
              누적 시간: {formatTime(ddayTimes[item.id] || 0)}
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
