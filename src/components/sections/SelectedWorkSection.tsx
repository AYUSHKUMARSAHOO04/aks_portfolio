import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../../types/portfolio';
import { projectsData } from '../../data/projects';
import { SectionHeader } from '../ui/SectionHeader';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, Filter } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const categories: ProjectCategory[] = [
    'ALL',
    'PRODUCT ANALYTICS',
    'DATA ANALYTICS',
    'BUSINESS INTELLIGENCE',
    'AI & PRODUCT',
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="py-24 sm:py-32 bg-canvas relative border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          number="01"
          title="SELECTED WORK"
          subtitle="In-depth analytics case studies and product architectures focused on user behavior, conversion funnels, and data-informed decision making."
          badge={`${projectsData.length} CASE STUDIES`}
        />

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 mr-2 font-mono text-xs text-zinc-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="uppercase">Filter:</span>
          </div>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-surface text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Project List with Horizontal Dashed Rules */}
        <div className="border-t border-white/15">
          {filteredProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setActiveModalProject(project)}
                className="group relative py-8 sm:py-12 border-b border-dashed border-white/20 cursor-pointer transition-colors hover:bg-white/[0.02]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Project Number & Category */}
                  <div className="md:col-span-3 flex md:flex-col justify-between items-start gap-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      {project.number}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 bg-surface px-2.5 py-0.5 rounded border border-white/5">
                      {project.category}
                    </span>
                  </div>

                  {/* Center: Title & Short Description */}
                  <div className="md:col-span-6 space-y-2">
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight group-hover:translate-x-3 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg line-clamp-2">
                      {project.shortDescription}
                    </p>
                    
                    {/* Tool Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10px] text-zinc-400 bg-surface-elevated px-2 py-0.5 rounded border border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Year & Interactive Arrow */}
                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6">
                    <span className="font-mono text-xs text-zinc-500">
                      {project.year}
                    </span>

                    <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Subtle highlight gradient bar */}
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Live Floating Hover Preview Card (Follows cursor on desktop) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: cursorPos.x + 24,
                y: cursorPos.y - 120,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
              className="hidden lg:block fixed top-0 left-0 pointer-events-none z-40 w-72 p-4 rounded-xl bg-zinc-950/95 border border-white/20 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 mb-3">
                <span className="font-mono text-[10px] text-cyan-400 uppercase font-semibold">
                  Preview // {hoveredProject.number}
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  {hoveredProject.year}
                </span>
              </div>

              <div className="text-base font-display font-bold text-white uppercase mb-1">
                {hoveredProject.title}
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed mb-3">
                {hoveredProject.tagline}
              </p>

              {hoveredProject.metrics && hoveredProject.metrics[0] && (
                <div className="p-2 rounded bg-surface border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">
                    {hoveredProject.metrics[0].label}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {hoveredProject.metrics[0].value}
                  </span>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-white/10 text-center font-mono text-[10px] text-zinc-500">
                CLICK TO OPEN FULL CASE STUDY ↗
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Case Study Deep Dive Modal */}
        <CaseStudyModal
          project={activeModalProject}
          allProjects={projectsData}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onSelectProject={(p) => setActiveModalProject(p)}
        />
      </div>
    </section>
  );
};
