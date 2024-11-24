import React from "react";
import ViewIcon from "@/assets/icons/view.svg";

interface NotificationHeaderProps {
  title: string;
  noticeId: string | undefined;
  onEdit: () => void;
  onDelete: (id: string | undefined) => void;
  viewCnt: string;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title,
  noticeId,
  onEdit,
  onDelete,
  viewCnt,
}) => {
  const currentUserEmail = localStorage.getItem("email");

  return (
    <header className="p-4 w-full text-neutral-900 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center">
        <h1 className="self-stretch my-auto tracking-tight leading-tight font-bold max-md:max-w-full text-4xl">
          {title}
        </h1>
        {currentUserEmail === "administrator" && (
          <div className="flex justify-end gap-3 items-center py-3 font-bold">
            <button
              className="px-6 py-3 rounded-xl bg-zinc-100 text-neutral-900"
              onClick={() => onDelete(noticeId)}
            >
              삭제
            </button>
            <button
              type="button"
              className="px-6 py-3 text-white rounded-xl bg-zinc-900"
              onClick={onEdit}
            >
              수정
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-1.5 items-center self-stretch my-auto mt-4">
        <ViewIcon width={24} height={24} className="aspect-square" />
        <span className="self-stretch my-auto text-gray-500">{viewCnt}</span>
      </div>
      <div className="w-full min-h-0 border-t border-gray-400 my-4" />
    </header>
  );
};

export default NotificationHeader;
