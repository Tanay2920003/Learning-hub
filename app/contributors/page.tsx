"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Search, ChevronRight, Trophy, Rocket, ShieldAlert, Users, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ContributorCard } from "@/components/ContributorCard";
import BookLoader from "@/components/BookLoader/BookLoader";
import type { LucideIcon } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
  isNew?: boolean;
}

interface ContributorFilterOption {
  id: "all" | "new" | "top" | "owner";
  label: string;
  icon?: LucideIcon;
  activeClass: string;
}

const REPO_OWNER = "Tanay2920003";
const REPO_NAME = "Learning-hub";
const FILTERS: ContributorFilterOption[] = [
  { id: "all", label: "All Contributors", activeClass: "bg-white/15 text-white border-white/20" },
  { id: "new", label: "New Joiners", icon: Rocket, activeClass: "bg-[#2997ff]/15 text-[#2997ff] border-[#2997ff]/25" },
  { id: "top", label: "Top Committers", icon: Trophy, activeClass: "bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/25" },
  { id: "owner", label: "Maintainer", icon: ShieldAlert, activeClass: "bg-[#30d158]/15 text-[#30d158] border-[#30d158]/25" },
] as const;

type ContributorFilter = (typeof FILTERS)[number]["id"];

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ContributorFilter>("all");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contributorsRes, commitsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`),
          fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=100`),
        ]);

        if (!contributorsRes.ok) throw new Error("Failed to fetch");

        const contributorsData = await contributorsRes.json();
        const commitsData = await commitsRes.json();

        const recentAuthors = new Set<string>();
        if (Array.isArray(commitsData)) {
          for (const commit of commitsData) {
            if (commit.author?.login) recentAuthors.add(commit.author.login);
          }
        }

        const processed = contributorsData
          .map((c: Contributor) => ({
            ...c,
            isNew: recentAuthors.has(c.login) && c.contributions <= 5,
          }))
          .sort((a: Contributor, b: Contributor) => {
            if (a.login === REPO_OWNER) return -1;
            if (b.login === REPO_OWNER) return 1;
            return b.contributions - a.contributions;
          });

        setContributors(processed);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredContributors = contributors.filter((c) => {
    const matchesSearch = c.login.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "new") return matchesSearch && c.isNew;
    if (activeFilter === "owner") return matchesSearch && c.login === REPO_OWNER;
    if (activeFilter === "top") return matchesSearch && contributors.indexOf(c) < 5;

    return matchesSearch;
  });

  const visibleContributors = filteredContributors.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-8 md:pt-12 pb-24 max-w-6xl">
        {/* Breadcrumb back */}
        <nav className="flex items-center text-xs font-medium text-white/40 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 mx-2 text-white/30" />
          <span className="text-white/80">Contributors</span>
        </nav>

        {/* Apple Developer Showcase Header */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-12 backdrop-blur-2xl">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-[90px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-white/80 mb-4">
                <Users className="h-3.5 w-3.5 text-[#2997ff]" />
                Open Source Hall of Fame
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                Built by <span className="gradient-text">Developers</span>, for Everyone.
              </h1>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
                Recognizing the engineers and creators making developer education universally accessible.
                Contribute on GitHub to see your avatar featured here.
              </p>
            </div>

            <Link href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs sm:text-sm px-6 h-11 shadow-lg transition-all hover:scale-105 gap-2">
                <Github className="h-4 w-4" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters & Minimal Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Filter by GitHub username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 h-11 rounded-full border border-white/10 bg-white/[0.04] text-white placeholder:text-white/40 text-xs sm:text-sm focus-visible:border-white/20 focus-visible:ring-1 focus-visible:ring-white/20 backdrop-blur-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <Button
                key={filter.id}
                variant="outline"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full h-11 px-4 text-xs font-medium transition-all ${
                  activeFilter === filter.id
                    ? `${filter.activeClass} shadow-md`
                    : "bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {filter.icon && <filter.icon className="h-3.5 w-3.5 mr-1.5" />}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Contributors Grid */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <BookLoader />
          </div>
        ) : (
          <>
            {visibleContributors.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
                {visibleContributors.map((c) => (
                  <ContributorCard key={c.login} contributor={c} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-base font-medium text-white/80">No contributors found</p>
                <p className="mt-1 text-xs text-white/40">Try searching for a different handle or switch filters.</p>
              </div>
            )}

            {visibleContributors.length < filteredContributors.length && (
              <div className="mt-12 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((p) => p + 12)}
                  className="rounded-full border border-white/10 bg-white/5 px-6 text-xs text-white/70 hover:bg-white/10 hover:text-white gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#2997ff]" />
                  Load More ({filteredContributors.length - visibleContributors.length} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
