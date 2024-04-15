import { ReactNode } from "react";
import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType | ReactNode;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className={`${bg}
     ${color}
     px-1
     rounded
     flex
     items-center
     gap-1`}>
      {typeof Icon === "function" ? (
        <Icon className="mt-0.5 mr-1" size={15} />
      ) : (
        <span className="mt-0.5 mr-1">{Icon}</span>
      )}
      {text}
    </div>
  );
};

export default Status;
