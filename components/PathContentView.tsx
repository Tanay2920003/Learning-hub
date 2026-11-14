"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Eye,
  ExternalLink,
  Monitor,
  Search,
  Sparkles,
  Video,
  Wrench,
  X,
  PlaySquare,
  ListOrdered,
  Shuffle,
} from "lucide-react";
import { TimelineView } from "./TimelineView";
import { ArticleGridView } from "./ArticleGridView";
import { YouTubeCard } from "./YouTubeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Playlist {
  title: string;
  creator: string;
  url: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videoCount: number;
  description: string;
  year: number;
}

interface Article {
  title: string;
  url: string;
}

interface PathContentProps {
  playlists: Playlist[];
  articles: Article[];
  categorySlug?: string;
}

interface ResourceItem {
  title: string;
  url: string;
  description?: string;
  creator?: string;
}

/* ─── macOS Safari Window Mockup for Previews ──────────────── */
function SafariWindow({
  url,
  title,
  children,
}: {
  url: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div title={title} className="overflow-hidden rounded-2xl border border-white/12 bg-[#1c1c20] shadow-2xl">
      {/* Safari Window Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#16161a] px-3.5 py-2.5">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
        </div>

        {/* Safari URL Pill */}
        <div className="flex max-w-[240px] sm:max-w-xs flex-1 items-center justify-center truncate rounded-md border border-white/[0.06] bg-white/[0.04] px-3 py-0.5 text-[11px] font-mono text-white/45">
          <span className="truncate">{url}</span>
        </div>

        <div className="w-12 text-right text-[10px] text-white/30">
          Live
        </div>
      </div>

      {children}
    </div>
  );
}

function CommunityProjectGrid({
  resources,
  previewEnabled,
}: {
  resources: ResourceItem[];
  previewEnabled: boolean;
}) {
  const [selectedArticle, setSelectedArticle] = useState<ResourceItem | null>(null);

  return (
    <>
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        {resources.map((article, index) => (
          <motion.div
            key={article.url}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/60"
          >
            {/* Top specular reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="p-6">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-[#2997ff]">
                <Monitor className="h-3 w-3" />
                Community App
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-white">
                {article.title}
              </h3>

              {article.creator && (
                <p className="mt-1 text-xs text-white/50">
                  By <span className="font-medium text-white/80">{article.creator}</span>
                </p>
              )}

              {article.description && (
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {article.description}
                </p>
              )}

              <p className="mt-3 truncate font-mono text-xs text-white/35">
                {article.url}
              </p>
            </div>

            {/* Embedded Safari Preview (if enabled) */}
            {previewEnabled ? (
              <div className="hidden border-t border-white/[0.06] bg-black/40 p-4 lg:block">
                <SafariWindow url={article.url} title={article.title}>
                  <iframe
                    src={article.url}
                    title={`${article.title} preview`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-56 w-full bg-black"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </SafariWindow>
              </div>
            ) : (
              <div className="border-t border-white/[0.05] px-6 py-3 text-xs text-white/40">
                Desktop preview is turned off. Toggle it above for an interactive live view.
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col gap-2.5 border-t border-white/[0.06] bg-black/30 p-4 sm:flex-row">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#2997ff] px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 active:scale-95"
              >
                <ExternalLink className="mr-2 h-3.5 w-3.5" />
                Open Live Project
              </a>

              {previewEnabled && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedArticle(article)}
                  className="rounded-full border-white/10 bg-white/5 text-xs font-medium text-white hover:bg-white/10 hover:text-white px-4 py-2.5"
                >
                  <Eye className="mr-2 h-3.5 w-3.5" />
                  Expand View
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enlarged Modal Preview */}
      {previewEnabled && selectedArticle && (
        <div
          className="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 px-6 backdrop-blur-2xl lg:flex"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#16161a] shadow-2xl shadow-black/80"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Safari Chrome Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#121214] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-1 text-xs text-white/60">
                <span className="font-medium text-white/90">{selectedArticle.title}</span>
                <span className="text-white/30">·</span>
                <span className="font-mono text-[11px] text-white/40">{selectedArticle.url}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#2997ff] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-400"
                >
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Open in Tab
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedArticle(null)}
                  className="size-8 rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-black">
              <iframe
                src={selectedArticle.url}
                title={`${selectedArticle.title} enlarged preview`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-[72vh] w-full"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ResourceGrid({ resources }: { resources: ResourceItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {resources.map((resource, index) => (
        <motion.div
          key={resource.url}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl"
        >
          {/* Top specular reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-[#30d158]">
              <Wrench className="h-3 w-3" />
              Utility Resource
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-white">{resource.title}</h3>

            {resource.creator && (
              <p className="mt-1 text-xs text-white/50">
                By <span className="font-medium text-white/80">{resource.creator}</span>
              </p>
            )}

            {resource.description && (
              <p className="mt-3 text-sm leading-relaxed text-white/60">{resource.description}</p>
            )}

            <p className="mt-3 truncate font-mono text-xs text-white/35">{resource.url}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-white text-black px-4 py-2.5 text-xs font-medium shadow-md transition-all hover:bg-white/90 active:scale-95"
            >
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Open Resource
            </a>
          </div>
        </motion.div>
      ))}
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

export function PathContentView({ playlists, articles, categorySlug }: PathContentProps) {
  const isCommunityProjects = categorySlug === "community-sites-and-projects";
  const usesUnifiedResources = isCommunityProjects || categorySlug === "tools";
  const [activeTab, setActiveTab] = useState<"playlists" | "articles">(
    isCommunityProjects ? "articles" : "playlists",
  );
  const [courseViewMode, setCourseViewMode] = useState<"grid" | "timeline">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [visibleCount, setVisibleCount] = useState(36);
  const [projectPreviewEnabled, setProjectPreviewEnabled] = useState(false);
  const [showDesktopPrompt, setShowDesktopPrompt] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Automatic shuffle on client mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShuffleSeed(Date.now());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleShuffle = () => {
    setShuffleSeed(Date.now());
    setVisibleCount(36);
  };

  useEffect(() => {
    if (!isCommunityProjects) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => {
      const desktop = mediaQuery.matches;
      setIsDesktop(desktop);
      setShowDesktopPrompt(desktop);
    };

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => {
      mediaQuery.removeEventListener("change", updateDesktopState);
    };
  }, [isCommunityProjects]);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayPlaylists = useMemo(() => {
    if (shuffleSeed > 0 && !searchQuery.trim()) {
      return shuffleList(filteredPlaylists);
    }
    return filteredPlaylists;
  }, [filteredPlaylists, shuffleSeed, searchQuery]);

  const visiblePlaylists = useMemo(() => {
    return displayPlaylists.slice(0, visibleCount);
  }, [displayPlaylists, visibleCount]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resourcesMap = new Map<string, ResourceItem>();
  for (const article of articles) {
    resourcesMap.set(article.url, {
      title: article.title,
      url: article.url,
    });
  }
  for (const playlist of playlists) {
    resourcesMap.set(playlist.url, {
      title: playlist.title,
      url: playlist.url,
      creator: playlist.creator,
      description: playlist.description,
    });
  }
  const filteredResources = Array.from(resourcesMap.values()).filter((resource) =>
    [resource.title, resource.url, resource.creator || "", resource.description || ""]
      .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full">
      {/* Desktop Preview Notification */}
      {isCommunityProjects && isDesktop && showDesktopPrompt && !projectPreviewEnabled && (
        <div className="fixed inset-0 z-30 hidden items-center justify-center bg-black/60 px-6 backdrop-blur-md lg:flex">
          <div className="w-full max-w-md rounded-3xl border border-white/12 bg-[#18181c]/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#2997ff]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Interactive Previews</p>
                  <p className="text-xs text-white/50">This catalog supports live embedded project previews.</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowDesktopPrompt(false)}
                className="size-8 rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setProjectPreviewEnabled(true);
                  setShowDesktopPrompt(false);
                }}
                className="flex-1 rounded-full bg-[#2997ff] text-white hover:bg-blue-400 text-xs font-medium"
              >
                <Eye className="mr-2 h-3.5 w-3.5" />
                Enable Previews
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDesktopPrompt(false)}
                className="flex-1 rounded-full border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 hover:text-white"
              >
                Not Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls: Apple Segmented Pill + Search */}
      <div className="flex flex-col items-center mb-10 md:mb-14 gap-6 w-full">
        {!usesUnifiedResources && articles.length > 0 && (
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-xl relative shadow-inner">
            <motion.div
              className="absolute inset-y-1 rounded-full bg-white/[0.12] border border-white/15 shadow-sm"
              layoutId="tab-highlight"
              initial={false}
              animate={{
                left: activeTab === "playlists" ? "4px" : "50%",
                width: "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            />

            <button
              onClick={() => setActiveTab("playlists")}
              className={`relative z-10 flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-medium transition-colors gap-1.5 ${
                activeTab === "playlists" ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Courses</span>
              <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[10px] text-white/70">
                {playlists.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`relative z-10 flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-medium transition-colors gap-1.5 ${
                activeTab === "articles" ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles</span>
              <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[10px] text-white/70">
                {articles.length}
              </span>
            </button>
          </div>
        )}

        {/* Minimal Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="text"
            placeholder={usesUnifiedResources ? "Filter resources..." : activeTab === "playlists" ? "Filter courses or creators..." : "Filter articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-10 h-11 rounded-full border border-white/10 bg-white/[0.04] text-white placeholder:text-white/40 text-xs sm:text-sm focus-visible:border-white/20 focus-visible:ring-1 focus-visible:ring-white/20 backdrop-blur-xl transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              aria-label="Clear filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Desktop preview switch for community projects */}
        {isCommunityProjects && (
          <div className="flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-between px-2">
            <div className="text-center sm:text-left">
              <p className="text-xs font-medium text-white/80">Embedded Interactive Previews</p>
              <p className="text-[11px] text-white/45">Preview community projects in macOS Safari windows.</p>
            </div>
            <Button
              type="button"
              variant={projectPreviewEnabled ? "secondary" : "outline"}
              onClick={() => setProjectPreviewEnabled((v) => !v)}
              className="h-8 rounded-full border border-white/10 bg-white/[0.05] text-xs font-medium text-white hover:bg-white/10 px-4"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              {projectPreviewEnabled ? "Disable Previews" : "Enable Previews"}
            </Button>
          </div>
        )}
      </div>

      {/* Content Rendering */}
      {usesUnifiedResources ? (
        filteredResources.length > 0 ? (
          isCommunityProjects ? (
            <CommunityProjectGrid resources={filteredResources} previewEnabled={projectPreviewEnabled} />
          ) : (
            <ResourceGrid resources={filteredResources} />
          )
        ) : (
          <div className="py-20 text-center text-white/40 text-sm">
            No matching items found for &quot;{searchQuery}&quot;
          </div>
        )
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === "playlists" ? (
            <motion.div
              key="playlists"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Grid vs Timeline View Mode Toggle */}
              {filteredPlaylists.length > 0 && (
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-xs font-medium text-white/50">
                    Showing {filteredPlaylists.length} courses in {categorySlug || "this track"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShuffle}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616] px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all shadow-sm active:scale-95"
                      title="Shuffle courses in this track"
                    >
                      <Shuffle className="h-3.5 w-3.5 text-[#ff0000]" />
                      <span>Shuffle</span>
                    </button>

                    <div className="flex items-center rounded-full border border-white/10 bg-[#161616] p-0.5">
                      <button
                        type="button"
                        onClick={() => setCourseViewMode("grid")}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                          courseViewMode === "grid"
                            ? "bg-white text-black shadow-sm"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <PlaySquare className="h-3.5 w-3.5" />
                        <span>Video Cards</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCourseViewMode("timeline")}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                          courseViewMode === "timeline"
                            ? "bg-white text-black shadow-sm"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <ListOrdered className="h-3.5 w-3.5" />
                        <span>Roadmap Path</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {filteredPlaylists.length > 0 ? (
                courseViewMode === "grid" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {visiblePlaylists.map((pl, idx) => (
                        <YouTubeCard
                          key={`${pl.url}-${idx}`}
                          item={{
                            title: pl.title,
                            creator: pl.creator,
                            url: pl.url,
                            language: pl.language,
                            difficulty: pl.difficulty,
                            videoCount: pl.videoCount,
                            description: pl.description,
                            year: pl.year,
                            category: categorySlug,
                          }}
                        />
                      ))}
                    </div>

                    {visibleCount < displayPlaylists.length && (
                      <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((prev) => prev + 36)}
                          className="flex items-center gap-2 rounded-full border border-white/15 bg-[#181818] px-7 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-[#252525] hover:border-white/30 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Load More Courses</span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                            +{Math.min(36, displayPlaylists.length - visibleCount)}
                          </span>
                        </button>
                        <p className="text-xs text-white/40">
                          Showing {Math.min(visibleCount, displayPlaylists.length)} of {displayPlaylists.length} courses
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <TimelineView playlists={filteredPlaylists} />
                )
              ) : (
                <div className="text-center py-20 text-white/40 text-sm">
                  No courses found for &quot;{searchQuery}&quot;
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredArticles.length > 0 ? (
                isCommunityProjects ? (
                  <CommunityProjectGrid resources={filteredArticles} previewEnabled={projectPreviewEnabled} />
                ) : (
                  <ArticleGridView articles={filteredArticles} />
                )
              ) : (
                <div className="text-center py-20 text-white/40 text-sm">
                  No articles found for &quot;{searchQuery}&quot;
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
