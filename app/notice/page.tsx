import NoticeItem from "@/component/notice/NoticeItem";
import React from "react";

interface Notice {
  id: number;
  content: string;
  date: string;
  views: number;
  comments: number;
}

// 임시 데이터
const notices: Notice[] = [
  {
    id: 1,
    content: "오전 4:00~ 7:00 사이에 서버 점검이 있을 예정입니다.",
    date: "01/01/2023",
    views: 200,
    comments: 200,
  },
  {
    id: 2,
    content: "오전 4:00~ 7:00 사이에 서버 점검이 있을 예정입니다.",
    date: "01/01/2023",
    views: 200,
    comments: 200,
  },
  {
    id: 3,
    content: "오전 4:00~ 7:00 사이에 서버 점검이 있을 예정입니다.",
    date: "01/01/2023",
    views: 200,
    comments: 200,
  },
];

const NoticeBoard: React.FC = () => {
  return (
    <section className="flex flex-col w-full px-44">
      <div className="flex overflow-hidden flex-col items-center pt-12 w-full">
        <div className="flex flex-wrap gap-3 justify-between items-start w-full tracking-tight leading-tight whitespace-nowrap text-neutral-900 pb-4">
          <h2 className="tracking-tight leading-tight text-neutral-900 font-bold text-2xl">
            공지사항
          </h2>
        </div>
        {notices.map((notice, index) => (
          <React.Fragment key={notice.id}>
            <NoticeItem
              content={notice.content}
              date={notice.date}
              views={notice.views}
              comments={notice.comments}
            />
            {index < notices.length - 1 && (
              <div className="my-4 w-full min-h-0 border border-black border-solid" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default NoticeBoard;
