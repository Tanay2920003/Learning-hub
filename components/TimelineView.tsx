"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, Calendar, MonitorPlay } from "lucide-react";
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

export function TimelineView({ playlists }: { playlists: Playlist[] }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20";
      case "intermediate": return "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20";
      case "advanced": return "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20";
      default: return "bg-slate-500/10 text-slate-400 hover:bg-slate-500/20";
    }
  };

  return (
    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-8 md:space-y-12 pb-10">
      {playlists.map((playlist, index) => (
        <motion.div
          key={index}
          className="relative pl-6 md:pl-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute -left-[1.30rem] md:-left-[1.35rem] top-6 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 border-2 border-zinc-700 shadow-[0_0_15px_rgba(59,130,246,0.15)] z-10">
            <span className="text-slate-300 font-bold text-sm">{index + 1}</span>
          </div>

          <Link href={playlist.url} target="_blank" rel="noopener noreferrer" className="block group">
            <Card className="group/card bg-card/40 border-slate-800/60 hover:scale-[1.02] md:hover:scale-105 transition-all hover:border-slate-500 hover:bg-card/60 duration-300 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardContent className="p-5 md:p-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-100 group-hover/card:text-blue-400 transition-colors mb-1.5 md:mb-2">
                      {playlist.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-4">
                      By <span className="text-slate-300 font-medium">{playlist.creator}</span>
                    </p>
                    {playlist.description && (
                       <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                         {playlist.description}
                       </p>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col items-start gap-2 shrink-0 mt-2 sm:mt-0">
                    <Badge variant="outline" className={`border-0 ${getDifficultyColor(playlist.difficulty)}`}>
                      {playlist.difficulty.charAt(0).toUpperCase() + playlist.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                      {playlist.language}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-5 border-t border-zinc-800/50 gap-4">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 w-full sm:w-auto">
                    <span className="flex items-center"><MonitorPlay className="h-4 w-4 mr-1.5" /> {playlist.videoCount} Videos</span>
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /> {playlist.year}</span>
                  </div>

                  <div className="w-full sm:w-auto">
                    <Button className="w-full bg-slate-100 text-slate-900 hover:bg-white hover:scale-105 transition-all font-semibold rounded-full shadow-lg shadow-white/5 pointer-events-none">
                      <PlayCircle className="mr-2 h-4 w-4" /> Start Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}