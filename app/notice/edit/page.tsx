"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApiClient } from "@/context/useApiClient";
import Editor from "./Editor";

const NoticeForm: React.FC = () => {
  const { requestWithToken } = useApiClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const searchParams = useSearchParams();
  const noticeId = searchParams.get("id");

  useEffect(() => {
    if (noticeId) {
      const fetchNoticeDetail = async () => {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await requestWithToken(
            `${apiUrl}/global/notices/${noticeId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            throw new Error("공지사항을 불러오는 데 실패했습니다.");
          }

          const responseData = await response.json();
          const { title, content } = responseData.data;
          setTitle(title);
          setContent(content);
        } catch (error) {
          console.error("공지사항 불러오기 실패:", error);
        }
      };

      fetchNoticeDetail();
    }
  }, [noticeId]);

  // 공지사항 제출 처리
  const handleSubmitNotice = async (event: React.FormEvent) => {
    event.preventDefault();

    // content에서 임시 이미지 URL 추출
    const tempImageUrls: string[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.getElementsByTagName("img");

    Array.from(images).forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.includes("/tmp/")) {
        // NEXT_PUBLIC_API_BASE_URL을 제거하고 상대 경로만 추출
        const relativeUrl = src.replace(
          process.env.NEXT_PUBLIC_API_BASE_URL || "",
          ""
        );
        tempImageUrls.push(relativeUrl);
      }
    });

    const noticeData = {
      title,
      content,
      tempImageUrls,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        noticeId
          ? `${apiUrl}/admin/notices/${noticeId}`
          : `${apiUrl}/admin/notices`,
        {
          method: noticeId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(noticeData),
        }
      );

      if (!response.ok) {
        throw new Error(noticeId ? "공지사항 수정 실패" : "공지사항 등록 실패");
      }

      alert(
        noticeId
          ? "공지사항이 성공적으로 수정되었습니다."
          : "공지사항이 성공적으로 등록되었습니다."
      );
    } catch (err) {
      // console.error("공지사항 등록 중 오류 발생:", err);
      // alert("공지사항 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <form
      onSubmit={handleSubmitNotice}
      className="flex overflow-hidden flex-col w-full px-44"
    >
      <h2 className="px-4 py-6 tracking-tight leading-tight text-neutral-900 font-bold text-2xl">
        {noticeId ? "공지사항 수정" : "공지사항 등록"}
      </h2>

      {/* 제목 입력 */}
      <div className="flex flex-wrap gap-4 items-end px-4 py-3 w-full text-base whitespace-nowrap text-neutral-500">
        <input
          id="title"
          type="text"
          className="outline-none overflow-hidden self-stretch px-4 py-4 w-full bg-white rounded-xl border border-solid border-neutral-200 min-h-[56px]"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* CKEditor */}
      <div className="px-4 py-3">
        <Editor
          value={content}
          onChange={(data: React.SetStateAction<string>) => setContent(data)}
        />
      </div>

      {/* 버튼들 */}
      <div className="flex justify-end gap-3 items-center px-4 py-3 w-full">
        <Link
          href={"/notice"}
          className="px-6 py-3 rounded-xl bg-zinc-100 text-neutral-900"
        >
          취소
        </Link>
        <button
          type="submit"
          className="px-6 py-3 text-white rounded-xl bg-zinc-900"
        >
          {noticeId ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
};

export default NoticeForm;
