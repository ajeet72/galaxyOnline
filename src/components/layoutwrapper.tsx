"use client";

import { useState, useEffect } from "react";
import Topbar from "@/components/topbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);

    // Optional: Listen for changes in system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-black text-white"
            : "bg-gradient-to-br from-amber-50 to-cyan-50 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="mt-16">{children}</main>
        </div>
      </div>
    </div>
  );
}