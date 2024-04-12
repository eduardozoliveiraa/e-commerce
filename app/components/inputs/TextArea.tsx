"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
      peer
      w-full
      p-4
      pt-6
      max-h-[150px]
      min-h-[150px]
      outline-none
      bg-white
      font-light
      border-2
      rouded-md
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed      
      ${errors[id] ? "border-rose-400" : "border-slate-300"}
      ${errors[id] ? "focus:border-rose-400" : "focus: border-slate-300"}
      `}
      />
      <label
        htmlFor={id}
        className={`
       absolute
       cursor-text
       text-md
       duration-300
       transform
       -translate-y-4
       scale-75
       top-4
       z-10
       origin-[0]
       start-2.5
       peer-focus:text-blue-600
       peer-focus:dark:text-blue-500
       peer-placeholder-shown:scale-100
       peer-placeholder-shown:translate-y-1
       peer-focus:-translate-y-4 
    `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
