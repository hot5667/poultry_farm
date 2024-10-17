'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import browserClient from '../util/supabase/client';
import { AuthResponse } from '@supabase/supabase-js';
import { useAuthStore } from '../store/useAuthStore';

type AuthType = 'signup' | 'login';

interface AuthFormProps {
    type: AuthType;
}

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const { login, logout } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        login();

        let authResponse: AuthResponse;

        try {
            if (type === 'signup') {
                authResponse = await browserClient.auth.signUp({ email, password });
            } else {
                authResponse = await browserClient.auth.signInWithPassword({ email, password });
            }

            const { error } = authResponse;

            if (error) {
                setErrorMessage(error.message);
                logout();
            } else {
                if (type === 'signup') {
                    setSuccessMessage('회원가입 성공! 확인 이메일을 확인해주세요.');
                    router.push(`/signup/${email}/AdditionalInfo`);
                } else {
                    setSuccessMessage('로그인 성공! 메인페이지로 이동합니다.');
                    router.push('/');
                }
            }
        } catch (err) {
            setErrorMessage('로그인 중 오류가 발생했습니다.');
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md p-4 mx-auto rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        >
            {/* 로그인/회원가입 타이틀 */}
            <h1 className="text-2xl font-bold text-center mb-4">
                {type === 'signup' ? '회원가입' : '로그인'}
            </h1>

            {/* 인풋 필드 */}
            <div className="rounded-lg overflow-hidden border-2 border-gray-300">
                <div className="relative">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer p-4 w-full bg-transparent focus:outline-none border-b border-gray-300"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-4 top-4 text-gray-500 transition-all ${
                            email ? 'top-1 text-sm text-[#03C75A]' : 'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base'
                        } peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#03C75A]`}
                    >
                        이메일
                    </label>
                </div>
                <div className="relative">
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer p-4 w-full bg-transparent focus:outline-none"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-4 top-4 text-gray-500 transition-all ${
                            password ? 'top-1 text-sm text-[#03C75A]' : 'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base'
                        } peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#03C75A]`}
                    >
                        비밀번호
                    </label>
                </div>
            </div>

            {/* 로그인 버튼 */}
            <button
                type="submit"
                disabled={isLoading}
                className={`p-4 w-full text-white bg-[#03C75A] rounded-lg mt-4 ${
                    isLoading ? 'bg-gray-400' : 'hover:bg-[#00B140]'
                } transition-colors`}
            >
                {isLoading ? '처리 중...' : type === 'signup' ? '가입하기' : '로그인'}
            </button>

            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </form>
    );
};

export default AuthForm;
