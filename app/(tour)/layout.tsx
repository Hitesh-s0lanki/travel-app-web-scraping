import Footer from "@/components/client/footer";
import Navbar from "@/components/client/navbar";

const TourLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto bg-cover bg-center bg-no-repeat bg-[url('/home/home-bg.png')] justify-start items-center ">
      <main className="h-full w-full flex flex-col justify-start items-center ">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default TourLayout;
