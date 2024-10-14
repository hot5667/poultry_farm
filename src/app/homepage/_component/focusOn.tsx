import React, { useState } from 'react';

const FocusOn = () => {
  const [task, setTask] = useState('');
  const [submittedTask, setSubmittedTask] = useState<string | null>(null);

  // 엔터
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedTask(task);
      setTask('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="mb-2 text-2xl text-gray-500">
        (닉네임)님, 오늘 가장 중요한 일은 뭔가요?
      </h1>

      {!submittedTask && (
        <input
          className="border-b p-2 w-64 text-center outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}

      {submittedTask && (
        <div>
          <p className="text-4xl font-semibold">{submittedTask}</p>
        </div>
      )}
    </div>
  );
};

export default FocusOn;

// 명언 추가
