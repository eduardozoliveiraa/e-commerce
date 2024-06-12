import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { IconType } from "react-icons";
import { useSearchParams } from "next/dist/client/components/navigation";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType | ReactNode;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    if (label == "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2
    hover:text-slate-800 transition cursor-pointer ${
      selected
        ? "border-b-slate-800 text-slate-800"
        : "border-transparent text-slate-500"
    }`}
    >
      {typeof Icon === "function" ? (
        <Icon className="mt-0.5 mr-1" size={15} />
      ) : (
        <span >{Icon}</span>
      )}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
