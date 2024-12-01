import React from "react";

interface NotificationContentProps {
  content: string;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
  content,
}) => {
  const processedContent = content.replace(
    /<img([^>]*)src="([^"]*)"([^>]*)>/g,
    (match, before, src, after) => {
      // 이미 전체 URL인 경우 그대로 반환
      if (src.startsWith("http")) {
        return match;
      }
      // 상대 경로인 경우 전체 URL로 변환
      const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${src}`;
      return `<img${before}src="${fullUrl}"${after}>`;
    }
  );

  return (
    <div
      className="px-4 py-6 w-full text-neutral-900 max-md:max-w-full"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default NotificationContent;
