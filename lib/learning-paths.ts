import { promises as fs } from "fs";
import path from "path";

interface CategoryFileData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  playlists?: unknown[];
  articles?: unknown[];
}

export interface LearningPathSummary {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  courseCount?: number;
  articleCount?: number;
}

export interface FeaturedCourse {
  title: string;
  creator: string;
  url: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videoCount: number;
  description: string;
  year: number;
  category: string;
  categorySlug: string;
  icon?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");

// In-memory server cache to avoid re-reading disk on every request
let _cachedLearningPaths: LearningPathSummary[] | null = null;
let _cachedAllCourses: FeaturedCourse[] | null = null;

const LEGACY_ORDER = [
  "webdev",
  "mobile-app-development",
  "coding-languages",
  "dsa",
  "system-design",
  "ml",
  "dbms",
  "os",
  "cs-fundamentals",
  "cybersecurity",
  "devops",
  "data-engineering",
  "blockchain-web3",
  "game-development",
  "tools",
  "github",
  "roadmaps",
  "community-sites-and-projects",
];

const GROUPED_LANGUAGE_SLUGS = new Set(["c", "java", "python"]);

const COLOR_SEQUENCE = [
  "text-blue-400",
  "text-emerald-400",
  "text-purple-400",
  "text-orange-400",
  "text-rose-400",
  "text-cyan-400",
  "text-green-400",
  "text-amber-400",
  "text-pink-400",
];

function comparePaths(a: CategoryFileData, b: CategoryFileData) {
  const aIndex = LEGACY_ORDER.indexOf(a.slug);
  const bIndex = LEGACY_ORDER.indexOf(b.slug);

  if (aIndex !== -1 || bIndex !== -1) {
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }

  return a.name.localeCompare(b.name);
}

export async function getLearningPaths(): Promise<LearningPathSummary[]> {
  if (_cachedLearningPaths) {
    return _cachedLearningPaths;
  }

  try {
    const files = await fs.readdir(DATA_DIR);
    const categories = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          try {
            const filePath = path.join(DATA_DIR, file);
            const fileContents = await fs.readFile(filePath, "utf8");
            const data = JSON.parse(fileContents) as CategoryFileData;

            if (!data?.slug || !data?.name || !data?.description || !data?.icon) {
              return null;
            }

            if (GROUPED_LANGUAGE_SLUGS.has(data.slug)) {
              return null;
            }

            return data;
          } catch (error) {
            console.error(`Failed to load learning path from ${file}`, error);
            return null;
          }
        }),
    );

    const result = categories
      .filter((category): category is CategoryFileData => category !== null)
      .sort(comparePaths)
      .map((category, index) => ({
        title: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        color: COLOR_SEQUENCE[index % COLOR_SEQUENCE.length],
        courseCount: Array.isArray(category.playlists) ? category.playlists.length : 0,
        articleCount: Array.isArray(category.articles) ? category.articles.length : 0,
      }));

    _cachedLearningPaths = result;
    return result;
  } catch (error) {
    console.error("Failed to load learning paths", error);
    return [];
  }
}

export async function getAllCourses(): Promise<FeaturedCourse[]> {
  if (_cachedAllCourses) {
    return _cachedAllCourses;
  }

  try {
    const files = await fs.readdir(DATA_DIR);
    const allCourses: FeaturedCourse[] = [];

    for (const file of files.filter((f) => f.endsWith(".json"))) {
      try {
        const filePath = path.join(DATA_DIR, file);
        const raw = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(raw);
        const catName = data.name || "";
        const catSlug = data.slug || file.replace(".json", "");
        const icon = data.icon || "";

        for (const p of data.playlists || []) {
          allCourses.push({
            title: p.title,
            creator: p.creator || "Learning Hub",
            url: p.url,
            language: p.language || "English",
            difficulty: p.difficulty || "beginner",
            videoCount: p.videoCount || 10,
            description: p.description || "",
            year: p.year || 2024,
            category: catName,
            categorySlug: catSlug,
            icon,
          });
        }
      } catch (err) {
        console.error(`Error loading courses from ${file}:`, err);
      }
    }

    // Interleave courses across categories so top results have rich diversity
    const categoryBuckets: Record<string, FeaturedCourse[]> = {};
    for (const c of allCourses) {
      if (!categoryBuckets[c.categorySlug]) {
        categoryBuckets[c.categorySlug] = [];
      }
      categoryBuckets[c.categorySlug].push(c);
    }

    const interleaved: FeaturedCourse[] = [];
    const keys = Object.keys(categoryBuckets);
    let hasMore = true;
    let round = 0;
    while (hasMore) {
      hasMore = false;
      for (const k of keys) {
        if (round < categoryBuckets[k].length) {
          interleaved.push(categoryBuckets[k][round]);
          hasMore = true;
        }
      }
      round++;
    }

    _cachedAllCourses = interleaved;
    return interleaved;
  } catch (error) {
    console.error("Failed to load all courses:", error);
    return [];
  }
}

/**
 * Returns a fast, lightweight subset (180 courses across all 21 categories)
 * for instant server-side page rendering and minimal network payload.
 */
export async function getInitialFeaturedCourses(limit = 180): Promise<FeaturedCourse[]> {
  const all = await getAllCourses();
  return all.slice(0, limit);
}
