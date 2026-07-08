"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CounterItemProps {
  target: number;
  suffix: string;
  label: string;
}

const CounterCard = ({ target, suffix, label }: CounterItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progressPercentage * (2 - progressPercentage);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className="p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md text-center shadow-lg hover:border-[#7042f88b] transition-all duration-300 w-full"
    >
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-mono">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm font-mono tracking-widest text-gray-400 mt-2 uppercase">
        {label}
      </div>
    </div>
  );
};

export const ExperienceCounters = () => {
  const stats = [
    { target: 18, suffix: "+", label: "Completed Projects" },
    { target: 35, suffix: "+", label: "Technologies Mastered" },
    { target: 500, suffix: "+", label: "Cups of Coffee" },
    { target: 1500, suffix: "+", label: "GitHub Commits" },
    { target: 50, suffix: "+", label: "Security Labs Runs" },
    { target: 12, suffix: "+", label: "Certifications & Badges" },
  ];

  return (
    <section className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 z-10">
        {stats.map((stat, idx) => (
          <CounterCard
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
};
