import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { LiquidPortrait } from './LiquidPortrait';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowDown, BarChart3, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-canvas">
      
      {/* Editorial Background Hairline Grid & Circular Accent Curves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20%" cy="40%" r="350" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="85%" cy="60%" r="450" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="66%" y1="0" x2="66%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Top Hero Metadata Row */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono text-zinc-400"
        >
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">NIT ROURKELA // B.TECH GRADUATE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">PRODUCT, BIZ & DATA ANALYTICS</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Institute Swimming Captain</span>
          </div>
        </motion.div>
      </div>

      {/* Main Centerstage: Giant Editorial Typography & Layered Portrait */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 z-10">
        
        {/* Giant Background Typography */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          
          {/* Left Column: Huge Headline & Analytical Positioning */}
          <div className="lg:col-span-7 flex flex-col justify-center z-20 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-[1px] bg-cyan-400" />
                <span>DATA, PRODUCT & BUSINESS ANALYTICS</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase text-white tracking-tighter leading-[0.88] select-none">
                DATA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                  INTO
                </span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  DECISIONS.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed"
            >
              {profileData.tagline}
            </motion.p>

            {/* Action Buttons (2 buttons only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton href="#work" variant="primary" size="lg">
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-4 h-4 ml-2" />
              </MagneticButton>

              <MagneticButton href="#process" variant="secondary" size="lg">
                <span>HOW I WORK</span>
                <BarChart3 className="w-4 h-4 ml-2 text-cyan-400" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Liquid Portrait Asset Layered in Center */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background oversized typography watermark behind portrait */}
            <div className="absolute -top-10 -right-8 font-display font-black text-8xl md:text-9xl text-white/[0.03] select-none pointer-events-none tracking-tighter">
              SAHOO
            </div>

            {/* Portrait Container */}
            <div className="w-full max-w-[420px] aspect-[4/5] relative">
              <LiquidPortrait
                imageSrc="/assets/ayush-portrait.png"
                className="w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Ribbon */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-zinc-500"
        >
          <div className="flex items-center gap-6">
            <div>
              <span className="text-zinc-400">STATUS:</span>{' '}
              <span className="text-emerald-400 font-semibold">OPEN TO ANALYST ROLES</span>
            </div>
            <div className="hidden md:block">
              <span className="text-zinc-400">FOCUS:</span> PRODUCT, BIZ & DATA ANALYTICS
            </div>
          </div>

          <a
            href="#work"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-cyan-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
