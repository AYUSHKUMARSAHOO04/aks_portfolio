import React from 'react';
import { profileData } from '../../data/profile';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Balanced 2-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          
          {/* Left Column: Brand & Recruiter-Friendly Summary (~55%) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white text-black font-display font-black text-base flex items-center justify-center">
                {profileData.monogram}
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                {profileData.name}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg font-light">
              Data and Product Analytics professional turning ambiguous business questions and complex datasets into clear, actionable decisions.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
              <span>LOCATED IN ROURKELA, ODISHA, INDIA</span>
              <span>•</span>
              <span>{profileData.timezone}</span>
            </div>
          </div>

          {/* Right Column: Clean Navigation List (~45%) */}
          <div className="md:col-span-5 space-y-3 md:pl-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-200">
              Navigation
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">01 // Selected Work</a></li>
              <li><a href="#process" className="hover:text-cyan-400 transition-colors">02 // How I Work</a></li>
              <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">03 // Analytics Toolkit</a></li>
              <li><a href="#journey" className="hover:text-cyan-400 transition-colors">04 // Experience & Education</a></li>
              <li><a href="#about-philosophy" className="hover:text-cyan-400 transition-colors">05 // About & Philosophy</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">06 // Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {profileData.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors px-3 py-1.5 rounded border border-white/5 hover:border-white/20 bg-surface"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
