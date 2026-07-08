"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { basePath } from "@/lib/basePath";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

// Custom database of skill stats matching the specialist profile
const SKILL_DETAILS: Record<string, { level: string; years: string; projects: string; percentage: number }> = {
  "TCP/IP": { level: "Advanced", years: "3 Years", projects: "15 Projects", percentage: 95 },
  "DNS": { level: "Advanced", years: "3 Years", projects: "12 Projects", percentage: 90 },
  "DHCP": { level: "Advanced", years: "3 Years", projects: "12 Projects", percentage: 90 },
  "VLANs": { level: "Advanced", years: "2 Years", projects: "10 Projects", percentage: 88 },
  "Routing": { level: "Advanced", years: "2 Years", projects: "11 Projects", percentage: 89 },
  "Switching": { level: "Advanced", years: "2 Years", projects: "10 Projects", percentage: 87 },
  "LAN/WAN": { level: "Advanced", years: "3 Years", projects: "14 Projects", percentage: 92 },
  "VPN": { level: "Intermediate", years: "2 Years", projects: "6 Projects", percentage: 80 },
  "Cisco CLI": { level: "Intermediate", years: "2 Years", projects: "9 Projects", percentage: 85 },
  "Windows 10/11": { level: "Advanced", years: "4 Years", projects: "25 Projects", percentage: 98 },
  "Windows Server 2022": { level: "Advanced", years: "2 Years", projects: "8 Projects", percentage: 90 },
  "Linux": { level: "Advanced", years: "3 Years", projects: "14 Projects", percentage: 91 },
  "Kali Linux": { level: "Advanced", years: "2 Years", projects: "12 Projects", percentage: 88 },
  "Active Directory": { level: "Advanced", years: "2 Years", projects: "10 Projects", percentage: 92 },
  "Wireshark": { level: "Advanced", years: "2 Years", projects: "15 Projects", percentage: 90 },
  "Nmap": { level: "Advanced", years: "2 Years", projects: "18 Projects", percentage: 94 },
  "Burp Suite": { level: "Intermediate", years: "1 Year", projects: "5 Projects", percentage: 70 },
  "Metasploit": { level: "Intermediate", years: "1 Year", projects: "6 Projects", percentage: 75 },
  "Vulnerability Assessment": { level: "Advanced", years: "2 Years", projects: "12 Projects", percentage: 88 },
  "OSINT": { level: "Intermediate", years: "2 Years", projects: "8 Projects", percentage: 82 },
  "Python": { level: "Intermediate", years: "2 Years", projects: "10 Projects", percentage: 80 },
  "SQL": { level: "Intermediate", years: "2 Years", projects: "8 Projects", percentage: 78 },
  "HTML": { level: "Advanced", years: "4 Years", projects: "16 Projects", percentage: 95 },
  "CSS": { level: "Advanced", years: "4 Years", projects: "15 Projects", percentage: 92 },
  "Cisco Packet Tracer": { level: "Advanced", years: "3 Years", projects: "15 Projects", percentage: 94 },
  "VirtualBox": { level: "Advanced", years: "3 Years", projects: "20 Projects", percentage: 96 },
  "Microsoft Office": { level: "Advanced", years: "5 Years", projects: "30 Projects", percentage: 95 },
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
  });

  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic hover mechanics
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const springX = useSpring(mX, { stiffness: 120, damping: 12 });
  const springY = useSpring(mY, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Shift slightly towards cursor (magnetic coefficient 0.25)
    mX.set((e.clientX - centerX) * 0.25);
    mY.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    mX.set(0);
    mY.set(0);
    setHovered(false);
  };

  const details = SKILL_DETAILS[name] || { level: "Advanced", years: "2 Years", projects: "5 Projects", percentage: 85 };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const animationDelay = 0.05;

  return (
    <div
      ref={inViewRef}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={containerRef}
        initial="hidden"
        variants={imageVariants}
        animate={inView ? "visible" : "hidden"}
        custom={index}
        transition={{ delay: index * animationDelay, duration: 0.4 }}
        className="cursor-pointer p-3 rounded-xl transition-all duration-300 relative z-10"
        style={{
          x: springX,
          y: springY,
          filter: hovered ? "drop-shadow(0 0 14px rgba(112, 66, 248, 0.65))" : "none",
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image src={`${basePath}/skills/${src}`} width={width} height={height} alt={name} className="select-none" />
      </motion.div>

      {/* Interactive Tooltip Card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: -90, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bg-[#030014ef] border border-[#7042f88b] rounded-lg p-3 font-mono text-[10px] md:text-xs text-white shadow-[0_0_20px_#7042f833] w-48 z-50 pointer-events-none"
          >
            {/* Arrow */}
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#030014] border-r border-b border-[#7042f88b] rotate-45" />

            <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-[#7042f844]">
              <span className="font-bold text-gray-100">{name}</span>
              <span className="text-cyan-400 font-semibold">{details.level}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Experience:</span>
                <span>{details.years}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Completed:</span>
                <span>{details.projects}</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-[9px] text-[#b49bff] mb-0.5">
                  <span>Proficiency:</span>
                  <span>{details.percentage}%</span>
                </div>
                <div className="w-full bg-[#7042f811] h-1 rounded overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded"
                    style={{ width: `${details.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
