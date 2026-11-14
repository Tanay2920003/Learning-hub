"use client";

import Link from "next/link";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { LearningPathSummary } from "@/lib/learning-paths";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

export function PathSwitcher({ currentSlug, paths }: { currentSlug: string; paths: LearningPathSummary[] }) {
  const currentPath = paths.find((path) => path.slug === currentSlug) || paths[0];

  if (!currentPath) {
    return null;
  }

  const currentSpec = TRACK_SPECS[currentPath.slug];
  const currentColor = currentSpec?.color || "text-[#2997ff]";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 max-w-[14rem] rounded-full border border-white/10 bg-[#16161a] px-3.5 text-xs font-medium text-white/85 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#202026] hover:text-white sm:h-10 sm:max-w-none sm:px-4 sm:text-sm"
        >
          <span className={`mr-2 h-4 w-4 shrink-0 inline-flex items-center justify-center ${currentColor}`}>
            {getTrackIcon(currentPath.slug, "h-4 w-4")}
          </span>
          <span className="truncate">{currentPath.title}</span>
          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 max-h-80 overflow-y-auto rounded-2xl border border-white/12 bg-[#141418]/95 p-1.5 text-white/90 shadow-2xl backdrop-blur-3xl scrollbar-hide"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Switch Learning Track
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/[0.08] my-1" />

        {paths.map((path) => {
          const isSelected = currentSlug === path.slug;
          const trackColor = TRACK_SPECS[path.slug]?.color || "text-white/70";

          return (
            <Link key={path.slug} href={`/${path.slug}`}>
              <DropdownMenuItem
                className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected ? "bg-white/10 text-white font-semibold" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <div className="flex items-center min-w-0 gap-2.5">
                  <span className={`h-4 w-4 shrink-0 inline-flex items-center justify-center ${trackColor}`}>
                    {getTrackIcon(path.slug, "h-4 w-4")}
                  </span>
                  <span className="truncate">{path.title}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-[#2997ff] shrink-0" />}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
