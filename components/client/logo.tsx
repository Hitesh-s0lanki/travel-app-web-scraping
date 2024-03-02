import { Avatar } from "@nextui-org/react";
import { Architects_Daughter } from "next/font/google";

const ArchitectsDaughter = Architects_Daughter({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <div className="flex gap-3 items-center justify-center">
      <Avatar src="/logo.png" className=" h-14 w-14" />
      <p className={`text-white ${ArchitectsDaughter.className} text-2xl`}>
        Travel.com
      </p>
    </div>
  );
};

export default Logo;
