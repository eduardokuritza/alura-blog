"use client";
import { FC, ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
