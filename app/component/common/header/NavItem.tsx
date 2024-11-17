import React from "react";
import Link from "next/link";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, href }) => (
  <Link href={href}>
    <div className="flex flex-col self-stretch my-auto"></div>
    <span className="overflow-hidden self-stretch min-h-[40px] font-bold text-lg">
      {text}
    </span>
  </Link>
);

export default NavItem;
