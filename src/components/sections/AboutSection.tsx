import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { ShieldCheck, Award, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-canvas border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="05"
          title="ABOUT ME"
          subtitle="Analytical mindset, business problem solving, athletic discipline, and AI-assisted product building."
          badge="HUMAN CONTEXT"
        />

        {/* 2-Column Editorial Grid: Portrait & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Left Column: Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl group max-w-[440px] mx-auto lg:mx-0">
              <img
                src="/assets/ayush-portrait.png"
                alt="Ayush Kumar Sahoo, Data Analyst & Product Analytics"
                className="w-full aspect-[4/5] object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-300">
                <div>
                  <div className="font-bold uppercase tracking-wider text-white">AYUSH KUMAR SAHOO</div>
                  <div className="text-[10px] text-cyan-400">NIT Rourkela, Batch of 2026</div>
                </div>
                <span className="text-[10px] text-zinc-500">20.2961° N, 85.8245° E</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Statement */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
              DATA. <br />
              <span className="text-zinc-400">PRODUCT.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                DECISIONS.
              </span>
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                I am <strong className="text-white font-normal">Ayush Kumar Sahoo</strong>, a recent B.Tech graduate from <strong className="text-white font-normal">NIT Rourkela</strong> with hands-on experience across data analytics, business intelligence, product analytics, and project management.
              </p>

              <p>
                I specialize in turning raw data into structured business insights, working across <strong className="text-cyan-300 font-normal">SQL, Google BigQuery, Power BI, Excel, GA4, and Zoho Analytics</strong> to analyze customer behaviour, product performance, operational metrics, and business KPIs.
              </p>

              <p>
                My approach combines analytical problem solving with business context: I focus on understanding the problem first, validating the data, identifying the drivers behind performance, and translating findings into clear decisions and actions.
              </p>

              <p>
                I have also explored <strong className="text-white font-normal">AI-assisted product building</strong> through projects such as LaunchIQ.ai, giving me practical exposure to modern AI workflows, product interfaces, and application development.
              </p>

              <p>
                Beyond analytics, I served as the <strong className="text-emerald-400 font-normal">Team Captain of the NIT Rourkela Institute Swimming Team</strong>, where leadership, discipline, coordination, and consistency became an important part of how I approach challenging goals.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>DATA VALIDATION & QA</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Validate data before drawing conclusions through consistency checks, duplicate detection, null checks, schema validation, and KPI-level quality review.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>ATHLETIC LEADERSHIP</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Served as Team Captain of the NIT Rourkela Institute Swimming Team, developing leadership, discipline, coordination, and team accountability through competitive sport.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>CURRENTLY POSITIONED FOR</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Full-time opportunities in Data Analytics, Business Analytics, Product Analytics, and BI, where I can apply SQL, business intelligence, structured problem solving, and data-driven decision support.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
