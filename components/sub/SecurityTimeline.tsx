"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Server, ShieldAlert, Cpu, Award } from "lucide-react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  align: "left" | "right";
}

const TimelineItem = ({ year, title, description, icon, align }: TimelineItemProps) => {
  const isLeft = align === "left";

  return (
    <div className={`relative flex items-center justify-between w-full mb-16 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
      {/* Spacer for desktop layout grid alignment */}
      <div className="hidden md:block w-[45%]" />

      {/* Center glowing badge */}
      <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#030014] border-2 border-[#7042f88b] text-[#b49bff] shadow-[0_0_15px_#7042f88b] z-10">
        {icon}
      </div>

      {/* Glassmorphic timeline card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 55 }}
        className="w-[85%] md:w-[45%] ml-12 md:ml-0 p-5 rounded-lg border border-[#7042f833] bg-[#03001480] backdrop-blur-md shadow-[0_0_20px_rgba(112,66,248,0.1)] hover:shadow-[0_0_30px_rgba(112,66,248,0.25)] transition-shadow duration-300 relative group"
      >
        {/* Glow border overlay on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
          {year}
        </span>
        <h3 className="text-xl font-bold text-white mt-3 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

export const SecurityTimeline = () => {
  const timelineData: TimelineItemProps[] = [
    {
      year: "2023",
      title: "Started Networking",
      description: "Learned the foundational pillars of routing, switching, subnetting, TCP/IP, and firewall concepts. Configured LAN/WAN models using Cisco CLI.",
      icon: <Network className="w-5 h-5" />,
      align: "left",
    },
    {
      year: "2024",
      title: "Windows Server Administration",
      description: "Deployed and managed Active Directory Domain Services, DNS, DHCP OUs, and Group Policy settings. Created secure network segmentation labs.",
      icon: <Server className="w-5 h-5" />,
      align: "right",
    },
    {
      year: "2025",
      title: "Cybersecurity & Defenses",
      description: "Gained proficiency in vulnerability assessment, packet analysis using Wireshark, defensive firewalls, and security monitoring utilities.",
      icon: <ShieldAlert className="w-5 h-5" />,
      align: "left",
    },
    {
      year: "2026",
      title: "Cybersecurity Home Lab",
      description: "Designed a virtual enterprise test network on VirtualBox. Orchestrated vulnerable machine scanning, log checking, and secure firewall drops.",
      icon: <Cpu className="w-5 h-5" />,
      align: "right",
    },
    {
      year: "Current",
      title: "Open to Opportunities",
      description: "Seeking a desktop support, junior systems engineer, or security analyst role to safeguard digital assets and defend enterprise networks.",
      icon: <Award className="w-5 h-5" />,
      align: "left",
    },
  ];

  return (
    <section id="journey" className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Section Background Decorative Ring Glow */}
      <div className="absolute top-[20%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <h2 className="text-[40px] font-bold text-center text-white mb-2 tracking-wider">
        Journey Roadmap
      </h2>
      <div className="w-[100px] h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-16" />

      <div className="relative w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Draw the timeline connector center line */}
        <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 via-violet-500 to-cyan-400 h-[calc(100%-80px)] opacity-30" />

        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            icon={item.icon}
            align={item.align}
          />
        ))}
      </div>
    </section>
  );
};
