"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Github, Users, Menu, X, PencilLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/70 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500" />

      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden text-slate-400 hover:text-white hover:bg-white/5 sm:size-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-2.5 transition-all hover:opacity-90 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 sm:h-9 sm:w-9">
              <Image src="/logo.svg" alt="Learning Hub logo" width={36} height={36} className="h-8 w-8 object-contain sm:h-9 sm:w-9" priority />
            </div>
            <span className="text-base font-bold tracking-tight sm:text-lg">
              <span className="text-white">Learning</span>
              <span className="ml-1 gradient-text">Hub</span>
            </span>
          </Link>
        </div>

        {/* Right: desktop nav */}
        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          {isDev && (
            <Link href="/edit-data">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-full lg:h-9 lg:px-4 lg:text-sm cursor-pointer gap-1.5"
              >
                <PencilLine className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                Edit Data
              </Button>
            </Link>
          )}

          <Link href="/contributors">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-full lg:h-9 lg:px-4 lg:text-sm cursor-pointer gap-1.5"
            >
              <Users className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              Contributors
            </Button>
          </Link>

          <Link href="https://github.com/Tanay2920003/Learning-hub" target="_blank">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:scale-105 lg:h-9 lg:px-4 lg:text-sm cursor-pointer gap-1.5 border-0"
            >
              <Github className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              Open Source
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-14 flex w-full flex-col gap-2 border-t border-white/5 bg-black/95 px-4 py-4 shadow-2xl backdrop-blur-xl md:hidden sm:top-16">
          {isDev && (
            <Link href="/edit-data" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="h-11 w-full justify-start px-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer gap-2">
                <PencilLine className="h-4 w-4" />
                Edit Data
              </Button>
            </Link>
          )}
          <Link href="/contributors" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="h-11 w-full justify-start px-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer gap-2">
              <Users className="h-4 w-4" />
              Contributors
            </Button>
          </Link>
          <Link href="https://github.com/Tanay2920003/Learning-hub" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="h-11 w-full justify-start px-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white cursor-pointer gap-2 border-0">
              <Github className="h-4 w-4" />
              Open Source
            </Button>
          </Link>
          <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 px-1 text-xs text-slate-600">
            <Sparkles className="h-3 w-3" />
            Press Ctrl+K to search anywhere
          </div>
        </div>
      )}
    </nav>
  );
}
