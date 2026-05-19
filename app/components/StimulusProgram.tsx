"use client";

import { Banknote, Globe, Video, CheckCircle } from "lucide-react";

const programs = [
  {
    id: "stimulus-tunai",
    icon: Banknote,
    emoji: "💸",
    title: "Stimulus Kebaikan",
    subtitle: "Dukungan Dana Langsung",
    amount: "Rp 200.000/bulan",
    description:
      "Penyaluran dana tunai personal untuk membantu biaya pendidikan, tambahan modal usaha mikro, atau bantuan darurat kebutuhan mendesak lainnya.",
    features: [
      "Transfer langsung ke rekening penerima",
      "Tanpa bunga, cicilan, atau agunan",
      "Prioritas bagi yang benar-benar membutuhkan",
      "Proses seleksi transparan & berkala",
    ],
    accentColor: "#10b981",
    gradient: "from-[rgba(16,185,129,0.1)] to-transparent",
  },
  {
    id: "situs-umkm-gratis",
    icon: Globe,
    emoji: "🌐",
    title: "Situs & Branding Gratis",
    subtitle: "Infrastruktur Digital",
    amount: "Landing Page + Domain Gratis",
    description:
      "Pembuatan landing page statis cepat & domain (.my.id) untuk inisiatif sosial, organisasi nirlaba, portofolio pendidikan, atau bisnis rintisan binaan.",
    features: [
      "Landing page modern berbasis Next.js",
      "Domain dan hosting gratis 1 tahun",
      "Optimasi SEO & performa tinggi",
      "Bantuan setup administrasi dasar",
    ],
    accentColor: "#38bdf8",
    gradient: "from-[rgba(56,189,248,0.1)] to-transparent",
  },
  {
    id: "mentoring-eksklusif",
    icon: Video,
    emoji: "🎯",
    title: "Mentoring Eksklusif",
    subtitle: "1-on-1 dengan Founder",
    amount: "Arah & Strategi Digital",
    description:
      "Sesi diskusi personal bersama Amir Faisal Karimullah untuk membahas roadmap pembelajaran IT, strategi digitalisasi bisnis, atau konsultasi pemecahan masalah.",
    features: [
      "Sesi video call 60 menit per bulan",
      "Review taktis & pemecahan hambatan",
      "Sharing pengalaman industri teknologi",
      "Rekomendasi tool & framework terkini",
    ],
    accentColor: "#f59e0b",
    gradient: "from-[rgba(245,158,11,0.1)] to-transparent",
  },
];

export default function StimulusProgram() {
  return (
    <section
      id="stimulus"
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, rgba(10,22,40,0.8) 50%, var(--bg-primary) 100%)",
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            Program Stimulus
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Dampak Nyata yang Diberikan
          </h2>
          <p className="text-[var(--slate-400)] text-lg max-w-2xl mx-auto">
            Program bantuan nyata yang dirancang untuk mendukung pembelajaran, kemandirian finansial, dan penyelesaian masalah mendesak.
          </p>
          <hr className="hr-gradient mt-10 max-w-xs mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                id={prog.id}
                className="relative glass overflow-hidden p-8 group hover:scale-[1.02] transition-all duration-400"
                style={{
                  boxShadow: `0 0 0 1px ${prog.accentColor}20, 0 20px 40px rgba(0,0,0,0.2)`,
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Top gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${prog.gradient} pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Emoji + Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `${prog.accentColor}18`,
                        border: `1px solid ${prog.accentColor}33`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: prog.accentColor }}
                      />
                    </div>
                    <span className="text-3xl">{prog.emoji}</span>
                  </div>

                  {/* Sub badge */}
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: prog.accentColor }}
                  >
                    {prog.subtitle}
                  </span>

                  <h3 className="text-2xl font-black text-white mt-1 mb-2">
                    {prog.title}
                  </h3>

                  {/* Amount highlight */}
                  <div
                    className="inline-block px-3 py-1.5 rounded-lg text-sm font-bold mb-4"
                    style={{
                      background: `${prog.accentColor}18`,
                      color: prog.accentColor,
                      border: `1px solid ${prog.accentColor}30`,
                    }}
                  >
                    {prog.amount}
                  </div>

                  <p className="text-[var(--slate-400)] text-sm leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {prog.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-[var(--slate-300)]"
                      >
                        <CheckCircle
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: prog.accentColor }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${prog.accentColor}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA bridge */}
        <div className="mt-16 text-center">
          <p className="text-[var(--slate-400)] text-base mb-6">
            Siap mengajukan bantuan atau ingin merekomendasikan penerima?
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--emerald)] text-[var(--bg-primary)] font-bold text-base hover:bg-[var(--emerald-light)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[rgba(16,185,129,0.3)]"
          >
            Ajukan Stimulus Sekarang →
          </a>
        </div>
      </div>
    </section>
  );
}
