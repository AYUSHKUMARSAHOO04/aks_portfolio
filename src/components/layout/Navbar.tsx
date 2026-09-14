import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/profile';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
    { label: 'TOOLKIT', href: '#toolkit' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-canvas/90 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Monogram & Name Only */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-white text-black font-display font-black text-base flex items-center justify-center tracking-tighter group-hover:scale-105 transition-transform shadow-md">
            {profileData.monogram}
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-white uppercase group-hover:text-cyan-400 transition-colors">
              {profileData.name}
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-elevated/70 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs text-zinc-300 hover:text-white px-3 py-1 rounded-full transition-colors hover:bg-white/5 tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Availability Status CTA */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-1.5 rounded-full hover:border-emerald-500/60 hover:bg-emerald-950/60 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-emerald-300 font-semibold tracking-wider">
              {profileData.availability.label}
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-surface border border-white/10 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs text-zinc-300 hover:text-white p-2 rounded hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-mono text-emerald-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Open to Roles
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
