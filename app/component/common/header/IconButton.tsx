import Link from "next/link";
import React from "react";

interface IconButtonProps {
  iconSrc: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const IconButton: React.FC<IconButtonProps> = ({ iconSrc: Icon, href }) => (
  <Link
    href={href}
    className="flex overflow-hidden gap-2 justify-center items-center px-2.5 w-10 h-10 rounded-3xl bg-slate-50 max-w-[480px] min-h-[40px]"
  >
    <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0">
      <Icon className="object-contain flex-1 w-5 aspect-square" />{" "}
    </div>
  </Link>
);

export default IconButton;
