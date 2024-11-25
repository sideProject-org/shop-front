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
  const [editingComment, setEditingComment] = useState<{
    commentId: number | null;
    content: string;
  }>({ commentId: null, content: "" });

  const currentUserEmail = localStorage.getItem("email");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchComments = async () => {
    try {
      const response = await requestWithToken(
        `${apiUrl}/global/notices/${id}/notice_comments`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("댓글 목록을 불러오는 데 실패했습니다.");
      }

      const data = await response.json();
      setComments(data.data);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await requestWithToken(
        `${apiUrl}/members/common/notice-comment/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 작성에 실패했습니다.");
      }

      const data = await response.json();
      setComments((prev) => [
        ...prev,
        {
          id: data.id,
          member: { nickName: "현재 사용자", profileImg: "" },
          comment: newComment,
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  const handleEditClick = (commentId: number, content: string) => {
    setEditingComment({ commentId, content });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingComment((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleEditSubmit = async (commentId: number) => {
    try {
      const response = await requestWithToken(
        `${apiUrl}/members/common/notice-comment/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            commentId,
            comment: editingComment.content,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 수정에 실패했습니다.");
      }

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, comment: editingComment.content }
            : comment
        )
      );
      setEditingComment({ commentId: null, content: "" });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      const response = await requestWithToken(
        `${apiUrl}/members/common/notice-comment/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({ commentId }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 삭제에 실패했습니다.");
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <section className="pt-5 pb-3 px-4">
      <span className="w-full text-2xl font-bold leading-none whitespace-nowrap text-neutral-900 max-md:max-w-full">
        댓글
      </span>
      <span className="text-gray-500 font-semibold">{comments.length}</span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2.5 items-center leading-snug my-5"
      >
        <input
          type="text"
          className="outline-none overflow-hidden flex-1 shrink self-stretch px-4 py-2 my-auto bg-white text-gray-500 rounded-2xl basis-6 max-md:max-w-full border-2 border-gray-300"
          placeholder="댓글 추가"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="overflow-hidden gap-2.5 self-stretch px-7 py-2 my-auto whitespace-nowrap rounded-xl bg-black text-white max-md:px-5 font-semibold"
        >
          보내기
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="p-4 text-gray-500">댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <div className="flex items-center gap-3">
              {editingComment.commentId === comment.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={editingComment.content}
                    onChange={handleEditChange}
                    className="outline-none flex-1 px-4 py-2 rounded-2xl border-2 border-gray-300"
                  />
                  <button
                    onClick={() => handleEditSubmit(comment.id)}
                    className="px-[36px] py-2 font-semibold bg-black text-white rounded-xl flex items-center justify-center"
                  >
                    완료
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full mb-5 items-center">
                  <CommentItem
                    author={comment.member?.nickName}
                    content={comment.comment}
                  />
                  {currentUserEmail === comment.member?.email && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEditClick(comment.id, comment.comment)
                        }
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="w-10 h-10 bg-gray-200 text-white rounded-full flex items-center justify-center"
                      >
                        🗑
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </React.Fragment>
        ))
      )}
    </section>
  );
};

export default CommentSection;
