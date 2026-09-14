import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { SectionHeader } from '../ui/SectionHeader';
import { Briefcase, GraduationCap, CheckCircle, MapPin } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="journey" className="py-24 sm:py-32 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Switchable Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            number="04"
            title="JOURNEY"
            subtitle="Professional track record spanning analytics, project management, education, and AI-enabled product building."
            badge="TRACK RECORD"
            className="mb-0"
          />

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 bg-surface p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                activeTab === 'experience'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>EXPERIENCE ({experienceData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                activeTab === 'education'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATION ({educationData.length})</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience-timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {experienceData.map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 relative group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Period & Location */}
                    <div className="lg:col-span-3 space-y-2">
                      <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                        {item.period}
                      </div>

                      {item.current && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-mono text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>CURRENT ROLE</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Role, Company & Description */}
                    <div className="lg:col-span-9 space-y-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                          {item.role}
                        </h3>
                        <div className="text-sm font-mono text-cyan-400 font-medium mt-0.5">
                          {item.company}
                        </div>
                      </div>

                      <p className="text-sm text-zinc-300 font-light leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Deliverables & Responsibilities */}
                      <div className="space-y-2 pt-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                          Key Deliverables & Responsibilities:
                        </span>
                        <ul className="space-y-1.5 text-xs text-zinc-300">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2.5">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                              <span className="leading-relaxed font-light">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {item.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded border border-white/5"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 relative"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Period & Location */}
                    <div className="lg:col-span-3 space-y-2">
                      <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                        {edu.period}
                      </div>

                      {edu.field && (
                        <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono text-[10px] uppercase">
                          {edu.field}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    {/* Degree & Description */}
                    <div className="lg:col-span-9 space-y-3">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                          {edu.degree}
                        </h3>
                        <div className="text-sm font-mono text-cyan-400 font-medium mt-0.5">
                          {edu.institution}
                        </div>
                      </div>

                      <p className="text-sm text-zinc-300 font-light leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
