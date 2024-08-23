"use client";

import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { KeyRound } from "lucide-react";
import Link from "next/link";

export function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
      // className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      // x-chunk="dashboard-02-chunk-1"
      >
        <Link href="/dashboard/qiniu-auth" className="block">
          <Card className="flex h-32 w-32 transform cursor-pointer flex-col items-center justify-center transition-transform hover:scale-105">
            <CardHeader className="flex flex-col items-center">
              <KeyRound className="mb-2 h-12 w-12" />
              <CardTitle className="text-center">Qiniu Auth</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
