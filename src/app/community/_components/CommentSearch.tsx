import { SetStateAction, useState } from 'react';
import Button from './Button';
import { searchData } from '@/type/comunity';

const CommentSearch = ({ mySearch, setSearch, refetch }: searchData) => {
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };
  function onClickSearch() {
    refetch();
  }

  return (
    <div>
      <form
        className="flex ju items-center justify-end"
        onSubmit={(e) => {
          e.preventDefault();
          onClickSearch();
        }}
      >
        <input
          className="bg-[#A0D683] border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] p-[6px]"
          type="text"
          value={mySearch}
          onChange={handleSearch}
        />
        <Button type={'submit'} className={'ml-[10px] text-[20px]'}>
          검색하기
        </Button>
      </form>
    </div>
  );
};

export default CommentSearch;
