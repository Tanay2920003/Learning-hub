import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/learning-paths";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = Math.min(Number(searchParams.get("limit")) || 48, 100);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);
    const shouldShuffle = searchParams.get("shuffle") === "true";

    let courses = await getAllCourses();

    if (category && category !== "all" && category !== "trending") {
      const normCat = category.toLowerCase();
      courses = courses.filter(
        (c) => c.categorySlug === normCat || c.category.toLowerCase().includes(normCat),
      );
    }

    if (shouldShuffle) {
      const copy = [...courses];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      courses = copy;
    }

    const paged = courses.slice(offset, offset + limit);

    return NextResponse.json(
      {
        courses: paged,
        total: courses.length,
        hasMore: offset + limit < courses.length,
      },
      {
        headers: {
          "Cache-Control": shouldShuffle
            ? "no-cache, no-store, must-revalidate"
            : "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Error in courses API:", error);
    return NextResponse.json({ error: "Failed to load courses" }, { status: 500 });
  }
}
