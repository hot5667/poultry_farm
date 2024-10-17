'use client';
import React, { useState, useEffect } from 'react';

const Memo = () => {
  const [memoText, setMemoText] = useState('');

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 메모 로드
  useEffect(() => {
    const savedMemo = localStorage.getItem('memoText');
    if (savedMemo) {
      setMemoText(JSON.parse(savedMemo));
    }
  }, []);

  // 메모가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('memoText', JSON.stringify(memoText));
  }, [memoText]);

  return (
    <div className="m-10 bg-gray-100 rounded-lg">
      <h1 className="mb-0 m-3 text-m font-bold">메모장</h1>
      <textarea
        className="w-full h-96 p-3 resize-none bg-gray-100 outline-none"
        placeholder="메모를 작성하세요."
        value={memoText}
        spellCheck="false"
        onChange={(e) => setMemoText(e.target.value)}
      />
    </div>
  );
};

export default Memo;
