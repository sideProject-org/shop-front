import Header from "./component/common/header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
