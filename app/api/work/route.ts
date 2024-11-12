import { NextRequest, NextResponse } from "next/server";
import { setWorkData } from "@/server/controller/work";

enum WorkStatus {
  WORKING = 1,
  NOT_WORKING = 0,
}

export async function POST(req: NextRequest) {
  try {
    // 判断referer
    const headers = req.headers;
    const referer: string | null = headers.get("referer");
    // if (!referer || !referer.includes(process.env.NEXTAUTH_URL as string)) {
    //   const errorText = ''
    //   return NextResponse.json({ error: errorText }, { status: 401 });
    // }
    // 判断token是否存在
    const uuid = headers.get("uuid");
    if (uuid === process.env.UUID) {
      const { status } = await req.json();
      if (status === WorkStatus.WORKING) {
        await setWorkData({ onTime: Date.now() });
        return NextResponse.json({ msg: '上班成功' });
      } else if (status === WorkStatus.NOT_WORKING) {
        await setWorkData({ offTime: Date.now() });
        return NextResponse.json({ msg: '下班成功' });
      }
    } else {
      return NextResponse.json(
        { error: "token is not exist" },
        { status: 401 }
      );
    }
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
