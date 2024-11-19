"use client";
// 고려 후 다른 상태관리 라이브러리로 변경할 예정
import Header from "./component/common/header/Header";
import { AuthProvider } from "./context/AuthProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Header
            notificationMessage={
              "오전 4:00~ 7:00 사이에 서버 점검이 있을 예정입니다."
            }
          />
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
