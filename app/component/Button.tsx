import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type = "button",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "overflow-hidden gap-2.5 self-stretch py-4 whitespace-nowrap";
  const variantClasses = {
    primary: "bg-slate-950 text-slate-50",
    secondary: "border border-solid border-zinc-400 text-slate-950",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
