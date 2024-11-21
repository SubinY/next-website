import { NextRequest, NextResponse } from "next/server";
import { findRunData } from "@/server/controller/run";

export async function GET(req: NextRequest) {
  return new Promise(async (resolve) => {
    try {
      return resolve(NextResponse.json({ rData: await findRunData() }));
    } catch (e) {
      return resolve(NextResponse.json({ error: "failed" }, { status: 500 }));
    }
  });
}
