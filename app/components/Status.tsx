import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  // icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, /*icon: Icon*/ bg, color }) => {
  return (
    <div
      className={`
    ${bg}
    ${color}    
    inline
    px-1
    rounded
    items-center
    justify-center
    gap-1
    `}
    >
      <div className="inline-flex items-center ">
        {text} {/*<Icon className="mt-0.5" size={15} />*/}
      </div>
    </div>
  );
};

export default Status;
