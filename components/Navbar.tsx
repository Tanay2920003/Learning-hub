"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Users,
  Menu,
  X,
  PencilLine,
  Search,
  Bookmark,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSavedCount } from "@/lib/saved-library";
import { LibraryDrawer } from "./LibraryDrawer";

export function Navbar() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const savedCount = useSavedCount();
  const [searchInput, setSearchInput] = useState("");
  const isDev = process.env.NODE_ENV === "development";

  const triggerSearch = (query?: string) => {
    window.dispatchEvent(
      new CustomEvent("global-search:open", { detail: { query: query ?? searchInput } }),
    );
  };

  const triggerExplore = () => {
    window.dispatchEvent(new CustomEvent("floating-nav:open"));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(searchInput);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0f0f0f]/95 backdrop-blur-2xl transition-all">
        {/* Specular hairline top reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 max-w-7xl">
          {/* ── Left: Hamburger Menu & YouTube-Style Brand ── */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              onClick={triggerExplore}
              aria-label="Open Explore Guide"
              title="Explore all learning tracks (⌘J)"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-95">
              {/* Learning Hub Logo Badge */}
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="Learning Hub logo"
                  width={36}
                  height={36}
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  priority
                />
              </div>

              {/* Brand Typography */}
              <div className="flex items-baseline">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Learning
                </span>
                <span className="ml-1 text-base sm:text-lg font-bold tracking-tight gradient-text">
                  Hub
                </span>
              </div>
            </Link>
          </div>

          {/* ── Center: YouTube Signature Pill Search Bar ── */}
          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8 items-center justify-center">
            <form onSubmit={handleSearchSubmit} className="flex w-full items-center">
              {/* Input wrapper */}
              <div className="flex flex-1 items-center rounded-l-full bg-[#121212] border border-[#303030] focus-within:border-[#1c62b9] px-4 py-1.5 transition-all shadow-inner">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search 7,200+ courses, roadmaps, articles (⌘K)..."
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
                  onFocus={() => triggerSearch()}
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="p-1 text-white/40 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Search button (attached) */}
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-full bg-[#222222] border border-l-0 border-[#303030] px-5 py-2 text-white/70 hover:bg-[#282828] hover:text-white transition-colors"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Keyboard shortcut indicator */}
              <button
                type="button"
                onClick={() => triggerSearch()}
                title="Quick Search Shortcut (⌘K or /)"
                className="ml-2 hidden lg:flex h-9 w-9 items-center justify-center rounded-full bg-[#222222] border border-[#303030] text-white/60 hover:bg-[#282828] hover:text-white transition-colors"
              >
                <Command className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* ── Right: YouTube Actions & Navigation ────────── */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile search trigger */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => triggerSearch()}
              className="md:hidden size-9 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Saved Library / Watch Later button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLibraryOpen(true)}
              className="relative h-9 rounded-full px-3 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white gap-2"
              title="Your Library / Saved Courses"
            >
              <div className="relative">
                <Bookmark className="h-4 w-4 fill-white/20 text-white" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#a855f7] text-[9px] font-bold text-white">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Library</span>
            </Button>

            {isDev && (
              <Link href="/edit-data" className="hidden lg:inline-flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs text-white/70 hover:bg-white/10 hover:text-white gap-1.5"
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  Edit Data
                </Button>
              </Link>
            )}

            <Link href="/contributors" className="hidden sm:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full px-3 text-xs text-white/70 hover:bg-white/10 hover:text-white gap-1.5"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Team</span>
              </Button>
            </Link>

            <Link
              href="https://github.com/Tanay2920003/Learning-hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="h-8 rounded-full border border-white/15 bg-white text-black hover:bg-white/90 text-xs font-semibold px-3 sm:px-3.5 gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Library Drawer modal */}
      <LibraryDrawer
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />
    </>
  );
}
