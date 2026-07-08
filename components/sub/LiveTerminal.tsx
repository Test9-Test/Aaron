"use client";

import React, { useEffect, useState } from "react";

interface TerminalAction {
  command: string;
  output: string[];
}

const actions: TerminalAction[] = [
  {
    command: "whoami",
    output: ["Cybersecurity Specialist"],
  },
  {
    command: "hostname",
    output: ["dhwanit-secure"],
  },
  {
    command: "scan localhost",
    output: ["Scanning...", "No Vulnerabilities Found"],
  },
  {
    command: "ping secure-network",
    output: ["PING secure-network (10.0.0.1) 56(84) bytes of data.", "64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=0.23 ms", "Reply... Secure Connected"],
  },
  {
    command: "nmap",
    output: ["Ports:", "22 Open  (SSH)", "80 Open  (HTTP)", "443 Open (HTTPS)"],
  },
  {
    command: "sudo systemctl status firewall",
    output: ["Firewall Active & Running", "Uptime: 24d 12h", "Rules Applied: Drop all unauthorized inbound"],
  },
  {
    command: "tail logs",
    output: ["[INFO] Connection established from 192.168.1.15", "[SECURE] SSL handshake completed successfully", "[SUCCESS] Firewall integrity check passed"],
  },
];

export const LiveTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [actionIndex, setActionIndex] = useState(0);
  const [state, setState] = useState<"typing" | "outputting" | "waiting">("typing");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentAction = actions[actionIndex];
    
    if (state === "typing") {
      const fullCmd = currentAction.command;
      if (currentText.length < fullCmd.length) {
        timer = setTimeout(() => {
          setCurrentText(fullCmd.slice(0, currentText.length + 1));
        }, 60 + Math.random() * 50); // realistic typing speed
      } else {
        timer = setTimeout(() => {
          setState("outputting");
        }, 500);
      }
    } else if (state === "outputting") {
      setLines((prev) => [
        ...prev,
        `$ ${currentAction.command}`,
        ...currentAction.output,
      ]);
      setCurrentText("");
      setState("waiting");
    } else if (state === "waiting") {
      timer = setTimeout(() => {
        // Prepare next command
        setState("typing");
        setActionIndex((prev) => (prev + 1) % actions.length);
        // Keep logs compact (max 10 lines)
        setLines((prev) => {
          if (prev.length > 8) {
            return prev.slice(prev.length - 6);
          }
          return prev;
        });
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [currentText, actionIndex, state]);

  return (
    <div className="w-full max-w-[550px] border border-[#7042f88b] bg-[#030014aa] backdrop-blur-md rounded-lg p-4 font-mono text-xs md:text-sm text-green-400 select-none shadow-[0_0_20px_#7042f833]">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#7042f844] pb-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] text-[#b49bff]/60 font-bold uppercase tracking-wider">
          LIVE VULN MONITOR
        </span>
      </div>

      {/* Terminal log output */}
      <div className="space-y-1.5 h-44 overflow-y-auto scrollbar-hidden">
        {lines.map((line, idx) => (
          <div key={idx} className={line.startsWith("$") ? "text-cyan-300" : "text-green-400/90"}>
            {line}
          </div>
        ))}
        {state === "typing" && (
          <div className="text-cyan-300">
            $ {currentText}
            <span className="inline-block w-1.5 h-3.5 bg-green-400 animate-pulse ml-1" />
          </div>
        )}
        {state === "outputting" && (
          <div className="text-cyan-300">
            $ {actions[actionIndex].command}
          </div>
        )}
        {state === "waiting" && (
          <div className="text-cyan-300">
            $ <span className="inline-block w-1.5 h-3.5 bg-green-400 animate-pulse ml-0.5" />
          </div>
        )}
      </div>
    </div>
  );
};
