"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

const words = ["Teknologi", "Modal", "Data", "Inovasi"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-bg grid-pattern">
      {/* Ambient orbs */}
      <div
        className="orb w-[600px] h-[600px] top-[-150px] left-[-200px]"
        style={{ background: "rgba(16,185,129,0.08)" }}
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-100px] right-[-100px]"
        style={{
          background: "rgba(16,185,129,0.06)",
          animationDelay: "-4s",
          animationDuration: "15s",
        }}
      />
      <div
        className="orb w-[300px] h-[300px] top-[30%] right-[10%]"
        style={{
          background: "rgba(99,102,241,0.06)",
          animationDelay: "-7s",
          animationDuration: "18s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-[var(--emerald)] uppercase tracking-widest mb-8 border border-[rgba(16,185,129,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          Personal Philanthropy Initiative
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black leading-[1.08] tracking-tight mb-6">
          <span
            className="inline-block transition-all duration-400"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-12px)",
            }}
          >
            <span className="gradient-text">{words[wordIdx]}</span>
          </span>
          <br />
          <span className="text-slate-900">untuk Kemanusiaan,</span>
          <br />
          <span className="text-slate-900">Modal untuk </span>
          <span className="gradient-text">Kemandirian.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          Gerakan filantropi personal yang didanai secara mandiri dari sebagian gaji BUMN dan penghasilan usaha Amir Faisal. Menyebarkan kebaikan untuk pendidikan, pemberdayaan usaha, dan{" "}
          <span className="text-slate-900">
            kebutuhan mendesak setiap bulan.
          </span>
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="hero-cta-primary"
            href="#apply"
            className="btn-primary px-8 py-4 rounded-2xl bg-[var(--emerald)] text-white font-bold text-base hover:bg-[var(--emerald-light)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 w-full sm:w-auto text-center shadow-lg shadow-[rgba(13,148,136,0.2)]"
          >
            Ajukan Stimulus Sekarang →
          </a>
          <a
            href="#impact"
            className="px-8 py-4 rounded-2xl glass font-bold text-base text-slate-800 hover:border-[var(--emerald)] transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center border border-[var(--glass-border)]"
          >
            Lihat Dampak Nyata
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[var(--slate-400)] text-sm font-medium">
          {[
            "Admin Fee: 0%",
            "Didanai Gaji & Usaha Mandiri",
            "Transparan & Terukur",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)]" />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#impact"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--slate-400)] hover:text-[var(--emerald)] transition-colors group"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
