import { ReactNode } from "react";
import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType | ReactNode;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2
      border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
    >
      {typeof Icon === "function" ? (
        <Icon className="mt-0.5 mr-1" size={15} />
      ) : (
        <span className="mt-0.5 mr-1">{Icon}</span>
      )}

      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
