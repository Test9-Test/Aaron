"use client";

import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  const { setActiveProject } = usePortfolio();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveProject({
      title,
      description,
      image: src,
      link,
      techStack: [],
      architecture: "",
      features: [],
      challenges: "",
      solutions: "",
      gallery: [],
    });
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] cursor-pointer hover:shadow-[0_0_20px_#2A0E61] transition-shadow duration-300 w-full"
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>
  );
};
