"use client"

import React, { useState } from 'react';

// 날짜 객체 타입 정의
interface Day {
  date: number;
  currentMonth: boolean;
}

const MyCalendar: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  // 일정( 날짜, 제목, 내용)을 저장하는 배열!
  const [events, setEvents] = useState<{ date: string; title: string; description: string }[]>([]);
  // 모달 창이 열려있는지 여부를 관리!
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 일정을 추가하려는 날짜를 저장!
  const [selectedDate, setSelectedDate] = useState<string>('');
  // 모달에서 받는 제목
  const [title, setTitle] = useState<string>('');
  // 모달에서 받는 내용
  const [description, setDescription] = useState<string>('');
  const monthNames: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // 달력 데이터 생성 함수
  const generateCalendar = (year: number, month: number): Day[][] => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let dates: Day[] = [];

    // 이전 달의 마지막 날짜
    const prevLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      dates.push({
        date: prevLastDate - i,
        currentMonth: false,
      });
    }

    // 현재 달의 날짜
    for (let date = 1; date <= lastDate; date++) {
      dates.push({
        date,
        currentMonth: true,
      });
    }

    // 다음 달의 날짜
    const nextDays = 35 - dates.length;
    for (let i = 1; i <= nextDays; i++) {
      dates.push({
        date: i,
        currentMonth: false,
      });
    }

    // 주 단위로 분리
    let weeks: Day[][] = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }

    return weeks;
  };

  // 이전 달로 이동
  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 다음 달로 이동
  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 모달 창 열기
  const openModal = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  // 모달 창 닫기
  const closeModal = () => {
    setModalVisible(false);
    setTitle('');
    setDescription('');
  };

  // 일정 저장 (일정을 지정했을때 event상태에 date,title,description을 추가)
  const saveEvent = () => {
    setEvents([...events, { date: selectedDate, title, description }]);
    closeModal();
  };

  const weeks = generateCalendar(currentYear, currentMonth);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          이전
        </button>
        <span className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          다음
        </button>
      </div>

      <table className="table-auto w-full text-center">
        <thead>
          <tr>
            <th className="py-2">일</th>
            <th className="py-2">월</th>
            <th className="py-2">화</th>
            <th className="py-2">수</th>
            <th className="py-2">목</th>
            <th className="py-2">금</th>
            <th className="py-2">토</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, i) => (
                <td
                key={i}
               className={`group border relative px-[5px] py-[1px] h-[150px] w-[200px] align-top text-left ${day.currentMonth ? 'text-black' : 'text-gray-400 opacity-50'}`}
              >
                <div>
                  <span>{day.date}</span>
                  {day.currentMonth && (
                    <button
                     className="hidden absolute top-1 right-1 bg-gray-500 text-white p-1 rounded cursor-pointer group-hover:block"
                      onClick={() => openModal(`${currentYear}-${currentMonth + 1}-${day.date}`)}
                    >
                      +
                    </button>
                  )}
                </div>
                {events
                  .filter(event => event.date === `${currentYear}-${currentMonth + 1}-${day.date}`)
                  .map((event, idx) => (
                    <div key={idx} className="text-sm mt-2 bg-blue-100 p-1 rounded">
                      {event.title}
                    </div>
                  ))}
             </td>
              
              
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 모달 창 */}
      {modalVisible && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
      <h2 className="text-lg mb-4">일정 추가</h2>
      <div>
        <label className="block mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-2">내용</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button onClick={saveEvent} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">저장</button>
        <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">취소</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default MyCalendar;