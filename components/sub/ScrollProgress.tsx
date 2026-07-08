"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 origin-left z-[9999] shadow-[0_0_10px_#a855f7,0_0_20px_#06b6d4]"
      style={{ scaleX }}
    />
  );
};
