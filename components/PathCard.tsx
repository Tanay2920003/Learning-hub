import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTrackIcon, TRACK_SPECS } from "@/components/icons";

interface PathCardProps {
  title: string;
  description: string;
  slug: string;
  icon?: unknown;
  color?: string;
  courseCount?: number;
  articleCount?: number;
}

export function PathCard({ title, description, slug, courseCount, articleCount }: PathCardProps) {
  const spec = TRACK_SPECS[slug];
  const accentColor = spec?.color || "text-[#2997ff]";
  const bgGlow = spec?.bgGlow || "rgba(41, 151, 255, 0.15)";
  const borderHover = spec?.borderColor || "hover:border-[#2997ff]/40";

  return (
    <Link href={`/${slug}`} className="block h-full group">
      <Card
        className={`relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121215]/80 p-6 transition-all duration-300 ${borderHover} hover:bg-[#18181d] hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1 active:scale-[0.98] backdrop-blur-xl`}
      >
        {/* Specular hairline top reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Ambient track color glow on hover */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: bgGlow }}
        />

        <CardHeader className="p-0 flex flex-col justify-between h-full">
          <div>
            <div className="mb-4 flex items-center justify-between">
              {/* Bespoke Vector Icon Squircle */}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-110 ${accentColor}`}
              >
                {getTrackIcon(slug, "h-7 w-7")}
              </div>

              {/* Course & Resource Counter Badge */}
              <div className="flex items-center gap-1.5">
                {courseCount !== undefined && courseCount > 0 ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/60 tracking-wider">
                    {courseCount} courses
                  </span>
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/50 tracking-wider">
                    Curriculum
                  </span>
                )}
              </div>
            </div>

            <CardTitle className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-white">
              {title}
            </CardTitle>

            <CardDescription className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-2">
              {description}
            </CardDescription>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-xs font-medium text-white/40 transition-colors group-hover:text-white/80">
              {articleCount ? `${articleCount} articles & roadmaps` : "Explore Roadmap"}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white group-hover:text-black group-hover:scale-105">
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
