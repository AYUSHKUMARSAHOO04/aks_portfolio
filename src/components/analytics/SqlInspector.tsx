import React, { useState } from 'react';
import { SqlSnippet } from '../../types/portfolio';
import { Terminal, Copy, Check, Code2 } from 'lucide-react';

interface SqlInspectorProps {
  snippets: SqlSnippet[];
}

export const SqlInspector: React.FC<SqlInspectorProps> = ({ snippets }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    if (!currentSnippet) return;
    navigator.clipboard.writeText(currentSnippet.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!snippets || snippets.length === 0) return null;

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="bg-zinc-900/90 border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            SQL Query Inspector
          </span>
        </div>

        {/* Tab selection if multiple snippets */}
        {snippets.length > 1 && (
          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/5">
            {snippets.map((snip, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  activeTab === idx
                    ? 'bg-zinc-800 text-white font-medium shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {snip.title}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-colors border border-white/5"
          title="Copy SQL to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy SQL</span>
            </>
          )}
        </button>
      </div>

      {/* Query content */}
      <div className="p-4 overflow-x-auto max-h-[380px] bg-black/60 font-mono text-xs text-zinc-300 leading-relaxed">
        <pre className="text-zinc-300 selection:bg-cyan-500/30 selection:text-white">
          <code>{currentSnippet.query}</code>
        </pre>
      </div>

      {/* Query explanation footer */}
      {currentSnippet.explanation && (
        <div className="px-4 py-3 bg-zinc-900/50 border-t border-white/5 flex items-start gap-2.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-400 leading-normal">
            <strong className="text-zinc-200 font-mono">Analytical Logic:</strong> {currentSnippet.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
