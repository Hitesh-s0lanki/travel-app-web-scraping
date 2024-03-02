import Loading from "@/components/loading";
import { Suspense } from "react";

const TripLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default TripLayout;
