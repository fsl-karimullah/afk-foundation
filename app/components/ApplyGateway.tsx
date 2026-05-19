"use client";

import {
  Send,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const requirements = [
  "Sedang menempuh pendidikan / memiliki inisiatif usaha mandiri / menghadapi kondisi mendesak",
  "Berdomisili di Indonesia",
  "Bersedia memberikan laporan perkembangan berkala",
  "Mengisi formulir pengajuan dengan data jujur dan dapat dipertanggungjawabkan",
];

const benefits = [
  { icon: "💰", text: "Stimulus kebaikan Rp200rb/bulan (Tahap awal)" },
  { icon: "🤝", text: "Akses jejaring sharing belajar & perkembangan" },
];

export default function ApplyGateway() {
  return (
    <section
      id="apply"
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(13,148,136,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            Portal Pengajuan
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Ajukan Bantuan & Stimulus
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Terbuka untuk pelajar, mahasiswa, inisiator kegiatan sosial/usaha mandiri, maupun individu yang membutuhkan dukungan mendesak.
          </p>
          <hr className="hr-gradient mt-10 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div className="space-y-8">
            {/* What you get */}
            <div className="glass p-8 bg-white">
              <h3 className="text-slate-900 font-black text-xl mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--emerald)]" />
                Manfaat Program
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(13,148,136,0.04)", border: "1px solid rgba(13,148,136,0.1)" }}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-slate-700 text-sm font-medium">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="glass p-8 bg-white">
              <h3 className="text-slate-900 font-black text-xl mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--emerald)]" />
                Kriteria Pengajuan
              </h3>
              <ul className="space-y-3">
                {requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[var(--emerald)] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div
              className="p-5 rounded-2xl flex items-center gap-4 bg-white"
              style={{
                background: "rgba(13,148,136,0.04)",
                border: "1px solid rgba(13,148,136,0.1)",
              }}
            >
              <Clock className="w-8 h-8 text-[var(--emerald)] flex-shrink-0" />
              <div>
                <p className="text-slate-900 font-bold text-sm">Waktu Respons</p>
                <p className="text-slate-600 text-xs mt-0.5">
                  Pengajuan ditinjau berkala. Keputusan dan info kelayakan akan dikirimkan dalam <span className="text-[var(--emerald)] font-semibold">7 hari kerja</span> via WhatsApp/Email.
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="glass p-10 text-center relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[rgba(13,148,136,0.04)] to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-[rgba(13,148,136,0.08)] border border-[rgba(13,148,136,0.18)] flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-[var(--emerald)]" />
              </div>

              <h3 className="text-slate-900 font-black text-2xl mb-3">
                Mulai Pengajuan
              </h3>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                Tuliskan profil lengkap, kendala, rencana penggunaan dana, atau bantuan spesifik yang Anda butuhkan di formulir Google Form di bawah ini.
              </p>

              {/* Primary CTA */}
              <a
                id="apply-form-btn"
                href="https://forms.gle/YourGoogleFormLink"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-[var(--emerald)] text-white font-black text-lg mb-4 hover:bg-[var(--emerald-light)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 shadow-xl shadow-[rgba(13,148,136,0.2)]"
              >
                <Send className="w-5 h-5" />
                Isi Formulir Bantuan
              </a>

              <p className="text-slate-500 text-xs">
                Seluruh informasi pengajuan dijamin kerahasiaannya dan hanya digunakan untuk keperluan verifikasi internal yayasan.
              </p>

              {/* Secondary: Subscribe */}
              <div className="mt-8 pt-8 border-t border-[var(--glass-border)]">
                <p className="text-slate-600 text-sm mb-4">
                  Ingin kolaborasi, merekomendasikan seseorang, atau mendukung gerakan ini?
                </p>
                <a
                  id="support-btn"
                  href="mailto:hello@amirfaisalkarimullah.my.id"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-bold text-sm text-[var(--emerald)] border border-[rgba(13,148,136,0.25)] hover:border-[var(--emerald)] hover:bg-[rgba(13,148,136,0.05)] transition-all duration-300"
                >
                  Hubungi Founder /AFK Team
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
