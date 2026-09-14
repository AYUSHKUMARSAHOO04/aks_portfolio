import React from 'react';
import { MetricHighlight } from '../../types/portfolio';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricStatCardProps {
  metric: MetricHighlight;
  index?: number;
}

export const MetricStatCard: React.FC<MetricStatCardProps> = ({ metric }) => {
  return (
    <div className="p-4 rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
          {metric.label}
        </span>
        {metric.isPositive !== undefined && (
          <div
            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${
              metric.isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {metric.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{metric.isPositive ? 'Uplift' : 'Bottleneck'}</span>
          </div>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
        {metric.value}
      </div>

      {metric.trend && (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-zinc-300 font-medium">
          <Minus className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>{metric.trend}</span>
        </div>
      )}

      <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-zinc-400 leading-relaxed">
        {metric.context}
      </div>
    </div>
  );
};
