import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivityImage {
  url: string;
  publicId?: string;
  caption?: string;
}

export interface IAidHistory extends Document {
  title: string;
  recipientName: string;
  category: string;
  amount: number;
  distributionDate: Date;
  transferProofUrl: string;
  transferProofPublicId?: string;
  activityImages: IActivityImage[];
  notes?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ActivityImageSchema = new Schema<IActivityImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    caption: { type: String, default: "" },
  },
  { _id: false }
);

const AidHistorySchema = new Schema<IAidHistory>(
  {
    title: {
      type: String,
      required: [true, "Judul kegiatan/bantuan wajib diisi"],
      trim: true,
      maxlength: [150, "Judul maksimal 150 karakter"],
    },
    recipientName: {
      type: String,
      required: [true, "Nama penerima wajib diisi"],
      trim: true,
      maxlength: [100, "Nama penerima maksimal 100 karakter"],
    },
    category: {
      type: String,
      required: [true, "Kategori bantuan wajib diisi"],
      default: "Bantuan Tunai",
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Nominal bantuan wajib diisi"],
      min: [0, "Nominal tidak boleh negatif"],
    },
    distributionDate: {
      type: Date,
      required: [true, "Tanggal penyaluran wajib diisi"],
      default: Date.now,
    },
    transferProofUrl: {
      type: String,
      required: [true, "Bukti transfer (gambar) wajib diunggah"],
    },
    transferProofPublicId: {
      type: String,
      default: "",
    },
    activityImages: {
      type: [ActivityImageSchema],
      default: [],
    },
    notes: {
      type: String,
      default: "",
      maxlength: [2000, "Catatan maksimal 2000 karakter"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Mencegah error OverwriteModelError pada Fast Refresh di Next.js
export const AidHistory: Model<IAidHistory> =
  mongoose.models.AidHistory ||
  mongoose.model<IAidHistory>("AidHistory", AidHistorySchema);
