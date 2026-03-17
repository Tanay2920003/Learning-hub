import { Navbar } from "@/components/Navbar";
import { PathCard } from "@/components/PathCard";
import { Code2, Database, LayoutTemplate, Cpu, Server, BrainCircuit, Gamepad2 } from "lucide-react";

const LEARNING_PATHS = [
  { title: "Web Development", slug: "webdev", description: "Master front-end and back-end development from scratch.", icon: LayoutTemplate, colorClass: "text-blue-400" },
  { title: "Data Structures", slug: "dsa", description: "Ace your coding interviews with optimized algorithms.", icon: Code2, colorClass: "text-emerald-400" },
  { title: "Machine Learning", slug: "ml", description: "Dive into AI, neural networks, and data science.", icon: BrainCircuit, colorClass: "text-purple-400" },
  { title: "Database Management", slug: "dbms", description: "Learn SQL, NoSQL, and database system design.", icon: Database, colorClass: "text-orange-400" },
  { title: "Operating Systems", slug: "os", description: "Understand memory, processes, and kernel architecture.", icon: Cpu, colorClass: "text-rose-400" },
  { title: "System Design", slug: "system-design", description: "Architect scalable and distributed software systems.", icon: Server, colorClass: "text-cyan-400" },
  { title: "Game Development", slug: "game-development", description: "Master Unity and Unreal Engine with premium resources.", icon: Gamepad2, colorClass: "text-green-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-24">

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 mt-10">

          <div className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Premium Resources Directory
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.15] sm:leading-[1.1]">
            Master Your Craft with <br className="hidden sm:block" />
            <span className="text-slate-200">
              Curated Roadmaps.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light px-2">
            Choose your path, follow our guided sequences, and build real-world projects. High-quality learning resources, completely open-source.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => (
            <PathCard key={path.slug} {...path} />
          ))}
        </div>
      </main>
    </div>
  );
}