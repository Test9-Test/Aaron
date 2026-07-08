"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  link: string;
  techStack: string[];
  architecture: string; // Textual or visual explanation
  features: string[];
  challenges: string;
  solutions: string;
  gallery: string[];
}

interface PortfolioContextType {
  isScannerActive: boolean;
  setScannerActive: (active: boolean) => void;
  isResumeOpen: boolean;
  setResumeOpen: (open: boolean) => void;
  isHiddenTerminalOpen: boolean;
  setHiddenTerminalOpen: (open: boolean) => void;
  activeProject: ProjectData | null;
  setActiveProject: (project: ProjectData | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isScannerActive, setScannerActive] = useState(true);
  const [isResumeOpen, setResumeOpen] = useState(false);
  const [isHiddenTerminalOpen, setHiddenTerminalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  // Hidden terminal key listener (Ctrl + Shift + ~)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ~ is e.key === "~" or backtick with shift, let's catch standard combinations
      // Ctrl + Shift + ~ or Ctrl + Shift + ` (which is ~ on US keyboards)
      if (e.ctrlKey && e.shiftKey && (e.key === "~" || e.key === "`" || e.key === "Dead")) {
        e.preventDefault();
        setHiddenTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        isScannerActive,
        setScannerActive,
        isResumeOpen,
        setResumeOpen,
        isHiddenTerminalOpen,
        setHiddenTerminalOpen,
        activeProject,
        setActiveProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
