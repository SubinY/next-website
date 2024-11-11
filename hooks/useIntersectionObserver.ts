import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// 默认动画变体
const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // 动画持续时间
      ease: "easeInOut", // 缓动函数
    },
  },
};

export default function useIntersectionObserver(threshold: number = 0.1, v?: Recordable) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  const variants = v || fadeUpVariants;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return { controls, ref, variants };
}
