"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <Image src="/404-Illustration.png" alt="404" width={300} height={300} />

      {/* <h1 className="animate-slide-bounce text-6xl text-white">404</h1> */}

      <h1 className="animate-slide-bounce bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-6xl text-transparent">
        404
      </h1>
      <div className="flex max-w-xl flex-col items-center justify-center text-center text-white">
        <h2>This Page is Lost in Space</h2>

        <p>
          You thought this mission to the moon would be a quick six month thing.
          Your neighbor offered to look after your dog. Your high school math
          teacher was impressed. He once said you wouldn’t amount to anything.
          You sure showed him. But now here you are, fifty feet from your
          spaceship with no way to get back. Your dog will be so sad. Your math
          teacher will be so smug. Pretty devastating.
        </p>

        <Button
          onClick={() => (window.location.href = "/")} // 使用 JavaScript 跳转
          variant="default"
        >
          Go Back
        </Button>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-bounce {
          animation:
            slide-in 0.5s ease-out forwards,
            bounce 1s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
