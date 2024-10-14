import React, { useState } from 'react';

const Memo = () => {
  const [memoText, setMemoText] = useState('');
  return (
    <div className=" m-10 bg-gray-100 rounded-lg">
      <h1 className="mb-0 m-3 text-m font-bold ">메모장</h1>
      <textarea
        className="w-full  h-96 p-3 resize-none bg-gray-100 outline-none"
        placeholder="메모를 작성하세요."
        value={memoText}
        spellCheck="false"
        onChange={(e) => setMemoText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Memo;
