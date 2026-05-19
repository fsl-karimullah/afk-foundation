"use client";

import { Heart, ExternalLink } from "lucide-react";

const footerLinks = [
  { label: "Akademi UMKM", href: "https://akademiumkm.id" },
  { label: "PulseAI", href: "https://pulseai.biz.id" },
  { label: "Ajukan Stimulus", href: "#apply" },
  { label: "Tentang Founder", href: "#founder" },
];

export default function Footer() {
  return (
    <footer
      className="relative py-16 border-t border-[var(--glass-border)]"
      style={{ background: "rgba(2,6,23,0.95)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--emerald)] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[var(--bg-primary)]" fill="currentColor" />
            </div>
            <div>
              <p className="text-white font-bold text-base">AFK Foundation</p>
              <p className="text-[var(--slate-400)] text-xs">
                amirfaisalkarimullah.my.id
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[var(--slate-400)] hover:text-white text-sm transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[var(--slate-400)] text-xs text-center md:text-right">
            © {new Date().getFullYear()} Amir Faisal Karimullah Foundation
            <br />
            <span className="text-[var(--emerald)]">Built with Next.js, AI, and Integrity.</span>
          </p>
        </div>

        {/* Bottom note */}
        <div className="mt-10 pt-8 border-t border-[var(--glass-border)] text-center">
          <p className="text-[var(--slate-400)] text-xs max-w-2xl mx-auto leading-relaxed">
            AFK Foundation adalah inisiatif filantropi personal yang didanai sepenuhnya
            dari profit bisnis digital. Tidak ada dana publik yang digunakan. Seluruh
            penyaluran bersifat transparan dan dapat diaudit. Admin Fee: 0%.
          </p>
        </div>
      </div>
    </footer>
  );
}
