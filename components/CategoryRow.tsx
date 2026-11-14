"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { LearningPathSummary } from "@/lib/learning-paths";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  emoji: string;
  accent: {
    glow: string;
    text: string;
    border: string;
    bg: string;
    badge: string;
    cardHover: string;
    gradFrom: string;
    gradTo: string;
    shadow: string;
  };
  slugs: string[];
}

interface Props {
  category: CategoryConfig;
  paths: LearningPathSummary[];
  featured?: boolean;
}

function PathMiniCard({
  path,
  accent,
  large,
}: {
  path: LearningPathSummary;
  accent: CategoryConfig["accent"];
  large?: boolean;
}) {
  return (
    <Link href={`/${path.slug}`} className="block flex-shrink-0 group">
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/60 active:scale-[0.98] ${
          large ? "w-72 h-56 sm:w-80 sm:h-60" : "w-60 h-48 sm:w-64 sm:h-52"
        }`}
      >
        {/* Specular hairline top reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Ambient subtle glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 40% 0%, ${accent.glow}, transparent 70%)`,
          }}
        />

        {/* Top: Icon + Title */}
        <div className="relative z-10">
          <div className={`mb-3.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-2 shadow-inner transition-transform duration-300 group-hover:scale-110 ${TRACK_SPECS[path.slug]?.color || "text-[#2997ff]"}`}>
            {getTrackIcon(path.slug, "h-6 w-6")}
          </div>

          <h3 className={`font-semibold tracking-tight text-white transition-colors ${large ? "text-lg" : "text-base"}`}>
            {path.title}
          </h3>

          <p className="mt-1 text-xs text-white/50 leading-relaxed line-clamp-2">
            {path.description}
          </p>
        </div>

        {/* Bottom: Explore action indicator */}
        <div className="relative z-10 flex items-center justify-between pt-2">
          <span className="text-[11px] font-medium text-white/40 transition-colors group-hover:text-white/80">
            Learn path
          </span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white group-hover:text-black">
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CategoryRow({ category, paths, featured }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  const items = paths.filter((p) => category.slugs.includes(p.slug));
  if (items.length === 0) return null;

  return (
    <section className="relative py-8 sm:py-10">
      {/* Subtle section glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-35"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 20% 50%, ${category.accent.glow}, transparent 60%)`,
        }}
      />

      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-8 mb-5 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="text-xl">{category.emoji}</span>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">{category.label}</h2>
            <p className="text-xs text-white/45 mt-0.5 hidden sm:block">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((path, i) => (
            <PathMiniCard
              key={path.slug}
              path={path}
              accent={category.accent}
              large={featured && i === 0}
            />
          ))}
        </div>
      </div>

      {/* Hairline divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 mt-4">
        <div className="h-px w-full bg-white/[0.04]" />
      </div>
    </section>
  );
}
