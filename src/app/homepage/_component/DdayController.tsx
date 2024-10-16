// components/DdayController.tsx
'use client';
import React, { useState } from 'react';

interface DdayControllerProps {
  children: (props: {
    selectedDdayId: string | null;
    ddayTimes: { [key: string]: number };
    handleSelectDday: (id: string) => void;
    handleTimeUpdate: (id: string, time: number) => void;
  }) => React.ReactNode;
}

const DdayController: React.FC<DdayControllerProps> = ({ children }) => {
  const [selectedDdayId, setSelectedDdayId] = useState<string | null>(null);
  const [ddayTimes, setDdayTimes] = useState<{ [key: string]: number }>({});

  const handleSelectDday = (id: string) => {
    setSelectedDdayId(id);
  };

  const handleTimeUpdate = (id: string, time: number) => {
    setDdayTimes((prevTimes) => ({
      ...prevTimes,
      [id]: (prevTimes[id] || 0) + time,
    }));
  };

  return (
    <>
      {children({
        selectedDdayId,
        ddayTimes,
        handleSelectDday,
        handleTimeUpdate,
      })}
    </>
  );
};

export default DdayController;
