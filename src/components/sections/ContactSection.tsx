import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { MagneticButton } from '../ui/MagneticButton';
import { ContactOverlay } from './ContactOverlay';
import { Mail, Phone, Copy, Check, FileText, ArrowUpRight, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isContactOverlayOpen, setIsContactOverlayOpen] = useState(false);
  const getInTouchButtonRef = useRef<HTMLButtonElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-canvas border-t border-white/10 relative overflow-hidden">
      
      {/* Background oversized watermark */}
      <div className="absolute -bottom-10 right-0 font-display font-black text-9xl text-white/[0.02] select-none pointer-events-none tracking-tighter">
        DECISION
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Resume Banner Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-12 rounded-3xl bg-surface border border-white/10 mb-20 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight leading-tight">
                THE PORTFOLIO SHOWS THE WORK. <br />
                <span className="text-zinc-400">THE RESUME SHOWS THE STORY.</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl leading-relaxed">
                View my structured CV covering analytics experience, business intelligence projects, technical capabilities, internships, and academic background from NIT Rourkela.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <MagneticButton
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full justify-center"
              >
                <span>VIEW RESUME (GDRIVE)</span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </MagneticButton>

              <button
                type="button"
                onClick={() => setIsContactOverlayOpen(true)}
                className="w-full py-3 px-6 rounded-lg font-mono text-xs sm:text-sm tracking-wider bg-surface-elevated hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>GET IN TOUCH</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Giant Typographic CTA & Interactive Contact Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>START A CONVERSATION</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl md:text-9xl font-display font-black uppercase tracking-tighter text-white leading-[0.85] select-none"
            >
              LET'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                TALK DATA.
              </span>
            </motion.h2>

            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-xl leading-relaxed">
              Looking for a Data Analyst, Product Analyst, or Business Analytics professional? Let's connect and explore how I can turn complex data into clear, actionable business decisions.
            </p>

            {/* Interactive Email & Phone Copy Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              
              {/* Email pill */}
              <div className="flex items-center gap-2 p-2 pl-4 rounded-xl bg-surface border border-white/15">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs sm:text-sm text-zinc-200 select-all">
                  {profileData.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors ml-2"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone pill */}
              <div className="flex items-center gap-2 p-2 pl-4 rounded-xl bg-surface border border-white/15">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a
                  href={`tel:${profileData.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  {profileData.phone}
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors ml-2"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {(copiedEmail || copiedPhone) && (
                <span className="font-mono text-xs text-emerald-400 animate-fadeIn">
                  ✓ Copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Prominent Enlarged Circular "GET IN TOUCH" Button */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <button
              ref={getInTouchButtonRef}
              type="button"
              onClick={() => setIsContactOverlayOpen(true)}
              aria-haspopup="dialog"
              aria-label="Get in touch with Ayush"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-white/20 hover:border-cyan-400/60 bg-surface/90 hover:bg-surface flex flex-col items-center justify-center p-8 text-center group hover:scale-[1.03] transition-all duration-300 shadow-2xl shadow-cyan-950/30 hover:shadow-cyan-500/20 cursor-pointer relative"
            >
              {/* Subtle ambient border pulse */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/10 group-hover:border-cyan-400/40 animate-pulse pointer-events-none" />

              <div className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-cyan-300 leading-tight transition-colors">
                GET IN <br /> TOUCH
              </div>
              <ArrowUpRight className="w-6 h-6 mt-2 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Centralized Reusable Contact Overlay */}
      <ContactOverlay
        isOpen={isContactOverlayOpen}
        onClose={() => setIsContactOverlayOpen(false)}
        triggerElementRef={getInTouchButtonRef}
      />
    </section>
  );
};
