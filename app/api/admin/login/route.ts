import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  verifyAdminCredentials,
  createSessionToken,
  setAdminSessionCookie,
} from "@/app/lib/auth";

const LoginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export async function POST(request: NextRequest) {
  try {
    // Ambil IP klien untuk rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Cek batas percobaan login
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan gagal. Akses dikunci sementara selama ${rateCheck.lockoutRemainingSeconds} detik.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = LoginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Format input tidak valid" },
        { status: 400 }
      );
    }

    const { username, password } = parseResult.data;
    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      recordFailedAttempt(ip);
      const remaining = checkRateLimit(ip).remainingAttempts;
      return NextResponse.json(
        {
          error: `Username atau password salah. Sisa kesempatan: ${remaining}`,
        },
        { status: 401 }
      );
    }

    // Login sukses: reset limiter & buat token sesi
    resetRateLimit(ip);
    const token = await createSessionToken(username);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: { username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
