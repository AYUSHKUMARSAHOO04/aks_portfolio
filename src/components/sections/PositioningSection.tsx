import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { ArrowUpRight, GraduationCap, Database, Layers, Award } from 'lucide-react';

export const PositioningSection: React.FC = () => {
  const proofIcons = [
    <GraduationCap className="w-4 h-4 text-cyan-400" />,
    <Database className="w-4 h-4 text-emerald-400" />,
    <Layers className="w-4 h-4 text-amber-400" />,
    <Award className="w-4 h-4 text-blue-400" />,
  ];

  return (
    <section id="about-philosophy" className="py-24 sm:py-32 bg-black text-white relative border-t border-white/10 overflow-hidden">
      
      {/* Subtle background technical grid line */}
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Metadata */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-500">02/05</span>
            <span className="h-2.5 w-[1px] bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              PHILOSOPHY & POSITIONING
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
            ANALYTICS MINDSET
          </div>
        </div>

        {/* Cohesive Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Subtle Editorial "ABOUT /" Anchor & Integrated Arrow */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                // PERSPECTIVE
              </div>
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-black uppercase tracking-tighter text-white/20 leading-none select-none">
                ABOUT <br />
                <span className="text-white/40">/</span>
              </h2>
            </motion.div>

            {/* Integrated Interactive Diagonal Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block pt-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-500/40 transition-all duration-300 group shadow-lg">
                <ArrowUpRight className="w-8 h-8 text-zinc-300 group-hover:rotate-45 group-hover:text-cyan-400 transition-transform duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Statement, Supporting Paragraph & Proof Points */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Typographic Positioning Statement */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-zinc-400 tracking-tight leading-tight">
                {profileData.editorialStatement.primary}
              </div>
              
              <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                {profileData.editorialStatement.secondary}
              </div>
            </motion.div>

            {/* Supporting Philosophy Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl"
            >
              {profileData.editorialStatement.description}
            </motion.p>

            {/* Proof Points List with Thin Separators and Hover Elevation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-3 pt-4 border-t border-white/10"
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 pb-2">
                VERIFIED PROOF POINTS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profileData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-surface/70 border border-white/5 hover:border-cyan-500/30 hover:bg-surface hover:translate-x-1 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-500 font-bold group-hover:text-cyan-400 transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <div className="p-1 rounded bg-black/40 border border-white/5 group-hover:border-cyan-500/20">
                        {proofIcons[idx]}
                      </div>
                    </div>

                    <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                      {stat.value}
                    </div>

                    <div className="text-xs text-zinc-400 mt-1 font-light">
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Positioning Notice */}
            <div className="pt-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 border-l-2 border-cyan-400/50 pl-3">
                CURRENTLY POSITIONED FOR PRODUCT ANALYTICS & DECISION SCIENCE ROLES
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
