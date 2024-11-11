import { Boxes } from "../../ui/background-boxes";
import { cn } from "@/lib/utils";

export const EmptySection = () => {
  return (
    <section id="empty" className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Building...
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Missing material, wait a minute
      </p>
    </section>
  );
};
