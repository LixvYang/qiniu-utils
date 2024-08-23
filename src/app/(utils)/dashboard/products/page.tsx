"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { linkConfig } from "@/app/components/sidebar";

const Page = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {linkConfig.map(
        (link) =>
          // 过滤掉不需要展示的链接
          link.href !== "/dashboard/products" &&
          link.href !== "/dashboard/analytics" && (
            <Link key={link.href} href={link.href} className="block">
              <Card className="flex h-32 w-full transform cursor-pointer flex-col items-center justify-center transition-transform hover:scale-105">
                <CardHeader className="flex flex-col items-center">
                  <link.icon className="mb-2 h-12 w-12" />
                  <CardTitle className="text-center">{link.label}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ),
      )}
    </div>
  );
};

export default Page;
