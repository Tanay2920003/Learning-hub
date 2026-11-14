"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Bookmark,
  Check,
  Share2,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { parseYouTubeUrl, getFallbackThumbnailGradient } from "@/lib/youtube";
import { toggleSaveItem, useIsItemSaved } from "@/lib/saved-library";
import { Badge } from "@/components/ui/badge";
import { getTrackIcon } from "@/components/icons";

export interface YouTubeCardItem {
  title: string;
  creator: string;
  url: string;
  language?: string;
  difficulty?: "beginner" | "intermediate" | "advanced" | string;
  videoCount?: number;
  description?: string;
  year?: number;
  category?: string;
  icon?: string;
}

interface YouTubeCardProps {
  item: YouTubeCardItem;
  index?: number;
}

export function YouTubeCard({ item }: YouTubeCardProps) {
  const saved = useIsItemSaved(item.url);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ytInfo = parseYouTubeUrl(item.url);
  const isVideo = ytInfo.isYouTube;
  const gradientClass = getFallbackThumbnailGradient(item.category || item.language || item.title);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveItem({
      id: item.url,
      title: item.title,
      creator: item.creator,
      url: item.url,
      type: isVideo ? "playlist" : "article",
      category: item.category,
      videoCount: item.videoCount,
      difficulty: item.difficulty,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };



  const getDifficultyBadge = (diff?: string) => {
    const d = (diff || "beginner").toLowerCase();
    if (d === "advanced") {
      return { label: "Advanced", badge: "bg-[#ff375f]/15 text-[#ff375f] border-[#ff375f]/30" };
    }
    if (d === "intermediate") {
      return { label: "Intermediate", badge: "bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30" };
    }
    return { label: "Beginner", badge: "bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30" };
  };

  const diffConfig = getDifficultyBadge(item.difficulty);

  return (
    <div className="group relative flex flex-col rounded-2xl p-2 transition-all duration-200 hover:bg-[#1f1f1f]/80">
      {/* ── 16:9 Thumbnail Container ────────────────────────── */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video w-full block cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[#141414] shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
      >
        {/* Thumbnail Background / Artwork */}
        {ytInfo.thumbnailUrl ? (
          <Image
            src={ytInfo.thumbnailUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center p-4`}>
            {/* Ambient topic graphic */}
            <div className="relative flex flex-col items-center justify-center text-center opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/95 shadow-lg">
                {getTrackIcon(item.category || "webdev", "h-6 w-6")}
              </div>
              <span className="mt-2 text-xs font-semibold text-white/90 line-clamp-1 max-w-[200px] tracking-tight">
                {item.creator || item.category || "Curated Curriculum"}
              </span>
            </div>
          </div>
        )}

        {/* Subtle dark gradient overlay for badge legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* YouTube Hover Play Button Center Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-xl shadow-red-950/60 ring-4 ring-black/40">
            <Play className="ml-1 h-5 w-5 fill-white" />
          </div>
        </div>

        {/* Top-Left: Difficulty Tag */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <Badge
            variant="outline"
            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${diffConfig.badge}`}
          >
            {diffConfig.label}
          </Badge>
        </div>

        {/* Top-Right: Quick Hover Action Buttons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-90 sm:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {/* Watch Later / Bookmark Toggle */}
          <button
            type="button"
            onClick={handleBookmark}
            title={saved ? "Remove from Library" : "Save to Watch Later"}
            className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
              saved
                ? "bg-[#ff0000] text-white shadow-md shadow-red-900/40"
                : "bg-black/70 text-white/80 hover:bg-black hover:text-white"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-white" : ""}`} />
          </button>

          {/* Quick Share Link */}
          <button
            type="button"
            onClick={handleShare}
            title="Copy Resource URL"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white/80 backdrop-blur-md transition-all hover:bg-black hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-[#30d158]" /> : <Share2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Bottom-Right: Duration / Video Count Badge */}
        <div className="absolute bottom-2 right-2 z-10">
          <span className="yt-duration-badge inline-flex items-center gap-1 shadow-sm">
            {isVideo ? (
              <>
                <Play className="h-2.5 w-2.5 fill-white" />
                <span>
                  {item.videoCount ? `${item.videoCount} videos` : "Playlist"}
                </span>
              </>
            ) : (
              <>
                <BookOpen className="h-2.5 w-2.5" />
                <span>Guide / Tool</span>
              </>
            )}
          </span>
        </div>
      </a>

      {/* ── Video Metadata & Channel Info ──────────────────── */}
      <div className="mt-3 flex items-start gap-3 px-1">
        {/* Creator Channel Avatar */}
        <div className="shrink-0 pt-0.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#252525] to-[#3a3a3a] border border-white/10 text-white font-semibold text-xs shadow-inner">
            {item.creator ? item.creator.slice(0, 2).toUpperCase() : "LH"}
          </div>
        </div>

        {/* Title & Creator Details */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-medium text-[14px] sm:text-[15px] leading-snug tracking-tight text-white hover:text-white/90 line-clamp-2 transition-colors"
            title={item.title}
          >
            {item.title}
          </a>

          {/* Creator Channel with Verified Checkmark */}
          <div className="mt-1 flex items-center gap-1 text-[12px] sm:text-[13px] text-white/60">
            <span className="truncate hover:text-white transition-colors">
              {item.creator || "Learning Hub"}
            </span>
            <CheckCircle2 className="h-3 w-3 shrink-0 text-white/50" />
          </div>

          {/* Meta line: Year · Language · Action */}
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/40">
            {item.year && <span>{item.year}</span>}
            {item.year && <span>•</span>}
            {item.language && <span>{item.language}</span>}
            {item.language && <span>•</span>}
            <span className="capitalize">{item.difficulty || "All Levels"}</span>
          </div>
        </div>

        {/* Context Menu Button (three dots) */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              <div className="absolute right-0 top-9 z-50 w-48 rounded-xl border border-white/15 bg-[#212121] p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={(e) => {
                    handleBookmark(e);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-[#ff0000] text-[#ff0000]" : ""}`} />
                  <span>{saved ? "Remove from Library" : "Save to Watch Later"}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    handleShare(e);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open External Link</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
