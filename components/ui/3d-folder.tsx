import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedFolderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: string[];
  className?: string;
  isOpen: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

export const AnimatedFolder: React.FC<AnimatedFolderProps> = ({
  title,
  subtitle,
  icon,
  skills,
  className,
  isOpen,
  isDimmed,
  onClick,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDimmed) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 5 degrees tilt for subtle 3D effect
    const tiltX = (mouseY / (height / 2)) * -5;
    const tiltY = (mouseX / (width / 2)) * 5;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const backBg = "linear-gradient(135deg, #020712 0%, #061127 100%)";
  const tabBg = "#061127";
  const frontBg = "linear-gradient(135deg, rgba(3, 9, 23, 0.85) 0%, rgba(7, 19, 44, 0.85) 100%)";

  return (
    <motion.div
      layoutId={`folder-card-${title}`}
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-between p-6 rounded-2xl cursor-pointer select-none w-full h-[360px] text-center",
        "bg-[#04091a]/40 border border-[#00d2ff]/10 backdrop-blur-md",
        "transition-all duration-500 ease-out",
        isOpen 
          ? "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] animate-pulse-glow" 
          : "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
        isDimmed ? "opacity-35 pointer-events-none" : "opacity-100",
        className
      )}
      style={{
        perspective: "1000px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-700 rounded-2xl overflow-hidden z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(6,182,212,0.1) 1.2px, transparent 1.2px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Radial glow background */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          opacity: isOpen ? 1 : 0,
        }}
      />
      
      {/* 3D Folder Container (+20% size wrapper) */}
      <div className="relative flex items-center justify-center mb-6 z-10 w-full pt-6">
        
        {/* Folder Back Cover */}
        <div 
          className="rounded-lg shadow-md border border-cyan-500/10 relative flex flex-col justify-start" 
          style={{ 
            width: "185px",
            height: "138px",
            background: backBg, 
            transformOrigin: "bottom center", 
            transform: isOpen ? "rotateX(-8deg)" : "rotateX(0deg)", 
            transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 10,
            transformStyle: "preserve-3d"
          }} 
        >
          {/* Folder Tab */}
          <div 
            className="absolute rounded-t-md border-t border-x border-cyan-500/10" 
            style={{ 
              width: "70px",
              height: "23px",
              top: "-21px",
              left: "18px",
              background: tabBg, 
              zIndex: 5 
            }} 
          />

          {/* Folder Front Cover (Lid) */}
          <div 
            className="absolute bottom-0 left-0 rounded-lg border border-cyan-500/35 backdrop-blur-md flex flex-col justify-between p-3 overflow-hidden" 
            style={{ 
              width: "100%",
              height: "138px",
              background: frontBg, 
              transformOrigin: "bottom center", 
              transform: isOpen 
                ? "rotateX(60deg) translateY(22px) translateZ(18px)" 
                : "rotateX(0deg) translateY(0) translateZ(0)",
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 30 
            }}
          >
            {/* Cyber Details Header */}
            <div className="flex items-center justify-between text-[7px] text-cyan-400/60 font-mono tracking-widest">
              <span>REPOSITORY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
            </div>
            
            {/* Category Icon */}
            <div className="flex items-center justify-center text-cyan-400/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10" }) : icon}
            </div>
            
            {/* Cyber Details Footer */}
            <div className="flex items-end justify-between text-[6px] text-cyan-400/40 font-mono tracking-wider">
              <span>SEC_ID: {title.toUpperCase().slice(0, 3)}-001</span>
              <span>SECURE</span>
            </div>
          </div>
          
          {/* Glass Reflection Highlight overlay */}
          <div 
            className="absolute bottom-0 left-0 rounded-lg overflow-hidden pointer-events-none" 
            style={{ 
              width: "100%",
              height: "138px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, transparent 60%)", 
              transformOrigin: "bottom center", 
              transform: isOpen 
                ? "rotateX(60deg) translateY(22px) translateZ(18px)" 
                : "rotateX(0deg) translateY(0) translateZ(0)",
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 31 
            }} 
          />
        </div>
      </div>

      {/* Category Info (Title, Subtitle, Count) */}
      <div className="text-center z-20 select-none w-full pb-2">
        {/* Icon & Title */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-cyan-400/90 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)] flex items-center justify-center">
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" }) : icon}
          </span>
          <h3 className="text-sm font-bold text-white font-mono tracking-wide">
            {title}
          </h3>
        </div>
        {/* Subtitle */}
        <p className="text-[11px] font-semibold text-slate-300 mt-1 font-mono">
          {subtitle}
        </p>
        {/* Technology Count */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/80 mt-1.5 font-mono">
          {skills.length} Technologies
        </p>
      </div>
    </motion.div>
  );
};
