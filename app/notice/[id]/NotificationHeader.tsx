import React from "react";

interface NotificationHeaderProps {
  title: string;
  noticeId: string | undefined;
  onEdit: () => void;
  onDelete: (id: string | undefined) => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title,
  noticeId,
  onEdit,
  onDelete,
}) => {
  const currentUserEmail = localStorage.getItem("email");

  return (
    <header className="flex flex-wrap gap-10 justify-between items-center p-4 w-full text-neutral-900 max-md:max-w-full">
      <h1 className="self-stretch my-auto tracking-tight leading-tight font-bold max-md:max-w-full text-2xl">
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
    </header>
  );
};

export default NotificationHeader;
