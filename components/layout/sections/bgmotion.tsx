"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

export const BgMotionSection = () => {
  const controls = useAnimation();
  const scrollY = useMotionValue(0);
  const [pageHeight, setPageHeight] = useState(0);
  const innerW = useRef(0);
  const innerH = useRef(0);

  useEffect(() => {
    setPageHeight(document.documentElement.offsetHeight);
    innerW.current = window.innerWidth;
    innerH.current = window.innerHeight;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      scrollY.set(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]); 
  
  const parallaxY = useTransform(scrollY, [0, pageHeight], [-250, 250], {
    clamp: false,
  });
  const sMovement = useTransform(parallaxY, [-250, 0, 250], [0, 500, 0]);
  const sineWaveX = useTransform(
    sMovement,
    (value) => -(Math.sin((value * Math.PI) / 250) * innerW.current) / 2
  );
  const sineWaveY = useTransform(
    sMovement,
    (scrollTop) =>
      (Math.sin((scrollTop / innerH.current) * Math.PI) * innerH.current) / 4 -
      150
  );

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        zIndex: -1,
        x: sineWaveX,
        y: sineWaveY,
      }}
    >
      <Image
        src="/white-circle.webp"
        alt="white-circle"
        className="rounded-md"
        width={525}
        height={525}
      />
    </motion.div>
  );
};
