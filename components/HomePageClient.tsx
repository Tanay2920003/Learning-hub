"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  LayoutGrid,
  Rows,
  PlaySquare,
  Sparkles,
  Bookmark,
  Shuffle,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CategoryRow, type CategoryConfig } from "@/components/CategoryRow";
import { PathCard } from "@/components/PathCard";
import { YouTubeCard, type YouTubeCardItem } from "@/components/YouTubeCard";
import { TopicChips, DEFAULT_TOPIC_CHIPS, type TopicChip } from "@/components/TopicChips";
import type { LearningPathSummary, FeaturedCourse } from "@/lib/learning-paths";
import { useSavedItems, useSavedCount } from "@/lib/saved-library";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

/* ─── Topic Group Configurations ────────────────────────────── */
const CATEGORIES: CategoryConfig[] = [
  {
    id: "featured",
    label: "Trending Now",
    description: "Most visited learning paths this week",
    emoji: "🔥",
    accent: {
      glow: "rgba(41,151,255,0.18)",
      text: "text-[#2997ff]",
      border: "border-[#2997ff]/30",
      bg: "bg-[#2997ff]/10",
      badge: "bg-[#2997ff]/15 text-[#2997ff]",
      cardHover: "hover:border-[#2997ff]/40",
      gradFrom: "from-[#2997ff]",
      gradTo: "to-[#64d2ff]",
      shadow: "shadow-blue-900/10",
    },
    slugs: ["webdev", "dsa", "ml", "coding-languages"],
  },
  {
    id: "webmobile",
    label: "Web & Mobile Development",
    description: "Build modern applications for every platform",
    emoji: "🌐",
    accent: {
      glow: "rgba(100,210,255,0.14)",
      text: "text-[#64d2ff]",
      border: "border-[#64d2ff]/30",
      bg: "bg-[#64d2ff]/10",
      badge: "bg-[#64d2ff]/15 text-[#64d2ff]",
      cardHover: "hover:border-[#64d2ff]/40",
      gradFrom: "from-[#64d2ff]",
      gradTo: "to-[#2997ff]",
      shadow: "shadow-[#64d2ff]/10",
    },
    slugs: ["webdev", "mobile-app-development"],
  },
  {
    id: "cs",
    label: "Computer Science Core",
    description: "Fundamental systems, architecture, and algorithms",
    emoji: "💻",
    accent: {
      glow: "rgba(191,90,242,0.14)",
      text: "text-[#bf5af2]",
      border: "border-[#bf5af2]/30",
      bg: "bg-[#bf5af2]/10",
      badge: "bg-[#bf5af2]/15 text-[#bf5af2]",
      cardHover: "hover:border-[#bf5af2]/40",
      gradFrom: "from-[#bf5af2]",
      gradTo: "to-[#5e5ce6]",
      shadow: "shadow-[#bf5af2]/10",
    },
    slugs: ["dsa", "os", "dbms", "system-design", "coding-languages", "cs-fundamentals"],
  },
  {
    id: "aidata",
    label: "AI, ML & Data Systems",
    description: "Machine learning, modern pipelines, and large scale data",
    emoji: "🤖",
    accent: {
      glow: "rgba(48,209,88,0.14)",
      text: "text-[#30d158]",
      border: "border-[#30d158]/30",
      bg: "bg-[#30d158]/10",
      badge: "bg-[#30d158]/15 text-[#30d158]",
      cardHover: "hover:border-[#30d158]/40",
      gradFrom: "from-[#30d158]",
      gradTo: "to-[#63e6e2]",
      shadow: "shadow-[#30d158]/10",
    },
    slugs: ["ml", "dbms", "data-engineering", "system-design"],
  },
  {
    id: "securitycloud",
    label: "Security, Cloud & Web3",
    description: "Cybersecurity, DevOps automation, cloud architecture, and decentralized systems",
    emoji: "🛡️",
    accent: {
      glow: "rgba(255,159,10,0.14)",
      text: "text-[#ff9f0a]",
      border: "border-[#ff9f0a]/30",
      bg: "bg-[#ff9f0a]/10",
      badge: "bg-[#ff9f0a]/15 text-[#ff9f0a]",
      cardHover: "hover:border-[#ff9f0a]/40",
      gradFrom: "from-[#ff9f0a]",
      gradTo: "to-[#ff375f]",
      shadow: "shadow-[#ff9f0a]/10",
    },
    slugs: ["cybersecurity", "devops", "blockchain-web3"],
  },
  {
    id: "toolscomm",
    label: "Community & Developer Utilities",
    description: "Interactive projects, visualizers, and tools",
    emoji: "🛠️",
    accent: {
      glow: "rgba(41,151,255,0.14)",
      text: "text-[#2997ff]",
      border: "border-[#2997ff]/30",
      bg: "bg-[#2997ff]/10",
      badge: "bg-[#2997ff]/15 text-[#2997ff]",
      cardHover: "hover:border-[#2997ff]/40",
      gradFrom: "from-[#2997ff]",
      gradTo: "to-[#bf5af2]",
      shadow: "shadow-[#2997ff]/10",
    },
    slugs: ["community-sites-and-projects", "tools", "roadmaps", "github", "game-development"],
  },
];

/* ─── Bento Spotlight Showcase ─────────────────────────────── */
function YouTubeBentoSpotlight({ paths }: { paths: LearningPathSummary[] }) {
  if (paths.length === 0) return null;

  const featuredTriad = paths.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {featuredTriad.map((path) => {
        const spec = TRACK_SPECS[path.slug];
        const accentColor = spec?.color || "text-[#2997ff]";
        const bgGlow = spec?.bgGlow || "rgba(41,151,255,0.15)";
        const accentBadge = spec?.accentBadge || "bg-[#2997ff]/15 text-[#2997ff] border-[#2997ff]/30";

        return (
          <Link
            key={path.slug}
            href={`/${path.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#141418] p-6 transition-all duration-300 hover:border-white/25 hover:bg-[#1a1a20] hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-0.5 active:scale-[0.99]"
          >
            {/* Top specular reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Ambient subtle glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: bgGlow }}
            />

            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${accentBadge}`}>
                  {path.title}
                </span>

                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition-transform duration-300 group-hover:scale-110 ${accentColor}`}>
                  {getTrackIcon(path.slug, "h-6 w-6")}
                </div>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                {path.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/55 leading-relaxed line-clamp-2">
                {path.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                Explore Curriculum
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 group-hover:bg-white group-hover:border-white group-hover:text-black group-hover:scale-110">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function shuffleList<T>(list: T[]): T[] {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/* ─── Main Home Page Client ─────────────────────────────────── */
interface HomePageClientProps {
  learningPaths: LearningPathSummary[];
  initialCourses?: FeaturedCourse[];
}

export function HomePageClient({
  learningPaths,
  initialCourses = [],
}: HomePageClientProps) {
  const [selectedChip, setSelectedChip] = useState<TopicChip>(DEFAULT_TOPIC_CHIPS[0]);
  const [viewMode, setViewMode] = useState<"feed" | "bento" | "shelves">("feed");
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [visibleCount, setVisibleCount] = useState(48);
  const savedItems = useSavedItems();
  const savedCount = useSavedCount();

  // Automatic shuffle on client mount so it shows fresh, randomized content on every visit
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShuffleSeed(Date.now());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleShuffle = () => {
    setShuffleSeed(Date.now());
    setVisibleCount(48);
  };

  const handleSelectChip = (chip: TopicChip) => {
    setSelectedChip(chip);
    setVisibleCount(48);
    setShuffleSeed(Date.now());
  };

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent("global-search:open"));
  };

  const triggerExplore = () => {
    window.dispatchEvent(new CustomEvent("floating-nav:open"));
  };

  // Filtered courses based on selected chip with automatic shuffle
  const displayedCourses: YouTubeCardItem[] = useMemo(() => {
    if (selectedChip.isLibrary) {
      return savedItems.map((s) => ({
        title: s.title,
        creator: s.creator || "Learning Hub",
        url: s.url,
        videoCount: s.videoCount,
        difficulty: s.difficulty,
        category: s.category,
      }));
    }

    let list: FeaturedCourse[] = [];
    if (selectedChip.id === "all" || selectedChip.id === "trending") {
      list = initialCourses;
    } else if (selectedChip.slug) {
      list = initialCourses.filter(
        (c) => c.categorySlug === selectedChip.slug || c.category.toLowerCase().includes(selectedChip.id),
      );
    } else {
      list = initialCourses;
    }

    if (shuffleSeed > 0) {
      return shuffleList(list);
    }

    return list;
  }, [selectedChip, initialCourses, savedItems, shuffleSeed]);

  const visibleCourses = useMemo(() => {
    return displayedCourses.slice(0, visibleCount);
  }, [displayedCourses, visibleCount]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col antialiased selection:bg-blue-500/30 selection:text-white pb-20 md:pb-12">
      {/* ── App Navbar ────────────────────────────────────────── */}
      <Navbar />

      {/* ── Sticky Topic Chips Horizontal Carousel ──────────── */}
      <div className="sticky top-14 sm:top-16 z-40 border-b border-white/[0.08] bg-[#090a0f]/95 backdrop-blur-xl px-3 sm:px-6 py-2 transition-all">
        <div className="container mx-auto max-w-7xl">
          <TopicChips
            activeId={selectedChip.id}
            onSelect={handleSelectChip}
            savedCount={savedCount}
          />
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-3 sm:px-6 pt-6 sm:pt-8 flex-1 space-y-8 sm:space-y-10">
        {/* ── Developer Hero Banner (No AI Slop) ───────────────── */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#121217]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Specular hairline top reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Ambient lighting glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative z-10 max-w-3xl">
            {/* Live Count Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-md mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#30d158] animate-pulse" />
              <span>7,203 verified learning resources across 21 tracks • 100% free & open source</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The Open Source Curriculum for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997ff] via-[#bf5af2] to-[#64d2ff]">
                Software Engineers
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl font-normal">
              Curated university-grade courses, verified YouTube playlists, and interactive documentation. Zero paywalls, no in-app ads, direct source links.
            </p>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={triggerSearch}
                className="flex items-center gap-2.5 rounded-full bg-white text-black px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-95"
              >
                <Search className="h-4 w-4" />
                <span>Search 7,200+ Resources (⌘K)</span>
              </button>

              <button
                type="button"
                onClick={triggerExplore}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                <Compass className="h-4 w-4 text-[#2997ff]" />
                <span>Explore Tracks (⌘J)</span>
              </button>

              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white/80 transition-all hover:bg-white/10 active:scale-95"
                title="Randomize the feed"
              >
                <Shuffle className="h-4 w-4 text-[#30d158]" />
                <span>Shuffle Feed</span>
              </button>
            </div>

            {/* Honest Stats Row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.08] pt-6">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">7,203</div>
                <div className="text-xs text-white/50 mt-0.5">Verified Resources</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#2997ff] tracking-tight">21</div>
                <div className="text-xs text-white/50 mt-0.5">Engineering Tracks</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#30d158] tracking-tight">300+</div>
                <div className="text-xs text-white/50 mt-0.5">Faculties & Creators</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#bf5af2] tracking-tight">100%</div>
                <div className="text-xs text-white/50 mt-0.5">Free & Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Spotlight Bento ─────────────────────────────────── */}
        {selectedChip.id === "all" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#2997ff]" />
                <span>Spotlight Roadmaps</span>
              </h2>
            </div>
            <YouTubeBentoSpotlight paths={learningPaths} />
          </section>
        )}

        {/* ── Feed Section Header & View Mode Switcher ────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                {selectedChip.isLibrary ? (
                  <>
                    <Bookmark className="h-5 w-5 fill-[#2997ff] text-[#2997ff]" />
                    <span>Your Saved Library ({displayedCourses.length})</span>
                  </>
                ) : (
                  <>
                    <PlaySquare className="h-5 w-5 text-[#2997ff]" />
                    <span>
                      {selectedChip.id === "all"
                        ? "Curated Courses & Playlists"
                        : `${selectedChip.label} Courses`}
                    </span>
                    <span className="text-xs font-normal text-white/50">
                      ({displayedCourses.length} items)
                    </span>
                  </>
                )}
              </h2>
              <p className="text-xs text-white/50 mt-1">
                {selectedChip.isLibrary
                  ? "Bookmarked playlists and courses saved locally in your browser."
                  : "Ranked by community rating, university credibility, and depth."}
              </p>
            </div>

            {/* View Mode Switcher + Shuffle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16161a] px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all shadow-sm active:scale-95"
                title="Randomize courses on this shelf"
              >
                <Shuffle className="h-3.5 w-3.5 text-[#30d158]" />
                <span>Shuffle</span>
              </button>

              <div className="flex items-center rounded-full border border-white/10 bg-[#16161a] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("feed")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    viewMode === "feed"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                  title="Card Grid"
                >
                  <PlaySquare className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Feed</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("bento")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    viewMode === "bento"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                  title="All 21 Roadmaps Grid"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Tracks</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("shelves")}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    viewMode === "shelves"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                  title="Horizontal Category Shelves"
                >
                  <Rows className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Shelves</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── View 1: Video Cards Feed Grid ─────────────────── */}
          {viewMode === "feed" && (
            <>
              {displayedCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#121216] py-16 px-4 text-center">
                  <Bookmark className="h-12 w-12 text-white/20 mb-3" />
                  <h3 className="text-base font-semibold text-white">No courses found</h3>
                  <p className="text-xs text-white/50 mt-1 max-w-sm">
                    {selectedChip.isLibrary
                      ? "You haven't saved any courses yet. Click the bookmark icon on any card to save it."
                      : "Try selecting another topic chip above or search for a specific technology."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7">
                    {visibleCourses.map((course, idx) => (
                      <YouTubeCard
                        key={`${course.url}-${idx}`}
                        item={course}
                        index={idx}
                      />
                    ))}
                  </div>

                  {visibleCount < displayedCourses.length && (
                    <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 48)}
                        className="flex items-center gap-2 rounded-full border border-white/15 bg-[#18181e] px-7 py-3 text-sm font-semibold text-white shadow-xl hover:bg-[#25252c] hover:border-white/30 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>Load More Courses</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                          +{Math.min(48, displayedCourses.length - visibleCount)}
                        </span>
                      </button>
                      <p className="text-xs text-white/40">
                        Showing {Math.min(visibleCount, displayedCourses.length).toLocaleString()} of {displayedCourses.length.toLocaleString()} verified resources
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── View 2: Roadmaps Bento Grid ───────────────────── */}
          {viewMode === "bento" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {learningPaths.map((path) => (
                <PathCard
                  key={path.slug}
                  title={path.title}
                  description={path.description}
                  slug={path.slug}
                  icon={path.icon}
                  color={path.color}
                  courseCount={path.courseCount}
                  articleCount={path.articleCount}
                />
              ))}
            </div>
          )}

          {/* ── View 3: Category Shelves (Horizontal Trays) ────── */}
          {viewMode === "shelves" && (
            <div className="space-y-12">
              {CATEGORIES.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  paths={learningPaths}
                  featured={category.id === "featured"}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
