interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  isRequired = false,
  helperText,
}) => {
  return (
    <div className="flex flex-col w-full whitespace-nowrap mb-8">
      <label className="overflow-hidden">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        className="flex z-10 shrink-0 mt-2.5 border-b border-black h-[31px] w-full outline-none focus:outline-none shadow-none"
        aria-label={label}
      />
      {helperText && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default InputField;
