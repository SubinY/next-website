"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { ImageTabs } from "../../ui/image-tabs";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import Image from "next/image";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const Items = [
  {
    name: "前后台全栈项目",
    description: "30分钟开发部署一个管理后台项目,基于Koa搭建的前后台全栈项目，包含官网、权限管理后台。",
    href: "http://101.33.228.57:5000",
    cta: "web",
    href2: "http://101.33.228.57:5001",
    cta2: "admin",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="flex w-full items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl absolute h-[80%] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <Image
          src="/screenshot/koa前后台.png"
          height="700"
          width="1400"
          loading="lazy"
          className="object-left-top"
          alt="fullstack"
        />
      </div>
    ),
    // background: (
    //   <Image
    //     src="/screenshot/物料平台.png"
    //     height="700"
    //     width="1400"
    //     loading="lazy"
    //     className="absolute [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
    //     alt="thumbnail"
    //   />
    // ),
  },
  {
    name: "前端物料平台",
    description:
      "多端统一物料平台、可视化UI界面、配套的命令帮助团队快速开发物料，管理项目等",
    href: "http://101.33.228.57",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2 lg:row-span-3",
    background: (
      <ImageTabs
        tabs={[
          {
            title: "overview",
            value: "overview",
            content: (
              <div className="overflow-hidden relative rounded-2xl m-4 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#4805fd] to-[#8c5fff]">
                <div className="relative inset-x-0 rounded-xl mx-auto p-4 flex justify-center">
                  <Image
                    src="/screenshot/平台首页.png"
                    height="700"
                    width="1400"
                    loading="lazy"
                    className="object-left-top w-full max-w-[654px]"
                    alt="overview"
                  />
                </div>
              </div>
            ),
          },
          {
            title: "material",
            value: "material",
            content: (
              <div className="overflow-hidden relative rounded-2xl m-4 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#4805fd] to-[#8c5fff]">
                <div className="relative inset-x-0 rounded-xl mx-auto p-4 flex justify-center">
                  <Image
                    src="/screenshot/平台物料.png"
                    height="700"
                    width="1400"
                    loading="lazy"
                    className="object-left-top w-full max-w-[654px]"
                    alt="material"
                  />
                </div>
              </div>
            ),
          },
          {
            title: "resource",
            value: "resource",
            content: (
              <div className="overflow-hidden relative rounded-2xl m-4 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#4805fd] to-[#8c5fff]">
                <div className="relative inset-x-0 rounded-xl mx-auto p-4 flex justify-center">
                  <Image
                    src="/screenshot/平台资源.png"
                    height="700"
                    width="1400"
                    loading="lazy"
                    className="object-left-top w-full max-w-[654px]"
                    alt="resource"
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    ),
  },
  {
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    name: "转手写平台",
    description: "转写各种语言为手写字体，建设中。。。",
    href: "https://handwrite.gymsummer.com",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  //   {
  //     Icon: CalendarIcon,
  //     name: "Calendar",
  //     description: "Use the calendar to filter your files by date.",
  //     className: "col-span-3 lg:col-span-1",
  //     href: "#",
  //     cta: "Learn more",
  //     background: <img className="absolute -right-20 -top-20 opacity-60" />,
  //   },
];

export function ProjectSection() {
  const { controls, ref, variants } = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <section className="w-full px-4 lg:px-8 xl:px-32 2xl:px-44 relative z-10 my-4 py-12 sm:py-16">
        <BentoGrid>
          {Items.map((item, idx) => (
            <BentoCard key={idx} {...item} />
          ))}
        </BentoGrid>
      </section>
    </motion.div>
  );
}
