"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import { FlipWords } from "../../ui/flip-words";
import Link from "next/link";
import { routeList } from "../config";

export const ProfileSection = () => {
  const words = ["GYM SUMMER", "Subin"];

  const durationCalc = useCallback(
    (duration: number) => ({ "--duration": duration } as unknown),
    []
  );

  return (
    <section className="w-full px-4 lg:px-16 xl:px-32 2xl:px-44 relative z-10 py-12 my-8 flex flex-wrap-reverse md:flex-nowrap justify-items-center justify-around items-center gap-16">
      <CardContainer className="inter-var">
        <CardBody className="bg-gradient-to-rb relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto sm:w-[24rem] h-auto rounded-xl p-6">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            My name is:
          </CardItem>
          <CardItem
            translateZ="60"
            className="text-neutral-500 text-[40px] w-full relative py-10 border-b-2 border-slate-700 font-bold dark:text-neutral-300"
          >
            <FlipWords
              words={words}
              className="text-primary w-full text-center"
            />
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
          >
            I am a:
          </CardItem>
          <CardItem
            translateZ={20}
            className="w-full flex mt-6 justify-end flex-col items-end text-xl hover:text-[#ddd]"
          >
            {routeList.map(({ href, label }) => (
              <div key={href}>
                <Link href={href} className="hover:text-neutral-600">
                  {label}
                </Link>
              </div>
            ))}
          </CardItem>
          <CardItem translateZ={20}>
            <Link href="#wordcard">
              <div className="bg-primary w-16 h-16 absolute -left-10 -bottom-10 rounded-full"></div>
            </Link>
          </CardItem>
        </CardBody>
      </CardContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="pointer-events-none absolute inset-0 h-full w-full -z-10"
      >
        <circle
          className="stroke-black/10 stroke-1 dark:stroke-white/10"
          cx="50%"
          cy="50%"
          r="300"
          fill="none"
          strokeDasharray="4 4"
        ></circle>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="pointer-events-none absolute inset-0 h-full w-full -z-10"
      >
        <circle
          className="stroke-black/10 stroke-1 dark:stroke-white/10"
          cx="50%"
          cy="50%"
          r="350"
          fill="none"
          strokeDasharray="4 4"
        ></circle>
      </svg>
      <p
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10 h-[50px] w-[50px] border-none bg-transparent -z-10"
        )}
        style={{ "--duration": 10, "--radius": 300, "--delay": -20 } as any}
      >
        <Image
          src="/vue.svg"
          height="50"
          width="50"
          loading="lazy"
          className="w-20 relative top-8 left-2 drop-shadow-lg"
          alt="thumbnail"
        />
      </p>
      <p
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10 h-[50px] w-[50px] border-none bg-transparent -z-10"
        )}
        style={{ "--duration": 15, "--radius": 300, "--delay": -20 } as any}
      >
        <Image
          src="/react.svg"
          height="50"
          width="50"
          loading="lazy"
          className="w-20 relative top-8 left-2 drop-shadow-lg"
          alt="thumbnail"
        />
      </p>
      <p
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10 h-[50px] w-[50px] border-none bg-transparent -z-10"
        )}
        style={{ "--duration": 20, "--radius": 300, "--delay": -20 } as any}
      >
        <Image
          src="/nodejs.svg"
          height="50"
          width="50"
          loading="lazy"
          className="w-20 relative top-8 left-2 drop-shadow-lg"
          alt="thumbnail"
        />
      </p>
      <p
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10 h-[50px] w-[50px] border-none bg-transparent -z-10"
        )}
        style={{ "--duration": 25, "--radius": 300, "--delay": -20 } as any}
      >
        <Image
          src="/devops.svg"
          height="50"
          width="50"
          loading="lazy"
          className="w-40 relative top-8 left-2 drop-shadow-lg"
          alt="thumbnail"
        />
      </p>
      <p
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center circle rounded-full border [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10 h-[150px] w-[150px] border-none bg-transparent -z-10"
        )}
        style={{ "--duration": 8, "--radius": 300, "--delay": -20 } as any}
      >
        <Image
          src="/profile.jpg"
          height="150"
          width="150"
          loading="lazy"
          className="w-100 relative top-8 left-2 drop-shadow-lg rounded-full"
          alt="thumbnail"
        />
      </p>
    </section>
  );
};
