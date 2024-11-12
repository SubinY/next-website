import dayjs from "dayjs/esm";
const { WorkModel } = require("../models");

export async function findWorkData() {
  try {
    const data = await WorkModel.findAll({ raw: true });
    return data;
  } catch (error) {
    console.log("Error getWorkData: " + error);
  }
}

export async function setWorkData({
  onTime,
  offTime,
}: {
  onTime?: number;
  offTime?: number;
}) {
  if (!onTime && !offTime) {
    throw new Error("请输入上下班时间");
  }
  try {
    const thisDay = onTime
      ? dayjs(onTime).format("YYYY-MM-DD")
      : dayjs(offTime).format("YYYY-MM-DD");
    const data = await WorkModel.findOne({
      where: { date: thisDay },
      raw: true,
    });
    if (data && data.onTime) {
      let overTimeDuration = dayjs(offTime).diff(dayjs(+data.onTime), "hour");
      overTimeDuration = overTimeDuration <= 0 ? 1 : overTimeDuration - 1;
      await WorkModel.update(
        { offTime, overTimeDuration },
        {
          where: { date: thisDay },
        }
      );
      console.log("works更新成功，更新的记录数：1");
    } else {
      await WorkModel.create({
        onTime,
        offTime: -1,
        overTimeDuration: -1,
        date: thisDay,
      });
      console.log("works插入成功，插入的记录数：1");
    }
  } catch (error) {
    console.error("Error setWorkData: " + error);
  }
}

// (async () => {
//   function calc(onTime: number, offTime: number) {
//     const overTimeDuration = dayjs(offTime).diff(dayjs(onTime), "hour") - 1;
//     return {
//       onTime,
//       offTime,
//       overTimeDuration,
//       date: dayjs(onTime).format("YYYY-MM-DD"),
//     };
//   }
//   try {
//     // 你也可以批量插入数据
//     const works = await WorkModel.bulkCreate([
//       calc(1730680200000, 1730712600000),
//       calc(1730766600000, 1730799000000),
//       calc(1730853000000, 1730885400000),
//       calc(1730939400000, 1730971800000),
//       calc(1731025800000, 1731058200000),
//       calc(1731285000000, 1731317400000),
//     ]);
//     console.log("批量插入数据成功a：", works);
//   } catch (error) {
//     console.error("插入数据失败：", error);
//   }
// })();
