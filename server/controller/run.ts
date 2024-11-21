import dayjs from "dayjs/esm";
// 导入模块
const { RunModel } = require("../models");

type KeepLoginType = {
  ok: Boolean;
  data: {
    token: String;
  };
  errorCode: String;
};

let cachedToken: string | null = process.env.KEEP_DEFAULT_TOKEN || null;
let tokenExpiry: number | null = null;

const LOGIN_API = "https://api.gotokeep.com/v1.1/users/login";
const RUN_DATA_API = "https://api.gotokeep.com/pd/v3/stats/detail";
const RUN_LOG_API = "https://api.gotokeep.com/pd/v3/{sport_type}log/{run_id}";

function clearCache() {
  cachedToken = null;
}

async function keepLogin(): Promise<string | null> {
  if (cachedToken) {
    return cachedToken;
  }

  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
      "Content-Type": "application/json",
    };
    const data = {
      mobile: process.env.KEEP_MOBILE,
      password: process.env.KEEP_PW,
    };
    const res = await fetch(LOGIN_API, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result: KeepLoginType = await res.json();
    if (result.ok === true) {
      cachedToken = result.data.token as string;
      return result.data.token as string;
    }
    clearCache();
    return null;
  } catch (error) {
    console.log("keepLogin error", error);
    clearCache();
    return null;
  }
}

async function getKeepRunData() {
  const token = await keepLogin();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const lastDate = dayjs(
      dayjs().add(1, "day").format("YYYY-MM-DD 23:59:59")
    ).valueOf();
    const runRes = await fetch(
      RUN_DATA_API + `?dateUnit=all&type=running&lastDate=${lastDate}`,
      {
        method: "GET",
        headers,
      }
    );

    const runResult = await runRes.json();
    if (runResult.ok === true) {
      const records = runResult.data?.records?.map((item: any) => ({
        startTime: item.logs[0]?.stats?.startTime,
        endTime: item.logs[0]?.stats?.endTime,
        duration: item.logs[0]?.stats?.duration,
        kilometre: item.logs[0]?.stats?.distance,
        nameSuffix: item.logs[0]?.stats?.nameSuffix,
        amapWaterMark: item.logs[0]?.stats?.amapWaterMark,
      }));

      return records;
    }
    return [];
  } catch (error) {
    console.log("getRunData error", error);
  }
}

export const findRunData = async () => {
  try {
    // return await getKeepRunData();
    const data = await RunModel.findAll({ raw: true });
    const firstDataDay = data?.[0]?.startTime
      ? dayjs(+data?.[0]?.startTime).format("YYYY-MM-DD")
      : "";
    const today = dayjs().format("YYYY-MM-DD");
    if (firstDataDay !== today) {
      const runData = await getKeepRunData();
      await RunModel.truncate({ cascade: true, restartIdentity: true });
      const rawData = [
        {
          startTime: dayjs(today).valueOf(),
          endTime: dayjs(today).valueOf(),
          duration: 0,
          kilometre: 0,
          nameSuffix: "",
          amapWaterMark: "",
        },
        ...runData,
      ];
      const insertedRuns = await RunModel.bulkCreate(rawData);
      console.log("批量插入成功，插入的记录数：", insertedRuns.length);
      return rawData;
    }
    return data;
    // const result = data.map((d: any) => {
    //   d.toJSON();
    // });
    // return result;
  } catch (error) {
    console.log("findRunData error", error);
  }
};
