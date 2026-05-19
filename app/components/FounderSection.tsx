"use client";

import {
  Building2,
  Code2,
  Quote,
  ChevronRight,
} from "lucide-react";

const techStack = [
  "Next.js 14",
  "TypeScript",
  "AI/LLM",
  "Supabase",
  "Vercel",
  "Integrity",
];

const credentials = [
  {
    icon: Building2,
    title: "BUMN Indonesia",
    role: "Karyawan Fulltime",
    desc: "Profesional aktif di salah satu Badan Usaha Milik Negara — membangun disiplin kerja, integritas, dan pemahaman mendalam tentang ekosistem ekonomi nasional.",
  },
  {
    icon: Code2,
    title: "Usaha Mandiri & Digital Ventures",
    role: "Independent Builder",
    desc: "Mengembangkan berbagai layanan digital secara mandiri di luar jam kerja utama BUMN, yang menjadi salah satu sumber pendanaan inisiatif sosial ini.",
  },
];

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function FounderSection() {
  return (
    <section id="founder" className="py-32 relative overflow-hidden bg-slate-50">
      {/* Ambient */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            About the Founder
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Wajah di Balik Gerakan
          </h2>
          <hr className="hr-gradient mt-8 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Profile card */}
          <div className="glass p-10 relative overflow-hidden bg-white">
            {/* Gradient top */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(13,148,136,0.04)] to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-black flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(13,148,136,0.2), rgba(13,148,136,0.08))",
                    border: "2px solid rgba(13,148,136,0.2)",
                    color: "var(--emerald)",
                    boxShadow: "0 0 30px rgba(13,148,136,0.08)",
                  }}
                >
                  AFK
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Amir Faisal Karimullah
                  </h3>
                  <p className="text-[var(--emerald)] font-semibold text-sm mt-1">
                    Founder & Philanthropist
                  </p>
                  <a
                    href="https://amirfaisalkarimullah.my.id"
                    className="text-slate-600 text-xs hover:text-[var(--emerald)] transition-colors"
                  >
                    amirfaisalkarimullah.my.id
                  </a>
                </div>
              </div>

              {/* Quote */}
              <div
                className="p-6 rounded-2xl mb-8 relative"
                style={{
                  background: "rgba(13,148,136,0.04)",
                  border: "1px solid rgba(13,148,136,0.1)",
                }}
              >
                <Quote
                  className="w-8 h-8 text-[var(--emerald)] mb-3 opacity-60"
                />
                <p className="text-slate-700 text-base leading-relaxed italic font-medium">
                  "Saya percaya bahwa kebaikan harus berputar secara mandiri. Inilah mengapa sebagian penghasilan dari gaji bulanan dan hasil usaha digital saya dedikasikan secara konsisten untuk menyokong pendidikan, pemberdayaan, dan bantuan darurat bagi yang membutuhkan."
                </p>
                <p className="text-[var(--emerald)] text-sm font-bold mt-4">
                  — Amir Faisal Karimullah
                </p>
              </div>

              {/* Tech Stack badges */}
              <div>
                <p className="text-slate-600 text-xs uppercase tracking-widest font-semibold mb-3">
                  Tech Stack & Values
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{
                        background: "rgba(13,148,136,0.06)",
                        border: "1px solid rgba(13,148,136,0.15)",
                        color: "#0d9488",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-3">
                  ✨ Built with Next.js, AI, and Integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Credentials */}
          <div className="space-y-5">
            <p className="text-slate-700 text-base leading-relaxed mb-8">
              Seorang karyawan fulltime di salah satu BUMN Indonesia yang memilih
              untuk berkontribusi lebih — menjadikan aksi filantropi sosial bukan
              sebagai sampingan, melainkan sebagai <span className="text-slate-900 font-semibold">misi hidup</span> yang dijalankan dengan integritas penuh.
            </p>

            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.title}
                  className="glass p-6 group hover:scale-[1.01] transition-all duration-300 cursor-default bg-white"
                  style={{
                    boxShadow: "0 0 0 1px rgba(13,148,136,0.08)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[rgba(13,148,136,0.06)] border border-[rgba(13,148,136,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-[var(--emerald)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-slate-900 font-bold text-base">
                          {cred.title}
                        </h4>
                        <span className="text-[var(--emerald)] text-xs font-semibold bg-[rgba(13,148,136,0.06)] px-2 py-0.5 rounded-full flex-shrink-0">
                          {cred.role}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">
                        {cred.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Social proof */}
            <a
              href="https://www.instagram.com/amirfaisaal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-600 hover:text-[var(--emerald)] transition-colors group mt-6"
            >
              <InstagramIcon className="w-5 h-5 text-[#e1306c] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Ikuti di Instagram</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
