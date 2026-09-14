import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import { SectionHeader } from '../ui/SectionHeader';
import { Sparkles, Terminal, BarChart2, Layers, Cpu } from 'lucide-react';

export const AnalyticsToolkit: React.FC = () => {
  const categoryIcons: Record<string, React.ReactNode> = {
    analytics: <BarChart2 className="w-5 h-5 text-cyan-400" />,
    'product-analytics': <Terminal className="w-5 h-5 text-emerald-400" />,
    visualization: <Layers className="w-5 h-5 text-amber-400" />,
    technology: <Cpu className="w-5 h-5 text-blue-400" />,
  };

  const getBadgeStyle = (proficiency: string) => {
    switch (proficiency) {
      case 'ADVANCED':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50';
      case 'WORKING':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50';
      case 'FOUNDATIONAL':
      default:
        return 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50';
    }
  };

  return (
    <section id="toolkit" className="py-24 sm:py-32 bg-canvas border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="03"
          title="ANALYTICS TOOLKIT"
          subtitle="Structured capability matrix spanning business analytics, data workflows, business intelligence, product analytics, and AI-assisted product building."
          badge="CAPABILITY MATRIX"
        />

        {/* 4-Column Editorial Capability Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.categoryKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 space-y-6"
            >
              {/* Category Title Bar */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {categoryIcons[category.categoryKey] || <Sparkles className="w-4 h-4 text-cyan-400" />}
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      CAPABILITY // 0{catIdx + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Skill Items */}
              <div className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      skill.highlight
                        ? 'bg-surface-elevated border-cyan-500/30'
                        : 'bg-black/30 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-display font-bold text-sm sm:text-base text-zinc-100 uppercase tracking-wide">
                        {skill.name}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${getBadgeStyle(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
