'use client';

import { useEffect } from 'react';
import NavLink from '../components/NavLink';
import { useAuthStore } from '../store/useAuthStore';
import Cookies from 'js-cookie';
import '../app/globals.css';
import logo from '../../public/assets/logo.png';
import Image from 'next/image';

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get('sb-ipybojcftcgitunzyror-auth-token');
    if (token) {
      login();
    } else {
      logout();
    }
  }, [login, logout]);

  const handleLogout = () => {
    Cookies.remove('sb-ipybojcftcgitunzyror-auth-token');
    logout();
  };

  return (
    <nav className="fixed z-10 w-full p-4 bg-white shadow-lg">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <Image src={logo} width={30} height={30} alt="Logo Image"></Image>
          <h1 className="text-2xl font-bold text-black">양계장</h1>
        </div>
        <ul className="flex items-center space-x-8">
          <NavLink href="/">홈</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/detail">캘린더</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/community">커뮤니티</NavLink>    
          <li className="nav-link">|</li>
          <NavLink href="/mypage">마이페이지</NavLink>
          <li className="nav-link">|</li>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="nav-link">
                로그아웃
              </button>
            </>
          ) : (
            <NavLink href="/signin">로그인</NavLink>
          )}
          <li className="nav-link">|</li>
          <NavLink href="/signup">회원가입</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
