import { Hero as HeroLayout } from "@/components/Hero/Hero";
import { basePath } from "@/lib/basePath";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-440px] left-0 w-full h-full object-cover -z-20"
      >
        <source src={`${basePath}/videos/blackhole.webm`} type="video/webm" />
      </video>

      <HeroLayout />
    </div>
  );
};
