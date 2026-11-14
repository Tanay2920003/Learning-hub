"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, Bookmark, Users } from "lucide-react";
import { useSavedCount } from "@/lib/saved-library";
import { LibraryDrawer } from "./LibraryDrawer";

export function YouTubeBottomNav() {
  const pathname = usePathname();
  const savedCount = useSavedCount();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent("global-search:open"));
  };

  const triggerExplore = () => {
    window.dispatchEvent(new CustomEvent("floating-nav:open"));
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-white/10 bg-[#0f0f0f]/95 backdrop-blur-xl md:hidden px-2 shadow-2xl">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            pathname === "/" ? "text-white font-semibold" : "text-white/60 hover:text-white"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Explore / Tracks */}
        <button
          type="button"
          onClick={triggerExplore}
          className="flex flex-col items-center justify-center flex-1 py-1 text-white/60 hover:text-white transition-colors"
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Explore</span>
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={triggerSearch}
          className="flex flex-col items-center justify-center flex-1 py-1 text-white/60 hover:text-white transition-colors"
        >
          <Search className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

        {/* Library / Saved */}
        <button
          type="button"
          onClick={() => setIsLibraryOpen(true)}
          className="relative flex flex-col items-center justify-center flex-1 py-1 text-white/60 hover:text-white transition-colors"
        >
          <div className="relative">
            <Bookmark className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff0000] text-[9px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Library</span>
        </button>

        {/* Contributors */}
        <Link
          href="/contributors"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            pathname === "/contributors" ? "text-white font-semibold" : "text-white/60 hover:text-white"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Team</span>
        </Link>
      </nav>

      <LibraryDrawer
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />
    </>
  );
}
