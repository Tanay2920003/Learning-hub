import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-14 sm:py-20">
        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff]">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
            <p className="mt-1 text-sm text-white/50">
              Effective Date: November 14, 2026 · Last Updated: November 14, 2026
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Learning Hub (available at this website or as a WebView mobile application), you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the application immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">2. Description of Service</h2>
            <p>
              Learning Hub is a <strong className="text-white">free, open-source curated directory</strong> of publicly available developer learning resources, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Direct links to curated YouTube playlists and video courses</li>
              <li>Links to documentation, articles, and developer tools hosted on third-party websites</li>
              <li>Community-built interactive projects and visualizers</li>
            </ul>
            <p>
              Learning Hub does <strong className="text-white">not</strong> host, store, produce, or own any video, course, or article content. All content belongs to its respective creators and platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">3. YouTube & Third-Party Content</h2>
            <p>
              Video resources and playlists indexed in this application link directly to their source on YouTube and other hosting platforms. When viewing content on YouTube, you are subject to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-[#2997ff] hover:underline">
                  YouTube Terms of Service
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2997ff] hover:underline">
                  Google Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              All video views, advertising, and creator monetization take place natively on the destination platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">4. No Affiliation Disclaimer</h2>
            <p>
              Learning Hub is an <strong className="text-white">independent open-source project</strong>. It is not affiliated with, endorsed by, sponsored by, or in any way officially connected to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>YouTube LLC or Google LLC</li>
              <li>GitHub Inc.</li>
              <li>Vercel Inc.</li>
              <li>Any course creator, instructor, channel, or institution whose content is linked herein</li>
            </ul>
            <p>
              All trademarks, service marks, and company names are the property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">5. Intellectual Property</h2>
            <p>
              The Learning Hub application code is released under the{" "}
              <a href="https://github.com/Tanay2920003/Learning-hub/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-[#2997ff] hover:underline">
                MIT License
              </a>. You are free to fork, modify, and redistribute the code under those terms.
            </p>
            <p>
              All third-party content (videos, articles, tools, documentation) remains the intellectual property of its respective owners. Learning Hub makes no claim of ownership over any external content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">6. Acceptable Use</h2>
            <p>You agree <strong className="text-white">not</strong> to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attempt to download, record, or redistribute YouTube video content in violation of YouTube&rsquo;s Terms of Service</li>
              <li>Use this application to circumvent any digital rights management (DRM) protections</li>
              <li>Reverse-engineer or misuse the application in ways that violate applicable law</li>
              <li>Use the application for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">7. Disclaimer of Warranties</h2>
            <p>
              Learning Hub is provided <strong className="text-white">&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without any warranty of any kind, express or implied. We do not guarantee the accuracy, completeness, or availability of any linked content. External links may become outdated, unavailable, or change without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Learning Hub and its contributors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use this application or any linked third-party content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">9. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Use at any time. Continued use after any changes constitutes acceptance of the updated terms. The &ldquo;Last Updated&rdquo; date at the top of this page will reflect any changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">10. Contact</h2>
            <p>
              For questions about these Terms, please{" "}
              <a
                href="https://github.com/Tanay2920003/Learning-hub/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2997ff] hover:underline"
              >
                open an issue on GitHub
              </a>.
            </p>
          </section>

          {/* Disclaimer & Trademark Notice */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2 mt-10">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Trademark Notice</p>
            <p className="text-xs text-white/50">
              YouTube is a trademark of Google LLC. Learning Hub is an independent open-source learning catalog and is not affiliated with, endorsed by, or sponsored by Google LLC, YouTube, or any indexed creator or company.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 text-sm">
          <Link href="/privacy" className="text-[#2997ff] hover:underline">Privacy Policy →</Link>
          <Link href="/" className="text-white/50 hover:text-white transition-colors">← Back to Learning Hub</Link>
        </div>
      </main>
    </div>
  );
}
