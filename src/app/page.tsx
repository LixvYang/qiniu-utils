"use server";

import Link from "next/link";
import { LatestPost } from "@/app/components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "./components/ui/button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from Qiniu Utils" });
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(191,100%,75%)]">Qiniu Utils</span>
          </h1>
          <div className="grid grid-cols-1">
            <div className="flex h-screen items-center justify-center">
              <Link
                className="flex h-16 w-80 max-w-xs flex-col gap-4 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                target="_blank"
                href="/dashboard"
              >
                <span className="text-center text-2xl font-bold">
                  Go to Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

// {
//   /* <div className="flex flex-col items-center gap-2">
//             <p className="text-2xl text-white">
//               {hello ? hello.greeting : "Loading tRPC query..."}
//             </p>
//           </div> */
// }

// {
//   /* <LatestPost /> */
// }
