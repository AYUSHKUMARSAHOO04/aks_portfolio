import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LiquidPortraitProps {
  imageSrc: string;
  className?: string;
  priority?: boolean;
}

export const LiquidPortrait: React.FC<LiquidPortraitProps> = ({
  imageSrc,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Mouse tracking state with smooth lerping
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, velocity: 0 });
  const animFrameId = useRef<number | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 800], [0, 75]);
  const portraitScale = useTransform(scrollY, [0, 800], [1, 0.95]);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Preload image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imageObjRef.current = img;
      setIsLoaded(true);
    };

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [imageSrc]);

  // Interactive mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const dx = x - mouseRef.current.targetX;
    const dy = y - mouseRef.current.targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.velocity = Math.min(dist * 25, 1.5);
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0.5;
    mouseRef.current.targetY = 0.5;
    mouseRef.current.velocity = 0;
  };

  // Canvas fluid displacement renderer
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !imageObjRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const img = imageObjRef.current;
    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth lerp mouse position
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;
      m.velocity += (0 - m.velocity) * 0.05;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle dynamic lighting / vignette
      const grad = ctx.createRadialGradient(
        width * m.x,
        height * m.y,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      // Draw image with subtle fluid displacement transform
      ctx.save();
      
      // Calculate responsive cover dimensions
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      // Subtle fluid tilt and offset
      const tiltX = (m.x - 0.5) * 16;
      const tiltY = (m.y - 0.5) * 16;

      ctx.translate(tiltX, tiltY);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Liquid gloss overlay
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle corner vignette to integrate into dark canvas
      const edgeGrad = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.35,
        width / 2, height / 2, width * 0.65
      );
      edgeGrad.addColorStop(0, 'transparent');
      edgeGrad.addColorStop(1, 'rgba(9, 9, 11, 0.65)');
      ctx.fillStyle = edgeGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isLoaded, reducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      style={{ y: portraitY, scale: portraitScale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {/* SVG Liquid Displacement Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Main Portrait Display */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl shadow-black/80 group">
        
        {/* Crisp Image Base Layer */}
        <img
          src={imageSrc}
          alt="Ayush Kumar Sahoo, Data Analyst & Product Analytics"
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out brightness-95 contrast-105 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: 'contrast(1.04) brightness(0.98)',
          }}
        />

        {/* Fluid Canvas Interactive Overlay */}
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            width={600}
            height={780}
            className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-500"
          />
        )}

        {/* Editorial Frame Markings */}
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-zinc-400/70 uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
          PORTRAIT.RAW // 01
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] tracking-wider text-zinc-300">ACTIVE ID</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 rounded-b-xl">
          <div>
            <div className="font-mono text-[11px] font-semibold text-white uppercase tracking-wider">AYUSH KUMAR SAHOO</div>
          </div>
          <div className="font-mono text-[9px] text-zinc-500">20.2961° N, 85.8245° E</div>
        </div>

        {/* Subtle glass edge highlight */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
    </motion.div>
  );
};
