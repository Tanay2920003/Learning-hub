import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface PathCardProps {
  title: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  color: string;
}

export function PathCard({ title, description, slug, icon: Icon, color }: PathCardProps) {
  return (
    <Link href={`/${slug}`}>
      <Card className="group relative overflow-hidden bg-card/50 border-border hover:border-slate-500 transition-all duration-300 cursor-pointer h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="relative z-10 pb-4">
          <div className={`p-3 rounded-lg w-fit mb-4 bg-slate-900 border border-slate-800 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-semibold text-slate-100 group-hover:text-white transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-400 mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-300 transition-colors mt-auto">
          Start Journey 
          <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </CardContent>
      </Card>
    </Link>
  );
}