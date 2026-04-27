"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  title: string;
  url: string;
}

const ARTICLE_COLORS = [
  { bg: "bg-violet-500/8", border: "hover:border-violet-500/30", icon: "text-violet-400", dot: "bg-violet-400" },
  { bg: "bg-cyan-500/8", border: "hover:border-cyan-500/30", icon: "text-cyan-400", dot: "bg-cyan-400" },
  { bg: "bg-emerald-500/8", border: "hover:border-emerald-500/30", icon: "text-emerald-400", dot: "bg-emerald-400" },
  { bg: "bg-rose-500/8", border: "hover:border-rose-500/30", icon: "text-rose-400", dot: "bg-rose-400" },
  { bg: "bg-amber-500/8", border: "hover:border-amber-500/30", icon: "text-amber-400", dot: "bg-amber-400" },
  { bg: "bg-fuchsia-500/8", border: "hover:border-fuchsia-500/30", icon: "text-fuchsia-400", dot: "bg-fuchsia-400" },
];

export function ArticleGridView({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {articles.map((article, index) => {
        const colors = ARTICLE_COLORS[index % ARTICLE_COLORS.length];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <Card className={`group h-full bg-card/50 border-white/5 ${colors.border} hover:bg-white/3 transition-all duration-200 cursor-pointer`}>
                <CardContent className="p-4 flex items-center justify-between h-full gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 ${colors.bg} rounded-xl border border-white/5 shrink-0`}>
                      <BookOpen className={`w-4 h-4 ${colors.icon} transition-colors`} />
                    </div>
                    <h3 className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <ExternalLink className={`w-3.5 h-3.5 ${colors.icon} opacity-0 group-hover:opacity-60 transition-all shrink-0`} />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}