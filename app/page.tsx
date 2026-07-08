import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { SecurityTimeline } from "@/components/sub/SecurityTimeline";
import { CaseStudies } from "@/components/sub/CaseStudies";
import { Certifications } from "@/components/sub/Certifications";
import { SecurityMetrics } from "@/components/sub/SecurityMetrics";
import { ExperienceCounters } from "@/components/sub/ExperienceCounters";
import { InteractiveGlobe } from "@/components/sub/InteractiveGlobe";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <SecurityTimeline />
        <Encryption />
        <Projects />
        <CaseStudies />
        <Certifications />
        <SecurityMetrics />
        <ExperienceCounters />
        
        {/* Interactive Globe Section */}
        <div className="w-full flex flex-col items-center justify-center py-16 relative">
          <h2 className="text-[32px] md:text-[40px] font-bold text-center text-white mb-2 tracking-wider">
            Global Infrastructure
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-10 text-center px-4">
            Visualizing network nodes, gateways, and connection telemetry
          </p>
          <InteractiveGlobe />
        </div>
      </div>
    </main>
  );
}
