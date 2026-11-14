"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Home,
  PlayCircle,
  Search,
  X,
  Play,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { GlobalSearchItem, SearchItemType } from "@/lib/search";
import { getTrackIcon } from "@/components/icons";

declare global {
  interface WindowEventMap {
    "global-search:open": CustomEvent<{ query?: string }>;
  }
}

const ICONS: Record<SearchItemType, typeof Home> = {
  page: Home,
  category: FolderKanban,
  article: FileText,
  playlist: PlayCircle,
};

const TYPE_COLORS: Record<SearchItemType, { bg: string; text: string; border: string; dot: string }> = {
  page: { bg: "bg-[#2997ff]/15", text: "text-[#2997ff]", border: "border-[#2997ff]/30", dot: "bg-[#2997ff]" },
  category: { bg: "bg-[#bf5af2]/15", text: "text-[#bf5af2]", border: "border-[#bf5af2]/30", dot: "bg-[#bf5af2]" },
  article: { bg: "bg-[#30d158]/15", text: "text-[#30d158]", border: "border-[#30d158]/30", dot: "bg-[#30d158]" },
  playlist: { bg: "bg-[#ff0000]/20", text: "text-[#ff4d4d]", border: "border-[#ff0000]/40", dot: "bg-[#ff0000]" },
};

export function GlobalSearch({ items = [] }: { items?: GlobalSearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<GlobalSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Client-side cache for instant search results on repeat or backspace
  const searchCache = useRef<Map<string, GlobalSearchItem[]>>(new Map());

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setTypeFilter("all");
    setSelectedIndex(0);
    setSearchResults([]);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "/" && !open) {
        const target = event.target as HTMLElement | null;
        const typing =
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target?.isContentEditable;

        if (!typing) {
          event.preventDefault();
          setOpen(true);
        }
      }

      if (event.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onOpen = (event: WindowEventMap["global-search:open"]) => {
      setOpen(true);
      setQuery(event.detail?.query ?? "");
      setSelectedIndex(0);
    };

    window.addEventListener("global-search:open", onOpen);
    return () => window.removeEventListener("global-search:open", onOpen);
  }, []);

  // Fetch search results on demand with 120ms debouncing and caching
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const cacheKey = `${trimmed}::${typeFilter}`;
    if (searchCache.current.has(cacheKey)) {
      setSearchResults(searchCache.current.get(cacheKey)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&type=${typeFilter}&limit=35`,
          { signal: controller.signal },
        );
        if (res.ok) {
          const data = await res.json();
          const list: GlobalSearchItem[] = data.results || [];
          searchCache.current.set(cacheKey, list);
          setSearchResults(list);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          console.error("Search error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 120);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, typeFilter]);

  const suggestions = useMemo(() => {
    if (query.trim()) {
      return searchResults;
    }
    const matched = items.filter((item) => typeFilter === "all" || item.type === typeFilter);
    return matched.slice(0, 10);
  }, [items, query, typeFilter, searchResults]);

  const openItem = (item: GlobalSearchItem) => {
    closeSearch();
    if (item.isExternal || item.href.includes("youtube.com") || item.href.includes("youtu.be")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.href);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && suggestions[selectedIndex]) {
      e.preventDefault();
      openItem(suggestions[selectedIndex]);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-3 pt-12 pb-6 backdrop-blur-2xl sm:pt-20"
          onClick={closeSearch}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121212] shadow-2xl shadow-black/90 animate-in fade-in-0 zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* YouTube Search Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-[#181818] px-4 py-3 sm:px-5">
              <Search className="h-5 w-5 text-white/50 shrink-0" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search 7,200+ courses, playlists, roadmaps, articles..."
                className="h-10 border-0 bg-transparent px-0 text-base text-white shadow-none focus-visible:ring-0 placeholder:text-white/40 font-normal tracking-tight"
              />
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-white/40 shrink-0" />
              )}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Pills Bar */}
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#141414] px-4 py-2 overflow-x-auto scrollbar-hide">
              {[
                { id: "all", label: "All Results" },
                { id: "playlist", label: "Courses & Videos" },
                { id: "article", label: "Articles & Tools" },
                { id: "category", label: "Tracks & Categories" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setTypeFilter(pill.id);
                    setSelectedIndex(0);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    typeFilter === pill.id
                      ? "bg-white text-black font-semibold"
                      : "bg-[#252525] text-white/70 hover:bg-[#333333] hover:text-white"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-[62vh] overflow-y-auto p-2 sm:p-3 scrollbar-hide">
              {suggestions.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40 flex justify-between">
                    <span>{query.trim() ? `Search Results (${suggestions.length})` : "Popular Learning Resources"}</span>
                    <span>Use ↑↓ to navigate</span>
                  </div>

                  {suggestions.map((item, index) => {
                    const Icon = ICONS[item.type];
                    const colors = TYPE_COLORS[item.type];
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all outline-none ${
                          isSelected
                            ? "bg-[#252525] ring-1 ring-white/10"
                            : "hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Thumbnail / Icon preview */}
                          <div
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border ${colors.border} ${colors.bg}`}
                          >
                            {item.type === "playlist" ? (
                              <Play className="h-4 w-4 fill-current text-[#ff4d4d]" />
                            ) : item.type === "category" ? (
                              <span className="h-5 w-5 inline-flex items-center justify-center">
                                {getTrackIcon(item.href.replace(/^\//, ""), "h-5 w-5")}
                              </span>
                            ) : (
                              <Icon className={`h-4 w-4 ${colors.text}`} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-sm font-semibold text-white/95 group-hover:text-white">
                                {item.title}
                              </p>
                              {item.isExternal && (
                                <ArrowUpRight className="h-3 w-3 shrink-0 text-white/40" />
                              )}
                            </div>
                            <p className="truncate text-xs text-white/50 mt-0.5">
                              <span className="text-white/70 font-medium">{item.group}</span>
                              {item.description ? ` • ${item.description}` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pl-3">
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${colors.bg} ${colors.text} ${colors.border}`}
                          >
                            {item.type}
                          </span>
                          <CornerDownLeft className={`h-3.5 w-3.5 text-white/30 transition-opacity ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-white/80">
                    {isLoading ? "Searching catalog..." : "No learning resources found"}
                  </p>
                  <p className="mt-1 text-xs text-white/40 max-w-xs">
                    Try searching for &quot;React&quot;, &quot;DSA&quot;, &quot;System Design&quot;, or &quot;Python&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* YouTube Search Status Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#141414] px-4 py-2.5 text-[11px] text-white/40">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ff0000]" />
                  <span>7,203 verified resources</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>Select <kbd className="font-mono text-[10px] text-white/60">↵</kbd></span>
                <span>Close <kbd className="font-mono text-[10px] text-white/60">esc</kbd></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
