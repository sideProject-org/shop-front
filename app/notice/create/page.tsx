"use client";
import React, { useState } from "react";
import CameraIcon from "@/assets/icons/camera.svg";
import CloseIcon from "@/assets/icons/close.svg";

const NoticeForm: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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

      const response = await fetch(`${apiUrl}/admin/notices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(noticeData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("공지사항 등록 실패");
      }

      const responseData = await response.json();
      alert("공지사항이 성공적으로 등록되었습니다.");
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
        공지사항 등록
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

      {/* 내용 입력 */}
      <div className="flex flex-wrap gap-4 items-end px-4 py-3 w-full text-base text-neutral-500">
        <textarea
          id="content"
          className="outline-none overflow-y-auto px-4 pt-4 pb-4 w-full bg-white rounded-xl border border-solid border-neutral-200 max-h-[200px] min-h-[144px]"
          placeholder="내용 입력하기"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 이미지 업로드 */}
      <div className="flex flex-wrap gap-5 items-start px-4 py-5 w-full">
        {images.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={`${baseUrl}${src}`}
              alt={`Notice image ${index + 1}`}
              width={200}
              height={200}
              className="object-contain rounded-3xl aspect-square"
            />
            <button
              type="button"
              onClick={() => handleImageDelete(src)}
              className="absolute top-0 right-0 rounded-full p-2 bg-gray-200 hover:bg-gray-300"
            >
              <CloseIcon width={24} height={24} />
            </button>
          </div>
        ))}

        <div className="flex overflow-hidden flex-col justify-center items-center px-10 bg-gray-200 rounded-3xl aspect-square w-[200px] max-md:px-5 cursor-pointer">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <CameraIcon width={75} height={75} />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex justify-end gap-3 items-center px-4 py-3 w-full">
        <button
          type="button"
          className="px-6 py-3 rounded-xl bg-zinc-100 text-neutral-900"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-6 py-3 text-white rounded-xl bg-zinc-900"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default NoticeForm;
