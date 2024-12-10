import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const baseClasses =
    "overflow-hidden gap-2.5 self-stretch py-4 whitespace-nowrap flex justify-center items-center px-4";
  const variantClasses = {
    primary: "bg-slate-950 text-slate-50",
    secondary: "border border-solid border-zinc-400 text-slate-950",
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? disabledClasses : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="loader animate-spin w-4 h-4 border-2 border-t-2 border-t-white border-gray-300 rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
