'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import browserClient from '../util/supabase/client';
import { AuthResponse } from '@supabase/supabase-js';
import Label from './Label';
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label
                labelText="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Label
                labelText="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                disabled={isLoading}
                className={`p-3 text-white rounded ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
            >
                {isLoading ? '처리 중...' : type === 'signup' ? '가입하기' : '로그인'}
            </button>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </form>
    );
};

export default AuthForm;
