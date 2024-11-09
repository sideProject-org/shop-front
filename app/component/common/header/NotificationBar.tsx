import React from "react";

interface NotificationBarProps {
  message: string;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message }) => (
  <div className="font-bold self-stretch px-24 py-2.5 w-full leading-snug bg-slate-950  min-h-[40px] text-slate-50 max-md:px-5 max-md:max-w-full">
    {message}
  </div>
);

export default NotificationBar;
