'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import  browserClient  from '../util/supabase/client';
import { AuthResponse } from '@supabase/supabase-js';
import Label from './Label';

type AuthType = 'signup' | 'login';

interface AuthFormProps {
    type: AuthType;
}

const AuthForm = ({ type }: AuthFormProps) => {
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

        if (type == 'signup') {
            authResponse = await browserClient.auth.signUp({ email, password });
        } else {
            authResponse = await browserClient.auth.signInWithPassword({ email, password });
        }

        const { error } = authResponse;

        if (error) {
            setError(error.message);
        } else {
            if (type === 'signup') {
                setMessage('회원가입 성공! 확인 이메일을 확인해주세요.');
                router.push(`/signup/${email}/AdditionalInfo`);
            } else {
                setMessage('로그인 성공! 메인페이지로 이동합니다.');
                router.push('/');
            }
        }

        setLoading(false);
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
                disabled={loading}
                className={`p-3 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
            >
                {loading ? '처리 중...' : type === 'signup' ? '가입하기' : '로그인'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {message && <p className="text-green-500 mt-4">{message}</p>}
        </form>
    );
};

export default AuthForm;
