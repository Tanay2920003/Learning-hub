"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  title: string;
  url: string;
}

export function ArticleGridView({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            <Card className="group h-full bg-card/40 border-slate-800/60 hover:bg-zinc-800/50 hover:border-slate-500 transition-all cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between h-full gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-zinc-900 rounded-md border border-zinc-800 shrink-0">
                    <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-slate-200 font-medium group-hover:text-white transition-colors leading-snug">
                    {article.title}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors shrink-0" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}