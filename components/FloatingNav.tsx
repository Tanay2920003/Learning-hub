"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  ArrowUp,
  X,
  Search,
  Home,
  Users,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

interface RouteItem {
  name: string;
  href: string;
  category: "Pages" | "Development" | "Computer Science" | "Cloud & Security" | "Tools & Community";
  description: string;
  badge?: string;
}

const ALL_ROUTES: RouteItem[] = [
  // Core Pages
  {
    name: "Home",
    href: "/",
    category: "Pages",
    description: "Browse all learning categories, roadmaps, and community projects",
    badge: "Main",
  },
  {
    name: "Contributors",
    href: "/contributors",
    category: "Pages",
    description: "Meet the open source engineers and creators behind Learning Hub",
    badge: "Team",
  },

  // Development & Languages
  {
    name: "Web Development",
    href: "/webdev",
    category: "Development",
    description: "HTML, CSS, JavaScript, React, Next.js, and Fullstack Engineering",
  },
  {
    name: "Mobile App Development",
    href: "/mobile-app-development",
    category: "Development",
    description: "Cross-platform mobile apps with React Native, Flutter, and Swift",
  },
  {
    name: "Coding Languages",
    href: "/coding-languages",
    category: "Development",
    description: "Core syntax, paradigms, and guides for popular programming languages",
  },
  {
    name: "Python",
    href: "/python",
    category: "Development",
    description: "Python programming from basics to scripting and backend",
  },
  {
    name: "Java",
    href: "/java",
    category: "Development",
    description: "Java fundamentals, OOP, collections, and enterprise patterns",
  },
  {
    name: "C Programming",
    href: "/c",
    category: "Development",
    description: "C language essentials, pointers, memory management, and data structures",
  },
  {
    name: "Game Development",
    href: "/game-development",
    category: "Development",
    description: "Unity, Unreal Engine, Godot, and game design principles",
  },

  // Computer Science Core
  {
    name: "Data Structures & Algorithms",
    href: "/dsa",
    category: "Computer Science",
    description: "Arrays, trees, graphs, dynamic programming, and complexity analysis",
  },
  {
    name: "System Design",
    href: "/system-design",
    category: "Computer Science",
    description: "High-level architecture, scalability, load balancing, and microservices",
  },
  {
    name: "Operating Systems",
    href: "/os",
    category: "Computer Science",
    description: "Processes, threads, CPU scheduling, memory management, and file systems",
  },
  {
    name: "Database Management",
    href: "/dbms",
    category: "Computer Science",
    description: "SQL, relational databases, indexing, normalization, and ACID transactions",
  },
  {
    name: "Machine Learning",
    href: "/ml",
    category: "Computer Science",
    description: "Supervised and unsupervised learning, neural networks, and PyTorch",
  },
  {
    name: "CS Fundamentals",
    href: "/cs-fundamentals",
    category: "Computer Science",
    description: "Computer organization, digital logic, networking, and memory architectures",
  },

  // Cloud & Security
  {
    name: "Cybersecurity & Hacking",
    href: "/cybersecurity",
    category: "Cloud & Security",
    description: "Ethical hacking, cryptography, web security, and network penetration",
  },
  {
    name: "Cloud & DevOps",
    href: "/devops",
    category: "Cloud & Security",
    description: "Docker, Kubernetes, AWS, CI/CD pipelines, and infrastructure as code",
  },
  {
    name: "Data Engineering",
    href: "/data-engineering",
    category: "Cloud & Security",
    description: "ETL pipelines, Apache Spark, Kafka streaming, and modern data warehouses",
  },
  {
    name: "Blockchain & Web3",
    href: "/blockchain-web3",
    category: "Cloud & Security",
    description: "Smart contracts, Solidity, Ethereum, cryptography, and dApp development",
  },

  // Tools & Community
  {
    name: "Community Sites & Projects",
    href: "/community-sites-and-projects",
    category: "Tools & Community",
    description: "Community platforms like BBD College Papers, Electronics 101, and AlgoViz",
    badge: "Interactive",
  },
  {
    name: "Developer Tools",
    href: "/tools",
    category: "Tools & Community",
    description: "Helpful developer utilities, formatters, and online tools",
  },
  {
    name: "Roadmaps",
    href: "/roadmaps",
    category: "Tools & Community",
    description: "Structured career roadmaps and visual guides for developers",
  },
  {
    name: "GitHub Guide",
    href: "/github",
    category: "Tools & Community",
    description: "Git fundamentals, branching workflows, PRs, and collaboration",
  },
];

const CATEGORIES = ["All", "Pages", "Development", "Computer Science", "Cloud & Security", "Tools & Community"] as const;

export function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Keyboard shortcut listener (Cmd+J / Ctrl+J opens Quick Jump)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdJ = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j";
      if (isCmdJ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("floating-nav:open", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("floating-nav:open", handleOpenEvent);
    };
  }, [isOpen]);

  // Track scroll position for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setFilterQuery("");
    router.push(href);
  };

  const filteredRoutes = useMemo(() => {
    return ALL_ROUTES.filter((route) => {
      const matchesCategory =
        selectedCategory === "All" || route.category === selectedCategory;
      const q = filterQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        route.name.toLowerCase().includes(q) ||
        route.description.toLowerCase().includes(q) ||
        route.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [filterQuery, selectedCategory]);

  return (
    <>
      {/* ── Fixed Floating Nav Pill (Bottom Center) ────────── */}
      <nav
        aria-label="Quick navigation"
        className="fixed bottom-20 md:bottom-6 left-1/2 z-40 -translate-x-1/2"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#121215]/85 p-1.5 shadow-2xl backdrop-blur-2xl">
          {/* Quick Jump / Guide trigger */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="h-9 rounded-full px-4 text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all gap-2"
          >
            <Compass className="h-4 w-4 text-[#2997ff]" />
            <span>Explore Tracks</span>
            <kbd className="hidden sm:inline-block rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-white/50">
              ⌘J
            </kbd>
          </Button>

          {/* Back to top button (conditional) */}
          {showScrollTop && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="size-9 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
        </div>
      </nav>

      {/* ── Quick Jump Navigation Overlay Modal ────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-2xl animate-in fade-in-0 duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex flex-col w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/15 bg-[#141418] shadow-2xl shadow-black/90 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Specular hairline top reflection */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#18181e] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[#2997ff]">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">All Learning Tracks</h2>
                  <p className="text-xs text-white/50">Instant jump to any curated curriculum or tool</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/40">
                  ESC to close
                </kbd>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="size-8 rounded-full text-white/50 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search filter input */}
            <div className="border-b border-white/[0.06] bg-[#16161b] px-6 py-3">
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1e1e24] px-4 py-2 text-sm text-white focus-within:border-blue-500/50">
                <Search className="h-4 w-4 text-white/40 shrink-0" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter 21 tracks, computer science topics, or guides..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none"
                  autoFocus
                />
                {filterQuery && (
                  <button
                    type="button"
                    onClick={() => setFilterQuery("")}
                    className="p-1 text-white/40 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Category pill chips */}
              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                        active
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Routes List Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
              {filteredRoutes.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {filteredRoutes.map((route) => {
                    const isCurrent = pathname === route.href;
                    const slug = route.href.replace(/^\//, "");
                    const trackSpec = TRACK_SPECS[slug];
                    const trackColor = trackSpec?.color || "text-[#2997ff]";

                    return (
                      <button
                        key={route.href}
                        type="button"
                        onClick={() => handleNavigate(route.href)}
                        className={`group flex items-start gap-3 rounded-2xl border p-3 text-left transition-all ${
                          isCurrent
                            ? "border-blue-500/40 bg-blue-500/10 text-white shadow-sm"
                            : "border-white/[0.06] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.06] text-white/80 hover:text-white"
                        }`}
                      >
                        {/* Icon container */}
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5 transition-transform group-hover:scale-110 ${trackColor}`}>
                          {route.name === "Home" ? (
                            <Home className="h-4 w-4 text-[#2997ff]" />
                          ) : route.name === "Contributors" ? (
                            <Users className="h-4 w-4 text-[#bf5af2]" />
                          ) : (
                            getTrackIcon(slug, "h-5 w-5")
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-xs font-semibold text-white">
                              {route.name}
                            </span>
                            {route.badge && (
                              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.2 text-[9px] font-semibold text-[#64d2ff]">
                                {route.badge}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-semibold text-[#30d158]">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-white/50">
                            {route.description}
                          </p>
                        </div>

                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/30 transition-opacity group-hover:text-white/70" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-white/40">
                  No learning tracks found matching &quot;{filterQuery}&quot;
                </div>
              )}
            </div>

            {/* Footer with track count */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#16161b] px-6 py-3 text-[11px] text-white/40">
              <span>Showing {filteredRoutes.length} of {ALL_ROUTES.length} learning tracks</span>
              <span>Learning Hub • Open Source Curriculum</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
