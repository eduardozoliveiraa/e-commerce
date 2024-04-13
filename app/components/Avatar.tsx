import { CircleUser } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="Rounded-full"
        height="30"
        width="30"
      />
    );
  }
  return <CircleUser size={26} />;
};

export default Avatar;
