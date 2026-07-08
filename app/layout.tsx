import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ScrollProgress } from "@/components/sub/ScrollProgress";
import { SecurityScanner } from "@/components/sub/SecurityScanner";
import { HiddenTerminal } from "@/components/sub/HiddenTerminal";
import { ResumeViewer } from "@/components/sub/ResumeViewer";
import { ProjectDrawer } from "@/components/sub/ProjectDrawer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <PortfolioProvider>
          {/* Scroll Progress Bar at the top */}
          <ScrollProgress />
          
          {/* Fake scanner on mount */}
          <SecurityScanner />
          
          {/* Hidden Terminal (Ctrl + Shift + ~) */}
          <HiddenTerminal />
          
          {/* Resume Viewer Modal */}
          <ResumeViewer />
          
          {/* Project Details Slide-in Drawer */}
          <ProjectDrawer />

          <StarsCanvas />
          <Navbar />
          {children}
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
