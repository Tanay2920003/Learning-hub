"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, BookOpen, Zap, ArrowRight, Star, Users, Flame } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import { CategoryRow, type CategoryConfig } from "@/components/CategoryRow";
import type { LearningPathSummary } from "@/lib/learning-paths";

/* ─── Category definitions ─────────────────────────────────── */
const CATEGORIES: CategoryConfig[] = [
  {
    id: "featured",
    label: "🔥 Trending Now",
    description: "Most visited learning paths this week",
    emoji: "🔥",
    accent: {
      glow: "rgba(251,146,60,0.12)",
      text: "text-orange-400",
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      badge: "bg-orange-500/15 text-orange-300",
      cardHover: "hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10",
      gradFrom: "from-orange-500",
      gradTo: "to-rose-500",
      shadow: "shadow-orange-500/10",
    },
    slugs: ["webdev", "dsa", "ml", "coding-languages"],
  },
  {
    id: "webmobile",
    label: "🌐 Web & Mobile",
    description: "Build modern apps for every platform",
    emoji: "🌐",
    accent: {
      glow: "rgba(6,182,212,0.12)",
      text: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      badge: "bg-cyan-500/15 text-cyan-300",
      cardHover: "hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10",
      gradFrom: "from-cyan-500",
      gradTo: "to-sky-500",
      shadow: "shadow-cyan-500/10",
    },
    slugs: ["webdev", "mobile-app-development"],
  },
  {
    id: "cs",
    label: "💻 CS Fundamentals",
    description: "Core computer science you must know",
    emoji: "💻",
    accent: {
      glow: "rgba(124,58,237,0.12)",
      text: "text-violet-400",
      border: "border-violet-500/30",
      bg: "bg-violet-500/10",
      badge: "bg-violet-500/15 text-violet-300",
      cardHover: "hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10",
      gradFrom: "from-violet-500",
      gradTo: "to-indigo-500",
      shadow: "shadow-violet-500/10",
    },
    slugs: ["dsa", "os", "dbms", "system-design", "coding-languages"],
  },
  {
    id: "aidata",
    label: "🤖 AI & Data",
    description: "Machine learning, deep learning & more",
    emoji: "🤖",
    accent: {
      glow: "rgba(16,185,129,0.12)",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      badge: "bg-emerald-500/15 text-emerald-300",
      cardHover: "hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10",
      gradFrom: "from-emerald-500",
      gradTo: "to-teal-500",
      shadow: "shadow-emerald-500/10",
    },
    slugs: ["ml", "dbms", "system-design"],
  },
  {
    id: "toolscomm",
    label: "🛠️ Tools & Community",
    description: "Utilities, roadmaps & community projects",
    emoji: "🛠️",
    accent: {
      glow: "rgba(244,63,94,0.10)",
      text: "text-rose-400",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      badge: "bg-rose-500/15 text-rose-300",
      cardHover: "hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-500/10",
      gradFrom: "from-rose-500",
      gradTo: "to-pink-500",
      shadow: "shadow-rose-500/10",
    },
    slugs: ["tools", "roadmaps", "github", "community-sites-and-projects", "game-development"],
  },
];

/* ─── Featured Spotlight Card ───────────────────────────────── */
function SpotlightCard({ path, rank }: { path: LearningPathSummary; rank: number }) {
  const gradients = [
    "from-violet-600/30 via-indigo-600/10 to-transparent",
    "from-cyan-600/30 via-sky-600/10 to-transparent",
    "from-emerald-600/30 via-teal-600/10 to-transparent",
  ];
  const borders = ["hover:border-violet-500/50", "hover:border-cyan-500/50", "hover:border-emerald-500/50"];
  const texts = ["text-violet-400", "text-cyan-400", "text-emerald-400"];
  const bars = ["from-violet-500 to-indigo-500", "from-cyan-500 to-sky-500", "from-emerald-500 to-teal-500"];
  const g = rank % 3;

  return (
    <Link href={`/${path.slug}`} className="block">
      <div className={`group relative overflow-hidden rounded-3xl border border-white/6 bg-[#111] cursor-pointer transition-all duration-300 ${borders[g]}`}>
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${bars[g]}`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[g]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10 p-6 flex gap-5 items-start">
          {/* Rank badge */}
          <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/8 bg-white/4 text-xs font-bold ${texts[g]}`}>
            {rank + 1}
          </div>

          {/* Icon */}
          <div className="shrink-0 w-14 h-14 rounded-2xl border border-white/8 bg-white/4 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
            {typeof path.icon === "string" && path.icon.startsWith("http") ? (
              <Image src={path.icon} alt="" width={36} height={36} className="w-9 h-9 object-contain" unoptimized />
            ) : (
              <span className="text-3xl">{path.icon as string}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1.5 leading-tight">{path.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{path.description}</p>
            <div className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${texts[g]}`}>
              <Flame className="w-3 h-3" />
              Start Learning
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export function HomePageClient({ learningPaths }: { learningPaths: LearningPathSummary[] }) {
  const openSearch = () => window.dispatchEvent(new CustomEvent("global-search:open"));

  const spotlightPaths = ["webdev", "dsa", "ml"]
    .map((s) => learningPaths.find((p) => p.slug === s))
    .filter(Boolean) as LearningPathSummary[];

  return (
    <div className="min-h-screen bg-background selection:bg-violet-500/30">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden hero-bg-grid pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="pointer-events-none absolute top-0 right-1/4 h-52 w-52 rounded-full bg-cyan-500/8 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-300 backdrop-blur-sm">
                <span className="live-dot h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                Open Source · Premium Resources Directory
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-5 leading-[1.1]">
              <span className="gradient-text">
                <TypewriterEffect
                  words={["Study", "Build", "Explore", "Create"]}
                  typingSpeed={130}
                  erasingSpeed={70}
                  pauseDuration={1500}
                />
              </span>
              <br />
              <span className="text-white">in Learning Hub</span>
            </h1>

            <p className="text-center text-base sm:text-lg text-slate-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
              Curated roadmaps, playlists, articles & community projects — all free, all open-source.
            </p>

            {/* Search */}
            <button
              type="button"
              onClick={openSearch}
              className="group relative flex w-full max-w-lg mx-auto items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3.5 text-left transition-all hover:border-violet-500/30 hover:bg-white/6 focus:outline-none backdrop-blur-md"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
                <Search className="h-4 w-4 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm text-slate-400 sm:text-base">Search paths, articles, playlists...</div>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] uppercase tracking-widest text-slate-500 md:inline-flex">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Ctrl K
              </span>
            </button>

            {/* Stats */}
            <div className="mt-10 flex justify-center gap-8 sm:gap-12">
              {[
                { icon: BookOpen, label: "Learning Paths", value: `${learningPaths.length}+`, color: "text-violet-400" },
                { icon: Zap, label: "Free Resources", value: "100%", color: "text-cyan-400" },
                { icon: Users, label: "Open Source", value: "Always", color: "text-emerald-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`flex items-center gap-1.5 text-xl sm:text-2xl font-bold ${color}`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {value}
                  </div>
                  <span className="text-xs text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Spotlight ────────────────────────────────── */}
        <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-lg font-bold text-white">Top Picks</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {spotlightPaths.map((path, i) => (
              <SpotlightCard key={path.slug} path={path} rank={i} />
            ))}
          </div>
        </section>

        {/* ── Category Rows ─────────────────────────────── */}
        {CATEGORIES.map((cat) => (
          <CategoryRow key={cat.id} category={cat} paths={learningPaths} featured={cat.id === "featured"} />
        ))}

        <div className="pb-28" />
      </main>
    </div>
  );
}
