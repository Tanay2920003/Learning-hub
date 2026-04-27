import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
  isNew?: boolean;
}

const REPO_OWNER = "Tanay2920003";

// Assign a gradient ring color based on index/name hash
const AVATAR_GRADIENTS = [
  "from-violet-500 to-indigo-500",
  "from-cyan-500 to-sky-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
];

export function ContributorCard({ contributor }: { contributor: Contributor }) {
  const isOwner = contributor.login === REPO_OWNER;

  // Pick gradient by login hash
  const hash = contributor.login.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const gradient = AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];

  return (
    <Card className="group relative bg-card/50 border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-black/30">
      {/* Subtle top gradient bar matching avatar color */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

      <CardContent className="p-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="absolute top-4 right-4">
          {isOwner ? (
            <Badge className="bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 border-0 gap-1">
              <Star className="h-2.5 w-2.5 fill-violet-400 text-violet-400" />
              Owner
            </Badge>
          ) : contributor.isNew ? (
            <Badge className="bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border-0">
              New 🚀
            </Badge>
          ) : null}
        </div>

        {/* Avatar with gradient ring */}
        <div className={`p-[2px] rounded-full bg-gradient-to-br ${gradient} mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
          <div className="rounded-full overflow-hidden border-2 border-[#0d0d0d]">
            <Image
              src={contributor.avatar_url}
              alt={contributor.login}
              width={88}
              height={88}
              className="w-22 h-22 object-cover"
            />
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors truncate w-full mb-1">
          {contributor.login}
        </h3>
        <p className="text-xs text-slate-600 mb-5">
          <span className="text-slate-500 font-medium">{contributor.contributions}</span>{" "}
          {contributor.contributions === 1 ? "commit" : "commits"}
        </p>

        <Link href={contributor.html_url} target="_blank" className="mt-auto w-full">
          <Button
            variant="ghost"
            className="w-full rounded-xl border border-white/5 bg-white/3 hover:bg-white/6 hover:border-white/10 text-slate-400 hover:text-white cursor-pointer gap-2 transition-all"
          >
            <Github className="h-4 w-4" />
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
