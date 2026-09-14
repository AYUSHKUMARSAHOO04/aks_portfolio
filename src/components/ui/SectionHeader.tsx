import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'between';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  badge,
  className = "",
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      {/* Top micro metadata row */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-white/50">
            /{number}
          </span>
          <span className="h-2.5 w-[1px] bg-white/20" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            {title}
          </span>
        </div>

        {badge && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Main oversized editorial title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-none"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};
