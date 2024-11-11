"use client";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AnimatedCircularProgressBar } from "../../ui/animated-circular-progress-bar";

type CardItem = {
  title: string;
  val: number;
};

const Items: CardItem[] = [
  {
    title: "JavaScript / Typescript",
    val: 100,
  },
  { title: "skill", val: 100 },
  {
    title: "Vue / Vue3",
    val: 100,
  },
  {
    title: "React / Next.js",
    val: 80,
  },
  {
    title: "nodejs / mongoDB",
    val: 50,
  },
  {
    title: "小程序",
    val: 80,
  },
];

const HoverCard = ({ variants, ...props }: any) => {
  return (
    <motion.div
      variants={variants}
      exit="hidden"
      className="w-full h-full absolute top-0 left-0 bg-[#334155]"
      {...props}
    >
      悬浮卡片内容
    </motion.div>
  );
};

const SkillItem = (props: CardItem) => {
  const cardVariants = {
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.2, ease: "linear" },
    },
    hidden: {
      opacity: 0,
      rotate: 90,
      transition: { duration: 0.2, ease: "linear" },
    },
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="visible"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-3xl relative overflow-hidden h-[192px] w-full bg-[#fcfcfd]"
    >
      <div className="px-4 py-8 w-full h-full absolute left-0 top-0 text-center">
        <h3 className="text-xl font-semibold text-[#4a5678] mb-2">
          {props.title}
        </h3>
        <AnimatedCircularProgressBar
          max={100}
          min={0}
          value={props.val}
          gaugePrimaryColor="rgb(156 163 175)"
          gaugeSecondaryColor="rgba(156, 163, 175, 0.2)"
          className="h-[70%] m-auto"
        />
      </div>
      <AnimatePresence>
        {isHovered && (
          <HoverCard
            key="hoverCard"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SkillSection = () => {
  const { controls, ref, variants } = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <section className="w-full px-4 lg:px-8 xl:px-32 2xl:px-44 relative z-10 my-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-4 w-full">
          {Items.map((item) =>
            item.title === "skill" ? (
              <div
                key="skill"
                style={{
                  background:
                    "linear-gradient(to right bottom, #334155 20%, #1d2530 150%)",
                  boxShadow: "20px 113px 140px -30px rgba(0, 0, 0, .1)",
                }}
                className="text-orange-400 w-full xl:text-8xl lg:text-[5rem] md:text-7xl text-center h-full m-auto font-semibold p-6 pt-12 rounded-3xl hidden md:block"
              >
                <span className="relative">
                  S
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="hat-wizard"
                    className="svg-inline--fa fa-hat-wizard absolute text-orange-400 -rotate-12 -top-[3rem] -left-[1rem] text-5xl"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M64 416L168.6 180.7c15.3-34.4 40.3-63.5 72-83.7l146.9-94c3-1.9 6.5-2.9 10-2.9C407.7 0 416 8.3 416 18.6v1.6c0 2.6-.5 5.1-1.4 7.5L354.8 176.9c-1.9 4.7-2.8 9.7-2.8 14.7c0 5.5 1.2 11 3.4 16.1L448 416H240.9l11.8-35.4 40.4-13.5c6.5-2.2 10.9-8.3 10.9-15.2s-4.4-13-10.9-15.2l-40.4-13.5-13.5-40.4C237 276.4 230.9 272 224 272s-13 4.4-15.2 10.9l-13.5 40.4-40.4 13.5C148.4 339 144 345.1 144 352s4.4 13 10.9 15.2l40.4 13.5L207.1 416H64zM279.6 141.5c-1.1-3.3-4.1-5.5-7.6-5.5s-6.5 2.2-7.6 5.5l-6.7 20.2-20.2 6.7c-3.3 1.1-5.5 4.1-5.5 7.6s2.2 6.5 5.5 7.6l20.2 6.7 6.7 20.2c1.1 3.3 4.1 5.5 7.6 5.5s6.5-2.2 7.6-5.5l6.7-20.2 20.2-6.7c3.3-1.1 5.5-4.1 5.5-7.6s-2.2-6.5-5.5-7.6l-20.2-6.7-6.7-20.2zM32 448H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                    ></path>
                  </svg>
                </span>
                kills
              </div>
            ) : (
              <SkillItem key={item.title} {...item} />
            )
          )}
        </div>
      </section>
    </motion.div>
  );
};
