"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  LogOut,
  PlusCircle,
  History,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye,
  ExternalLink,
  DollarSign,
  Users,
  Camera,
  X,
  Search,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { formatImageUrl } from "@/app/lib/images";

interface ActivityImage {
  url: string;
  publicId?: string;
  caption?: string;
}

interface AidRecord {
  _id: string;
  title: string;
  recipientName: string;
  category: string;
  amount: number;
  distributionDate: string;
  transferProofUrl: string;
  transferProofPublicId?: string;
  activityImages: ActivityImage[];
  notes?: string;
  isPublic: boolean;
  createdAt: string;
}

const CATEGORIES = [
  "Bantuan Tunai",
  "Modal Usaha Mandiri",
  "Sembako & Kebutuhan Pokok",
  "Pendidikan & Beasiswa",
  "Kesehatan & Pengobatan",
  "Operasional Gerakan",
  "Lainnya",
];

export default function AdminDashboardPage() {
  const router = useRouter();

  // State navigasi & data
  const [activeTab, setActiveTab] = useState<"input" | "history">("history");
  const [records, setRecords] = useState<AidRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // State Form Input
  const [title, setTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [distributionDate, setDistributionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // File states
  const [transferProofFile, setTransferProofFile] = useState<File | null>(null);
  const [transferProofPreview, setTransferProofPreview] = useState<string | null>(null);
  const [activityFiles, setActivityFiles] = useState<File[]>([]);
  const [activityPreviews, setActivityPreviews] = useState<string[]>([]);

  // Feedback states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Modal Lightbox
  const [selectedRecord, setSelectedRecord] = useState<AidRecord | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Modal Delete Confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const transferInputRef = useRef<HTMLInputElement>(null);
  const activityInputRef = useRef<HTMLInputElement>(null);

  // Fetch riwayat bantuan
  const fetchRecords = async () => {
    setLoadingRecords(true);
    try {
      const res = await fetch("/api/admin/history");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRecords(data.data || []);
      }
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  // Format Rupiah Input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    if (!rawVal) {
      setAmount("");
      return;
    }
    const num = parseInt(rawVal, 10);
    setAmount(new Intl.NumberFormat("id-ID").format(num));
  };

  // Handle Transfer Proof Upload
  const handleTransferProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran bukti transfer maksimal 5 MB");
        return;
      }
      setTransferProofFile(file);
      setTransferProofPreview(URL.createObjectURL(file));
    }
  };

  // Handle Activity Images Upload (Multiple)
  const handleActivityImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles: File[] = [];
      const newPreviews: string[] = [];

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} melebihi 5 MB dan dilewati.`);
          continue;
        }
        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }

      setActivityFiles((prev) => [...prev, ...validFiles]);
      setActivityPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove individual activity image
  const removeActivityImage = (index: number) => {
    setActivityFiles((prev) => prev.filter((_, i) => i !== index));
    setActivityPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!transferProofFile) {
      setSubmitError("Bukti transfer (gambar) wajib diunggah.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("recipientName", recipientName);
      formData.append("category", category);
      formData.append("amount", amount.replace(/[^0-9]/g, ""));
      formData.append("distributionDate", distributionDate);
      formData.append("notes", notes);
      formData.append("isPublic", String(isPublic));
      formData.append("transferProof", transferProofFile);

      activityFiles.forEach((file) => {
        formData.append("activityImages", file);
      });

      const res = await fetch("/api/admin/history", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan riwayat bantuan");
      }

      setSubmitSuccess("Riwayat bantuan dan dokumentasi berhasil disimpan!");

      // Reset Form
      setTitle("");
      setRecipientName("");
      setCategory(CATEGORIES[0]);
      setAmount("");
      setNotes("");
      setTransferProofFile(null);
      setTransferProofPreview(null);
      setActivityFiles([]);
      setActivityPreviews([]);

      // Refresh records & switch ke tab riwayat
      fetchRecords();
      setTimeout(() => {
        setActiveTab("history");
        setSubmitSuccess(null);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Record
  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/history/${deletingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghapus data");
      }

      setRecords((prev) => prev.filter((r) => r._id !== deletingId));
      setDeletingId(null);
      if (selectedRecord?._id === deletingId) {
        setSelectedRecord(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus";
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchesQuery =
      r.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.notes && r.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "Semua" || r.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  // Calculate totals
  const totalDisbursed = records.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalPhotos = records.reduce(
    (acc, curr) => acc + 1 + (curr.activityImages?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Heart className="w-5 h-5" fill="currentColor" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">
                AFK <span className="text-teal-400">Foundation</span>
              </span>
              <span className="ml-2.5 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Total Bantuan Tersalurkan
              </p>
              <p className="text-2xl font-black text-white mt-0.5">
                Rp {new Intl.NumberFormat("id-ID").format(totalDisbursed)}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Total Gerakan Penyaluran
              </p>
              <p className="text-2xl font-black text-white mt-0.5">
                {records.length}{" "}
                <span className="text-sm font-normal text-slate-400">Penerima</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">
                Dokumentasi & Bukti Terarsip
              </p>
              <p className="text-2xl font-black text-white mt-0.5">
                {totalPhotos}{" "}
                <span className="text-sm font-normal text-slate-400">Foto Cloudinary</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 pb-3.5 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === "history"
                ? "border-teal-400 text-teal-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Riwayat & Dokumentasi ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("input")}
            className={`flex items-center gap-2 pb-3.5 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
              activeTab === "input"
                ? "border-teal-400 text-teal-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Input Bantuan Baru</span>
          </button>
        </div>

        {/* TAB 1: FORM INPUT BANTUAN */}
        {activeTab === "input" && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-black text-white">
                Catat Penyaluran Bantuan & Unggah Dokumentasi
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Seluruh data akan disimpan di MongoDB dan foto langsung dioptimasi di Cloudinary.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{submitSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Judul & Penerima */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Judul Kegiatan / Program <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Stimulus Modal Usaha Warung Sayur"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Nama Penerima Manfaat <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Contoh: Ibu Rohayati"
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Kategori, Nominal, Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Kategori Bantuan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500 transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Nominal Bantuan (Rp) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-500 text-sm font-semibold">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="1.000.000"
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tanggal Penyaluran
                  </label>
                  <input
                    type="date"
                    required
                    value={distributionDate}
                    onChange={(e) => setDistributionDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Catatan / Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Catatan / Ringkasan Penyaluran
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail latar belakang penerima, kondisi lapangan, atau tujuan bantuan..."
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>

              {/* SECTION UPLOAD 1: BUKTI TRANSFER */}
              <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-teal-400" />
                      Bukti Transfer (Bukti Trf) <span className="text-rose-400">*</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Tangkapan layar struk m-banking / resi transfer bank (Maks. 5 MB)
                    </p>
                  </div>
                  {transferProofPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setTransferProofFile(null);
                        setTransferProofPreview(null);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <input
                  ref={transferInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleTransferProofChange}
                  className="hidden"
                />

                {!transferProofPreview ? (
                  <div
                    onClick={() => transferInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-700 hover:border-teal-500/60 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/80 group"
                  >
                    <Upload className="w-8 h-8 text-slate-500 group-hover:text-teal-400 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-slate-300">
                      Klik untuk memilih foto Bukti Transfer
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Mendukung PNG, JPG, WebP
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 max-w-sm">
                    <img
                      src={transferProofPreview}
                      alt="Preview Bukti Transfer"
                      className="w-full max-h-56 object-cover"
                    />
                    <div className="p-2 bg-slate-900 text-xs text-slate-300 truncate">
                      {transferProofFile?.name}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION UPLOAD 2: FOTO GERAKAN / DOKUMENTASI */}
              <div className="border border-slate-800 bg-slate-950/40 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      Dokumentasi Foto Gerakan & Penyerahan
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Foto penyerahan bantuan, kondisi usaha/lapangan (Bisa pilih banyak foto)
                    </p>
                  </div>

                  {activityPreviews.length > 0 && (
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {activityPreviews.length} Foto Dipilih
                    </span>
                  )}
                </div>

                <input
                  ref={activityInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleActivityImagesChange}
                  className="hidden"
                />

                <div
                  onClick={() => activityInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-5 text-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/80 group mb-4"
                >
                  <Upload className="w-7 h-7 text-slate-500 group-hover:text-cyan-400 mx-auto mb-1.5 transition-colors" />
                  <p className="text-sm font-semibold text-slate-300">
                    Klik untuk tambah foto dokumentasi gerakan
                  </p>
                  <p className="text-xs text-slate-500">
                    Pilih satu atau beberapa foto sekaligus
                  </p>
                </div>

                {/* Previews Grid */}
                {activityPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activityPreviews.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-slate-700 aspect-video bg-slate-900"
                      >
                        <img
                          src={src}
                          alt={`Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeActivityImage(idx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkbox Publikasi */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isPublicCheck"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-500 focus:ring-teal-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="isPublicCheck" className="text-sm text-slate-300 select-none">
                  Publikasikan di halaman audit/transparansi website (bisa dinonaktifkan jika privasi khusus)
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mengunggah ke Cloudinary & Menyimpan Data...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    <span>Simpan Riwayat Bantuan & Dokumentasi</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: RIWAYAT & DOKUMENTASI LIST */}
        {activeTab === "history" && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari penerima, judul, catatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-slate-400 shrink-0">Kategori:</span>
                {["Semua", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-teal-500 text-white"
                        : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List Data */}
            {loadingRecords ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
                <div className="w-8 h-8 border-3 border-teal-500/20 border-t-teal-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Memuat data dari MongoDB...</p>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
                <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-300 font-semibold text-base">Belum ada riwayat bantuan</p>
                <p className="text-slate-500 text-xs mt-1">
                  Mulai catat penyaluran baru melalui tab "Input Bantuan Baru".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecords.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group shadow-lg"
                  >
                    {/* Header Image Preview (Bukti Transfer) */}
                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer">
                      <img
                        src={formatImageUrl(item.transferProofUrl)}
                        alt="Bukti Transfer"
                        onClick={() => {
                          setSelectedRecord(item);
                          setActiveModalImage(item.transferProofUrl);
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-teal-300">
                        <Tag className="w-3 h-3" />
                        <span>{item.category}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] text-white flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-teal-400" />
                        <span>Bukti Trf</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {new Date(item.distributionDate).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="font-extrabold text-emerald-400 text-sm">
                            Rp {new Intl.NumberFormat("id-ID").format(item.amount)}
                          </span>
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 mb-3">
                          Penerima: <span className="font-semibold text-teal-300">{item.recipientName}</span>
                        </p>

                        {item.notes && (
                          <p className="text-xs text-slate-400 line-clamp-2 mb-3 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                            {item.notes}
                          </p>
                        )}
                      </div>

                      {/* Dokumentasi Gerakan Thumbnails Strip */}
                      <div>
                        {item.activityImages && item.activityImages.length > 0 && (
                          <div className="mb-4">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <Camera className="w-3 h-3 text-cyan-400" />
                              Dokumentasi Gerakan ({item.activityImages.length} Foto)
                            </p>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                              {item.activityImages.slice(0, 4).map((act, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setSelectedRecord(item);
                                    setActiveModalImage(act.url);
                                  }}
                                  className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                  <img
                                    src={formatImageUrl(act.url)}
                                    alt="Dokumentasi"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {item.activityImages.length > 4 && (
                                <div
                                  onClick={() => {
                                    setSelectedRecord(item);
                                    setActiveModalImage(item.activityImages[4].url);
                                  }}
                                  className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-xs font-bold text-slate-300 cursor-pointer"
                                >
                                  +{item.activityImages.length - 4}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setSelectedRecord(item);
                              setActiveModalImage(item.transferProofUrl);
                            }}
                            className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detail & Audit</span>
                          </button>

                          <button
                            onClick={() => setDeletingId(item._id)}
                            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* LIGHTBOX / AUDIT DETAIL MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
                {selectedRecord.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                {selectedRecord.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span>Penerima: <strong className="text-white">{selectedRecord.recipientName}</strong></span>
                <span>•</span>
                <span>Nominal: <strong className="text-emerald-400">Rp {new Intl.NumberFormat("id-ID").format(selectedRecord.amount)}</strong></span>
                <span>•</span>
                <span>Tanggal: <strong className="text-white">{new Date(selectedRecord.distributionDate).toLocaleDateString("id-ID", { dateStyle: "long" })}</strong></span>
              </div>
            </div>

            {/* Active Image Full View */}
            {activeModalImage && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mb-6 flex items-center justify-center max-h-96">
                <img
                  src={formatImageUrl(activeModalImage)}
                  alt="Audit Preview"
                  className="max-h-96 w-auto object-contain"
                />
              </div>
            )}

            {/* Image Gallery Switcher */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  1. Bukti Transfer Resmi
                </p>
                <div
                  onClick={() => setActiveModalImage(selectedRecord.transferProofUrl)}
                  className={`inline-block p-1 rounded-xl border cursor-pointer transition-all ${
                    activeModalImage === selectedRecord.transferProofUrl
                      ? "border-teal-400 bg-teal-500/10"
                      : "border-slate-800 hover:border-slate-600"
                  }`}
                >
                  <img
                    src={formatImageUrl(selectedRecord.transferProofUrl)}
                    alt="Bukti Transfer"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              </div>

              {selectedRecord.activityImages?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    2. Foto Gerakan & Dokumentasi Lapangan ({selectedRecord.activityImages.length})
                  </p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {selectedRecord.activityImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveModalImage(img.url)}
                        className={`p-1 rounded-xl border shrink-0 cursor-pointer transition-all ${
                          activeModalImage === img.url
                            ? "border-cyan-400 bg-cyan-500/10"
                            : "border-slate-800 hover:border-slate-600"
                        }`}
                      >
                        <img
                          src={formatImageUrl(img.url)}
                          alt="Dokumentasi"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedRecord.notes && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Catatan Transaksi
                </p>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedRecord.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Hapus Riwayat Bantuan?</h3>
            <p className="text-slate-400 text-xs mb-6">
              Data riwayat dan foto bukti di Cloudinary akan dihapus secara permanen.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
