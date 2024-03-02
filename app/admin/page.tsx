"use client";

import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  return <Loading />;
};

export default AdminPage;
