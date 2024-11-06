import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full whitespace-nowrap mb-8">
      <label className="overflow-hidden">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="flex z-10 shrink-0 mt-2.5 border-b border-black h-[31px] w-full outline-none focus:outline-none shadow-none"
        aria-label={label}
      />
    </div>
  );
};

export default InputField;
