import { NextRequest, NextResponse } from "next/server";
import { findRunData } from "@/server/controller/run";

export async function GET(req: NextRequest) {
  try {
    const response =  NextResponse.json({ rData: await findRunData() });
    response.headers.set('Cache-Control', 'no-cache');
    return response;
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
