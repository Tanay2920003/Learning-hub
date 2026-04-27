"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, Calendar, MonitorPlay, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    className: "border-0 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
    dot: "bg-emerald-400",
    lineColor: "border-emerald-500/30",
    numBg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    btnGradient: "from-emerald-600 to-teal-600",
    btnShadow: "shadow-emerald-500/20",
    cardBorder: "hover:border-emerald-500/30",
    topBar: "from-emerald-500 to-teal-500",
  },
  intermediate: {
    className: "border-0 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
    dot: "bg-amber-400",
    lineColor: "border-amber-500/30",
    numBg: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    btnGradient: "from-amber-600 to-orange-600",
    btnShadow: "shadow-amber-500/20",
    cardBorder: "hover:border-amber-500/30",
    topBar: "from-amber-500 to-orange-500",
  },
  advanced: {
    className: "border-0 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
    dot: "bg-rose-400",
    lineColor: "border-rose-500/30",
    numBg: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    btnGradient: "from-rose-600 to-pink-600",
    btnShadow: "shadow-rose-500/20",
    cardBorder: "hover:border-rose-500/30",
    topBar: "from-rose-500 to-pink-500",
  },
};

const DEFAULT_CONFIG = DIFFICULTY_CONFIG.beginner;

export function TimelineView({ playlists }: { playlists: Playlist[] }) {
  const getConfig = (difficulty: string) => {
    return DIFFICULTY_CONFIG[difficulty.toLowerCase() as keyof typeof DIFFICULTY_CONFIG] ?? DEFAULT_CONFIG;
  };

  return (
    <div className="relative ml-4 md:ml-8 space-y-8 md:space-y-10 pb-10">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent" />

      {playlists.map((playlist, index) => {
        const config = getConfig(playlist.difficulty);

        return (
          <motion.div
            key={index}
            className="relative pl-8 md:pl-14"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
          >
            {/* Timeline node */}
            <div className={`absolute -left-[1.15rem] md:-left-[1.2rem] top-5 flex h-9 w-9 items-center justify-center rounded-full border-2 ${config.numBg} bg-[#0d0d0d] z-10 shadow-sm`}>
              <span className="font-bold text-xs">{index + 1}</span>
            </div>

            <Link href={playlist.url} target="_blank" rel="noopener noreferrer" className="block group">
              <Card className={`group/card bg-card/50 border-white/6 ${config.cardBorder} transition-all hover:shadow-lg duration-300 overflow-hidden cursor-pointer`}>
                {/* Colored top bar */}
                <div className={`h-[2px] bg-gradient-to-r ${config.topBar} opacity-50 group-hover/card:opacity-100 transition-opacity`} />

                <CardContent className="p-5 md:p-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-100 group-hover/card:text-white transition-colors mb-1.5">
                        {playlist.title}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm mb-3">
                        By <span className="text-slate-300 font-medium">{playlist.creator}</span>
                      </p>
                      {playlist.description && (
                        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl line-clamp-2">
                          {playlist.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-row sm:flex-col items-start gap-2 shrink-0">
                      <Badge variant="outline" className={config.className}>
                        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${config.dot} inline-block`} />
                        {playlist.difficulty.charAt(0).toUpperCase() + playlist.difficulty.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="bg-white/4 text-slate-400 border-white/8 text-xs">
                        {playlist.language}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 pt-4 border-t border-white/5 gap-4">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MonitorPlay className="h-3.5 w-3.5 text-slate-600" />
                        {playlist.videoCount} Videos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-600" />
                        {playlist.year}
                      </span>
                    </div>

                    <div className="w-full sm:w-auto">
                      <Button
                        className={`w-full bg-gradient-to-r ${config.btnGradient} text-white font-semibold rounded-full shadow-lg ${config.btnShadow} pointer-events-none border-0 hover:scale-105 transition-transform gap-2`}
                      >
                        <PlayCircle className="h-4 w-4" />
                        Start Learning
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}