"use client";
import { useSearchParams } from "next/navigation";
import CommentSection from "./CommentSection";
import NotificationContent from "./NotificationContent";
import NotificationHeader from "./NotificationHeader";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NotificationDetail = () => {
  const params = useSearchParams();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [notification, setNotification] = useState(null);

  const increaseViewCount = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/global/notices/${id}/view-cnt`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("조회수 증가에 실패했습니다.");
      }
      console.log("조회수 증가 성공");
    } catch (error) {
      console.error("조회수 증가 실패:", error);
    }
  };

  const fetchNoticeDetail = async () => {
    try {
      const response = await fetch(`${apiUrl}/global/notices/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("공지사항을 불러오는 데 실패했습니다.");
      }
      const responseData = await response.json();
      console.log("responseData.data", responseData.data);
      setNotification(responseData.data);
    } catch (error) {
      console.error("공지사항 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
    increaseViewCount();
  }, []);

  if (!notification) {
    return <div>Loading...</div>;
  }

  const { title, content, viewCnt, member } = notification;

  return (
    <article className="flex flex-col bg-white">
      <div className="flex overflow-hidden flex-col px-40 w-full max-md:px-5 max-md:max-w-full pt-8">
        <NotificationHeader title={title} />
        <div className="flex flex-wrap gap-5 items-center px-4 w-full text-sm whitespace-nowrap text-neutral-500 max-md:max-w-full">
          <div className="flex gap-1.5 items-center self-stretch my-auto">
            <span className="self-stretch my-auto">조회수 {viewCnt}</span>
          </div>
        </div>
        <NotificationContent content={content} />
        <CommentSection />
      </div>
    </article>
  );
};

export default NotificationDetail;
