"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[var(--brand-purple)] text-white">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Don Richie Logo"
          width={40}
          height={40}
          className="rounded"
        />
        <span className="text-lg font-bold tracking-wide">Don Richie Boutique</span>
      </div>

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        {mounted && (theme === "light" ? <Moon size={18} /> : <Sun size={18} />)}
      </button>
    </nav>
  );
}
