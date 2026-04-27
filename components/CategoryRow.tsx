"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { LearningPathSummary } from "@/lib/learning-paths";

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  emoji: string;
  /** Tailwind color strings for theming this section */
  accent: {
    glow: string;       // e.g. "rgba(124,58,237,0.12)"
    text: string;       // e.g. "text-violet-400"
    border: string;     // e.g. "border-violet-500/30"
    bg: string;         // e.g. "bg-violet-500/10"
    badge: string;      // e.g. "bg-violet-500/15 text-violet-300"
    cardHover: string;  // e.g. "hover:border-violet-500/40"
    gradFrom: string;
    gradTo: string;
    shadow: string;
  };
  slugs: string[];
}

interface Props {
  category: CategoryConfig;
  paths: LearningPathSummary[];
  featured?: boolean; // first card is larger
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
    <Link href={`/${path.slug}`} className="block flex-shrink-0">
      <div
        className={`group relative overflow-hidden rounded-2xl border border-white/6 bg-[#111] transition-all duration-300 cursor-pointer
          ${accent.cardHover}
          ${large ? "w-72 h-52 sm:w-80 sm:h-56" : "w-56 h-44 sm:w-64 sm:h-48"}
        `}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent.gradFrom} ${accent.gradTo} opacity-50 group-hover:opacity-100 transition-opacity`}
        />

        {/* Ambient glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 30% 0%, ${accent.glow.replace("0.12", "0.18")}, transparent 70%)`,
          }}
        />

        {/* Icon area */}
        <div className="relative z-10 p-5 flex flex-col h-full">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/6 ${accent.bg} mb-4
              transition-transform duration-300 group-hover:scale-110`}
          >
            {typeof path.icon === "string" && path.icon.startsWith("http") ? (
              <Image
                src={path.icon}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                unoptimized
              />
            ) : typeof path.icon === "string" ? (
              <span className="text-2xl leading-none">{path.icon}</span>
            ) : (
              <span className="text-2xl">📁</span>
            )}
          </div>

          <h3 className={`font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug mb-1.5 ${large ? "text-lg" : "text-base"}`}>
            {path.title}
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
            {path.description}
          </p>

          <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${accent.text} opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200`}>
            Explore
            <ArrowRight className="w-3 h-3" />
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
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const items = paths.filter((p) => category.slugs.includes(p.slug));
  if (items.length === 0) return null;

  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 70% 80% at 0% 50%, ${category.accent.glow}, transparent 65%)`,
      }}
    >
      {/* Section header */}
      <div className="px-4 sm:px-8 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.emoji}</span>
          <div>
            <h2 className={`text-lg sm:text-xl font-bold text-white`}>{category.label}</h2>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll buttons — hidden on mobile */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/4 text-slate-400 hover:bg-white/8 hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/4 text-slate-400 hover:bg-white/8 hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-8 pb-3 scrollbar-hide"
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

      {/* Bottom fade divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
