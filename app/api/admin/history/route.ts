import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import { AidHistory, IActivityImage } from "@/app/lib/models/AidHistory";
import { uploadImageBuffer, isCloudinaryConfigured } from "@/app/lib/cloudinary";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const histories = await AidHistory.find().sort({ distributionDate: -1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: histories,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat data";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cloudinary belum dikonfigurasi! Harap lengkapi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di .env.local atau Vercel Settings.",
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    // Parse data teks
    const title = (formData.get("title") as string)?.trim();
    const recipientName = (formData.get("recipientName") as string)?.trim();
    const category = (formData.get("category") as string)?.trim() || "Bantuan Tunai";
    const rawAmount = formData.get("amount") as string;
    const rawDate = formData.get("distributionDate") as string;
    const notes = (formData.get("notes") as string)?.trim() || "";
    const isPublic = formData.get("isPublic") !== "false";

    if (!title || !recipientName || !rawAmount) {
      return NextResponse.json(
        { error: "Judul, nama penerima, dan nominal bantuan wajib diisi." },
        { status: 400 }
      );
    }

    const amount = Number(rawAmount.replace(/[^0-9]/g, ""));
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Nominal bantuan harus berupa angka positif." },
        { status: 400 }
      );
    }

    const distributionDate = rawDate ? new Date(rawDate) : new Date();

    // Validasi & upload bukti transfer
    const transferProofFile = formData.get("transferProof") as File | null;
    if (!transferProofFile || !(transferProofFile instanceof File) || transferProofFile.size === 0) {
      return NextResponse.json(
        { error: "Foto bukti transfer wajib diunggah." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(transferProofFile.type)) {
      return NextResponse.json(
        { error: "Format bukti transfer harus JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }

    if (transferProofFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ukuran bukti transfer maksimal 5 MB." },
        { status: 400 }
      );
    }

    const transferBuffer = Buffer.from(await transferProofFile.arrayBuffer());
    const uploadedTransfer = await uploadImageBuffer(
      transferBuffer,
      "afk-foundation/bukti-transfer"
    );

    // Validasi & upload foto-foto dokumentasi gerakan (bisa multiple)
    const rawActivityFiles = formData.getAll("activityImages") as File[];
    const uploadedActivityImages: IActivityImage[] = [];

    for (const file of rawActivityFiles) {
      if (file instanceof File && file.size > 0) {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          return NextResponse.json(
            { error: `File dokumentasi ${file.name} tidak valid. Harus JPG, PNG, atau WebP.` },
            { status: 400 }
          );
        }
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `File dokumentasi ${file.name} melebihi batas 5 MB.` },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await uploadImageBuffer(
          buffer,
          "afk-foundation/dokumentasi-gerakan"
        );
        uploadedActivityImages.push({
          url: uploaded.url,
          publicId: uploaded.publicId,
          caption: file.name.replace(/\.[^/.]+$/, ""),
        });
      }
    }

    // Simpan ke MongoDB
    await connectDB();
    const newRecord = await AidHistory.create({
      title,
      recipientName,
      category,
      amount,
      distributionDate,
      transferProofUrl: uploadedTransfer.url,
      transferProofPublicId: uploadedTransfer.publicId,
      activityImages: uploadedActivityImages,
      notes,
      isPublic,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Riwayat bantuan dan dokumentasi berhasil disimpan",
        data: newRecord,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating aid history:", error);
    const message = error instanceof Error ? error.message : "Gagal menyimpan riwayat bantuan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
