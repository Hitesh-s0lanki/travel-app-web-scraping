import Sidebar from "@/components/admin/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full w-full bg-[#f5f5fe] flex">
      <Sidebar />
      <section className="h-full flex-1 flex flex-col overflow-auto">
        <div className="h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3 py-10">
          <h1 className="text-5xl">Scrape Data</h1>
          <p>The scraping engine is powered by Bright Data</p>
        </div>
        {children}
      </section>
    </section>
  );
};

export default DashboardLayout;
