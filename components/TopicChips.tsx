"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Bookmark, Sparkles, Flame } from "lucide-react";
import { getTrackIcon } from "@/components/icons";

export interface TopicChip {
  id: string;
  label: string;
  slug?: string;
  icon?: string;
  isLibrary?: boolean;
}

export const DEFAULT_TOPIC_CHIPS: TopicChip[] = [
  { id: "all", label: "All Curriculum" },
  { id: "trending", label: "Trending" },
  { id: "saved", label: "My Library", isLibrary: true },
  { id: "webdev", label: "Web Dev", slug: "webdev" },
  { id: "mobile-app-development", label: "Mobile Apps", slug: "mobile-app-development" },
  { id: "python", label: "Python", slug: "python" },
  { id: "dsa", label: "DSA & Algorithms", slug: "dsa" },
  { id: "system-design", label: "System Design", slug: "system-design" },
  { id: "ml", label: "Machine Learning", slug: "ml" },
  { id: "dbms", label: "Databases & SQL", slug: "dbms" },
  { id: "os", label: "Operating Systems", slug: "os" },
  { id: "coding-languages", label: "Languages", slug: "coding-languages" },
  { id: "cs-fundamentals", label: "CS Fundamentals", slug: "cs-fundamentals" },
  { id: "cybersecurity", label: "Cybersecurity", slug: "cybersecurity" },
  { id: "devops", label: "Cloud & DevOps", slug: "devops" },
  { id: "data-engineering", label: "Data Engineering", slug: "data-engineering" },
  { id: "blockchain-web3", label: "Blockchain", slug: "blockchain-web3" },
  { id: "game-development", label: "Game Dev", slug: "game-development" },
  { id: "tools", label: "Dev Tools", slug: "tools" },
  { id: "roadmaps", label: "Roadmaps", slug: "roadmaps" },
  { id: "community-sites-and-projects", label: "Community Apps", slug: "community-sites-and-projects" },
  { id: "github", label: "GitHub", slug: "github" },
  { id: "java", label: "Java", slug: "java" },
  { id: "c", label: "C / C++", slug: "c" },
];

interface TopicChipsProps {
  chips?: TopicChip[];
  activeId: string;
  onSelect: (chip: TopicChip) => void;
  savedCount?: number;
}

export function TopicChips({
  chips = DEFAULT_TOPIC_CHIPS,
  activeId,
  onSelect,
  savedCount = 0,
}: TopicChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  const renderChipIcon = (chip: TopicChip, isActive: boolean) => {
    if (chip.id === "all") {
      return <Sparkles className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-black" : "text-white/60"}`} />;
    }
    if (chip.id === "trending") {
      return <Flame className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-black" : "text-[#ff453a]"}`} />;
    }
    if (chip.isLibrary) {
      return (
        <Bookmark
          className={`h-3.5 w-3.5 shrink-0 ${
            isActive ? "fill-black text-black" : "fill-white/40 text-white/70"
          }`}
        />
      );
    }
    if (chip.slug) {
      return (
        <span className={`inline-flex shrink-0 ${isActive ? "text-black" : "text-white/70"}`}>
          {getTrackIcon(chip.slug, "h-3.5 w-3.5")}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full max-w-full">
      {/* Left Scroll Chevron Arrow Button with Gradient Fade */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-4 pl-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/95 to-transparent">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e1e24] text-white hover:bg-[#2b2b34] shadow-md border border-white/10 transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll topics left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Chips Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-1 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {chips.map((chip) => {
          const isActive = chip.id === activeId;

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelect(chip)}
              className={`group flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 outline-none select-none ${
                isActive
                  ? "bg-white text-black shadow-md shadow-white/10"
                  : "border border-white/[0.08] bg-[#141418] text-white/75 hover:border-white/20 hover:bg-[#1e1e24] hover:text-white"
              }`}
            >
              {renderChipIcon(chip, isActive)}
              <span>{chip.label}</span>
              {chip.isLibrary && savedCount > 0 && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isActive ? "bg-black text-white" : "bg-[#2997ff] text-white"
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Chevron Arrow Button with Gradient Fade */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-4 pr-0 bg-gradient-to-l from-[#090a0f] via-[#090a0f]/95 to-transparent">
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e1e24] text-white hover:bg-[#2b2b34] shadow-md border border-white/10 transition-all hover:scale-105 active:scale-95"
            aria-label="Scroll topics right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
