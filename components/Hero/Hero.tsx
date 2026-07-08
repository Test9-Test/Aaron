"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeroText } from "./HeroText";
import { basePath } from "@/lib/basePath";
import { HeroScene } from "./HeroScene";
import { slideInFromRight } from "@/lib/motion";
import { AnimatedNetworkGraph } from "../sub/AnimatedNetworkGraph";
import { FloatingDataCards } from "../sub/FloatingDataCards";

export const Hero = () => {
  return (
    <div className="relative w-full h-full">
      {/* Background Neon Network Graph */}
      <AnimatedNetworkGraph />
      
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      >
        {/* Left Text Column */}
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <HeroText />
        </div>

        {/* Right Column (3D Scene on Desktop, Static Fallback Image on Mobile) */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center relative"
        >
          {/* Desktop Interactive 3D Workstation (Hidden on Mobile screens < 768px) */}
          <div className="hidden md:block w-full h-full relative md:-top-[50px] lg:-top-[65px] xl:-top-[75px]">
            <FloatingDataCards />
            <HeroScene />
          </div>

          {/* Mobile Static Fallback Image (Hidden on Desktop screens >= 768px) */}
          <div className="block md:hidden w-full h-full">
            <Image
              src={`${basePath}/hero-station-static.png`}
              alt="Workstation Static Illustration"
              height={650}
              width={650}
              priority
              draggable={false}
              className="select-none object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
