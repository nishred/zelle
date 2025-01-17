import Link from "next/link";

import { House, ArrowLeftRight, Clock9, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Home", href: "/dashboard", icon: <House /> },

  { name: "Transfer", href: "/transfer", icon: <ArrowLeftRight /> },

  { name: "Transactions", href: "/transactions", icon: <Clock9 /> },

  { name: "P2P Transfer", href: "/p2p", icon: <ArrowUpRight /> },
];

const SideBar = () => {
  return (
    <div className="flex flex-col pt-32 gap-4 border-r border-solid border-slate-100 h-full pl-12">
      {links.map((link) => {
        return (
          <Link key={link.href} href={link.href} className="flex gap-2">
            <span>{link.icon}</span>

            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
