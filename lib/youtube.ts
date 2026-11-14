/**
 * Utilities to extract YouTube video & playlist IDs, embed URLs, and thumbnail assets.
 */

export interface YouTubeInfo {
  isYouTube: boolean;
  type: "playlist" | "video" | "other";
  id: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
}

export function parseYouTubeUrl(url: string): YouTubeInfo {
  if (!url) {
    return { isYouTube: false, type: "other", id: null, embedUrl: null, thumbnailUrl: null };
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    // Check if YouTube domain
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      const vId = parsed.searchParams.get("v");
      const listId = parsed.searchParams.get("list");

      // Check for /watch?v=ID (even if inside a playlist)
      if (vId) {
        return {
          isYouTube: true,
          type: listId ? "playlist" : "video",
          id: listId || vId,
          embedUrl: listId
            ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(listId)}&autoplay=1`
            : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(vId)}?autoplay=1`,
          thumbnailUrl: `https://img.youtube.com/vi/${vId}/hqdefault.jpg`,
        };
      }

      // Check for pure /playlist?list=ID
      if (listId) {
        return {
          isYouTube: true,
          type: "playlist",
          id: listId,
          embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(listId)}&autoplay=1`,
          thumbnailUrl: null,
        };
      }

      // Check for youtu.be/ID
      if (host.includes("youtu.be")) {
        const id = parsed.pathname.replace(/^\//, "");
        if (id) {
          return {
            isYouTube: true,
            type: "video",
            id,
            embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`,
            thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          };
        }
      }
    }
  } catch {
    // Invalid URL fallback
  }

  return { isYouTube: false, type: "other", id: null, embedUrl: null, thumbnailUrl: null };
}

/**
 * Generate a consistent, aesthetic gradient thumbnail background
 * based on category, title, or language for a YouTube-like aesthetic.
 */
export function getFallbackThumbnailGradient(categoryOrLang: string): string {
  const norm = (categoryOrLang || "").toLowerCase();

  if (norm.includes("web") || norm.includes("react") || norm.includes("next")) {
    return "from-[#1a1c2e] via-[#0d1b2a] to-[#0b2545]";
  }
  if (norm.includes("mobile") || norm.includes("flutter") || norm.includes("swift")) {
    return "from-[#1e102a] via-[#160d24] to-[#2d0047]";
  }
  if (norm.includes("python") || norm.includes("ml") || norm.includes("ai")) {
    return "from-[#0a1f1c] via-[#081815] to-[#043329]";
  }
  if (norm.includes("c") || norm.includes("os") || norm.includes("kernel")) {
    return "from-[#1f1712] via-[#1a120c] to-[#3a1b0b]";
  }
  if (norm.includes("java") || norm.includes("spring")) {
    return "from-[#221010] via-[#1a0a0a] to-[#3a1010]";
  }
  if (norm.includes("dsa") || norm.includes("algo")) {
    return "from-[#15132a] via-[#100e24] to-[#22194d]";
  }
  if (norm.includes("design") || norm.includes("system")) {
    return "from-[#0d1e2d] via-[#08131d] to-[#123048]";
  }
  if (norm.includes("security") || norm.includes("cyber") || norm.includes("hack")) {
    return "from-[#220d1f] via-[#150a18] to-[#3a0b35]";
  }
  if (norm.includes("devops") || norm.includes("cloud") || norm.includes("docker")) {
    return "from-[#0c2229] via-[#08181d] to-[#0d3440]";
  }
  if (norm.includes("blockchain") || norm.includes("web3") || norm.includes("crypto")) {
    return "from-[#251e0c] via-[#1a1408] to-[#3d300e]";
  }
  return "from-[#1c1c1c] via-[#141414] to-[#262626]";
}
