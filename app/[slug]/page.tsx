import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { PathContentView } from "@/components/PathContentView";
import { PathSwitcher } from "@/components/PathSwitcher";
import { getLearningPaths } from "@/lib/learning-paths";

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

export default async function RoadmapPage({ params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const [data, learningPaths] = await Promise.all([
        getCategoryData(resolvedParams.slug),
        getLearningPaths(),
    ]);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 md:pt-12 pt-6 pb-24 max-w-4xl">

                {/* Top navigation row */}
                <div className="flex justify-between items-center mb-8 md:mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-white transition-colors rounded-full border border-white/5 bg-white/3 hover:bg-white/5 px-3 py-1.5"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to paths
                    </Link>

                    <PathSwitcher currentSlug={resolvedParams.slug} paths={learningPaths} />
                </div>

                {/* Page header */}
                <div className="mb-10 md:mb-16 border-b border-white/5 pb-8 md:pb-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-5">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-white/8 bg-white/4 shadow-inner shadow-white/5">
                            {data.icon.startsWith('http') ? (
                                <Image
                                    src={data.icon}
                                    alt={data.name}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-contain"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-4xl">{data.icon}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                                {data.name}
                            </h1>
                        </div>
                    </div>

                    <p className="text-base sm:text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
                        {data.description}
                    </p>
                </div>

                <PathContentView playlists={data.playlists} articles={data.articles || []} categorySlug={data.slug} />

            </main>
        </div>
    );
}
