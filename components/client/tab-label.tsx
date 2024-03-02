"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navTab = [
  {
    label: "Tours",
    href: "/",
  },
  {
    label: "Flights",
    href: "/flights",
  },
  {
    label: "Hotels",
    href: "/hotels",
  },
];

const TabLabel = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-5">
      {navTab.map((e) => (
        <Link
          key={e.label}
          href={e.href}
          className={`
            font-semibold text-lg ${
              pathname === e.href ? "text-danger-500" : "text-white"
            }
          `}
        >
          {e.label}
        </Link>
      ))}
    </div>
  );
};

export default TabLabel;
