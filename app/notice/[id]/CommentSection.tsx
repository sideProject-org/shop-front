import React from "react";
import CommentItem from "./CommentItem";

const comments = [
  { id: 1, author: "John Doe", content: "ㅇㅋㅇㅋ" },
  { id: 2, author: "John Doe", content: "ㅇㅋㅇㅋ" },
  { id: 3, author: "John Doe", content: "ㅇㅋㅇㅋ" },
];

const CommentSection: React.FC = () => {
  return (
    <section>
      <h2 className="px-4 pt-5 pb-3 w-full text-2xl font-bold leading-none whitespace-nowrap text-neutral-900 max-md:max-w-full">
        댓글
      </h2>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          content={comment.content}
        />
      ))}
    </section>
  );
};

export default CommentSection;
