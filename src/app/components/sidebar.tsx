"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LineChart, KeyRound, Braces } from "lucide-react";
import React from "react"; // 引入 React

export const linkConfig = [
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/qiniu-auth", label: "Qiniu Auth", icon: KeyRound },
  { href: "/dashboard/json-formatter", label: "Json Formatter", icon: Braces },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div>
      {linkConfig.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname === link.href
                ? "bg-slate-200 text-primary dark:bg-slate-800"
                : "text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
            }`}
          >
            {React.createElement(link.icon, { className: "h-4 w-4" })}{" "}
            {/* 使用 React.createElement 创建图标组件 */}
            {link.label}
            {/* {link.badge && (
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
                {link.badge}
              </span>
            )} */}
          </Link>
        );
      })}
    </div>
  );
}
