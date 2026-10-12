import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { AidHistory } from "@/app/lib/models/AidHistory";

export async function GET() {
  try {
    await connectDB();
    const data = await AidHistory.find({ isPublic: true })
      .select("-transferProofPublicId") // Jangan expose internal publicId ke publik
      .sort({ distributionDate: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat riwayat bantuan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
