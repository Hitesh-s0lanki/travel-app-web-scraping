import { activities } from "@/lib/utils";
import Image from "next/image";

const ActivityIcons = () => {
  return (
    <div className=" w-2/5">
      <ul className="text-white grid grid-cols-5 mt-5">
        {activities.map((activity) => (
          <li
            key={activity.name}
            className="flex items-center justify-center gap-5 flex-col cursor-pointer"
          >
            <div className="p-5 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 ">
              <div className="relative h-12 w-12 ">
                <Image src={activity.icon} fill alt="Activity" />
              </div>
            </div>
            <span className="text-lg font-medium">{activity.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityIcons;
