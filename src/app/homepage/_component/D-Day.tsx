'use client';
import React, { useState } from 'react';

interface DdayItem {
  title: string;
  dday: number;
}

const DdayList = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [ddayList, setDdayList] = useState<DdayItem[]>([]);

  // D-day계산
  const calculateDday = (selectedDate: string) => {
    const today = new Date();
    const targetDate = new Date(selectedDate);
    const timeDifference = targetDate.getTime() - today.getTime();
    const dday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dday;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { title, dday: calculateDday(date) };
    setDdayList([...ddayList, newItem]);
    setTitle('');
    setDate('');
    setFormVisible(false);
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold">Challenge</h1>

      <div className="my-4">
        {ddayList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-soft text-white font-bold py-2 px-4 rounded-lg mb-2 w-40"
          >
            <span className="font-bold text-lg">D-{item.dday}</span>
            <span className="font-normal ml-2">{item.title}</span>
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
