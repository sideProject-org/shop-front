import React from "react";
import Logo from "./Logo";
import IconButton from "./IconButton";
import NavItem from "./NavItem";
import NotificationBar from "./NotificationBar";
import CartIcon from "@/assets/icons/cart.svg";
import HeartIcon from "@/assets/icons/wishlist.svg";
import ProfileIcon from "@/assets/icons/profile.svg";

interface HeaderProps {
  notificationMessage: string;
}

const Header: React.FC<HeaderProps> = ({ notificationMessage }) => {
  const navItems = [
    { text: "공지사항", href: "/notice" },
    { text: "전체", href: "/all" },
    { text: "카테고리 1", href: "/category/1" },
    { text: "카테고리 2", href: "/category/2" },
    { text: "카테고리 3", href: "/category/3" },
  ];

  const icons = [
    { icon: CartIcon, href: "/cart" },
    { icon: HeartIcon, href: "/wishlist" },
    { icon: ProfileIcon, href: "/profile" },
  ];

  return (
    <header className="flex flex-col sticky top-0 z-50 bg-white">
      <div className="flex flex-wrap justify-between items-center px-24 py-3 w-full min- max-md:px-5 max-md:max-w-full ">
        <Logo />
        <nav className="flex flex-1 gap-2 items-center justify-end self-stretch my-auto basis-0 max-md:max-w-full">
          {icons.map((icon, index) => (
            <IconButton key={index} iconSrc={icon.icon} href={icon.href} />
          ))}
        </nav>
      </div>
      <nav className="flex flex-wrap gap-8 items-center px-24 py-2.5 w-full leading-snug text-center min-h-[60px] text-slate-950 max-md:px-5 max-md:max-w-full">
        {navItems.map((item, index) => (
          <NavItem key={index} text={item.text} href={item.href} />
        ))}
        <div className="flex shrink-0 self-stretch my-auto h-10 w-[71px]" />
      </nav>
      <NotificationBar message={notificationMessage} />
    </header>
  );
};

export default Header;
