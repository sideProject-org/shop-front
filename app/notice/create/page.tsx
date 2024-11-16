"use client";
import React, { useState } from "react";
import Image from "next/image";
import CameraIcon from "@/assets/icons/camera.svg";

const NoticeForm: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImages((prev) => [...prev, reader.result as string]);
      }
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    // 이미지 업로드 api 호출
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form className="flex overflow-hidden flex-col w-full px-44">
      <h2 className="px-4 py-6 tracking-tight leading-tight text-neutral-900 font-bold text-2xl">
        공지사항 등록
      </h2>
      <div className="flex flex-wrap gap-4 items-end px-4 py-3 w-full text-base whitespace-nowrap text-neutral-500 ">
        <div className="flex flex-col flex-1 shrink w-full basis-0">
          <label htmlFor="title" className="sr-only">
            제목
          </label>
          <input
            id="title"
            type="text"
            className="outline-none overflow-hidden self-stretch px-4 py-4 w-full bg-white rounded-xl border border-solid border-neutral-200 min-h-[56px]"
            placeholder="제목"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-end px-4 py-3 w-full text-base text-neutral-500">
        <div className="flex flex-col flex-1 shrink w-full basis-0">
          <label htmlFor="content" className="sr-only">
            내용
          </label>
          <textarea
            id="content"
            className="resize-none outline-none overflow-hidden px-4 pt-4 pb-28 w-full bg-white rounded-xl border border-solid border-neutral-200 min-h-[144px] max-md:pb-24"
            placeholder="내용 입력하기"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 items-start px-4 py-5 w-full">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Notice image ${index + 1}`}
            width={200}
            height={200}
            className="object-contain rounded-3xl aspect-square"
          />
        ))}
        <div className="flex overflow-hidden flex-col justify-center items-center px-10 bg-gray-200 rounded-3xl aspect-square w-[200px] max-md:px-5 cursor-pointer">
          <div className="flex overflow-hidden flex-col justify-center items-center px-10 bg-gray-200 rounded-3xl aspect-square w-[200px] max-md:px-5 cursor-pointer">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <CameraIcon
                width={75}
                height={75}
                className="object-contain aspect-square"
              />
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
      </div>

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
