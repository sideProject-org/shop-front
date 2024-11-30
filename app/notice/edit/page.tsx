"use client";
import React, { useState, useEffect } from "react";
import CameraIcon from "@/assets/icons/camera.svg";
import CloseIcon from "@/assets/icons/close.svg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApiClient } from "@/context/useApiClient";

const NoticeForm: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { requestWithToken } = useApiClient();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const searchParams = useSearchParams();
  const noticeId = searchParams.get("id"); // Get the notice ID from query params

  useEffect(() => {
    if (noticeId) {
      // If we're editing an existing notice, fetch its details
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
          const { title, content, images } = responseData.data;
          setTitle(title);
          setContent(content);
          setImages(images || []); // Set images if any exist
        } catch (error) {
          console.error("공지사항 불러오기 실패:", error);
        }
      };

      fetchNoticeDetail();
    }
  }, [noticeId]);

  const handleEditorChange = (value: string) => {
    setContent(value); // 상태 업데이트
  };

  // 이미지 업로드 처리
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/admin/notices/images/tmp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const responseData = await response.json();
      const imageUrl = `${responseData.data.savedPath}`;
      setImages((prev) => [...prev, imageUrl]);
    } catch (err) {
      console.error("이미지 업로드 중 오류 발생:", err);
      alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleImageDelete = async (imagePath: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/admin/notices/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ imagePath }),
      });

      if (!response.ok) {
        throw new Error("이미지 삭제 실패");
      }

      // 삭제된 이미지를 배열에서 제거
      setImages((prev) => prev.filter((img) => img !== imagePath));
    } catch (err) {
      console.error("이미지 삭제 중 오류 발생:", err);
      alert("이미지 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // 공지사항 제출 처리
  const handleSubmitNotice = async (event: React.FormEvent) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다. 다시 로그인해 주세요.");
      return;
    }

    const noticeData = {
      title,
      content,
      tempImageUrls: images,
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
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(noticeData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(noticeId ? "공지사항 수정 실패" : "공지사항 등록 실패");
      }

      const responseData = await response.json();
      console.log(responseData);
      alert(
        noticeId
          ? "공지사항이 성공적으로 수정되었습니다."
          : "공지사항이 성공적으로 등록되었습니다."
      );
    } catch (err) {
      console.error("공지사항 등록 중 오류 발생:", err);
      alert("공지사항 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
