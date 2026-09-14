import React, { useState } from 'react';
import { FunnelStep } from '../../types/portfolio';
import { Filter, ArrowDown, AlertTriangle } from 'lucide-react';

interface ConversionFunnelChartProps {
  data: FunnelStep[];
}

export const ConversionFunnelChart: React.FC<ConversionFunnelChartProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const initialUsers = data[0]?.users || 1;

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              E-Commerce Conversion Funnel Decomposition
            </h4>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Stage-by-stage session volume, drop-off rates & technical bottlenecks
          </p>
        </div>
        <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
          Overall Conversion: {((data[data.length - 1]?.users / initialUsers) * 100).toFixed(1)}%
        </div>
      </div>

      <div className="space-y-3">
        {data.map((step, idx) => {
          const widthPct = (step.users / initialUsers) * 100;
          const isHighDropoff = step.dropOffRate > 35;
          const isSelected = activeStep === idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(isSelected ? null : idx)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-cyan-500/50 shadow-lg'
                  : 'bg-surface-elevated border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-200">{step.step}</span>
                  {isHighDropoff && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/50 border border-amber-800/40 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-2.5 h-2.5" /> High Drop-off
                    </span>
                  )}
                </div>
                <div className="font-mono text-zinc-400">
                  <span className="text-white font-medium">{step.users.toLocaleString()}</span> sessions ({step.conversionRate}%)
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="w-full bg-zinc-800/60 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isHighDropoff
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-500'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}
                  style={{ width: `${Math.max(widthPct, 4)}%` }}
                />
              </div>

              {/* Drop-off and Insight details */}
              {step.dropOffRate > 0 && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                  <span className="flex items-center gap-1 font-mono text-rose-400">
                    <ArrowDown className="w-3 h-3" /> -{step.dropOffRate}% drop-off from previous step
                  </span>
                  <span className="text-zinc-400 italic">{step.insight}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
