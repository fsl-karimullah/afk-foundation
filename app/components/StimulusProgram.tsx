"use client";

import { Banknote, Globe, Video, CheckCircle } from "lucide-react";

const programs = [
  {
    id: "stimulus-tunai",
    icon: Banknote,
    emoji: "💸",
    title: "Stimulus Kebaikan",
    subtitle: "Alokasi Dana Personal",
    amount: "Rp 200.000/bulan (Total Anggaran)",
    description:
      "Penyaluran stimulus dana tunai personal dengan total alokasi Rp 200.000 per bulan. Ditujukan untuk membantu skala kecil terlebih dahulu guna meringankan biaya pendidikan, tambahan modal usaha mikro, atau bantuan darurat mendesak lainnya.",
    features: [
      "Total alokasi Rp 200.000 per bulan (tahap awal)",
      "Transfer langsung ke rekening penerima terpilih",
      "Murni bantuan/hibah personal (tanpa cicilan/bunga)",
      "Prioritas bagi kondisi mendesak atau inisiatif mandiri",
    ],
    accentColor: "#10b981",
    gradient: "from-[rgba(16,185,129,0.1)] to-transparent",
  },
];

export default function StimulusProgram() {
  return (
    <section
      id="stimulus"
      className="py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            Program Bantuan
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Dampak Nyata yang Diberikan
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Program bantuan nyata terarah yang dirancang untuk mendukung pembelajaran, kemandirian finansial, dan penyelesaian masalah mendesak di tahap awal gerakan ini.
          </p>
          <hr className="hr-gradient mt-10 max-w-xs mx-auto" />
        </div>

        {/* Cards */}
        <div className="max-w-2xl mx-auto">
          {programs.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                id={prog.id}
                className="relative glass overflow-hidden p-8 md:p-10 group hover:scale-[1.01] transition-all duration-400"
                style={{
                  boxShadow: `0 0 0 1px ${prog.accentColor}18, 0 20px 40px rgba(13,148,136,0.03)`,
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
                        background: `${prog.accentColor}12`,
                        border: `1px solid ${prog.accentColor}25`,
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

                  <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">
                    {prog.title}
                  </h3>

                  {/* Amount highlight */}
                  <div
                    className="inline-block px-3 py-1.5 rounded-lg text-sm font-bold mb-4"
                    style={{
                      background: `${prog.accentColor}12`,
                      color: prog.accentColor,
                      border: `1px solid ${prog.accentColor}25`,
                    }}
                  >
                    {prog.amount}
                  </div>

                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {prog.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
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
          <p className="text-slate-600 text-base mb-6">
            Siap mengajukan bantuan atau ingin merekomendasikan penerima?
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--emerald)] text-white font-bold text-base hover:bg-[var(--emerald-light)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[rgba(13,148,136,0.2)]"
          >
            Ajukan Stimulus Sekarang →
          </a>
        </div>
      </div>
    </section>
  );
}
