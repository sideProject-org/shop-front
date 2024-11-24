"use client";

import { useApiClient } from "@/context/useApiClient";
import CommentSection from "./CommentSection";
import NotificationContent from "./NotificationContent";
import NotificationHeader from "./NotificationHeader";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NotificationDetail = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { requestWithToken } = useApiClient();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();

  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const increaseViewCount = async () => {
    try {
      const response = await requestWithToken(
        `${apiUrl}/global/notices/${id}/view-cnt`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("조회수 증가에 실패했습니다.");
      console.log("조회수 증가 성공");
    } catch (error) {
      console.error("조회수 증가 실패:", error);
    }
  };

  const fetchNoticeDetail = async () => {
    try {
      const response = await requestWithToken(
        `${apiUrl}/global/notices/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      // if (!response.ok) throw new Error("공지사항을 불러오는 데 실패했습니다.");
      const responseData = await response.json();
      setNotification(responseData.data);
    } catch (error) {
      console.log(error);
      // console.error("공지사항 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/notice/edit?id=${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/notices/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) throw new Error("공지사항 삭제에 실패했습니다.");
      alert("공지사항이 삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
      alert("공지사항 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
    increaseViewCount();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!notification) {
    return <div>공지사항 데이터를 불러올 수 없습니다.</div>;
  }

  const { title, content, viewCnt, member } = notification;

  console.log("notification", notification);
  return (
    <article className="flex flex-col bg-white">
      <div className="flex overflow-hidden flex-col px-40 w-full max-md:px-5 max-md:max-w-full pt-8">
        <NotificationHeader
          title={title}
          noticeId={id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          viewCnt={viewCnt}
        />
        <NotificationContent content={content} />
        <CommentSection id={id} />
      </div>
    </article>
  );
};

export default NotificationDetail;
