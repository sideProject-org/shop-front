import React from "react";

interface CommentItemProps {
  author: string;
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content }) => {
  return (
    <article className="flex flex-wrap gap-3 p-4 w-full text-sm text-neutral-900 max-md:max-w-full">
      <div className="flex shrink-0 self-start w-10 h-10 rounded-3xl bg-stone-300" />
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-wrap gap-3 items-start w-full font-bold max-md:max-w-full">
          <div className="">{author}</div>
          <div className="" />
        </div>
        <div className="whitespace-nowrap w-[52px]">{content}</div>
      </div>
    </article>
  );
};

export default CommentItem;
