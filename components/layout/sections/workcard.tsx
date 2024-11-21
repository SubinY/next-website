"use client";
import { ActivityCalendar } from "react-activity-calendar";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { HyperText } from "../../ui/hyper-text";
import { GET as workGet } from "../../../app/api/work/route";
import dayjs from "./../../../node_modules/dayjs/esm/index";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import React, { useState, useEffect } from "react";

type ActionType = "working" | "running";

const theme = {
  light: ["hsl(27, 0%, 100%)", "hsl(27, 100%, 61%)"],
};
const runTheme = {
  light: ["hsl(0, 0%, 100%)", "rebeccapurple"],
};

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

export const WorkCardSeciton = () => {
  const [key, setKey] = useState<ActionType>("working");
  const [workData, setWorkData] = useState<any[]>([]);
  const [runData, setRunData] = useState<any[]>([]);

  useEffect(() => {
    async function workInit() {
      try {
        const wRes: any = await fetch("/api/work", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          } as any,
        });

        const { wData } = await wRes.json();

        setWorkData(
          [{ date: "2024-01-01", overTimeDuration: -1 }, ...wData]?.map(
            (item: any) => ({
              ...item,
              level:
                item.overTimeDuration === -1
                  ? 0
                  : item.overTimeDuration <= 8
                  ? 1
                  : 4, // 今天不统计
              count: 1,
            })
          ) || [{ date: "2024-01-01", level: 0, count: 0 }]
        );
      } catch (error) {
        console.log("/api/work error ", error);
      }
    }
    async function runInit() {
      try {
        const rRes: any = await fetch("/api/run", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          } as any,
        });

        const { rData } = await rRes.json();

        setRunData(
          filterByUniqueStartTime(rData)?.map((item: any) => ({
            ...item,
            date: item.date ?? dayjs(+item.endTime).format("YYYY-MM-DD"),
            level:
              item.startTime === item.endTime ? 0 : getLevel(item.kilometre), // 今天不统计
            count: item.startTime === item.endTime ? 0 : 1,
          })) || []
        );
      } catch (error) {
        console.log("/api/run error ", error);
      }
    }

    workInit();
    runInit();
  }, []);

  // // 用于日历
  // const runData = [...rData, { date: "2024-01-01" }]
  //   ?.map((item: any) => ({
  //     ...item,
  //     date: item.date ?? dayjs(+item.endTime).format("YYYY-MM-DD"),
  //     level: item.startTime === item.endTime ? 0 : getLevel(item.kilometre), // 今天不统计
  //     count: item.startTime === item.endTime ? 0 : 1,
  //   }))
  //   .reverse() || [{ date: "2024-01-01", level: 0, count: 0 }];

  const filterByUniqueStartTime = (array: Recordable[]) => {
    const seen: any = {}; // 用于跟踪已经遇到的 startTime
    return array.filter((item) => {
      const startTime = item.startTime;
      if (!seen[startTime]) {
        seen[startTime] = true; // 标记为已遇到
        return true; // 保留这个元素
      }
      return false; // 跳过这个元素，因为它是重复的
    });
  };

  const calcMin = (time: number) => {
    let minutes = Math.floor(time / 60); // 使用 Math.floor 来向下取整得到完整的分钟数
    let remainingSeconds = time % 60; // 使用取模运算符来得到剩余的秒数
    return time ? `${minutes} 分钟 ${remainingSeconds} 秒` : "-";
  };

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
      <div className="mb-5">
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
      <div
        className="flex justify-center"
        style={{ display: key === "working" ? 'block' : 'none' }}
      >
        <ActivityCalendar
          data={workData}
          loading={!workData?.length}
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
      </div>
      <div
        className="overflow-x-auto max-h-[15rem]"
        style={{ display: key === "running" ? 'block' : 'none' }}
      >
        {/* 包裹表格以处理水平溢出，并限制最大高度 */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-primary sticky top-0 z-10">
            <tr>
              <th className="p-3 font-bold">Date</th>
              <th className="p-3 font-bold">KM</th>
              <th className="p-3 font-bold">Duration</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm md:text-xl dark:text-black">
            {runData.map((item, index) => (
              <tr key={index}>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.nameSuffix}</td>
                <td className="p-3 border">{calcMin(+item.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <ActivityCalendar
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
        /> */}
      <ReactTooltip id="react-tooltip" />
    </section>
  );
};
