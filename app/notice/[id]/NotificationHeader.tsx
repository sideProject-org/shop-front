import React from "react";

interface NotificationHeaderProps {
  title: string;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center p-4 w-full text-neutral-900 max-md:max-w-full">
      <h1 className="self-stretch my-auto tracking-tight leading-tight font-bold max-md:max-w-full text-2xl">
        {title}
      </h1>
      {/* 관리자만 보기 가능 */}
      {/* <button className="flex overflow-hidden justify-center items-center self-stretch px-4 my-auto leading-snug text-center whitespace-nowrap rounded-xl bg-zinc-100">
        <span className="overflow-hidden self-stretch my-auto text-ellipsis w-[30px]">
          수정
        </span>
      </button> */}
    </header>
  );
};

export default NotificationHeader;
