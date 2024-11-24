import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { useApiClient } from "@/context/useApiClient";

interface CommentSectionProps {
  id: string | undefined;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
  const { requestWithToken } = useApiClient();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const currentUserEmail = localStorage.getItem("email");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchComments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인 정보가 없습니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      const response = await requestWithToken(
        `${apiUrl}/global/notices/${id}/notice_comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("댓글 목록을 불러오는 데 실패했습니다.");
      }

      const data = await response.json();
      setComments(data.data); // 댓글 데이터를 상태에 저장
      console.log(data.data);
    } catch (error) {
      console.log("댓글 목록 불러오기 실패:", error);
      // setComments([]);
      // alert("댓글 목록을 불러오는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // 댓글 작성 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 정보가 없습니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    console.log("accessToken:", accessToken);
    try {
      const response = await fetch(
        `${apiUrl}/members/common/notice-comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }

      const data = await response.json();
      setComments((prevComments) => [
        ...prevComments,
        { id: data.id, author: "현재 사용자", content: newComment },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section>
      <h2 className="px-4 pt-5 pb-3 w-full text-2xl font-bold leading-none whitespace-nowrap text-neutral-900 max-md:max-w-full">
        댓글
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2.5 items-center px-4 leading-snug"
      >
        <input
          type="text"
          className="outline-none overflow-hidden flex-1 shrink self-stretch px-4 py-2 my-auto bg-gray-200 rounded-2xl basis-6 max-md:max-w-full"
          placeholder="댓글 추가"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="overflow-hidden gap-2.5 self-stretch px-7 py-2 my-auto whitespace-nowrap rounded-xl bg-slate-950  text-slate-50 max-md:px-5"
        >
          보내기
        </button>
      </form>

      {/* 댓글 목록 출력 */}
      {comments.length === 0 ? (
        <p className="p-4 text-gray-500">댓글이 없습니다.</p>
      ) : (
        comments.map((comment, idx) => (
          <React.Fragment key={idx}>
            <CommentItem
              author={comment.member?.nickName}
              content={comment.comment}
            />
            {currentUserEmail === comment.member.email && <button>수정</button>}
          </React.Fragment>
        ))
      )}
    </section>
  );
};

export default CommentSection;
