"use client";

import { GraduationCap, BrainCircuit, ExternalLink, ArrowRight } from "lucide-react";

const engines = [
  {
    id: "akademi-umkm",
    icon: GraduationCap,
    badge: "Usaha Mandiri / Edukasi",
    badgeColor: "#0d9488",
    name: "Akademi UMKM",
    tagline: "Pusat edukasi bisnis untuk scale-up usaha mikro.",
    description:
      "Platform edukasi bisnis rintisan mandiri yang dirancang khusus untuk pemilik usaha Indonesia guna naik kelas melalui digitalisasi.",
    cta: "Lihat Kelas",
    ctaUrl: "https://akademiumkm.id",
    ctaLabel: "akademiumkm.id",
    impact:
      "Sebagian penghasilan bersih dan gaji Amir Faisal dari hasil operasional platform ini didedikasikan secara personal untuk mendanai AFK Foundation.",
    accentColor: "#0d9488",
    gradient: "from-[rgba(13,148,136,0.08)] to-transparent",
    borderGlow: "rgba(13,148,136,0.12)",
    stats: [
      { value: "500+", label: "Peserta Aktif" },
      { value: "20+", label: "Modul Kelas" },
      { value: "Mandiri", label: "Usaha Founder" },
    ],
  },
  {
    id: "pulse-ai",
    icon: BrainCircuit,
    badge: "Usaha Mandiri / SaaS",
    badgeColor: "#6366f1",
    name: "PulseAI",
    tagline: "SaaS Automasi Bisnis berbasis AI untuk efisiensi bisnis rintisan.",
    description:
      "Platform AI yang mengotomasi operasional bisnis dan administrasi, membantu efisiensi bisnis mandiri dalam satu dashboard cerdas.",
    cta: "Coba PulseAI",
    ctaUrl: "https://pulseai.biz.id",
    ctaLabel: "pulseai.biz.id",
    impact:
      "Sebagian penghasilan personal Amir Faisal dari layanan digital ini disalurkan secara langsung untuk mendukung alokasi stimulus sosial.",
    accentColor: "#6366f1",
    gradient: "from-[rgba(99,102,241,0.08)] to-transparent",
    borderGlow: "rgba(99,102,241,0.12)",
    stats: [
      { value: "AI-Powered", label: "Automasi Penuh" },
      { value: "24/7", label: "Support Aktif" },
      { value: "Mandiri", label: "Usaha Founder" },
    ],
  },
];

export default function EngineOfImpact() {
  return (
    <section id="engine" className="py-32 relative overflow-hidden bg-white">
      {/* Subtle bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(99,102,241,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            Sumber Pendanaan
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Pilar Usaha & Kemandirian
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Dua usaha digital mandiri yang dirintis oleh Amir Faisal. Gaji dan penghasilan personal yang ia peroleh dari sini disisihkan secara sadar untuk mendanai gerakan sosial.
          </p>
          <hr className="hr-gradient mt-10 max-w-xs mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {engines.map((eng) => {
            const Icon = eng.icon;
            return (
              <div
                key={eng.id}
                id={eng.id}
                className="relative glass overflow-hidden p-8 md:p-10 group hover:scale-[1.01] transition-all duration-500"
                style={{
                  boxShadow: `0 0 0 1px ${eng.borderGlow}, 0 20px 40px rgba(13,148,136,0.03)`,
                }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${eng.gradient} pointer-events-none`}
                />

                {/* Badge */}
                <div className="relative z-10">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                    style={{
                      color: eng.accentColor,
                      background: `${eng.accentColor}12`,
                      border: `1px solid ${eng.accentColor}25`,
                    }}
                  >
                    {eng.badge}
                  </span>

                  {/* Icon + Name */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${eng.accentColor}18, ${eng.accentColor}05)`,
                        border: `1px solid ${eng.accentColor}25`,
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: eng.accentColor }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1">
                        {eng.name}
                      </h3>
                      <p className="text-slate-600 text-sm font-medium leading-snug">
                        {eng.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-8">
                    {eng.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {eng.stats.map((s) => (
                      <div
                        key={s.label}
                        className="text-center py-3 rounded-xl"
                        style={{
                          background: `${eng.accentColor}0a`,
                          border: `1px solid ${eng.accentColor}15`,
                        }}
                      >
                        <p
                          className="text-lg font-black mb-0.5"
                          style={{ color: eng.accentColor }}
                        >
                          {s.value}
                        </p>
                        <p className="text-slate-500 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Impact note */}
                  <div
                    className="p-4 rounded-xl mb-8 text-sm text-slate-700 leading-relaxed"
                    style={{
                      background: `${eng.accentColor}0a`,
                      borderLeft: `3px solid ${eng.accentColor}`,
                    }}
                  >
                    💡 {eng.impact}
                  </div>

                  {/* CTA */}
                  <a
                    href={eng.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`cta-${eng.id}`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group/btn"
                    style={{
                      background: `linear-gradient(135deg, ${eng.accentColor}, ${eng.accentColor}cc)`,
                      color: "#ffffff",
                      boxShadow: `0 8px 24px ${eng.accentColor}25`,
                    }}
                  >
                    {eng.cta}
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-slate-500 text-xs mt-3 ml-1">
                    → {eng.ctaLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow diagram */}
        <div className="mt-16 glass p-8 rounded-2xl text-center">
          <p className="text-slate-600 text-sm mb-6 uppercase tracking-widest font-semibold">
            Alur Pendanaan Mandiri
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {[
              { label: "Gaji BUMN & Usaha Digital", sub: "Sumber Pendapatan" },
              null,
              { label: "Gaji & Hasil Bersih", sub: "Penghasilan Personal" },
              null,
              { label: "AFK Foundation", sub: "Alokasi Stimulus" },
              null,
              { label: "Penerima Manfaat", sub: "Pendidikan & Kebutuhan Darurat" },
            ].map((item, i) =>
              item === null ? (
                <ArrowRight
                  key={i}
                  className="w-5 h-5 text-[var(--emerald)] hidden md:block"
                />
              ) : (
                <div
                  key={item.label}
                  className="text-center px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(13,148,136,0.05)",
                    border: "1px solid rgba(13,148,136,0.1)",
                  }}
                >
                  <p className="text-slate-900 font-bold text-sm">{item.label}</p>
                  <p className="text-[var(--emerald)] text-xs font-medium">{item.sub}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
