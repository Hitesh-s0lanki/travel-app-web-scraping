"use client";

import { NextUIProvider } from "@nextui-org/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider className="h-full w-full">{children}</NextUIProvider>;
};

export default Provider;
