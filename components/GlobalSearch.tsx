"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Home,
  Keyboard,
  PlayCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GlobalSearchItem, SearchItemType } from "@/lib/search";

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

const TYPE_COLORS: Record<SearchItemType, { bg: string; text: string; border: string }> = {
  page: { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/20" },
  category: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/20" },
  article: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/20" },
  playlist: { bg: "bg-rose-500/10", text: "text-rose-300", border: "border-rose-500/20" },
};

function matchesQuery(item: GlobalSearchItem, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [item.title, item.description, item.group].some((value) =>
    value.toLowerCase().includes(normalized),
  );
}

export function GlobalSearch({ items }: { items: GlobalSearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
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
    };

    window.addEventListener("global-search:open", onOpen);
    return () => window.removeEventListener("global-search:open", onOpen);
  }, []);

  const suggestions = useMemo(() => {
    const matched = items.filter((item) => matchesQuery(item, query));

    if (!query.trim()) {
      return matched.slice(0, 8);
    }

    return matched.slice(0, 10);
  }, [items, query]);

  const topSuggestion = suggestions[0];

  const openItem = (item: GlobalSearchItem) => {
    closeSearch();

    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  };

  return (
    <>
      {/* Floating search button */}
      <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="h-12 rounded-full border-0 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 backdrop-blur-md hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 hover:scale-105 transition-all sm:h-13 sm:px-5 gap-2"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Find</span>
          <span className="hidden rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 text-[11px] text-white/70 md:inline">
            Ctrl K
          </span>
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 py-8 backdrop-blur-md sm:py-16"
          onClick={closeSearch}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/8 bg-[#0d0d0d]/98 shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top accent */}
            <div className="h-[2px] bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500" />

            {/* Search input row */}
            <div className="flex items-center gap-3 border-b border-white/6 px-4 py-4 sm:px-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                <Search className="h-4 w-4 text-violet-400" />
              </div>
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search categories, articles, playlists, and pages..."
                className="h-10 border-0 bg-transparent px-0 text-sm text-slate-100 shadow-none focus-visible:ring-0 placeholder:text-slate-600"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-slate-500 hover:bg-white/5 hover:text-white"
                onClick={closeSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Hint chips */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-4 py-2.5 text-xs text-slate-600 sm:px-5">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/3 px-2 py-1">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Smart suggestions
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/3 px-2 py-1">
                <Keyboard className="h-3 w-3" />
                Esc to close
              </span>
              {topSuggestion && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/3 px-2 py-1 text-slate-500">
                  <CornerDownLeft className="h-3 w-3" />
                  Top: <span className="text-slate-300 font-medium">{topSuggestion.title}</span>
                </span>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[62vh] overflow-y-auto p-3 sm:p-4">
              {suggestions.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    {query.trim() ? `Results for "${query.trim()}"` : "Popular shortcuts"}
                  </div>
                  {suggestions.map((item) => {
                    const Icon = ICONS[item.type];
                    const colors = TYPE_COLORS[item.type];

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openItem(item)}
                        className="flex w-full items-start gap-3 rounded-2xl border border-white/4 bg-white/2 px-3 py-3 text-left transition-all hover:border-white/10 hover:bg-white/5"
                      >
                        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${colors.border} ${colors.bg}`}>
                          <Icon className={`h-4 w-4 ${colors.text}`} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
                            {item.isExternal && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-500" />}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{item.description}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full border ${colors.border} ${colors.bg} px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${colors.text} font-medium`}>
                              {item.type}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600">
                              {item.group}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/3">
                    <BookOpen className="h-7 w-7 text-slate-600" />
                  </div>
                  <p className="text-base font-medium text-slate-300">Nothing matched that search</p>
                  <p className="mt-1 max-w-md text-sm text-slate-600">
                    Try a broader keyword like a topic, article title, playlist name, or page.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 px-4 py-2.5 flex items-center gap-4 text-[10px] text-slate-600 sm:px-5">
              {Object.entries(TYPE_COLORS).map(([type, colors]) => (
                <span key={type} className={`inline-flex items-center gap-1 ${colors.text} opacity-70`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${colors.bg.replace("/10", "")} inline-block`} />
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
