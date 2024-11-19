"use client";
import { ActivityCalendar } from "react-activity-calendar";
import { ActivityCalendar as ActivityCalendar1 } from "react-activity-calendar";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { HyperText } from "../../ui/hyper-text";
// import { GET as runGet } from "../../../app/api/run/route";
import dayjs from "./../../../node_modules/dayjs/esm/index";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useState, useRef } from "react";

type ActionType = "working" | "running";

const theme = {
  light: ["hsl(27, 0%, 100%)", "hsl(27, 100%, 61%)"],
};
const runTheme = {
  light: ["hsl(0, 0%, 100%)", "rebeccapurple"],
};

// export async function getServerSideProps(context: any) {
//   try {
//     console.log('111111')
//     const data = await runGet();
//     console.log(data, '2222222')
//     return { props: { data } };
//   } catch (error) {
//     // 处理错误，可以返回错误信息或进行其他操作
//     return { props: { error: 'Failed to fetch data' } };
//   }
// }

function getLevel(metre: number): number {
  if (metre < 2000) {
    return 1;
  } else if (metre >= 2000 && metre < 4000) {
    return 2;
  } else if (metre >= 4000 && metre < 6000) {
    return 3;
  } else if (metre >= 6000) {
    return 4;
  } else {
    return 0;
  }
}

export const WorkCardSeciton = ({ rData, wData }: any) => {
  const [key, setKey] = useState<ActionType>("working");

  const workData = [
    { date: "2024-01-01", overTimeDuration: -1 },
    ...wData,
  ]?.map((item: any) => ({
    ...item,
    level:
      item.overTimeDuration === -1 ? 0 : item.overTimeDuration <= 8 ? 1 : 4, // 今天不统计
    count: 1,
  })) || [{ date: "2024-01-01", level: 0, count: 0 }];

  const runData = [...rData, { date: "2024-01-01" }]
    ?.map((item: any) => ({
      ...item,
      date: item.date ?? dayjs(+item.endTime).format("YYYY-MM-DD"),
      level: item.startTime === item.endTime ? 0 : getLevel(item.kilometre), // 今天不统计
      count: item.startTime === item.endTime ? 0 : 1,
    }))
    .reverse() || [{ date: "2024-01-01", level: 0, count: 0 }];

  return (
    <section id="work" className="max-w-[75%] mx-auto py-24 sm:py-32">
      <div className="relative -top-10">
        <p className="text-xl md:text-2xl">
          This is my personal workstation. I record and output content in three
          areas: #programming, #fitness, #music by Wechat bot to check in.
          <Highlight className="text-black dark:text-white">
            One person company.
          </Highlight>
        </p>
      </div>
      <div>
        {key === "working" ? (
          <div className="flex justify-center items-center gap-5">
            <HyperText
              className="text-4xl font-bold text-black dark:text-white"
              text="Working"
            />
            <button
              onClick={() => setKey("running")}
              className="px-6 py-2 bg-white text-primary rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Running
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={() => setKey("working")}
              className="px-6 py-2 bg-white text-primary rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Working
            </button>
            <HyperText
              className="text-4xl font-bold text-black dark:text-white"
              text="Running"
            />
          </div>
        )}
      </div>
      {key === "working" ? (
        <ActivityCalendar
          data={workData}
          theme={theme}
          weekStart={1}
          showWeekdayLabels={["mon"]}
          renderBlock={(block, activity: any) =>
            React.cloneElement(block, {
              "data-tooltip-id": "react-tooltip",
              "data-tooltip-html": `${
                activity.overTimeDuration > 0
                  ? activity.date + " " + activity.overTimeDuration + "h"
                  : activity.date
              }`,
            })
          }
        />
      ) : ( 
        <ActivityCalendar1
          data={runData}
          theme={runTheme}
          weekStart={1}
          showWeekdayLabels={["mon"]}
          style={{ width: "100%" }}
          renderBlock={(block, activity: any) =>
            React.cloneElement(block, {
              "data-tooltip-id": "react-tooltip",
              "data-tooltip-html": `${
                activity.nameSuffix
                  ? activity.date + " " + activity.nameSuffix
                  : activity.date
              }`,
            })
          }
        />
      )}
      <ReactTooltip id="react-tooltip" />
    </section>
  );
};
