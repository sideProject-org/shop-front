import React from "react";

interface NotificationContentProps {
  content: string;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
  content,
}) => {
  return (
    <section className="px-4 py-5 w-full text-base text-neutral-900 ">
      {content}
    </section>
  );
};

export default NotificationContent;
