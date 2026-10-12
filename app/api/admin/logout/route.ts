import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/app/lib/auth";

export async function POST() {
  await clearAdminSessionCookie();
  return NextResponse.json({
    success: true,
    message: "Logout berhasil",
  });
}
