import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  return NextResponse.next();
}

// 仅在 /dashboard 路径上运行中间件
export const config = {
  matcher: ["/dashboard", "/"],
};
