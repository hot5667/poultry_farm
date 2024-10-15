import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FocusOn = () => {
  const [task, setTask] = useState('');
  const [submittedTask, setSubmittedTask] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 엔터입력
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedTask(task);
      // setTask('');
      setIsEditing(false);
    }
  };

  // 명언 불러오기
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:4000/quotes');
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    } catch (error) {
      console.error('명언을 불러오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="mb-2 text-xl text-gray-500">
        (닉네임)님, 오늘 가장 중요한 일은 뭔가요?
      </h1>

      {(!submittedTask || isEditing) && (
        <input
          className="border-b p-2 w-64 text-center outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}

      {submittedTask && !isEditing && (
        <div
          onClick={() => {
            setIsEditing(true);
            setTask(submittedTask);
          }}
        >
          <p className="text-4xl font-semibold">{submittedTask}</p>
        </div>
      )}

      {randomQuote && (
        <p className="text-gray-200 text-sm absolute bottom-10 w-full text-center">
          "{randomQuote.quote}" - {randomQuote.author}
        </p>
      )}
    </div>
  );
};

export default FocusOn;
