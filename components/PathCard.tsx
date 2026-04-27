import Link from "next/link";
import Image from "next/image";
import { createElement, type ElementType } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface PathCardProps {
  title: string;
  description: string;
  slug: string;
  icon: unknown;
  color: string;
}

// Map slug/color hints to rich gradient sets
const CARD_GRADIENTS = [
  { from: "from-violet-600", to: "to-indigo-600", glow: "shadow-violet-500/20", border: "hover:border-violet-500/40", bg: "bg-violet-500/10", text: "text-violet-300" },
  { from: "from-cyan-500", to: "to-sky-600", glow: "shadow-cyan-500/20", border: "hover:border-cyan-500/40", bg: "bg-cyan-500/10", text: "text-cyan-300" },
  { from: "from-emerald-500", to: "to-teal-600", glow: "shadow-emerald-500/20", border: "hover:border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-300" },
  { from: "from-rose-500", to: "to-pink-600", glow: "shadow-rose-500/20", border: "hover:border-rose-500/40", bg: "bg-rose-500/10", text: "text-rose-300" },
  { from: "from-amber-500", to: "to-orange-600", glow: "shadow-amber-500/20", border: "hover:border-amber-500/40", bg: "bg-amber-500/10", text: "text-amber-300" },
  { from: "from-fuchsia-500", to: "to-purple-600", glow: "shadow-fuchsia-500/20", border: "hover:border-fuchsia-500/40", bg: "bg-fuchsia-500/10", text: "text-fuchsia-300" },
  { from: "from-sky-500", to: "to-blue-600", glow: "shadow-sky-500/20", border: "hover:border-sky-500/40", bg: "bg-sky-500/10", text: "text-sky-300" },
  { from: "from-lime-500", to: "to-green-600", glow: "shadow-lime-500/20", border: "hover:border-lime-500/40", bg: "bg-lime-500/10", text: "text-lime-300" },
];

function renderIcon(icon: unknown, color: string) {
  if (typeof icon === "string" && icon.startsWith("http")) {
    return <Image src={icon} alt="" width={32} height={32} className="h-7 w-7 object-contain sm:h-8 sm:w-8" unoptimized />;
  }

  if (typeof icon === "string") {
    return <span className="text-[1.65rem] leading-none sm:text-[1.9rem]">{icon}</span>;
  }

  if (typeof icon === "function") {
    return createElement(icon as ElementType, { className: `h-5 w-5 sm:h-6 sm:w-6 ${color}` });
  }

  return <span className="text-[1.65rem] leading-none sm:text-[1.9rem]">📁</span>;
}

export function PathCard({ title, description, slug, icon, color }: PathCardProps) {
  // Use slug hash for consistent color per card
  const hash = slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const grad = CARD_GRADIENTS[hash % CARD_GRADIENTS.length];

  return (
    <Link href={`/${slug}`}>
      <Card className={`group relative overflow-hidden bg-card/60 border-white/6 ${grad.border} transition-all duration-300 cursor-pointer h-full hover:shadow-lg ${grad.glow}`}>
        {/* Top gradient bar */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${grad.from} ${grad.to} opacity-60 group-hover:opacity-100 transition-opacity`} />

        {/* Subtle inner glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${grad.from.replace("from-", "from-")}/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <CardHeader className="relative z-10 pb-4">
          {/* Icon box */}
          <div className={`mb-4 flex w-fit items-center justify-center rounded-xl border border-white/6 ${grad.bg} p-3 sm:rounded-2xl sm:p-3.5 transition-transform group-hover:scale-110 duration-300`}>
            {renderIcon(icon, `${grad.text}`)}
          </div>

          <CardTitle className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-white sm:text-xl">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-sm leading-6 text-slate-500 sm:text-[0.9rem]">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 mt-auto flex items-center gap-1.5 text-sm font-medium sm:text-[0.9rem]">
          <span className={`${grad.text} opacity-70 group-hover:opacity-100 transition-all`}>Start Journey</span>
          <ArrowRight className={`h-4 w-4 ${grad.text} opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100`} />
        </CardContent>
      </Card>
    </Link>
  );
}
