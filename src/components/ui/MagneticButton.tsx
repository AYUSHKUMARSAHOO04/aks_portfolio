import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
  variant = 'primary',
  size = 'md',
  download,
  target,
  rel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Base styling variants
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-zinc-200 border border-white shadow-lg',
    secondary: 'bg-zinc-900 text-white hover:bg-zinc-800 border border-white/15',
    outline: 'bg-transparent text-white hover:bg-white/5 border border-white/25 hover:border-white/60',
    pill: 'bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md rounded-full',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs font-mono',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-mono tracking-widest',
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-lg active:scale-95 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return content;
};
