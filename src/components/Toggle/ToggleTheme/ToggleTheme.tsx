"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = resolvedTheme ?? theme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="h-12 w-12 cursor-pointer rounded-full border-[1.5px] border-solid border-gray-100 text-2xl hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:hover:bg-red-800"
      aria-pressed={current === "dark"}
      aria-label="Alternar tema"
    >
      {current === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
