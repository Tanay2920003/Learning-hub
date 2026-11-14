import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#0a0a0a] pt-10 pb-24 md:pb-14 text-xs text-white/40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: Branding & mission */}
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20">
                <Image src="/logo.svg" alt="Learning Hub logo" width={24} height={24} className="h-5 w-5 object-contain" />
              </div>
              <span className="font-bold text-white/80 tracking-tight">Learning Hub</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                Open Source · MIT
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed text-[12px]">
              A free, open-source curated directory of developer learning resources. Not affiliated with YouTube, Google, or any linked platform.
            </p>
            <p className="text-[11px] text-white/25 leading-relaxed">
              Curated links direct to external content hosted on YouTube and third-party developer platforms, subject to the respective platform Terms of Service. Learning Hub is an independent open-source catalog.
            </p>
          </div>

          {/* Right: Navigation columns */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 text-[12px]">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Explore</p>
              <div className="flex flex-col gap-2 text-white/55">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/webdev" className="hover:text-white transition-colors">Web Dev</Link>
                <Link href="/dsa" className="hover:text-white transition-colors">DSA</Link>
                <Link href="/ml" className="hover:text-white transition-colors">Machine Learning</Link>
                <Link href="/roadmaps" className="hover:text-white transition-colors">Roadmaps</Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Community</p>
              <div className="flex flex-col gap-2 text-white/55">
                <Link href="/community-sites-and-projects" className="hover:text-white transition-colors">Projects</Link>
                <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
                <Link href="/contributors" className="hover:text-white transition-colors">Contributors</Link>
                <Link
                  href="https://github.com/Tanay2920003/Learning-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Legal</p>
              <div className="flex flex-col gap-2 text-white/55">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube ToS
                </a>
                <a
                  href="https://github.com/Tanay2920003/Learning-hub/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-6 text-[11px] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Learning Hub. Open source under the{" "}
            <a
              href="https://github.com/Tanay2920003/Learning-hub/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/50 transition-colors"
            >
              MIT License
            </a>
            . Not affiliated with YouTube, Google, or GitHub.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white/50 transition-colors underline underline-offset-2">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white/50 transition-colors underline underline-offset-2">Terms</Link>
            <span>·</span>
            <span>
              Press{" "}
              <kbd className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                ⌘K
              </kbd>{" "}
              to search
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
