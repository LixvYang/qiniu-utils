"use client";

"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "./providers/theme-provider";
import ToastProvider from "./providers/toast-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
