import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../../data/process';
import { SectionHeader } from '../ui/SectionHeader';
import { HelpCircle, Database, Activity, Lightbulb, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';

export const HowIWorkSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const iconMap: Record<string, React.ReactNode> = {
    HelpCircle: <HelpCircle className="w-5 h-5 text-cyan-400" />,
    Database: <Database className="w-5 h-5 text-blue-400" />,
    Activity: <Activity className="w-5 h-5 text-emerald-400" />,
    Lightbulb: <Lightbulb className="w-5 h-5 text-amber-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-rose-400" />,
  };

  return (
    <section id="process" className="py-24 sm:py-32 bg-canvas border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="03"
          title="HOW I WORK"
          subtitle="A structured 5-stage analytical framework that transforms ambiguous business questions into measurable product impact."
          badge="ANALYTICAL FRAMEWORK"
        />

        {/* Interactive Stacked Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Vertical Step Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            {processSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none group ${
                    isActive
                      ? 'bg-surface-elevated border-cyan-500/50 shadow-xl shadow-cyan-950/20'
                      : 'bg-surface/50 border-white/5 hover:border-white/20 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-sm font-bold tracking-widest ${
                          isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                        {iconMap[step.iconName] || <Activity className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-zinc-500 transition-transform ${
                          isActive ? 'rotate-90 text-cyan-400' : 'group-hover:translate-x-0.5'
                        }`}
                      />
                    </div>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 mt-2 font-medium">
                    {step.question}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Step Showcase Panel */}
          <div className="lg:col-span-7">
            {(() => {
              const current = processSteps[activeStepIndex];
              return (
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 sm:p-10 rounded-2xl bg-surface border border-white/10 shadow-2xl relative overflow-hidden space-y-8"
                >
                  {/* Subtle step background number */}
                  <div className="absolute top-2 right-4 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none">
                    {current.number}
                  </div>

                  {/* Step Title & Question */}
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                      <span>STAGE {current.number} OF 05</span>
                      <span>•</span>
                      <span>METHODOLOGY</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
                      {current.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-zinc-200 font-light mt-1 italic">
                      "{current.question}"
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                    {current.description}
                  </p>

                  {/* Expected Deliverables */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                      Concrete Analytical Deliverables
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.deliverables.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-xs font-mono text-zinc-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Indicator Progress Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {processSteps.map((_, pIdx) => (
                        <div
                          key={pIdx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            pIdx === activeStepIndex
                              ? 'w-8 bg-cyan-400'
                              : 'w-2 bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-mono text-[11px] text-zinc-500 uppercase">
                      STEP {activeStepIndex + 1} OF 5
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
