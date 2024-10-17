import './globals.css';
import Navbar from '../components/Navbar';
import ReactQueryProvider from '../util/ReactQueryProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
