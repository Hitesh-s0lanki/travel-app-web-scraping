import ActivityIcon from "@/components/client/activity-icons";
import TourSearchForm from "@/components/client/tour-search-form";

const HomePage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-5">
      <h2 className="w-full text-center text-white text-2xl font-semibold flex justify-center">
        Best tours made for you in mind!
      </h2>
      <h1 className=" text-white font-bold text-6xl">
        Explore the exotic world.
      </h1>
      <TourSearchForm />
      <ActivityIcon />
    </div>
  );
};

export default HomePage;
