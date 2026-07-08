"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Radio, Key, HardDrive, Network } from "lucide-react";

export const SecurityMetrics = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [scores, setScores] = useState({ score: 0, threats: 0, uptime: 0 });

  // Count animations on scroll entry
  useEffect(() => {
    if (!inView) return;
    
    // Animate metrics values
    const duration = 1500;
    const startTime = performance.now();

    const animateScores = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setScores({
        score: Math.floor(progress * 99),
        threats: Math.floor(progress * 100),
        uptime: parseFloat((progress * 99.99).toFixed(2)),
      });

      if (progress < 1) {
        requestAnimationFrame(animateScores);
      } else {
        setScores({ score: 99, threats: 100, uptime: 99.99 });
      }
    };

    requestAnimationFrame(animateScores);
  }, [inView]);

  // Real-time canvas line chart simulating threat scans / bandwidth packet streams
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 130);

    const dataPoints: number[] = Array(35).fill(40);
    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = 130;
    };
    window.addEventListener("resize", handleResize);

    const updateChart = () => {
      // Shift data points and add a random fluctuation
      dataPoints.shift();
      const lastVal = dataPoints[dataPoints.length - 1] || 40;
      const nextVal = Math.max(10, Math.min(height - 10, lastVal + (Math.random() - 0.5) * 20));
      dataPoints.push(nextVal);

      // Render chart path
      ctx.clearRect(0, 0, width, height);

      // Draw horizontal reference gridlines
      ctx.strokeStyle = "rgba(112, 66, 248, 0.08)";
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const step = width / (dataPoints.length - 1);

      // Gradient fill beneath line
      const fillGrad = ctx.createLinearGradient(0, 0, 0, height);
      fillGrad.addColorStop(0, "rgba(6, 182, 212, 0.25)");
      fillGrad.addColorStop(1, "rgba(112, 66, 248, 0.01)");

      ctx.fillStyle = fillGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      dataPoints.forEach((val, idx) => {
        ctx.lineTo(idx * step, height - val);
      });
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Stroke Line path
      ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "rgba(6, 182, 212, 0.4)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      dataPoints.forEach((val, idx) => {
        if (idx === 0) ctx.moveTo(0, height - val);
        else ctx.lineTo(idx * step, height - val);
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw active scanner scanner node at last point
      const lastX = width;
      const lastY = height - nextVal;
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Slow frame rate cap (approx 15 updates per second for scanning aesthetic)
      setTimeout(() => {
        animId = requestAnimationFrame(updateChart);
      }, 70);
    };

    updateChart();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security-metrics"
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-[350px] h-[350px] rounded-full bg-[#7042f8]/5 blur-[120px] pointer-events-none" />

      <h2 className="text-[40px] font-bold text-center text-white mb-2 tracking-wider">
        Security Metrics
      </h2>
      <div className="w-[100px] h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-16" />

      {/* Grid Dashboard */}
      <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 font-mono">
        {/* Metric Card 1: Security Score */}
        <div className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg flex items-center justify-between hover:border-[#7042f88b] transition-all">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Security Score</span>
            </span>
            <div className="text-3xl font-extrabold text-white pt-2">
              {scores.score}%
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded w-max">
              Post-hardened
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">{scores.score}</span>
          </div>
        </div>

        {/* Metric Card 2: Threat Detection */}
        <div className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg flex items-center justify-between hover:border-[#7042f88b] transition-all">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>IDS Threat Mitigation</span>
            </span>
            <div className="text-3xl font-extrabold text-white pt-2">
              {scores.threats}%
            </div>
            <div className="text-[10px] text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded w-max">
              Active Snort Rules
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
            <span className="text-xs font-bold text-cyan-400">100%</span>
          </div>
        </div>

        {/* Metric Card 3: Firewall State */}
        <div className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg flex items-center justify-between hover:border-[#7042f88b] transition-all">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Key className="w-4 h-4 text-purple-400" />
              <span>Tunnel Encryption</span>
            </span>
            <div className="text-2xl font-extrabold text-white pt-2">
              AES-256 GCM
            </div>
            <div className="text-[10px] text-purple-400 font-semibold bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded w-max mt-1">
              VPN SSL/TLS
            </div>
          </div>
          <div className="px-3 py-1.5 rounded bg-purple-950/20 border border-purple-500/20 text-[10px] text-purple-300 font-bold uppercase animate-pulse">
            Secure Mode
          </div>
        </div>

        {/* Metric Card 4: System Uptime */}
        <div className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg flex items-center justify-between hover:border-[#7042f88b] transition-all">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-yellow-500" />
              <span>Lab Server Uptime</span>
            </span>
            <div className="text-3xl font-extrabold text-white pt-2">
              {scores.uptime}%
            </div>
            <div className="text-[10px] text-yellow-500 font-semibold bg-yellow-950/40 border border-yellow-500/20 px-2 py-0.5 rounded w-max">
              Windows Server Host
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
        </div>

        {/* Metric Card 5: Real-time traffic analytics chart (Takes up 2 columns) */}
        <div className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg hover:border-[#7042f88b] transition-all md:col-span-2 flex flex-col justify-between h-40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Dynamic Firewall Traffic Load (Ingest Node)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Capture</span>
            </span>
          </div>

          <div className="flex-1 w-full relative flex items-end">
            <canvas ref={chartRef} className="w-full h-full max-h-[130px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
