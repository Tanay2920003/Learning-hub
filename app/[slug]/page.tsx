import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Video, FileText } from "lucide-react";
import { PathContentView } from "@/components/PathContentView";
import { PathSwitcher } from "@/components/PathSwitcher";
import { Navbar } from "@/components/Navbar";
import { getLearningPaths } from "@/lib/learning-paths";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

interface CategoryData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  playlists: Playlist[];
  articles?: Article[];
}

interface Playlist {
  title: string;
  creator: string;
  url: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videoCount: number;
  description: string;
  year: number;
}

interface Article {
  title: string;
  url: string;
}

async function getCategoryData(slug: string): Promise<CategoryData | null> {
  try {
    const filePath = path.join(process.cwd(), "data", `${slug}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const paths = await getLearningPaths();
  return paths.map((p) => ({ slug: p.slug }));
}

export default async function RoadmapPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const [data, learningPaths] = await Promise.all([
    getCategoryData(resolvedParams.slug),
    getLearningPaths(),
  ]);

  if (!data) {
    notFound();
  }

  const courseCount = data.playlists?.length || 0;
  const articleCount = data.articles?.length || 0;

  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-6 md:pt-10 pb-24 max-w-5xl">
        {/* Top navigation row */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>All Learning Paths</span>
          </Link>

          <PathSwitcher currentSlug={resolvedParams.slug} paths={learningPaths} />
        </div>

        {/* Apple Product Header */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121215]/90 p-6 sm:p-10 backdrop-blur-2xl">
          {/* Specular hairline top reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Atmospheric background glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full blur-[90px] opacity-70"
            style={{ background: TRACK_SPECS[resolvedParams.slug]?.bgGlow || "rgba(41, 151, 255, 0.15)" }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div
              className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-3xl border border-white/12 bg-white/[0.05] p-3 shadow-inner ${
                TRACK_SPECS[resolvedParams.slug]?.color || "text-[#2997ff]"
              }`}
            >
              {getTrackIcon(data.slug, "h-10 w-10 sm:h-12 sm:w-12")}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                  Track
                </span>
                {courseCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-[#2997ff]">
                    <Video className="h-3 w-3" />
                    {courseCount} {courseCount === 1 ? "Course" : "Courses"}
                  </span>
                )}
                {articleCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-[#30d158]">
                    <FileText className="h-3 w-3" />
                    {articleCount} {articleCount === 1 ? "Article" : "Articles"}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                {data.name}
              </h1>
            </div>
          </div>

          <p className="relative z-10 text-sm sm:text-base text-white/60 leading-relaxed max-w-3xl font-normal">
            {data.description}
          </p>
        </div>

        {/* Content View with Apple Segmented Control and Cards */}
        <PathContentView playlists={data.playlists} articles={data.articles || []} categorySlug={data.slug} />
      </main>
    </div>
  );
}
