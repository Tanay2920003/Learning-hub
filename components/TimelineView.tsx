"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, Calendar, MonitorPlay, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Playlist {
  title: string;
  creator: string;
  url: string;
  language: string;
  difficulty: string;
  videoCount: number;
  description: string;
  year: number;
}

const DIFFICULTY_CONFIG = {
  beginner: {
    className: "border-[#30d158]/25 bg-[#30d158]/12 text-[#30d158]",
    dot: "bg-[#30d158]",
    nodeBorder: "border-[#30d158]/40",
    nodeText: "text-[#30d158]",
  },
  intermediate: {
    className: "border-[#ff9f0a]/25 bg-[#ff9f0a]/12 text-[#ff9f0a]",
    dot: "bg-[#ff9f0a]",
    nodeBorder: "border-[#ff9f0a]/40",
    nodeText: "text-[#ff9f0a]",
  },
  advanced: {
    className: "border-[#ff375f]/25 bg-[#ff375f]/12 text-[#ff375f]",
    dot: "bg-[#ff375f]",
    nodeBorder: "border-[#ff375f]/40",
    nodeText: "text-[#ff375f]",
  },
};

const DEFAULT_CONFIG = DIFFICULTY_CONFIG.beginner;

export function TimelineView({ playlists }: { playlists: Playlist[] }) {
  const getConfig = (difficulty: string) => {
    return DIFFICULTY_CONFIG[difficulty.toLowerCase() as keyof typeof DIFFICULTY_CONFIG] ?? DEFAULT_CONFIG;
  };

  return (
    <div className="relative ml-3 sm:ml-6 space-y-6 sm:space-y-8 pb-10">
      {/* Subtle vertical connection line */}
      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />

      {playlists.map((playlist, index) => {
        const config = getConfig(playlist.difficulty);

        return (
          <motion.div
            key={index}
            className="relative pl-10 sm:pl-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            {/* Timeline milestone node */}
            <div className={`absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border ${config.nodeBorder} bg-black z-10 shadow-lg text-xs font-semibold ${config.nodeText}`}>
              <span>{index + 1}</span>
            </div>

            <Link href={playlist.url} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.065] hover:shadow-2xl hover:shadow-black/70 active:scale-[0.99]">
                {/* Specular hairline top reflection */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-white transition-colors mb-1.5 leading-snug">
                      {playlist.title}
                    </h3>
                    <p className="text-xs text-white/50 mb-3">
                      Curated from <span className="text-white/80 font-medium">{playlist.creator}</span>
                    </p>
                    {playlist.description && (
                      <p className="text-sm text-white/60 leading-relaxed max-w-2xl line-clamp-2">
                        {playlist.description}
                      </p>
                    )}
                  </div>

                  {/* Difficulty & Language Tags */}
                  <div className="flex flex-row sm:flex-col items-start gap-2 shrink-0">
                    <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase ${config.className}`}>
                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${config.dot} inline-block`} />
                      {playlist.difficulty}
                    </Badge>
                    <Badge variant="outline" className="rounded-full bg-white/5 text-white/60 border-white/10 text-[11px] px-2.5 py-0.5">
                      {playlist.language}
                    </Badge>
                  </div>
                </div>

                {/* Footer metadata & action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-4 border-t border-white/[0.06] gap-4">
                  <div className="flex items-center gap-5 text-xs font-medium text-white/45">
                    <span className="flex items-center gap-1.5">
                      <MonitorPlay className="h-3.5 w-3.5 text-white/40" />
                      {playlist.videoCount} {playlist.videoCount === 1 ? "Lesson" : "Lessons"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-white/40" />
                      {playlist.year}
                    </span>
                  </div>

                  <div className="w-full sm:w-auto">
                    <div className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white text-black px-4 py-2 text-xs font-semibold shadow-md transition-all group-hover:bg-white/95 group-hover:scale-[1.02] gap-1.5">
                      <PlayCircle className="h-3.5 w-3.5" />
                      <span>Start Course</span>
                      <ArrowRight className="h-3 w-3 ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
