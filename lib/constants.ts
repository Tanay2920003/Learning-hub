import { LayoutTemplate, Code2, BrainCircuit, Database, Cpu, Server, Gamepad2 } from "lucide-react";

export const LEARNING_PATHS = [
  { title: "Web Development", slug: "webdev", description: "Master front-end and back-end development from scratch.", icon: LayoutTemplate, color: "text-blue-400" },
  { title: "Data Structures", slug: "dsa", description: "Ace your coding interviews with optimized algorithms.", icon: Code2, color: "text-emerald-400" },
  { title: "Machine Learning", slug: "ml", description: "Dive into AI, neural networks, and data science.", icon: BrainCircuit, color: "text-purple-400" },
  { title: "Database Management", slug: "dbms", description: "Learn SQL, NoSQL, and database system design.", icon: Database, color: "text-orange-400" },
  { title: "Operating Systems", slug: "os", description: "Understand memory, processes, and kernel architecture.", icon: Cpu, color: "text-rose-400" },
  { title: "System Design", slug: "system-design", description: "Architect scalable and distributed software systems.", icon: Server, color: "text-cyan-400" },
  { title: "Game Development", slug: "game-development", description: "Master Unity and Unreal Engine with premium resources.", icon: Gamepad2, color: "text-green-400" },
];