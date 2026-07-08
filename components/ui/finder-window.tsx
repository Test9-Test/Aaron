import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

export interface CategoryData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: string[];
  overview: string;
  projects: string[];
  experience: string;
  certification?: string;
}

interface FinderWindowProps {
  category: CategoryData;
  onClose: () => void;
}

export const FinderWindow: React.FC<FinderWindowProps> = ({ category, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "technologies", label: "Technologies" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "certificates", label: "Certificates" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-mono tracking-wide">
                  {category.title} Repository
                </h3>
                <p className="text-xs font-mono text-cyan-400/80">
                  {category.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs font-mono leading-relaxed text-slate-300 border-l border-cyan-500/20 pl-4 mt-2">
              {category.overview}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg border border-cyan-500/10 bg-[#040c1d]/40 font-mono text-left">
                <span className="text-[10px] text-cyan-500/60 block uppercase tracking-wider">Security Grade</span>
                <span className="text-sm font-bold text-white tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]">A+ SECURE</span>
              </div>
              <div className="p-3 rounded-lg border border-cyan-500/10 bg-[#040c1d]/40 font-mono text-left">
                <span className="text-[10px] text-cyan-500/60 block uppercase tracking-wider">Access Protocol</span>
                <span className="text-sm font-bold text-slate-200 tracking-wider">ROT13_ENCRYPT</span>
              </div>
              <div className="p-3 rounded-lg border border-cyan-500/10 bg-[#040c1d]/40 font-mono text-left">
                <span className="text-[10px] text-cyan-500/60 block uppercase tracking-wider">Technologies</span>
                <span className="text-sm font-bold text-white">{category.skills.length} Loaded</span>
              </div>
              <div className="p-3 rounded-lg border border-cyan-500/10 bg-[#040c1d]/40 font-mono text-left">
                <span className="text-[10px] text-cyan-500/60 block uppercase tracking-wider">Integrations</span>
                <span className="text-sm font-bold text-slate-200">{category.projects.length} Connected</span>
              </div>
            </div>
          </div>
        );

      case "technologies":
        return (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold border-b border-cyan-500/20 pb-2 mb-1">
              Loaded Modules
            </h4>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {category.skills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 p-2 rounded border border-cyan-500/5 bg-[#030916]/50 font-mono text-xs text-slate-200 hover:border-cyan-500/20 transition-all duration-300"
                >
                  <span className="text-cyan-400 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]">✓</span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      case "projects":
        return (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold border-b border-cyan-500/20 pb-2 mb-2">
              Related Projects
            </h4>
            <div className="flex flex-col gap-3">
              {category.projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="p-3 border border-cyan-500/10 bg-[#040c1d]/60 rounded-lg flex items-center justify-between hover:border-cyan-500/25 transition-colors duration-300 font-mono"
                >
                  <span className="text-xs text-slate-200">{project}</span>
                  <span className="text-[10px] text-cyan-500/80 bg-cyan-950/30 px-2 py-0.5 border border-cyan-500/20 rounded">
                    ACTIVE_LINK
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold border-b border-cyan-500/20 pb-2 mb-2">
              Experience Summary
            </h4>
            <div className="p-4 border border-cyan-500/15 bg-slate-950/80 rounded-lg font-mono text-xs leading-relaxed text-slate-300 relative overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3 text-cyan-500/60 border-b border-slate-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>bash - sec_audit.sh</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-cyan-400 mr-1">$</span>
                <span>cat experience_log.txt</span>
              </div>
              <div className="mt-3 text-slate-300 whitespace-pre-wrap pl-3 border-l border-cyan-500/20">
                {category.experience}
              </div>
            </div>
          </div>
        );

      case "certificates":
        return (
          <div className="flex flex-col gap-4 items-center justify-center h-full min-h-[220px]">
            <h4 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold border-b border-cyan-500/20 pb-2 w-full mb-6 text-left">
              Credentials & Badges
            </h4>
            {category.certification ? (
              <div className="p-6 border border-cyan-400/30 bg-[#020814]/70 rounded-xl max-w-sm w-full text-center relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.15)] group transition-all duration-300 hover:border-cyan-400/50">
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-cyan-500/5 to-transparent h-1/2 animate-scan-line" />
                <div className="text-3xl mb-3 text-cyan-400 flex justify-center drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                  🏆
                </div>
                <h5 className="text-sm font-bold text-white font-mono">
                  {category.certification}
                </h5>
                <p className="text-[10px] text-cyan-400/60 font-mono mt-1 tracking-wider uppercase">
                  Verified Academic Grade
                </p>
                <div className="w-full h-px bg-cyan-500/20 my-4" />
                <p className="text-[10px] text-slate-400 font-mono">
                  HASH: SHA256-AUTHENTICATED
                </p>
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-500">
                No external certifications linked to this repository.
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      layoutId={`folder-card-${category.title}`}
      className={cn(
        "absolute inset-x-0 mx-auto w-[92vw] md:w-full md:max-w-[850px] h-[520px] z-40 rounded-2xl flex flex-col overflow-hidden",
        "bg-[#030712]/95 border border-cyan-500/30 backdrop-blur-lg shadow-[0_0_40px_rgba(6,182,212,0.25)]"
      )}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
    >
      {/* Top macOS Style Handoff Bar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-cyan-500/20 bg-[#050e21]/70 rounded-t-2xl relative select-none">
        
        {/* Hinge Window Dots */}
        <div className="flex gap-2 items-center z-50">
          <button 
            onClick={onClose} 
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group/btn relative cursor-pointer outline-none border-none"
          >
            <span className="hidden group-hover/btn:block text-[8px] text-red-950 font-bold leading-none -translate-y-[0.5px]">×</span>
          </button>
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] opacity-60" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] opacity-60" />
        </div>

        {/* Dynamic Title */}
        <span className="absolute inset-x-0 mx-auto text-center pointer-events-none font-mono text-[11px] font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
          {category.title.toUpperCase()} REPOSITORY
        </span>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Finder Sidebar */}
        <div className="w-36 md:w-52 border-r border-cyan-500/10 bg-[#020612]/80 flex flex-col p-3 gap-1 overflow-y-auto scrollbar-hidden select-none">
          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 px-2 py-1 uppercase block mb-1">
            Locations
          </span>
          {tabItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-all duration-200 outline-none flex items-center gap-2",
                  isActive 
                    ? "bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-400 font-semibold shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-cyan-400 shadow-[0_0_4px_#00f0ff]" : "bg-slate-600")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="flex-1 bg-[#030713]/90 flex flex-col p-6 overflow-y-auto scrollbar-hidden relative">
          
          {/* Subtle circuit/blueprint overlay inside window */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(6,182,212,0.1) 1.2px, transparent 1.2px)`,
              backgroundSize: '16px 16px',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex flex-col justify-start relative z-10"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
