"use client";
import React, { useState, useEffect } from "react";
import NoticeItem from "./NoticeItem";

interface Member {
  id: number;
  email: string;
  nickName: string;
  role: string;
}

interface Notice {
  id: number;
  title: string;
  viewCnt: number;
  member: Member;
}

interface Pageable {
  page: number;
  size: number;
  sort: string;
}

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [pageable, setPageable] = useState<Pageable>({
    page: 0,
    size: 3,
    sort: "desc",
  });
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState<number>(0);

  const fetchNotices = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const queryParams = new URLSearchParams({
      page: pageable.page.toString(),
      size: pageable.size.toString(),
      sort: pageable.sort.toString(),
    }).toString();

    try {
      const response = await fetch(`${apiUrl}/global/notices?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("공지사항을 불러오는 데 실패했습니다.");
      }

      const responseData = await response.json();
      console.log(responseData.data);
      if (responseData.data.content.length === 0) {
        setError("공지사항이 없습니다.");
      } else {
        setNotices(responseData.data.content);
        setTotalElements(responseData.data.totalElements);
        setError(null);
      }
    } catch (error) {
      console.error("공지사항 불러오기 실패:", error);
      setError("공지사항이 존재하지 않습니다.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPageable((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  useEffect(() => {
    fetchNotices();
  }, [pageable]);

  const totalPages = Math.ceil(totalElements / pageable.size);

  return (
    <section className="flex flex-col w-full px-44">
      <div className="flex overflow-hidden flex-col items-center pt-12 w-full">
        <div className="flex flex-wrap gap-3 justify-between items-start w-full tracking-tight leading-tight whitespace-nowrap text-neutral-900 pb-7">
          <h2 className="tracking-tight leading-tight text-neutral-900 font-bold text-2xl">
            공지사항
          </h2>
        </div>

        {error ? (
          <div className="mt-4">{error}</div>
        ) : notices.length === 0 ? (
          <div>공지사항이 없습니다.</div>
        ) : (
          notices.map((notice, index) => (
            <React.Fragment key={notice.id}>
              <NoticeItem
                title={notice.title}
                date={""}
                // date={notice.member.nickName}
                views={notice.viewCnt}
                comments={0}
                id={notice.id}
              />
              {index < notices.length - 1 && (
                <div className="my-4 w-full min-h-0 border border-black border-solid" />
              )}
            </React.Fragment>
          ))
        )}
        {/* 페이지네이션 */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-6 mt-4 font-bold">
          <button
            onClick={() => handlePageChange(pageable.page - 1)}
            disabled={pageable.page === 0}
            className="px-6 py-3 bg-gray-100 rounded-xl disabled:text-gray-300"
          >
            이전
          </button>
          <button
            onClick={() => handlePageChange(pageable.page + 1)}
            disabled={pageable.page + 1 >= totalPages}
            className="px-6 py-3 bg-gray-100  rounded-xl disabled:text-gray-300"
          >
            다음
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
