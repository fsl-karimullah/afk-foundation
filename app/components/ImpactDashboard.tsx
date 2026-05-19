"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Cpu, Users, BadgePercent } from "lucide-react";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

const stats = [
  {
    id: "total-dana",
    icon: TrendingUp,
    value: 4800000,
    prefix: "Rp ",
    suffix: "",
    label: "Total Dana Tersalurkan",
    sub: "Dalam 12 bulan terakhir",
    color: "#10b981",
  },
  {
    id: "penerima-manfaat",
    icon: Users,
    value: 47,
    prefix: "",
    suffix: " Penerima",
    label: "Penerima Bantuan Aktif",
    sub: "Siswa, usaha mikro, & individu terbentur krisis",
    color: "#6ee7b7",
  },
  {
    id: "situs-count",
    icon: Cpu,
    value: 31,
    prefix: "",
    suffix: " Halaman",
    label: "Fasilitas Landing Page Gratis",
    sub: "Untuk portofolio & inisiatif non-komersial",
    color: "#a7f3d0",
  },
  {
    id: "admin-fee",
    icon: BadgePercent,
    value: 0,
    prefix: "",
    suffix: "% Admin Fee",
    label: "Transparansi Total",
    sub: "Gaji BUMN & hasil usaha personal",
    color: "#10b981",
  },
];

export default function ImpactDashboard() {
  return (
    <section id="impact" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-[var(--emerald)] font-semibold uppercase tracking-widest text-sm mb-4">
            Impact Dashboard
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Angka yang Bicara
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Dampak nyata yang terukur, diperbarui setiap bulan.
          </p>
          <hr className="hr-gradient mt-10 max-w-xs mx-auto" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className="glass p-8 text-center hover:scale-[1.02] transition-transform duration-300 emerald-glow group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}22, ${stat.color}11)`,
                    border: `1px solid ${stat.color}33`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div
                  className="text-3xl md:text-4xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1800}
                  />
                </div>
                <p className="text-slate-800 font-bold text-base mb-1">{stat.label}</p>
                <p className="text-slate-600 text-xs font-medium">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-500 text-xs mt-8 opacity-60">
          * Data bersifat simulasi indikatif. Laporan resmi dirilis setiap kuartal.
        </p>
      </div>
    </section>
  );
}
