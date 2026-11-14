import { NextResponse } from "next/server";
import { searchResources } from "@/lib/search";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all";
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 30, 1), 60);

    const results = await searchResources(query, type, limit);

    return NextResponse.json(
      {
        results,
        count: results.length,
      },
      {
        headers: {
          "Cache-Control": query.trim()
            ? "public, max-age=120, s-maxage=3600, stale-while-revalidate=86400"
            : "public, max-age=300, s-maxage=86400",
        },
      },
    );
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 });
  }
}
