"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Search, ChevronRight, Trophy, Rocket, ShieldAlert, Users, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  { id: "all", label: "All", activeClass: "bg-violet-500/15 text-violet-200 border-violet-500/30" },
  { id: "new", label: "New", icon: Rocket, activeClass: "bg-cyan-500/15 text-cyan-200 border-cyan-500/30" },
  { id: "top", label: "Top", icon: Trophy, activeClass: "bg-amber-500/15 text-amber-200 border-amber-500/30" },
  { id: "owner", label: "Owner", icon: ShieldAlert, activeClass: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30" },
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
            if (a.login === REPO_OWNER) return 1;
            if (b.login === REPO_OWNER) return -1;
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
    if (activeFilter === "top") return matchesSearch && contributors.indexOf(c) < 3;

    return matchesSearch;
  });

  const visibleContributors = filteredContributors.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-12 pb-24 max-w-7xl">

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-slate-600 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-700" />
          <span className="text-slate-300">Contributors</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-sm font-medium text-violet-300 mb-5">
              <Users className="h-3.5 w-3.5" />
              Open Source Community
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Amazing <span className="gradient-text">Contributors</span>
            </h1>
            <p className="text-base text-slate-400 font-light leading-relaxed">
              Meet the people helping grow this open-source hub. Want to be featured here?
              Open a contribution on GitHub and join the list.
            </p>
          </div>

          <Link href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} target="_blank">
            <Button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white border-0 px-6 h-11 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/30 hover:scale-105 transition-all gap-2 cursor-pointer">
              <Github className="h-4 w-4" />
              Contribute Now
            </Button>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search by GitHub handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/3 border-white/8 text-slate-200 placeholder:text-slate-600 h-10 rounded-full focus-visible:ring-violet-500/30 focus-visible:border-violet-500/30"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <Button
                key={filter.id}
                variant="outline"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full h-10 px-4 text-sm cursor-pointer gap-1.5 transition-all ${
                  activeFilter === filter.id
                    ? `${filter.activeClass} shadow-sm`
                    : "bg-transparent border-white/8 text-slate-500 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                {filter.icon && <filter.icon className="h-3.5 w-3.5" />}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <BookLoader />
          </div>
        ) : (
          <>
            {visibleContributors.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {visibleContributors.map((c) => (
                  <ContributorCard key={c.login} contributor={c} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/3">
                  <Users className="h-7 w-7 text-slate-600" />
                </div>
                <p className="text-base font-medium text-slate-300">No contributors found</p>
                <p className="mt-1 text-sm text-slate-600">Try a different filter or search term</p>
              </div>
            )}

            {visibleContributors.length < filteredContributors.length && (
              <div className="mt-12 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((p) => p + 12)}
                  className="rounded-full border-white/8 text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer gap-2"
                >
                  <Sparkles className="h-4 w-4 text-violet-400" />
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
