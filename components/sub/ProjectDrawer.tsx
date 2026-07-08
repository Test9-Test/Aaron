"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { X, ExternalLink, Code, CheckCircle, ShieldAlert, Cpu } from "lucide-react";
import { RxGithubLogo } from "react-icons/rx";
import Image from "next/image";
import { basePath } from "@/lib/basePath";

// Full details lookup database
const PROJECTS_LOOKUP: Record<string, {
  techStack: string[];
  architecture: string;
  features: string[];
  challenges: string;
  solutions: string;
  gallery: string[];
}> = {
  "Cybersecurity Home Lab": {
    techStack: ["Kali Linux", "VirtualBox", "Wireshark", "Nmap", "pfSense Firewall", "Ubuntu Server", "syslog-ng"],
    architecture: `[Internal Vulnerable Subnet (10.0.5.0/24)] 
        |
        +---> [pfSense Firewall Gateway] 
                  |
                  +---> [SIEM / Syslog Zone (10.0.10.0/24)]
                  |
                  +---> [WAN Interface (Host Bridge)]`,
    features: [
      "Zoned host-only and internal networks in VirtualBox for secure malware analysis.",
      "Conducted network vulnerability assessments using OpenVAS/Nmap audit logs.",
      "Captured and analyzed ICMP, DNS, and HTTP handshakes via Wireshark filters.",
      "Configured Syslog daemon targets to compile warning signals dynamically."
    ],
    challenges: "Configuring multi-NIC virtual network adaptors in VirtualBox to act as pfSense interfaces without leaking traffic to the host OS.",
    solutions: "Zoned secondary and tertiary interfaces as 'Internal Network' with unique tags, routing all traffic strictly through pfSense firewall rules.",
    gallery: [`${basePath}/projects/project-1.png`, `${basePath}/projects/project-2.png`]
  },
  "Active Directory Enterprise Lab": {
    techStack: ["Windows Server 2022", "Active Directory DS", "DNS", "DHCP", "Group Policy (GPO)", "Windows 11 Client"],
    architecture: `[Windows 11 Client OS] 
        |
        +---> [AD Domain Controller (DNS / DHCP / LDAP)] 
                  |
                  +---> [Group Policy Hardening Engine (GPO)]`,
    features: [
      "Deployed AD DS domain forest from scratch in a simulated enterprise lab.",
      "Managed standard business hierarchy: OUs, Security Groups, and User Accounts.",
      "Hardened security postures via automated GPO desktop password complexity rules.",
      "Configured DHCP scopes, address exclusions, and primary DNS target resolvers."
    ],
    challenges: "Resolving GPO synchronization errors where local machines failed to apply domain settings.",
    solutions: "Identified DNS resolution mismatch; forced client NICs to use DC address as the primary DNS gateway and ran gpupdate /force commands.",
    gallery: [`${basePath}/projects/project-2.png`, `${basePath}/projects/project-3.png`]
  },
  "Network Monitoring & Troubleshooting Lab": {
    techStack: ["Cisco Packet Tracer", "VLANs Trunking", "OSPF Routing", "ACL Security Policies", "L3 Switches"],
    architecture: `[VLAN 10: HR] & [VLAN 20: Engineering] 
        |
        +---> [L3 Switch (Inter-VLAN Core)] 
                  |
                  +---> [Edge Router (OSPF Dynamics)] ---> [WAN Gateway]`,
    features: [
      "Configured 802.1Q VLAN trunking encapsulations on enterprise-grade switches.",
      "Designed secure Access Control Lists (ACLs) to drop unauthorized inter-department pings.",
      "Configured dynamic OSPF routing protocol across multiple simulated corporate zones.",
      "Utilized tracepath and debug metrics to audit network path latencies."
    ],
    challenges: "Debugging silent dropouts across switch ports due to trunk native VLAN ID mismatches.",
    solutions: "Executed show interfaces switchport configurations to align trunk native VLAN tags across both ends of the bridge.",
    gallery: [`${basePath}/projects/project-3.png`, `${basePath}/projects/project-1.png`]
  },
  "Secure E-Commerce Website": {
    techStack: ["Python Flask", "SQLite Database", "Bcrypt Encryption", "JWT Auth", "HTML5 & TailwindCSS"],
    architecture: `[Client Web Browser] 
        |
        +---> [Flask App Backend (Sanitization / Auth Router)] 
                  |
                  +---> [Secure SQL DB (Salted Bcrypt Hashes)]`,
    features: [
      "Programmed a mock retail portal with clean authorization endpoints.",
      "Secured SQLite database inputs via SQL prepared statements preventing injections.",
      "Implemented password encryption using salted Bcrypt hashes.",
      "Zoned secure session cookies with HTTPOnly, Secure, and SameSite flags."
    ],
    challenges: "Preventing cross-site scripting (XSS) in dynamically loaded product comment boxes.",
    solutions: "Configured HTML engine string escaping filters and implemented Content Security Policy (CSP) headers.",
    gallery: [`${basePath}/projects/project-1.png`, `${basePath}/projects/project-2.png`]
  }
};

export const ProjectDrawer = () => {
  const { activeProject, setActiveProject } = usePortfolio();

  const details = activeProject ? PROJECTS_LOOKUP[activeProject.title] : null;

  return (
    <AnimatePresence>
      {activeProject && details && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#030014] z-[9990] backdrop-blur-sm cursor-pointer"
            onClick={() => setActiveProject(null)}
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#030014ee] border-l border-[#7042f88b] z-[9995] shadow-[0_0_40px_rgba(112,66,248,0.25)] flex flex-col select-text"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-slate-950/60 border-b border-[#7042f844]">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Project Analysis Report
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1 text-gray-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hidden">
              {/* Image Banner */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[#7042f833]">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  {activeProject.title}
                </h2>
                <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Technologies Utilized</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#7042f815] border border-[#7042f844] text-[10px] md:text-xs text-[#b49bff] font-mono font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture Flow */}
              <div>
                <h3 className="text-xs font-mono font-bold text-[#b49bff] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Code className="w-4 h-4" />
                  <span>Deployment Architecture</span>
                </h3>
                <pre className="p-4 bg-slate-950/60 border border-[#7042f822] rounded text-[11px] md:text-xs text-cyan-400 font-mono overflow-x-auto">
                  {details.architecture}
                </pre>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Security & Core Controls</span>
                </h3>
                <ul className="space-y-2">
                  {details.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-gray-300">
                      <span className="text-emerald-400 mt-0.5">✔</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#7042f822] pt-4">
                <div className="p-4 rounded-lg bg-red-950/10 border border-red-500/20">
                  <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>The Challenge</span>
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {details.challenges}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-950/10 border border-emerald-500/20">
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>The Solution</span>
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {details.solutions}
                  </p>
                </div>
              </div>

              {/* Links Action */}
              <div className="flex gap-4 pt-4 border-t border-[#7042f822]">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-2 text-center text-xs font-mono font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_#7042f833] flex items-center justify-center gap-1.5 transition-all duration-200"
                >
                  <RxGithubLogo className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
