import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-14 sm:py-20">
        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#30d158]/15 border border-[#30d158]/30 text-[#30d158]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="mt-1 text-sm text-white/50">
              Effective Date: November 14, 2026 · Last Updated: November 14, 2026
            </p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p>
              Learning Hub (&ldquo;the App&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an open-source developer learning directory. We are committed to protecting your privacy. This Privacy Policy describes how we handle information when you use our web application or mobile WebView application.
            </p>
            <p>
              <strong className="text-white">We do not collect, store, or sell any personal data.</strong> Learning Hub does not require an account, login, or registration of any kind.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">2. Information We Do Not Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>No names, email addresses, or personal identifiers</li>
              <li>No location data</li>
              <li>No payment or financial information</li>
              <li>No usage analytics or telemetry (we do not use Google Analytics, Mixpanel, or similar services)</li>
              <li>No cookies set by us</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">3. Local Storage (&ldquo;Saved Library&rdquo;)</h2>
            <p>
              The &ldquo;Saved Library&rdquo; (Watch Later / Bookmarks) feature stores your saved course and resource selections exclusively in your <strong className="text-white">device&rsquo;s local browser storage (localStorage)</strong>. This data:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Never leaves your device</li>
              <li>Is never transmitted to our servers or any third party</li>
              <li>Can be cleared at any time by clearing your browser&rsquo;s site data or using the &ldquo;Clear Library&rdquo; button in the Library Drawer</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">4. Third-Party Services & External Links</h2>
            <p>
              Learning Hub links to external developer platforms and resources (including YouTube, GitHub, documentation sites, and interactive tools). When you follow an external link, you leave Learning Hub and interact directly with those platforms under their respective privacy policies:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">YouTube / Google</strong> — Governed by the{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2997ff] hover:underline">
                  Google Privacy Policy
                </a>.
              </li>
              <li>
                <strong className="text-white">GitHub, documentation sites, and external tools</strong> — External links open on third-party websites governed by their own privacy policies.
              </li>
            </ul>
            <p>
              We are not responsible for the privacy practices or content of third-party platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">5. Hosting & Infrastructure</h2>
            <p>
              This application is hosted on <strong className="text-white">Vercel</strong>. Vercel may collect standard server access logs (IP addresses, request timestamps) as part of their infrastructure. We do not access or use this data. See{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#2997ff] hover:underline">
                Vercel&rsquo;s Privacy Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">6. Children&rsquo;s Privacy</h2>
            <p>
              Learning Hub does not knowingly collect information from children under the age of 13 (or 16 in the EU/EEA under GDPR). If you are a parent or guardian and believe your child has used this application, please contact us — there is no personal data to delete, as we collect none.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected with an updated &ldquo;Last Updated&rdquo; date at the top of this page. Continued use of the application after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">8. Contact</h2>
            <p>
              This project is open source. For questions, concerns, or requests related to this Privacy Policy, please{" "}
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

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-white/50 mt-10">
            <p>
              Learning Hub is an independent open-source project and is <strong className="text-white/70">not affiliated with, endorsed by, or sponsored by</strong> YouTube, Google, GitHub, or any other platform referenced in this application.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 text-sm">
          <Link href="/terms" className="text-[#2997ff] hover:underline">Terms of Use →</Link>
          <Link href="/" className="text-white/50 hover:text-white transition-colors">← Back to Learning Hub</Link>
        </div>
      </main>
    </div>
  );
}
