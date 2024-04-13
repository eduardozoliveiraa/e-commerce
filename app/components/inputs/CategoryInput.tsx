"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  Icon: IconType | ReactNode;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500
      transition cursor-pointer ${
        selected ? "border-slate-500" : "border-slate-200"
      }`}
    >
      {typeof Icon === "function" ? (
        <Icon className="mt-0.5 mr-1" size={15} />
      ) : (
        <span className="mt-0.5 mr-1">{Icon}</span>
      )}
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
