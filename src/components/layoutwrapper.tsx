"use client";

import { useState } from "react";
import Topbar from "@/components/topbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

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
