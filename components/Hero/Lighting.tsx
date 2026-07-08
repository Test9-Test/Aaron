import { useRef } from "react";

export const Lighting = () => {
  return (
    <>
      {/* Soft Ambient Light to prevent pitch black shadows */}
      <ambientLight intensity={0.3} />

      {/* Blue Fill Light (Front-Left, illuminating details opposite the camera softly) */}
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.2}
        color="#0ea5e9"
      />

      {/* Purple Rim Light (Back-Left/Rear, highlighting edges of the workstation from behind) */}
      <directionalLight
        position={[-4, 5, -4]}
        intensity={2.8}
        color="#a855f7"
      />
    </>
  );
};
