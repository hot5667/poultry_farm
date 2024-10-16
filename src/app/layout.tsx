import type { Metadata } from 'next';
import ReactQueryProvider from '../util/ReactQueryProvider';
import './globals.css';
import NavLink from '../components/NavLink';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-black text-2xl font-bold">양계장</h1>
        </div>
        <ul className="flex items-center space-x-8">
          <NavLink href="/homepage">홈</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/">작성해주세요</NavLink>
          <li className="nav-link">|</li>
          <NavLink href="/">작성해주세요</NavLink>
          <li className="nav-link">|</li>
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
