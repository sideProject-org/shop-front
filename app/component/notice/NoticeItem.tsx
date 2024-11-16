import React from "react";
import CommentIcon from "@/assets/icons/comment.svg";
import ViewIcon from "@/assets/icons/view.svg";

interface NoticeItemProps {
  content: string;
  date: string;
  views: number;
  comments: number;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  content,
  date,
  views,
  comments,
}) => {
  return (
    <article className="flex flex-col py-5 pl-4 w-full">
      <div className="flex flex-wrap gap-10 justify-between items-start w-full">
        <h3 className="overflow-hidden leading-snug text-ellipsis text-neutral-900">
          {content}
        </h3>
        <time className="text-sm text-center whitespace-nowrap text-neutral-500">
          {date}
        </time>
      </div>
      <div className="flex justify-between items-end mt-4 w-full text-sm whitespace-nowrap text-neutral-500">
        <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-2.5 items-center w-full basis-0 ">
          <div className="flex gap-1.5 items-center self-stretch my-auto">
            <ViewIcon width={24} height={24} className="aspect-square" />
            <span className="self-stretch my-auto">{views}</span>
          </div>
          <div className="flex gap-1.5 items-center self-stretch my-auto ">
            <CommentIcon width={20} height={20} className="aspect-square" />
            <span className="self-stretch my-auto">{comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NoticeItem;
