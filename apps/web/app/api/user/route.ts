import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (session?.user) {
    return NextResponse.json({
      success: true,
      data: { session },
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "No user found",
    });
  }
}


