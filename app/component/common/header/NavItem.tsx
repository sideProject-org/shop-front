import React from "react";

interface NavItemProps {
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ text }) => (
  <div className="flex flex-col self-stretch my-auto">
    <div className="overflow-hidden self-stretch min-h-[40px] font-bold text-lg">
      {text}
    </div>
  </div>
);

export default NavItem;
