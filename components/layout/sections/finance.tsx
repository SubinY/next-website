"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import dayjs from "dayjs";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50" // Изменено здесь
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm" // Добавлен backdrop-blur
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-sm sm:text-base md:text-lg text-foreground"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-2xl sm:text-4xl md:text-5xl font-medium mb-4 text-foreground"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p className="text-sm text-foreground/80" variants={item}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export const FinanceSection: React.FC = () => {
  const [data, setData] = useState<any>({
    monthTotal: 0,
    dailyTotal: 0,
    budgetRadio: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.coze.cn/v1/workflow/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer pat_Z3QBeLnkotW0vUfXLfGgtd7v25sKErqC7oBHEBKy9zEAG6UCGyG1IOPX6SGyKOLD",
          },
          body: JSON.stringify({
            workflow_id: "7479356189769760808",
            parameters: {
              date: dayjs().format("YYYYMM"),
              budget: 5700,
            },
          }),
        });

        const { data } = await res.json();
        const dataJson = JSON.parse(data);
        dataJson.budgetRadio = (dataJson.budgetRadio * 100).toFixed(0);
        if (dataJson.recentDate !== dayjs().format("YYYYMMDD")) {
          dataJson.dailyTotal = 0;
        }
        setData(dataJson);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="w-full px-4 lg:px-8 xl:px-32 2xl:px-44 relative z-10 my-4 py-12 sm:py-16">
      <div className="relative -top-10">
        <p className="text-xl md:text-2xl">
          This is my personal financial dashboard
        </p>
      </div>
      <div className="w-full bg-background h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 grow h-full">
          <div className="md:col-span-2">
            <BentoCard
              title="Monthly expenses"
              value={`￥${data.monthTotal}`}
              subtitle={`Data on ${dayjs().format("MMMM")}`}
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="Budget ratio"
            value={`${data.budgetRadio}%`}
            colors={["#60A5FA", "#34D399", "#93C5FD"]}
            delay={0.4}
          />
          <div className="md:col-span-3">
            <BentoCard
              title="Daily expenses"
              value={`${"￥" + data.dailyTotal}`}
              subtitle={`Latest data from ${dayjs(data.recentDate).format(
                "YYYY/MM/DD"
              )}`}
              colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
              delay={0.6}
            />
          </div>
          {/* <div className="md:col-span-2">
            <BentoCard
              title="Active Projects"
              value={42}
              subtitle="8 completed this month"
              colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
              delay={0.8}
            />
          </div>
          <div className="md:col-span-3">
            <BentoCard
              title="Customer Satisfaction"
              value="4.8/5"
              subtitle="Based on 1,000+ reviews from verified customers across all product categories"
              colors={["#EC4899", "#F472B6", "#3B82F6"]}
              delay={1}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

// https://api.coze.cn/v1/workflow/run

// {
//   "workflow_id": "7479356189769760808",
//   "parameters": {
//       "date":"202503"
//   }
// }

// Authorization: Bearer pat_Z3QBeLnkotW0vUfXLfGgtd7v25sKErqC7oBHEBKy9zEAG6UCGyG1IOPX6SGyKOLD
