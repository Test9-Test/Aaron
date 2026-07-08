"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShieldCheck, Server, Key, Wifi, Cpu, Eye, Lock } from "lucide-react";

interface CardProps {
  label: string;
  icon: React.ReactNode;
  top: string;
  left: string;
  glowColor: string;
  delay: number;
}

export const FloatingDataCards = () => {
  const [isClient, setIsClient] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -30 and 30 for offset
      const x = (e.clientX / window.innerWidth - 0.5) * 45;
      const y = (e.clientY / window.innerHeight - 0.5) * 45;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isClient) return null;

  const cardsData: CardProps[] = [
    {
      label: "Threat Detection",
      icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
      top: "10%",
      left: "5%",
      glowColor: "shadow-rose-500/20 border-rose-500/30",
      delay: 0,
    },
    {
      label: "Firewall Active",
      icon: <Lock className="w-4 h-4 text-emerald-400" />,
      top: "22%",
      left: "70%",
      glowColor: "shadow-emerald-500/20 border-emerald-500/30",
      delay: 1.5,
    },
    {
      label: "System Secure",
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
      top: "55%",
      left: "8%",
      glowColor: "shadow-cyan-500/20 border-cyan-500/30",
      delay: 0.8,
    },
    {
      label: "Encryption AES-256",
      icon: <Key className="w-4 h-4 text-purple-400" />,
      top: "45%",
      left: "78%",
      glowColor: "shadow-purple-500/20 border-purple-500/30",
      delay: 2.2,
    },
    {
      label: "VPN Connected",
      icon: <Wifi className="w-4 h-4 text-blue-400" />,
      top: "78%",
      left: "15%",
      glowColor: "shadow-blue-500/20 border-blue-500/30",
      delay: 1.2,
    },
    {
      label: "IDS Online",
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      top: "80%",
      left: "65%",
      glowColor: "shadow-amber-500/20 border-amber-500/30",
      delay: 3,
    },
    {
      label: "Linux Server",
      icon: <Server className="w-4 h-4 text-amber-500" />,
      top: "5%",
      left: "52%",
      glowColor: "shadow-amber-600/20 border-amber-600/30",
      delay: 2.5,
    },
    {
      label: "Windows Server",
      icon: <Server className="w-4 h-4 text-sky-400" />,
      top: "65%",
      left: "52%",
      glowColor: "shadow-sky-500/20 border-sky-500/30",
      delay: 0.4,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 hidden md:block">
      {cardsData.map((card, index) => {
        // Individual speed multiplier for 3D parallax effect
        const speedMultiplier = (index % 3) * 0.4 + 0.3;

        return (
          <motion.div
            key={card.label}
            className={`absolute flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-[#030014]/65 backdrop-blur-md shadow-lg ${card.glowColor} text-white font-mono text-[10px] md:text-xs`}
            style={{
              top: card.top,
              left: card.left,
              x: springX.get() * speedMultiplier,
              y: springY.get() * speedMultiplier,
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            }}
          >
            <div className="flex-shrink-0 animate-pulse">{card.icon}</div>
            <span className="font-semibold tracking-wider text-gray-200">
              {card.label}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
          </motion.div>
        );
      })}
    </div>
  );
};
