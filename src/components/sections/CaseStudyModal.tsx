import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types/portfolio';
import { RetentionCohortChart } from '../analytics/RetentionCohortChart';
import { ConversionFunnelChart } from '../analytics/ConversionFunnelChart';
import { SqlInspector } from '../analytics/SqlInspector';
import { MetricStatCard } from '../analytics/MetricStatCard';
import { X, ArrowRight, ArrowLeft, ExternalLink, Github, Database, CheckCircle2, Zap, Cpu } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'technical' | 'recommendations'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  // Next & Previous project computation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
  const isLastProject = currentIndex === allProjects.length - 1;

  const isAIProject = !!project.architectureSteps;
  const technicalTabLabel = isAIProject ? '3. AI & Technical Architecture' : '3. SQL & Technical Queries';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col text-zinc-200"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 bg-surface border-b border-white/10 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-cyan-400">
                CASE STUDY // {project.number}
              </span>
              <span className="h-3 w-[1px] bg-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white text-black font-mono text-xs font-semibold rounded hover:bg-zinc-200 transition-colors"
                >
                  <span>LIVE PRODUCT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-zinc-200 font-mono text-xs rounded hover:bg-zinc-700 transition-colors border border-white/10"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
            
            {/* Title & Tagline Banner */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
                {project.tagline}
              </p>

              {/* Tools Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI Metric Highlights */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, idx) => (
                  <MetricStatCard key={idx} metric={metric} index={idx} />
                ))}
              </div>
            )}

            {/* Navigation Tabs for Deep Dive Sections */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none">
              {[
                { id: 'overview', label: '1. Problem & Context' },
                { id: 'analysis', label: '2. Analysis & Interactive Visuals' },
                { id: 'technical', label: technicalTabLabel },
                { id: 'recommendations', label: '4. Insights & Actions' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Problem & Approach */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-surface border border-white/10 space-y-3">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                      THE BUSINESS PROBLEM
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-light">
                      {project.problem.statement}
                    </p>
                    <div className="pt-2 border-t border-white/5 text-xs text-zinc-400 font-light">
                      <strong className="text-zinc-200">Business Impact:</strong> {project.problem.businessImpact}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-surface border border-white/10 space-y-3">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                      DATA SOURCES & SCOPE
                    </h3>
                    <div className="space-y-2 text-xs text-zinc-300 font-light">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Volume: <strong className="text-white font-mono">{project.data.volume}</strong></span>
                      </div>
                      <div className="space-y-1 pt-1">
                        <span className="font-mono text-[11px] text-zinc-500 uppercase">Input Telemetry:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-zinc-400 pl-1">
                          {project.data.sources.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytical Approach Steps */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    METHODOLOGICAL APPROACH
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.approach.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-surface border border-white/5 space-y-2">
                        <div className="font-mono text-xs text-cyan-400 font-bold">
                          PHASE 0{idx + 1}
                        </div>
                        <h4 className="font-display font-bold text-base text-white uppercase">
                          {step.step}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Visuals & Findings */}
            {activeTab === 'analysis' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Embedded Interactive Chart (Cohort or Funnel) */}
                {project.cohortData && (
                  <RetentionCohortChart data={project.cohortData} />
                )}

                {project.funnelData && (
                  <ConversionFunnelChart data={project.funnelData} />
                )}

                {/* Key Findings List */}
                <div className="p-6 rounded-xl bg-surface border border-white/10 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    KEY ANALYTICAL FINDINGS
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {project.analysis.summary}
                  </p>
                  <div className="space-y-2.5 pt-2">
                    {project.analysis.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed font-light">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Technical Architecture or SQL Inspector */}
            {activeTab === 'technical' && (
              <div className="space-y-6 animate-fadeIn">
                {isAIProject && project.architectureSteps ? (
                  <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-6 shadow-2xl">
                    <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                        AI & Managed System Architecture Flow
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {project.architectureSteps.map((step, sIdx) => (
                        <div key={sIdx} className="p-4 rounded-xl bg-surface border border-white/5 space-y-1.5 relative group">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-cyan-400 font-bold">
                              STEP {step.step}
                            </span>
                            {sIdx < project.architectureSteps!.length - 1 && (
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden lg:block group-hover:text-cyan-400 transition-colors" />
                            )}
                          </div>
                          <h4 className="font-display font-bold text-sm text-white uppercase">
                            {step.title}
                          </h4>
                          <p className="text-xs text-zinc-400 font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-surface-elevated border border-white/10 flex items-start gap-3 text-xs text-zinc-300">
                      <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-white font-mono">Runtime Schema Validation:</strong> LaunchIQ.ai employs strict Zod validation parsing all incoming free-form LLM JSON outputs into deterministic, type-safe data structures before presentation in the dashboard.
                      </div>
                    </div>
                  </div>
                ) : project.sqlSnippets && project.sqlSnippets.length > 0 ? (
                  <SqlInspector snippets={project.sqlSnippets} />
                ) : (
                  <div className="p-8 text-center bg-surface rounded-xl border border-white/10 font-mono text-xs text-zinc-400">
                    Analytical workflow documented across project repository deliverables.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Insights & Action Recommendations */}
            {activeTab === 'recommendations' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Insights Grid */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                    ACTIONABLE BUSINESS INSIGHTS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.insights.map((ins, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-surface border border-white/10 space-y-2">
                        {ins.badge && (
                          <span className="font-mono text-[10px] uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                            {ins.badge}
                          </span>
                        )}
                        <h4 className="font-display font-bold text-lg text-white uppercase pt-1">
                          {ins.title}
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed font-light">
                          {ins.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                    RECOMMENDED ACTIONS & EXPECTED IMPACT
                  </h3>
                  <div className="space-y-3">
                    {project.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-surface border border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          <h4 className="font-display font-bold text-base text-white uppercase">
                            {rec.title}
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-light pl-6">
                          <strong className="text-zinc-200">Execution:</strong> {rec.action}
                        </p>
                        <div className="text-[11px] font-mono text-emerald-400 pl-6">
                          Expected Outcome: {rec.expectedImpact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Next/Previous Project Footer Navigation */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase">PREVIOUS CASE STUDY</div>
                  <div className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors uppercase">
                    {prevProject.title}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-right group w-full sm:w-auto justify-end"
              >
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase">
                    {isLastProject ? 'FIRST CASE STUDY' : 'NEXT CASE STUDY'}
                  </div>
                  <div className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors uppercase">
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
