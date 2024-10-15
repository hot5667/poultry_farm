import { useRouter } from 'next/router';
import React from 'react';

const AdditionalInfoPage = () => {
     const router = useRouter();
     const { email } = router.query;

     return (
          <div className="flex justify-center items-center h-screen">
              <div className="max-w-md p-6 border border-gray-300 rounded-lg">
                  <h1 className="text-2xl font-bold mb-6">추가 정보 수집</h1>
                  <p>{email}로 로그인 중입니다. 추가 정보를 입력해주세요.</p>
              </div>
          </div>
      );
}

export default AdditionalInfoPage;