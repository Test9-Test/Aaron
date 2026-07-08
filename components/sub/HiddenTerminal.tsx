"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export const HiddenTerminal = () => {
  const { isHiddenTerminalOpen, setHiddenTerminalOpen, setResumeOpen } = usePortfolio();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "DHWANIT-SECURE SHELL v1.4.2 (Type 'help' for options)", type: "success" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isHiddenTerminalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isHiddenTerminalOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  if (!isHiddenTerminalOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `$ ${cmd}`, type: "input" as const }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    switch (trimmed) {
      case "help":
        setHistory([
          ...newHistory,
          { text: "Available commands:", type: "success" },
          { text: "  about     - Brief bio of Dhwanit Sukhadiya", type: "output" },
          { text: "  skills    - List core systems, networking, and security skills", type: "output" },
          { text: "  projects  - Show active academic projects", type: "output" },
          { text: "  github    - Open Github profile in new tab", type: "output" },
          { text: "  linkedin  - Open LinkedIn profile in new tab", type: "output" },
          { text: "  resume    - Launch premium interactive resume reader", type: "output" },
          { text: "  contact   - Display official contact information", type: "output" },
          { text: "  clear     - Clear terminal terminal prompt screen", type: "output" },
          { text: "  exit      - Close hidden terminal shell", type: "output" },
        ]);
        break;

      case "about":
        setHistory([
          ...newHistory,
          { text: "About Dhwanit Sukhadiya:", type: "success" },
          { text: "Graduate Computer Engineer with practical competency in desktop support, networking, Active Directory environments, and cybersecurity operations. Specializes in implementing and monitoring secure networks, server infrastructure, and firewall policies.", type: "output" },
        ]);
        break;

      case "skills":
        setHistory([
          ...newHistory,
          { text: "Skills Matrix:", type: "success" },
          { text: "  • Networking: TCP/IP, DNS, DHCP, VLANs, Routing, Switching, VPN, Cisco CLI", type: "output" },
          { text: "  • Systems: Windows 10/11, Windows Server 2022, Linux, Kali Linux, Active Directory", type: "output" },
          { text: "  • Security: Wireshark, Nmap, Burp Suite, Metasploit, Vulnerability Assessment, OSINT", type: "output" },
          { text: "  • Programming: Python, SQL, HTML, CSS", type: "output" },
        ]);
        break;

      case "projects":
        setHistory([
          ...newHistory,
          { text: "Featured Projects:", type: "success" },
          { text: "  1. Cybersecurity Home Lab (Vulnerability Assessment & Monitoring)", type: "output" },
          { text: "  2. Active Directory Enterprise Lab (Domain Setup & GPO Management)", type: "output" },
          { text: "  3. Network Monitoring & Troubleshooting (Multi-VLAN Routing)", type: "output" },
          { text: "  4. Secure E-Commerce Website (Input validation & XSS protection)", type: "output" },
        ]);
        break;

      case "github":
        setHistory([...newHistory, { text: "Opening Github profile...", type: "success" }]);
        window.open("https://github.com/Aaron-2705", "_blank");
        break;

      case "linkedin":
        setHistory([...newHistory, { text: "Opening LinkedIn profile...", type: "success" }]);
        window.open("https://www.linkedin.com/in/dhwanit-sukhadiya", "_blank");
        break;

      case "resume":
        setHistory([...newHistory, { text: "Opening interactive resume modal...", type: "success" }]);
        setResumeOpen(true);
        break;

      case "contact":
        setHistory([
          ...newHistory,
          { text: "Contact Details:", type: "success" },
          { text: "  Email:    dhwanitsukhadiya685@gmail.com", type: "output" },
          { text: "  Phone:    +1 (916) 202-3698", type: "output" },
          { text: "  Location: Sacramento, CA", type: "output" },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
        setHiddenTerminalOpen(false);
        break;

      default:
        setHistory([
          ...newHistory,
          { text: `Error: Command '${trimmed}' not found. Type 'help' for options.`, type: "error" },
        ]);
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
        onClick={() => setHiddenTerminalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="w-full max-w-3xl h-[450px] bg-slate-950/90 border border-green-500/30 rounded-lg flex flex-col overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 border-b border-green-500/20 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70 cursor-pointer" onClick={() => setHiddenTerminalOpen(false)} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-xs text-green-400/70 font-mono ml-2">dhwanit@secure-terminal:~</span>
            </div>
            <span className="text-[10px] text-green-500/40 font-mono">{"Press ESC or type 'exit'"}</span>
          </div>

          {/* Lines container */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1.5 scrollbar-hidden select-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === "input"
                    ? "text-white"
                    : line.type === "error"
                    ? "text-rose-500"
                    : line.type === "success"
                    ? "text-green-400 font-bold"
                    : "text-green-500/90"
                }
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Command Prompt */}
          <div className="p-4 bg-slate-950/60 border-t border-green-500/20 flex gap-2 items-center font-mono">
            <span className="text-green-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-500 text-sm"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(inputVal);
                  setInputVal("");
                } else if (e.key === "Escape") {
                  setHiddenTerminalOpen(false);
                }
              }}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
