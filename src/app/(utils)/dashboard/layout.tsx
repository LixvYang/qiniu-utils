"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronRightIcon, CircleUser, CircleX, Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import SideBar from "@/app/components/sidebar";
import ThemeToggle from "@/app/components/ThemeToggle";

import Link from "next/link";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

import { linkConfig } from "@/app/components/sidebar";

interface LayoutProps {
  children: ReactNode; // Define children as ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [showFeedback, setShowFeedback] = useState(true); // 控制反馈卡片的显示状态

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="p-4">
            <SideBar />
          </div>
          <div className="mt-auto p-4">
            {showFeedback && ( // 仅在 showFeedback 为 true 时显示反馈卡片
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="flex items-center justify-between">
                    FeedBack
                    <CircleX
                      className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100"
                      onClick={() => setShowFeedback(false)} // 点击时隐藏反馈卡片
                    />
                  </CardTitle>

                  <CardDescription>
                    Thank you for using our service. We welcome any feedback to
                    improve our offerings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Provide Feedback @yanglixin
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {linkConfig.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card x-chunk="dashboard-02-chunk-0">
                  <CardHeader className="p-2 pt-1 md:p-4">
                    <CardTitle className="flex items-center justify-between">
                      FeedBack
                      <CircleX
                        className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => setShowFeedback(false)} // 点击时隐藏反馈卡片
                      />
                    </CardTitle>
                    <CardDescription>
                      Thank you for using our service. We welcome any feedback
                      to improve our offerings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button size="sm" className="w-full">
                      Provide Feedback @yanglixin
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
