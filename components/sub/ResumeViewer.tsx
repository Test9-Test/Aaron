"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { X, ZoomIn, ZoomOut, Download, Printer, Maximize2, Minimize2, FileText, Briefcase, GraduationCap, Laptop } from "lucide-react";
import { basePath } from "@/lib/basePath";

export const ResumeViewer = () => {
  const { isResumeOpen, setResumeOpen } = usePortfolio();
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!isResumeOpen) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.7));

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;
    const windowUrl = "about:blank";
    const uniqueName = new Date().getTime();
    const printWindow = window.open(windowUrl, uniqueName.toString(), "left=50000,top=50000,width=0,height=0");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Dhwanit Sukhadiya Resume</title>
          <style>
            body { font-family: monospace; padding: 40px; color: #000; line-height: 1.5; font-size: 13px; }
            h1 { text-align: center; text-transform: uppercase; font-size: 20px; margin-bottom: 2px; }
            .subtitle { text-align: center; font-size: 11px; margin-bottom: 20px; }
            h2 { border-bottom: 1px solid #000; font-size: 14px; margin-top: 25px; padding-bottom: 3px; }
            .entry { margin-bottom: 15px; }
            .entry-header { display: flex; justify-content: space-between; font-weight: bold; }
            ul { padding-left: 20px; margin-top: 5px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99990] flex items-center justify-center p-4"
        onClick={() => setResumeOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          className={`bg-[#030014ee] border border-[#7042f88b] rounded-xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(112,66,248,0.3)] transition-all duration-300 ${
            fullscreen ? "fixed inset-2" : "w-full max-w-4xl h-[85vh]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Controls Bar */}
          <div className="bg-slate-950/80 border-b border-[#7042f844] px-4 py-3 flex items-center justify-between flex-wrap gap-3 font-mono">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                Resume Reader
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-3 flex-wrap">
              <button
                onClick={handleZoomOut}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-[#7042f811] hover:border-[#7042f88b] text-gray-300 hover:text-white transition-all outline-none"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-[#7042f811] hover:border-[#7042f88b] text-gray-300 hover:text-white transition-all outline-none"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-slate-800" />

              <a
                href={`${basePath}/resume/dhwanit-sukhadiya-resume.txt`}
                download
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-[#7042f811] hover:border-[#7042f88b] text-gray-300 hover:text-white transition-all outline-none flex items-center gap-1 text-xs"
                title="Download Plaintext Resume"
              >
                <Download className="w-4 h-4" />
              </a>

              <button
                onClick={handlePrint}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-[#7042f811] hover:border-[#7042f88b] text-gray-300 hover:text-white transition-all outline-none"
                title="Print Resume"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFullscreen((f) => !f)}
                className="p-1.5 bg-slate-900 border border-slate-800 rounded hover:bg-[#7042f811] hover:border-[#7042f88b] text-gray-300 hover:text-white transition-all outline-none"
                title="Toggle Fullscreen"
              >
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <div className="w-px h-5 bg-slate-800" />

              <button
                onClick={() => setResumeOpen(false)}
                className="p-1.5 bg-rose-950/20 border border-rose-500/30 rounded hover:bg-rose-500/20 text-rose-400 hover:text-white transition-all outline-none"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Body Canvas Container */}
          <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-950/25">
            <motion.div
              style={{ scale: zoom }}
              className="w-full max-w-3xl bg-slate-950/60 border border-[#7042f822] rounded-lg p-6 md:p-10 text-white font-mono text-[11px] md:text-xs leading-relaxed space-y-6 shadow-xl origin-top transition-transform select-text"
              ref={printRef}
            >
              {/* Header */}
              <div className="text-center space-y-1.5 border-b border-[#7042f844] pb-5">
                <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  DHWANIT SUKHADIYA
                </h1>
                <div className="text-gray-400 text-[10px] md:text-xs">
                  +1 (916) 202-3698 | dhwanitsukhadiya685@gmail.com | Sacramento, CA
                </div>
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-widest mt-1">
                  Cybersecurity & IT Support Specialist
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-[#7042f822] pb-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>EDUCATION</span>
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-gray-200">
                      <span>LDRP Institute of Technology and Research</span>
                      <span className="text-[10px] text-gray-500">Aug 2023 - Apr 2026</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Bachelor of Technology in Computer Engineering | CGPA: 7.4/10</div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-gray-200">
                      <span>VPMP Polytechnic</span>
                      <span className="text-[10px] text-gray-500">Jun 2020 - May 2023</span>
                    </div>
                    <div className="text-[10px] text-gray-400">Diploma in Computer Engineering | CGPA: 8.5/10</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-[#7042f822] pb-1 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>TECHNICAL SKILLS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-300">
                  <div>
                    <span className="font-bold text-[#b49bff]">Networking: </span>
                    <span>TCP/IP, DNS, DHCP, VLANs, Routing, Switching, VPN, Cisco CLI</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#b49bff]">Systems: </span>
                    <span>Windows Server 2022, Linux, Kali Linux, Active Directory</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#b49bff]">Security: </span>
                    <span>Wireshark, Nmap, Burp Suite, Vulnerability Assessment, OSINT</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#b49bff]">Languages & Tools: </span>
                    <span>Python, SQL, Cisco Packet Tracer, VirtualBox</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-[#7042f822] pb-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>EXPERIENCE</span>
                </h2>
                <div>
                  <div className="flex justify-between font-bold text-gray-200">
                    <span>Desktop & Network Support Intern | H&B Infotech</span>
                    <span className="text-[10px] text-gray-500">Nov 2025 - Apr 2026</span>
                  </div>
                  <ul className="list-disc pl-4 mt-2 space-y-1.5 text-gray-300">
                    <li>Diagnosed hardware, desktop software, client domain configurations, and Windows troubleshooting tasks.</li>
                    <li>Configured routers, network access points, switch connections, and VLAN subnetting setups.</li>
                    <li>Resolved office host connectivity errors, monitored ping reports, and logged port activities.</li>
                    <li>Assisted with network credential setups, shared active directory roles, and kept IT assets inventories.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 border-b border-[#7042f822] pb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>ACADEMIC PROJECTS</span>
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-gray-200">Cybersecurity Home Lab</div>
                    <p className="text-gray-400 mt-1">Built a VirtualBox test network hosting pfSense firewall routing logic. Executed packet captures with Wireshark and evaluated system vulnerability levels with scan reports.</p>
                  </div>
                  <div>
                    <div className="font-bold text-gray-200">Active Directory Enterprise Lab</div>
                    <p className="text-gray-400 mt-1">Deployed a full domain directory structure including Users, Groups, and GPOs inside Windows Server 2022 to govern authentication policies.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
