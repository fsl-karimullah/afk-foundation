"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Receipt,
  Camera,
  Calendar,
  ExternalLink,
  Eye,
  X,
  ChevronRight,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
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
  activityImages: ActivityImage[];
  notes?: string;
  isPublic: boolean;
  createdAt: string;
}

export default function AidTransparency() {
  const [records, setRecords] = useState<AidRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalRecord, setActiveModalRecord] = useState<AidRecord | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setRecords(data.data);
        }
      } catch (err) {
        console.error("Gagal memuat transparansi bantuan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = ["Semua", ...Array.from(new Set(records.map((r) => r.category)))];

  const filteredRecords = records.filter(
    (r) => selectedCategory === "Semua" || r.category === selectedCategory
  );

  const totalDisbursed = records.reduce((sum, r) => sum + (r.amount || 0), 0);

  return (
    <section id="transparency" className="py-28 relative overflow-hidden bg-slate-50/60">
      {/* Background Decorative Accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 10%, rgba(13,148,136,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[var(--emerald)] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparansi & Akuntabilitas 100%</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Bukti Nyata Penyaluran di Lapangan
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            AFK Foundation berkomitmen pada keterbukaan mutlak. Seluruh penyaluran bantuan
            disertai bukti transfer resmi perbankan dan dokumentasi foto gerakan dari penerima manfaat.
          </p>

          {/* Quick Metrics Bar */}
          {records.length > 0 && (
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl glass bg-white/80 border border-teal-500/20 shadow-sm text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span className="text-slate-600">Total Penyaluran:</span>
                <strong className="text-slate-900 font-extrabold">
                  Rp {new Intl.NumberFormat("id-ID").format(totalDisbursed)}
                </strong>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-slate-600">Total Penerima Tervalidasi:</span>
                <strong className="text-slate-900 font-extrabold">
                  {records.length} Penyaluran
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--emerald)] text-white shadow-md shadow-teal-700/20 scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-teal-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-3 border-teal-500/20 border-t-teal-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Memuat bukti penyaluran bantuan...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-3xl glass bg-white/70 border border-slate-200 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Belum Ada Riwayat Ditampilkan</h3>
            <p className="text-slate-500 text-xs mt-1">
              Data yang Anda input melalui Portal Admin akan otomatis tampil di sini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredRecords.map((item) => (
              <div
                key={item._id}
                className="group rounded-3xl bg-white border border-slate-200/80 hover:border-teal-500/40 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Cover: Bukti Transfer Card */}
                <div
                  onClick={() => {
                    setActiveModalRecord(item);
                    setActiveModalImage(item.transferProofUrl);
                  }}
                  className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={formatImageUrl(item.transferProofUrl)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-teal-800 shadow-sm">
                    <span>{item.category}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white">
                    <Receipt className="w-3 h-3 text-teal-400" />
                    <span>Bukti Trf Resmi</span>
                  </div>

                  {/* Nominal Badge on Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs text-white/80">Penyaluran:</span>
                    <span className="font-black text-lg text-emerald-300 tracking-tight">
                      Rp {new Intl.NumberFormat("id-ID").format(item.amount)}
                    </span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {new Date(item.distributionDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-1 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 mb-3">
                      Penerima: <strong className="text-slate-800">{item.recipientName}</strong>
                    </p>

                    {item.notes && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Thumbnails Foto Gerakan & CTA */}
                  <div>
                    {item.activityImages && item.activityImages.length > 0 && (
                      <div className="mb-4 pt-3 border-t border-slate-100">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-teal-600" />
                          <span>Dokumentasi Lapangan ({item.activityImages.length} Foto)</span>
                        </p>

                        <div className="flex items-center gap-2">
                          {item.activityImages.slice(0, 3).map((img, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setActiveModalRecord(item);
                                setActiveModalImage(img.url);
                              }}
                              className="w-14 h-12 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity bg-slate-100 shrink-0"
                            >
                              <img
                                src={formatImageUrl(img.url)}
                                alt="Dokumentasi"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}

                          {item.activityImages.length > 3 && (
                            <div
                              onClick={() => {
                                setActiveModalRecord(item);
                                setActiveModalImage(item.activityImages[3].url);
                              }}
                              className="w-14 h-12 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-700 cursor-pointer hover:bg-teal-100 transition-colors shrink-0"
                            >
                              +{item.activityImages.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setActiveModalRecord(item);
                        setActiveModalImage(item.transferProofUrl);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-teal-50 text-teal-700 font-bold text-xs border border-slate-200 hover:border-teal-200 transition-colors flex items-center justify-center gap-2 cursor-pointer group-hover:border-teal-300"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Bukti Transfer & Foto Lengkap</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-teal-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL AUDIT PUBLIK */}
      {activeModalRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalRecord(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-6 pr-10">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 text-xs font-bold border border-teal-500/20">
                {activeModalRecord.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {activeModalRecord.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                <span>
                  Penerima: <strong className="text-slate-900">{activeModalRecord.recipientName}</strong>
                </span>
                <span>•</span>
                <span>
                  Nominal:{" "}
                  <strong className="text-emerald-600 font-bold">
                    Rp {new Intl.NumberFormat("id-ID").format(activeModalRecord.amount)}
                  </strong>
                </span>
                <span>•</span>
                <span>
                  Tanggal:{" "}
                  <strong className="text-slate-900">
                    {new Date(activeModalRecord.distributionDate).toLocaleDateString("id-ID", {
                      dateStyle: "long",
                    })}
                  </strong>
                </span>
              </div>
            </div>

            {/* Selected Image Fullscreen View */}
            {activeModalImage && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center max-h-[420px] mb-6">
                <img
                  src={formatImageUrl(activeModalImage)}
                  alt="Audit Preview"
                  className="max-h-[420px] w-auto object-contain"
                />
              </div>
            )}

            {/* Image Selector Strip */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-teal-600" />
                  <span>Bukti Transfer Bank Resmi:</span>
                </p>
                <div
                  onClick={() => setActiveModalImage(activeModalRecord.transferProofUrl)}
                  className={`inline-block p-1 rounded-xl border cursor-pointer transition-all ${
                    activeModalImage === activeModalRecord.transferProofUrl
                      ? "border-teal-600 ring-2 ring-teal-500/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={formatImageUrl(activeModalRecord.transferProofUrl)}
                    alt="Bukti Transfer"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              </div>

              {activeModalRecord.activityImages?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-teal-600" />
                    <span>Dokumentasi Foto Gerakan & Penyerahan:</span>
                  </p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {activeModalRecord.activityImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveModalImage(img.url)}
                        className={`p-1 rounded-xl border shrink-0 cursor-pointer transition-all ${
                          activeModalImage === img.url
                            ? "border-teal-600 ring-2 ring-teal-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={formatImageUrl(img.url)}
                          alt={`Dokumentasi ${i + 1}`}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {activeModalRecord.notes && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Catatan Lapangan
                </p>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeModalRecord.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
