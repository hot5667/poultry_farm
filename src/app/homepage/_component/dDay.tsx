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
    <div>
      <h1 className="text-2xl font-bold">Challenge</h1>

      <div className="my-4">
        {ddayList.map((item, index) => (
          <div key={index}>
            <span className="font-bold">D-{item.dday}</span> {item.title}
          </div>
        ))}
      </div>

      <button
        className="bg-gray-400 p-2 rounded"
        onClick={() => setFormVisible(true)}
      >
        +
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 p-2 text-white rounded">
            저장
          </button>
        </form>
      )}
    </div>
  );
};

export default DdayList;
