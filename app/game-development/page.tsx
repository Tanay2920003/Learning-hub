"use client";

import Link from "next/link";
import { ChevronLeft, ExternalLink, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const gameResources = [
  {
    id: "unity",
    name: "Unity Learn",
    url: "https://unity.com/learn",
    description: "Master real-time 3D development with official Unity tutorials, pathways, and projects.",
    icon: "🎮",
    color: "bg-indigo-500",
    category: "Game Engine",
  },
  {
    id: "unreal",
    name: "Unreal Engine",
    url: "https://www.unrealengine.com/en-US/learn",
    description: "Learn to create stunning, high-fidelity 3D experiences with Unreal Engine's official courses.",
    icon: "🎲",
    color: "bg-blue-500",
    category: "Game Engine",
  },
];

export default function GameDevelopment() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 pt-16 pb-24 max-w-5xl">
        
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-white transition-colors mb-8 md:mb-10">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to paths
        </Link>

        <div className="mb-12 border-b border-slate-800/60 pb-8 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-auto md:h-auto md:bg-zinc-900 md:p-3 rounded-2xl border border-zinc-800 shadow-inner bg-zinc-900/80">
              <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-slate-200" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Game Development
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            Master industry-standard game engines with premium, official learning resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameResources.map((resource) => (
            <Card key={resource.id} className="group bg-card/40 border-slate-800/60 hover:scale-[1.02] transition-all hover:border-slate-500 hover:bg-card/60 duration-300 overflow-hidden relative flex flex-col h-full">
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white to-transparent" />
              
              <CardContent className="p-6 sm:p-8 relative z-10 flex flex-col flex-grow">
                
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-xs font-medium text-slate-300">
                    <span className={`w-2 h-2 rounded-full mr-2 ${resource.color}`}></span>
                    {resource.category}
                  </div>
                  <span className="text-3xl">{resource.icon}</span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors mb-3">
                    {resource.name}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                    {resource.description}
                  </p>
                </div>

                <Link href={resource.url} target="_blank" className="mt-auto w-full">
                  <Button className="w-full bg-slate-100 text-slate-900 cursor-pointer hover:bg-white transition-all font-semibold rounded-lg shadow-lg shadow-white/5 py-6">
                    Open Learning Center <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

              </CardContent>
            </Card>
          ))}
        </div>
        
      </main>
    </div>
  );
}