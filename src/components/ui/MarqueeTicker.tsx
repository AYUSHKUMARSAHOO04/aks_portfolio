import React from 'react';

interface MarqueeTickerProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
  speed?: 'normal' | 'slow' | 'fast';
  inverted?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items,
  direction = 'left',
  className = "",
  inverted = false,
}) => {
  return (
    <div
      className={`py-4 sm:py-6 overflow-hidden select-none border-y border-white/10 ${
        inverted ? 'bg-white text-black' : 'bg-black text-white'
      } ${className}`}
    >
      <div
        className={`flex whitespace-nowrap will-change-transform ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }`}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span
              className={`text-xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight ${
                inverted ? 'text-black' : 'text-zinc-100'
              }`}
            >
              {item}
            </span>
            <span
              className={`ml-8 sm:ml-12 text-sm sm:text-lg font-bold ${
                inverted ? 'text-zinc-600' : 'text-cyan-400'
              }`}
            >
              ✱
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
