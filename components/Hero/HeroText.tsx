"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/lib/motion";
import { LiveTerminal } from "../sub/LiveTerminal";
import { usePortfolio } from "@/context/PortfolioContext";

export const HeroText = () => {
  const { setResumeOpen } = usePortfolio();

  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Cybersecurity & IT Support Specialist
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
      >
        <span>
          Building{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            secure, reliable
          </span>{" "}
          IT infrastructure.
        </span>
      </motion.div>

      <motion.p
        variants={slideInFromLeft(0.8)}
        className="text-lg text-gray-400 my-5 max-w-[600px]"
      >
        Graduate with hands-on experience in desktop support, networking, Windows Server administration, and cybersecurity operations. Passionate about building secure, reliable IT infrastructure and continuously expanding skills in offensive and defensive security.
      </motion.p>

      {/* Live Cyber Terminal */}
      <motion.div
        variants={slideInFromLeft(0.9)}
        className="mb-4"
      >
        <LiveTerminal />
      </motion.div>

      <motion.button
        onClick={() => setResumeOpen(true)}
        variants={slideInFromLeft(1)}
        className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] w-full outline-none border-none"
      >
        View Resume
      </motion.button>
    </div>
  );
};
