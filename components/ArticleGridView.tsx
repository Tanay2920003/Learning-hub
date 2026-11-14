"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink, BookOpen, Globe } from "lucide-react";
import { parseYouTubeUrl, getFallbackThumbnailGradient } from "@/lib/youtube";

interface Article {
  title: string;
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  const domain = getDomain(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

// ─── YouTube Article Card — opens YouTube directly ───────────────────────────
function YouTubeArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const ytInfo = parseYouTubeUrl(article.url);
  const [thumbError, setThumbError] = useState(false);
  const gradient = getFallbackThumbnailGradient(article.title);

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group block"
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#1a1a1a] aspect-video mb-2">
        {ytInfo.thumbnailUrl && !thumbError ? (
          <Image
            src={ytInfo.thumbnailUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setThumbError(true)}
            unoptimized
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Play className="h-10 w-10 text-white/30" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
        </div>

        {/* Type badge */}
        <div className="absolute bottom-2 right-2">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold bg-black/80 text-white uppercase tracking-wide">
            {ytInfo.type === "playlist" ? "Playlist" : "Video"}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-2.5">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/15">
          <Play className="h-3 w-3 text-[#ff0000] fill-[#ff0000]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="mt-0.5 text-xs text-white/40">YouTube</p>
        </div>
      </div>
    </motion.a>
  );
}

// ─── External Article Card ────────────────────────────────────────────────────
function ExternalArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const [faviconError, setFaviconError] = useState(false);
  const domain = getDomain(article.url);
  const faviconUrl = getFaviconUrl(article.url);

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group block"
    >
      {/* Preview banner */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#1a1a1a] aspect-video mb-2 flex flex-col items-center justify-center border border-white/[0.06] group-hover:border-white/[0.14] transition-colors">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {!faviconError ? (
          <Image
            src={faviconUrl}
            alt={domain}
            width={40}
            height={40}
            className="rounded-lg mb-3 opacity-80"
            onError={() => setFaviconError(true)}
            unoptimized
          />
        ) : (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <BookOpen className="h-5 w-5 text-white/50" />
          </div>
        )}

        <Globe className="h-4 w-4 text-white/25 mb-1" />
        <span className="text-xs text-white/35 font-mono">{domain}</span>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <ExternalLink className="h-3 w-3 text-white/70" />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-2.5">
        <div className="mt-0.5 shrink-0">
          {!faviconError ? (
            <Image
              src={faviconUrl}
              alt={domain}
              width={20}
              height={20}
              className="rounded"
              onError={() => setFaviconError(true)}
              unoptimized
            />
          ) : (
            <BookOpen className="h-4 w-4 text-white/40" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="mt-0.5 text-xs text-white/40 font-mono">{domain}</p>
        </div>
      </div>
    </motion.a>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function ArticleGridView({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7">
      {articles.map((article, index) => {
        const ytInfo = parseYouTubeUrl(article.url);
        return ytInfo.isYouTube ? (
          <YouTubeArticleCard key={index} article={article} index={index} />
        ) : (
          <ExternalArticleCard key={index} article={article} index={index} />
        );
      })}
    </div>
  );
}
