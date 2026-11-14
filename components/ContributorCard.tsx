import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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

export function ContributorCard({ contributor }: { contributor: Contributor }) {
  const isOwner = contributor.login === REPO_OWNER;

  return (
    <div className="group relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/70">
      {/* Specular hairline top reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Role / Status Badge */}
      <div className="absolute top-3.5 right-3.5">
        {isOwner ? (
          <Badge className="border-0 bg-[#bf5af2]/15 text-[#bf5af2] text-[10px] px-2 py-0.5 rounded-full font-medium gap-1">
            <Star className="h-2.5 w-2.5 fill-[#bf5af2] text-[#bf5af2]" />
            Maintainer
          </Badge>
        ) : contributor.isNew ? (
          <Badge className="border-0 bg-[#64d2ff]/15 text-[#64d2ff] text-[10px] px-2 py-0.5 rounded-full font-medium">
            New
          </Badge>
        ) : null}
      </div>

      {/* Avatar with Specular Ring */}
      <div className="mt-3 mb-4 p-0.5 rounded-full border border-white/15 bg-white/5 shadow-md transition-transform duration-300 group-hover:scale-105">
        <div className="h-20 w-20 sm:h-22 sm:w-22 overflow-hidden rounded-full border border-black">
          <Image
            src={contributor.avatar_url}
            alt={contributor.login}
            width={88}
            height={88}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Identity */}
      <h3 className="w-full truncate text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-white transition-colors">
        {contributor.login}
      </h3>
      <p className="mt-0.5 mb-5 text-[11px] text-white/45">
        <span className="font-medium text-white/70">{contributor.contributions}</span>{" "}
        {contributor.contributions === 1 ? "contribution" : "contributions"}
      </p>

      {/* GitHub Profile Action */}
      <Link href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="w-full">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-2 text-xs font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white hover:text-black active:scale-95"
        >
          <Github className="h-3.5 w-3.5" />
          <span>Profile</span>
        </button>
      </Link>
    </div>
  );
}
