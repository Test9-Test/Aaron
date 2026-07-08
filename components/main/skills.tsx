"use client";

import React, { useState } from "react";
import { SkillText } from "@/components/sub/skill-text";
import { AnimatedFolder } from "@/components/ui/3d-folder";
import { FinderWindow, CategoryData } from "@/components/ui/finder-window";
import { Shield, Network, Monitor, Code, Wrench, Cloud } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/basePath";

const skillCategories: CategoryData[] = [
  {
    title: "Cybersecurity",
    subtitle: "Security Testing",
    icon: <Shield className="w-8 h-8" />,
    skills: [
      "Wireshark",
      "Burp Suite",
      "Nmap",
      "Metasploit",
      "OSINT",
      "Vulnerability Assessment",
    ],
    overview: "Offensive security and penetration testing. Focused on vulnerability assessment, OSINT gathering, threat intelligence, and digital defense hardening to mitigate potential cyber risks.",
    projects: [
      "Enterprise Home Lab",
      "Active Directory Lab",
      "Secure Web Application",
    ],
    experience: "Desktop & Network Support role performing network log monitoring and threat detection remediation. Focused on mitigating enterprise security vulnerabilities and identifying configuration flaws.",
    certification: "Cyber Security Grade A+",
  },
  {
    title: "Networking",
    subtitle: "Enterprise Networking",
    icon: <Network className="w-8 h-8" />,
    skills: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "Routing",
      "Switching",
      "VLAN",
      "VPN",
      "Cisco CLI",
    ],
    overview: "Enterprise-grade routing, switching, and network design. Standardizing local network security, virtual private channels, VLAN divisions, and core address configurations.",
    projects: [
      "Cisco Enterprise Topology Simulation",
      "VLAN Segmentation Deployment",
      "Site-to-Site VPN Tunnel Config",
    ],
    experience: "Network Configuration Specialist, mapping routing protocols and device terminal parameters. Configured and maintained VLANs, routers, and switches on physical Cisco hardware.",
    certification: "Cisco Certified Network Associate (CCNA)",
  },
  {
    title: "Systems",
    subtitle: "Infrastructure Administration",
    icon: <Monitor className="w-8 h-8" />,
    skills: [
      "Windows",
      "Windows Server",
      "Linux",
      "Kali Linux",
      "Active Directory",
    ],
    overview: "Systems engineering, server management, and directory hierarchy setup. Provisioning virtualization servers, domain administration, and secure administrative controls.",
    projects: [
      "Active Directory Domain Controller Setup",
      "Linux Web Server Cluster",
      "Secure Windows Server Deploy",
    ],
    experience: "System Administrator Support, configuring Active Directory permissions and managing secure Linux server instances.",
    certification: "Azure Security Engineering (AZ-500)",
  },
  {
    title: "Programming",
    subtitle: "Software Development",
    icon: <Code className="w-8 h-8" />,
    skills: ["Python", "SQL", "HTML", "CSS"],
    overview: "Automation programming, query optimization, and user interface development. Developing scripts to automate security scans, parse logs, and construct cyber defense charts.",
    projects: [
      "Automation Script Repository",
      "Database Schema Optimization Project",
      "Cyber Dashboard UI Dev",
    ],
    experience: "Junior DevOps Developer, writing scripting tasks and clean web applications layouts.",
    certification: "Advanced Python Dev Cert",
  },
  {
    title: "Tools",
    subtitle: "Professional Toolkit",
    icon: <Wrench className="w-8 h-8" />,
    skills: ["Docker", "Git", "VirtualBox", "Cisco Packet Tracer"],
    overview: "Development environments, version control, and containerization. Deploying secure virtual sandboxes and container environments for sandboxed penetration runs.",
    projects: [
      "Virtual Testing Sandbox Setup",
      "Containerized Pentesting Lab",
      "CI/CD Pipeline Integration",
    ],
    experience: "Technical Lab Administrator, standardizing docker runs and pipeline configurations.",
    certification: "Google Professional Cybersecurity Cert",
  },
  {
    title: "Cloud",
    subtitle: "Deployment & DevOps",
    icon: <Cloud className="w-8 h-8" />,
    skills: ["Firebase", "GitHub", "Docker", "Linux Server"],
    overview: "Cloud integration, distributed source hosting, and operations workflows. Deploying scalable cloud instances and coordinating automation systems.",
    projects: [
      "Cloud Pentest Workspace",
      "Automated Cloud Deployment Config",
      "Central Log Monitoring System",
    ],
    experience: "Cloud Operations Junior Analyst, administering host setups and repository integration tasks.",
    certification: "AWS Certified Cloud Practitioner",
  },
];

export const Skills = () => {
  const [focusedFolder, setFocusedFolder] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const handleFolderClick = (title: string) => {
    if (activeFolder || focusedFolder) return;
    
    // 1. Focus folder (rotates folder lid open: 400ms)
    setFocusedFolder(title);
    
    // 2. Morph into macOS Finder window
    setTimeout(() => {
      setActiveFolder(title);
      setFocusedFolder(null);
    }, 400);
  };

  const handleWindowClose = () => {
    if (!activeFolder) return;
    
    const current = activeFolder;
    // 1. Close window & remount folder card in lid open state
    setActiveFolder(null);
    setFocusedFolder(current);
    
    // 2. Shut folder lid (350ms)
    setTimeout(() => {
      setFocusedFolder(null);
    }, 350);
  };

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      {/* Subtle Digital Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00f0ff" strokeWidth="1" />
              <circle cx="25" cy="25" r="1.2" fill="#00f0ff" opacity="0.6" />
              <path d="M 25 0 L 25 50 M 0 25 L 50 25" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <SkillText />

      {/* Grid container with relative overlay capabilities */}
      <div className="relative w-full max-w-6xl px-4 mt-10 z-20 flex items-center justify-center min-h-[500px]">
        
        {/* Grid representing folder cards */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center w-full transition-all duration-500",
          activeFolder && "blur-[2px]"
        )}>
          {skillCategories.map((category) => {
            const isActive = activeFolder === category.title;
            const isFocused = focusedFolder === category.title;
            const isDimmed = (activeFolder !== null && !isActive) || (focusedFolder !== null && !isFocused);

            // Render empty placeholder to prevent grid content reflow while morphing
            if (isActive) {
              return (
                <div key={category.title} className="w-full h-[360px] opacity-0 pointer-events-none" />
              );
            }

            return (
              <AnimatedFolder
                key={category.title}
                title={category.title}
                subtitle={category.subtitle}
                icon={category.icon}
                skills={category.skills}
                className="w-full h-fit"
                isOpen={isFocused || isActive}
                isDimmed={isDimmed}
                onClick={() => handleFolderClick(category.title)}
              />
            );
          })}
        </div>

        {/* Finder Window Overlay */}
        <AnimatePresence>
          {activeFolder && (
            <FinderWindow
              category={skillCategories.find((c) => c.title === activeFolder)!}
              onClose={handleWindowClose}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src={`${basePath}/videos/skills-bg.webm`} type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
