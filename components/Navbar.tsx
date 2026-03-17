"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Users, Menu, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-100 tracking-tight">Learning Hub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contributors">
            <Button variant="ghost" size="sm" className="text-slate-300 cursor-pointer hover:text-white hover:bg-slate-800">
              <Users className="h-4 w-4 mr-2" />
              Contributors
            </Button>
          </Link>
          <Link href="https://github.com/Tanay2920003/Learning-hub" target="_blank">
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-900 cursor-pointer text-slate-200 hover:bg-slate-800 hover:text-white">
              <Github className="h-4 w-4 mr-2" />
              Open Source
            </Button>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl absolute w-full left-0 top-16 px-4 py-4 flex flex-col gap-3 shadow-2xl">
          <Link href="/contributors" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800">
              <Users className="h-5 w-5 mr-3" />
              Contributors
            </Button>
          </Link>
          <Link href="https://github.com/Tanay2920003/Learning-hub" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-start cursor-pointer border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white">
              <Github className="h-5 w-5 mr-3" />
              Open Source
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}