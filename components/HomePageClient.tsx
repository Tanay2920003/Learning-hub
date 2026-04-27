"use client";

import { Search, Sparkles, BookOpen, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PathCard } from "@/components/PathCard";
import { TypewriterEffect } from "@/components/TypewriterEffect";
import type { LearningPathSummary } from "@/lib/learning-paths";

export function HomePageClient({ learningPaths }: { learningPaths: LearningPathSummary[] }) {
  const openGlobalSearch = () => {
    window.dispatchEvent(new CustomEvent("global-search:open"));
  };

  return (
    <div className="min-h-screen bg-background selection:bg-violet-500/30">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-bg-grid pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating orbs */}
          <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -top-16 right-1/4 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-emerald-500/6 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-violet-300 mb-8 backdrop-blur-sm gap-2">
                <span className="live-dot flex h-2 w-2 rounded-full bg-emerald-400" />
                Open Source · Premium Resources Directory
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
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

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-light px-2 leading-relaxed">
                Discover roadmaps, tools, learning resources, and community-built projects in one
                <span className="text-slate-300 font-medium"> open-source </span>
                place designed to help you keep growing.
              </p>

              {/* Search button */}
              <button
                type="button"
                onClick={openGlobalSearch}
                className="group relative flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3.5 text-left transition-all hover:border-violet-500/30 hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 backdrop-blur-md"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-violet-600/5 via-transparent to-cyan-600/5" />

                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Search className="h-4 w-4 text-violet-400 transition-colors group-hover:text-violet-300" />
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="truncate text-sm text-slate-300 sm:text-base">Search for various paths...</div>
                  <div className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                    Categories, articles, playlists, and quick suggestions
                  </div>
                </div>
                <span className="relative hidden items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500 md:inline-flex">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  Ctrl K
                </span>
              </button>

              {/* Stats row */}
              <div className="mt-12 flex items-center gap-6 sm:gap-8 text-center">
                {[
                  { icon: BookOpen, label: "Learning Paths", value: `${learningPaths.length}+`, color: "text-violet-400" },
                  { icon: Zap, label: "Free Resources", value: "100%", color: "text-cyan-400" },
                  { icon: Sparkles, label: "Open Source", value: "Always", color: "text-emerald-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className={`flex items-center gap-1.5 text-xl sm:text-2xl font-bold ${color}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      {value}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="container mx-auto px-4 pb-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">Browse Paths</h2>
              <p className="text-sm text-slate-500 mt-0.5">Choose your learning adventure</p>
            </div>
            <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            <span className="text-xs text-slate-600 font-medium uppercase tracking-widest">{learningPaths.length} paths</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {learningPaths.map((path) => (
              <PathCard key={path.slug} {...path} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
