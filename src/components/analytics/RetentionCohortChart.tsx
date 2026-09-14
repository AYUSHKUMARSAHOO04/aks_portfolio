import React, { useState } from 'react';
import { CohortDataRow } from '../../types/portfolio';
import { Layers, Info } from 'lucide-react';

interface RetentionCohortChartProps {
  data: {
    headers: string[];
    rows: CohortDataRow[];
  };
}

export const RetentionCohortChart: React.FC<RetentionCohortChartProps> = ({ data }) => {
  const [selectedCell, setSelectedCell] = useState<{
    cohort: string;
    month: string;
    retention: number;
    users: number;
  } | null>(null);

  // Helper function to get color based on retention %
  const getRetentionColor = (value: number) => {
    if (value === 0) return 'bg-zinc-900/40 text-zinc-600 border-zinc-800/40';
    if (value >= 90) return 'bg-emerald-500/25 text-emerald-300 border-emerald-500/30';
    if (value >= 60) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
    if (value >= 40) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/20';
    if (value >= 30) return 'bg-sky-500/15 text-sky-300 border-sky-500/20';
    return 'bg-zinc-800/40 text-zinc-400 border-zinc-700/30';
  };

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Interactive Cohort Retention Heatmap
            </h4>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Normalized monthly active user retention (%) by signup cohort
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <span className="inline-block w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/40" /> &gt; 50%
          <span className="inline-block w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/30 ml-2" /> 30-50%
          <span className="inline-block w-2.5 h-2.5 rounded bg-zinc-800/60 border border-zinc-700 ml-2" /> &lt; 30%
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-mono text-[10px] uppercase">
              <th className="py-2 px-3 font-medium">Cohort</th>
              <th className="py-2 px-3 font-medium">Users</th>
              {data.headers.slice(2).map((header, idx) => (
                <th key={idx} className="py-2 px-2 text-center font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-2.5 px-3 font-mono font-medium text-zinc-200 whitespace-nowrap">
                  {row.cohort}
                </td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">
                  {row.users.toLocaleString()}
                </td>
                {row.retention.map((val, cIdx) => (
                  <td key={cIdx} className="py-1 px-1.5 text-center">
                    <button
                      onClick={() =>
                        setSelectedCell({
                          cohort: row.cohort,
                          month: data.headers[cIdx + 2],
                          retention: val,
                          users: Math.round((row.users * val) / 100),
                        })
                      }
                      className={`w-full py-1.5 px-2 rounded font-mono text-[11px] font-medium border transition-all hover:scale-105 ${getRetentionColor(
                        val
                      )} ${val === 0 ? 'pointer-events-none opacity-30' : 'cursor-pointer'}`}
                    >
                      {val > 0 ? `${val}%` : '-'}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Inspection Details */}
      {selectedCell && (
        <div className="mt-4 p-3.5 rounded-lg bg-zinc-900/90 border border-emerald-500/30 flex items-start gap-3 animate-fadeIn">
          <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-mono text-emerald-300 font-semibold">
              {selectedCell.cohort} ({selectedCell.month}):
            </span>{' '}
            <span className="text-zinc-200">
              Retained <strong className="text-white font-mono">{selectedCell.retention}%</strong> ({selectedCell.users.toLocaleString()} active users). Users in this cohort who configured automated reporting by Day 3 maintained 2.4x higher Month-3 retention.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
