'use client';
import React, { useState } from 'react';

interface DdayItem {
  id: number;
  title: string;
  dday: number;
}

interface DdayListProps {
  onSelectDday: (id: number) => void;
  selectedDdayId: number | null;
  ddayTimes: { [key: number]: number };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: ddayList.length + 1,
      title,
      dday: calculateDday(date),
    };
    setDdayList([...ddayList, newItem]);
    onSelectDday(newItem.id);
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

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold">Challenge</h1>

      <div className="my-4">
        {ddayList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDday(item.id)}
            className={`flex flex-col items-start justify-between py-2 px-4 rounded-lg mb-2 w-40
              ${
                selectedDdayId === item.id
                  ? 'bg-soft text-black '
                  : 'border border-soft text-black'
              }
            `}
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
            className="border p-2 rounded mr-2"
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
