import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import { AidHistory } from "@/app/lib/models/AidHistory";
import { deleteCloudinaryImage } from "@/app/lib/cloudinary";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const record = await AidHistory.findById(id);
    if (!record) {
      return NextResponse.json(
        { error: "Data bantuan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus gambar bukti transfer dari Cloudinary jika ada
    if (record.transferProofPublicId) {
      await deleteCloudinaryImage(record.transferProofPublicId);
    }

    // Hapus seluruh foto dokumentasi gerakan dari Cloudinary
    if (Array.isArray(record.activityImages)) {
      for (const img of record.activityImages) {
        if (img.publicId) {
          await deleteCloudinaryImage(img.publicId);
        }
      }
    }

    // Hapus record dari MongoDB
    await AidHistory.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Data bantuan dan lampiran gambar berhasil dihapus.",
    });
  } catch (error: unknown) {
    console.error("Error deleting aid history:", error);
    const message = error instanceof Error ? error.message : "Gagal menghapus data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
