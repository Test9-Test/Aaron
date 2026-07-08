"use client";

import React from "react";
import { GlobeSatellites } from "@/components/ui/cobe-globe-satellites";

export const InteractiveGlobe = () => {
  return (
    <div className="flex flex-col items-center justify-center relative select-none w-full">
      <div className="relative w-[400px] h-[400px] max-w-full aspect-square">
        <GlobeSatellites className="w-full h-full" />
      </div>
    </div>
  );
};

