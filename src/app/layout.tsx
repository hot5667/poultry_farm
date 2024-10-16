'use client';
import { useEffect } from 'react';
import ReactQueryProvider from '../util/ReactQueryProvider';
import NavLink from '../components/NavLink';
import { useAuthStore } from '../store/useAuthStore';
import Cookies from 'js-cookie';
import './globals.css';

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      login(); // 쿠키가 있으면 로그인 상태로 전환
    }
  }, [login]);

  const handleLogout = () => {
    Cookies.remove('token'); // 쿠키 삭제
    logout(); // 상태 변경
  };

  return (
    <nav className="fixed z-10 w-full p-4 bg-white shadow-lg ">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black">양계장</h1>
        </div>
        <ul className="flex items-center space-x-8">
          <NavLink href="/homepage">홈</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/detail">캘린더</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/">작성해주세요</NavLink>
          <li className="nav-link">|</li>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="nav-link">
                로그아웃
              </button>
            </>
          ) : (
            <NavLink href="/login">로그인</NavLink>
          )}
          <NavLink href="/mypage">마이페이지</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/">작성해주세요</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
