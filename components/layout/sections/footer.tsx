import { LetterPullup } from "@/components/ui/letter-pullup";
import Link from "next/link";
import { Highlight } from "../../ui/hero-highlight";

export const FooterSection = () => {
  return (
    <footer id="footer" className="w-full px-4 lg:px-8 xl:px-32 2xl:px-44 relative z-10 my-4 py-12 sm:py-16">
      <p className="text-2xl md:text-4xl text-slate-700">
        Everything is worth recording. The weak love to record, the ordinary
        love to review, and the strong 
        <Highlight className="text-black dark:text-white ml-4">
          Just Do It.
        </Highlight>
      </p>
      <LetterPullup
        words={"@gymsummer"}
        delay={0.05}
        className="pt-40 text-gray-300 text-2xl"
      />
    </footer>
  );
};
