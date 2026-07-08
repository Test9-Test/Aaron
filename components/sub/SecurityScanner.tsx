"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const scanSteps = [
  { text: "Initializing security root environment...", delay: 200 },
  { text: "Checking firewall rulesets & policies... [ACTIVE]", delay: 700 },
  { text: "Establishing intrusion detection sockets... [ONLINE]", delay: 1300 },
  { text: "Scanning open port vectors (22, 80, 443)... [SECURE]", delay: 1800 },
  { text: "Running deep threat heuristics scan... [0 VULNERABILITIES]", delay: 2300 },
  { text: "SYSTEM STATUS: 100% SECURE. ACCESS GRANTED.", delay: 2700 },
];

export const SecurityScanner = () => {
  const { isScannerActive, setScannerActive } = usePortfolio();
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isScannerActive) return;

    // Load logs sequentially
    scanSteps.forEach((step) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
      }, step.delay);
      return () => clearTimeout(timer);
    });

    // Animate percentage
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    // Close scanner after 3.2 seconds
    const finishTimer = setTimeout(() => {
      setScannerActive(false);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [isScannerActive, setScannerActive]);

  return (
    <AnimatePresence>
      {isScannerActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 bg-[#030014] z-[99999] flex flex-col items-center justify-center font-mono text-cyan-400 p-6 select-none"
        >
          {/* Cyberpunk grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030014_90%)] pointer-events-none" />

          <div className="w-full max-w-xl border border-cyan-500/30 bg-[#03001480] backdrop-blur-md rounded p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col gap-6 relative">
            {/* Top Bar decor */}
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
              <span className="text-xs uppercase tracking-wider text-cyan-500/60 font-bold">
                SYSTEM SHIELD CORE v1.0.9
              </span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
            </div>

            {/* Radar Animation / Target Box */}
            <div className="relative flex justify-center py-4">
              <div className="w-24 h-24 rounded-full border border-cyan-500/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(6,182,212,0.15)_0deg,transparent_120deg)] animate-spin" style={{ animationDuration: '2s' }} />
                <span className="text-xl font-bold text-cyan-300">{percent}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-cyan-950/40 border border-cyan-500/20 h-3 rounded overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Log Output Console */}
            <div className="h-44 overflow-y-auto bg-black/40 border border-cyan-500/10 p-3 rounded text-xs flex flex-col gap-1.5 scrollbar-hidden">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start animate-[fadeIn_0.2s_ease-out]">
                  <span className="text-purple-400">⚡</span>
                  <span className={idx === scanSteps.length - 1 ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="w-2.5 h-4 bg-cyan-400 animate-pulse mt-0.5" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
