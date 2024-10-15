'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { AuthResponse } from '@supabase/supabase-js';

type AuthType = 'signup' | 'login';

interface AuthPageProps {
     type: AuthType;
}

const AuthPage = ({ type }: AuthPageProps) => {
     const router = useRouter();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [message, setMessage] = useState<string | null>(null);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          setMessage(null);

          let authResponse: AuthResponse;

          if (type == 'signup') { // 객체로 합치고 타입 의 기반으로 보이도록
               authResponse = await supabase.auth.signUp({ email, password });
          } else {
               authResponse = await supabase.auth.signInWithPassword({ email, password });
          }

          const { error } = authResponse;

          if (error) {
               setError(error.message);
          } else {
               if (type === 'signup') {
                    setMessage('회원가입 성공! 확인 이메일을 확인해주세요.');
               } else {
                    setMessage('로그인 성공! 메인페이지로 이동합니다.');
                    router.push('/');
               }
          }

          setLoading(false);
     }

     return (
          <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg text-center">
               <h1 className="text-2xl font-bold mb-6">
                    {type === 'signup' ? '회원가입 페이지' : '로그인 페이지'}
               </h1>
               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-left">
                         이메일:
                         <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="mt-1 p-2 border border-gray-300 rounded w-full"
                         />
                    </label>
                    <label className="text-left">
                         비밀번호:
                         <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="mt-1 p-2 border border-gray-300 rounded w-full"
                         />
                    </label>
                    <button
                         type="submit"
                         disabled={loading}
                         className={`p-3 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
                    >
                         {loading ? '처리 중...' : type === 'signup' ? '가입하기' : '로그인'}
                    </button>
               </form>
               {error && <p className="text-red-500 mt-4">{error}</p>}
               {message && <p className="text-green-500 mt-4">{message}</p>}
          </div>
     )
}

export default AuthPage;