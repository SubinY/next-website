import { NextRequest, NextResponse } from "next/server";
import { findRunData } from "@/server/controller/run";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ rData: await findRunData() });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
