import React from "react";

interface CommentItemProps {
  author: string;
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content }) => {
  return (
    <article className="flex flex-col gap-1 w-full text-neutral-900">
      <div className="font-bold text-lg">{author}</div>
      <div className="text-sm mt-2">{content}</div>
    </article>
  );
};

export default CommentItem;
