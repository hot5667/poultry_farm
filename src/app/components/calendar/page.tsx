"use client"

import React, { useEffect, useState } from 'react';
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import browserClient  from '@/util/supabase/client';
import { User } from '@supabase/supabase-js';

// 달력 날짜 객체 타입 지정
interface Day {
  date: number;
  currentMonth: boolean;
}

interface Event {
  Challenge_ID: number;
  Start_Date: string;
  End_Date: string;
  Title: string;
  Memo: string;
  User_ID: number;
}

const MyCalendar = () => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [events, setEvents] = useState<Event[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [Title, setTitle] = useState<string>('');
  const [Memo, setMemo] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null); 

  const monthNames: string[] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // =============================================================================
  // Supabase에서 이벤트 데이터 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await browserClient.from('Challenge').select();
      if (error) {browserClient
        console.error('데이터를 가져오는데 문제가 있나봐용~:', error);
      } else {
        setEvents(data.map((item: any) => ({
          Challenge_ID: item.Challenge_ID,
          Start_Date: item.Start_Date,
          End_Date: item.End_Date,
          Title: item.Title, // 대문자 'Title'
          Memo: item.Memo,   // 대문자 'Memo'
          User_ID: item.User_ID,
        })));
        console.log(data);
      }
    };
    fetchEvents();
  }, []);

  // ==========================================================================
  // 달력 데이터 생성 함수
  const generateCalendar = (year: number, month: number): Day[][] => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let dates: Day[] = [];
    const prevLastDate = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      dates.push({ date: prevLastDate - i, currentMonth: false });
    }
    for (let date = 1; date <= lastDate; date++) {
      dates.push({ date, currentMonth: true });
    }
    const nextDays = 35 - dates.length;
    for (let i = 1; i <= nextDays; i++) {
      dates.push({ date: i, currentMonth: false });
    }
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
  const openModal = (isEdit: boolean = false, eventId: number | null = null) => {
    setModalVisible(true);
    setIsEditing(isEdit);
    setEditingEventId(eventId);

    if (isEdit && eventId !== null) {
      const eventToEdit = events.find(event => event.Challenge_ID === eventId);
      if (eventToEdit) {
        setTitle(eventToEdit.Title);  // 제목
        setMemo(eventToEdit.Memo);   // 설명
        setSelectedRange({
          from: new Date(eventToEdit.Start_Date),   // 시작일
          to: new Date(eventToEdit.End_Date),       // 종료일
        });
      }
    } else {
      setTitle('');
      setMemo('');
      setSelectedRange({ from: undefined, to: undefined });
    }
  };

  // 모달 창 닫기
  const closeModal = () => {
    setModalVisible(false);
    setTitle('');
    setMemo('');
    setSelectedRange({ from: undefined, to: undefined });
    setIsEditing(false);
    setEditingEventId(null);
  };

  // 일정 저장 (수정 또는 추가)
  const saveEvent = async () => {
    if (selectedRange?.from && selectedRange.to) {
      const startDateStr = selectedRange.from.toISOString().split('T')[0];
      const endDate = new Date(selectedRange.to);
      endDate.setDate(endDate.getDate() + 1);  // 하루 추가
      const formattedEndDateStr = endDate.toISOString().split('T')[0];
  
      // 현재 사용자 세션 가져오기
      const { data: sessionData, error: sessionError } = await browserClient.auth.getSession();
      
      if (sessionError || !sessionData?.session) {
        console.error('유저 세션을 가져오는 중 에러 발생:', sessionError);
        return;
      }
  
      const user = sessionData.session.user;
  
      if (!user) {
        console.error('로그인된 유저가 없습니다.');
        return;
      }
  
      if (isEditing && editingEventId !== null) {
        // 기존 일정 수정
        const { error } = await browserClient
          .from('Challenge')
          .update({ Start_Date: startDateStr, End_Date: formattedEndDateStr, Title, Memo })
          .eq('Challenge_ID', editingEventId);
  
        if (error) {
          console.error('일정 수정 중 에러 발생:', error);
        } else {
          setEvents(events.map(event =>
            event.Challenge_ID === editingEventId
              ? { ...event, Start_Date: startDateStr, End_Date: formattedEndDateStr, Title, Memo }
              : event
          ));
        }
      } else {
        // 새 일정 추가
        const { data, error } = await browserClient
          .from('Challenge')
          .insert([{ Start_Date: startDateStr, End_Date: formattedEndDateStr, Title, Memo, User_ID: user.id }])
          .select();
  
        if (error) {
          console.error('일정 추가 중 에러 발생:', error.message);
        } else if (data && data.length > 0) {
          setEvents([...events, { 
            Challenge_ID: data[0].Challenge_ID, 
            Start_Date: startDateStr, 
            End_Date: formattedEndDateStr, 
            Title: data[0].Title, 
            Memo: data[0].Memo, 
            User_ID: data[0].User_ID 
          }]);
        }
      }
  
      closeModal();
    }
  };
  

  // 일정 삭제
  const deleteEvent = async () => {
    if (editingEventId !== null) {
      const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
      if (isConfirmed) {
        const { error } = await browserClient.from('Challenge').delete().eq('Challenge_ID', editingEventId);
        if (error) {
          console.error('일정 삭제 중 에러 발생:', error);
        } else {
          setEvents(events.filter(event => event.Challenge_ID !== editingEventId));
          closeModal();
        }
      }
    }
  };

  // 날짜 범위 안에 있는지 확인하는 함수
  const isDateInRange = (date: Date, startDate: string, endDate: string): boolean => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  };

  const weeks = generateCalendar(currentYear, currentMonth);

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">이전</button>
        <span className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">다음</button>
      </div>

      <table className="w-full text-center table-auto">
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
                <td key={i} className="relative group border px-[5px] py-[1px] h-[150px] w-[200px] align-top text-left">
                  <div>
                    <span>{day.date}</span>
                    {/* 일정 추가 버튼, 마우스 호버 시 표시 */}
                    <button
                      onClick={() => openModal(false)}
                      className="absolute hidden px-4 py-2 text-white bg-blue-500 rounded-md group-hover:block hover:bg-blue-600 top-2 right-2"
                    >
                      +
                    </button>
                  </div>
                  {/* 저장된 일정 표시 */}
                  {events
                    .filter(event => isDateInRange(new Date(currentYear, currentMonth, day.date), event.Start_Date, event.End_Date))
                    .map((event, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => openModal(true, event.Challenge_ID)}
                        className="p-1 mt-2 text-sm bg-blue-100 rounded cursor-pointer"
                      >
                        {event.Title}
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-1/3 p-4 bg-white rounded-md shadow-lg">
            <div className='flex items-center justify-between mb-4'>
              <h2 className="text-lg">{isEditing ? '챌린지 수정' : '챌린지 추가'}</h2>
              {isEditing && (
                <button onClick={deleteEvent} className="px-4 py-2 text-white bg-red-500 rounded-md">삭제</button>
              )}
            </div>
            <div>
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                className="w-full p-2 mb-2 border"
              />
            </div>
            <div>
              <label className="block mb-2">제목</label>
              <input
                type="text"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border"
              />
            </div>
            <div>
              <label className="block mb-2">내용</label>
              <textarea
                value={Memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full p-2 mb-2 border"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button onClick={saveEvent} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">저장</button>
              <button onClick={closeModal} className="px-4 py-2 text-white bg-gray-500 rounded-md">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;