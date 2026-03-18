"use client";

import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LEARNING_PATHS } from "@/lib/constants";


export function PathSwitcher({ currentSlug }: { currentSlug: string }) {
  const currentPath = LEARNING_PATHS.find(p => p.slug === currentSlug) || LEARNING_PATHS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-zinc-900/50 border-zinc-800 text-slate-300 cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <currentPath.icon className={`mr-2 h-4 w-4 ${currentPath.color}`} />
          {currentPath.title}
          <ChevronsUpDown className="ml-2 h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-slate-200">
        <DropdownMenuLabel className="text-xs text-slate-500 font-normal">Switch Roadmap</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        
        {LEARNING_PATHS.map((path) => (
          <Link key={path.slug} href={`/${path.slug}`}>
            <DropdownMenuItem 
              className={`cursor-pointer focus:bg-zinc-800 focus:text-white ${currentSlug === path.slug ? 'bg-zinc-800/50' : ''}`}
            >
              <path.icon className={`mr-2 h-4 w-4 ${path.color}`} />
              <span>{path.title}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}