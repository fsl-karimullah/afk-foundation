"use client";

import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Dampak", href: "#impact" },
  { label: "Bisnis", href: "#engine" },
  { label: "Program", href: "#stimulus" },
  { label: "Founder", href: "#founder" },
  { label: "Ajukan", href: "#apply" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[var(--glass-border)] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[var(--emerald)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-5 h-5 text-[var(--bg-primary)]" fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            AFK <span className="text-[var(--emerald)]">Foundation</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--slate-400)] hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#apply"
            className="px-5 py-2.5 rounded-xl bg-[var(--emerald)] text-[var(--bg-primary)] font-bold text-sm hover:bg-[var(--emerald-light)] transition-all duration-300 hover:scale-105 btn-primary"
          >
            Ajukan Stimulus
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-[var(--glass-border)] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--slate-300)] hover:text-white text-base font-medium py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 rounded-xl bg-[var(--emerald)] text-[var(--bg-primary)] font-bold text-sm text-center hover:bg-[var(--emerald-light)] transition-colors"
          >
            Ajukan Stimulus
          </a>
        </div>
      )}
    </nav>
  );
}
