import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/profile';
import { ContactChannel } from '../../types/portfolio';
import { X, ArrowUpRight, Linkedin, Github, Mail, Phone, Copy, Check, Sparkles } from 'lucide-react';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export const ContactOverlay: React.FC<ContactOverlayProps> = ({
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const [hoveredChannel, setHoveredChannel] = useState<ContactChannel | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
      if (triggerElementRef?.current) {
        triggerElementRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerElementRef]);

  const handleChannelClick = (channel: ContactChannel, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.copy-action-btn')) {
      return;
    }

    if (channel.type === 'external') {
      window.open(channel.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = channel.href;
    }
  };

  const handleCopyValue = (channel: ContactChannel, e: React.MouseEvent) => {
    e.stopPropagation();
    const valueToCopy = channel.id === 'email' ? profileData.email : profileData.phone;
    navigator.clipboard.writeText(valueToCopy);
    setCopiedId(channel.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="w-5 h-5 text-blue-400" />;
      case 'Github':
        return <Github className="w-5 h-5 text-zinc-100" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-emerald-400" />;
      case 'Phone':
        return <Phone className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-zinc-300" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto select-none"
        >
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Main Editorial Contact Panel */}
          <motion.div
            ref={modalPanelRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl shadow-black/95 overflow-hidden z-10 p-6 sm:p-10 md:p-12 text-zinc-200 my-auto"
          >
            {/* Top Navigation Bar inside Modal */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  CONNECT // AYUSH KUMAR SAHOO
                </span>
                <span className="h-3 w-[1px] bg-white/20" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                  DIRECT CHANNELS
                </span>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close contact overlay"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 hover:border-white/30 hover:bg-white hover:text-black transition-all duration-200 text-xs font-mono text-zinc-300"
              >
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Oversized Editorial Heading */}
            <div className="space-y-4 mb-8">
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>START A CONVERSATION</span>
              </div>

              <h2
                id="contact-modal-title"
                className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-white tracking-tight leading-[0.9] select-none"
              >
                HOW DO YOU <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  WANT TO CONNECT
                </span> <br />
                WITH AYUSH?
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs sm:text-sm text-zinc-400 font-light">
                <p>Choose the channel that works best for you.</p>
                {hoveredChannel ? (
                  <span className="font-mono text-xs text-cyan-400 font-medium tracking-wider animate-fadeIn">
                    // {hoveredChannel.hoverBadge}
                  </span>
                ) : (
                  <span className="font-mono text-xs text-zinc-500 tracking-wider">
                    // SELECT A CHANNEL BELOW
                  </span>
                )}
              </div>
            </div>

            {/* Contact Options List */}
            <div className="space-y-3">
              {profileData.contacts.map((channel, idx) => {
                const isHovered = hoveredChannel?.id === channel.id;
                const isCopied = copiedId === channel.id;
                const hasCopyAction = channel.type === 'email' || channel.type === 'phone';

                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.06 }}
                    onMouseEnter={() => setHoveredChannel(channel)}
                    onMouseLeave={() => setHoveredChannel(null)}
                    onClick={(e) => handleChannelClick(channel, e)}
                    className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                      isHovered
                        ? 'bg-zinc-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/20 translate-x-1'
                        : 'bg-surface/60 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      
                      {/* Left: Number & Icon & Title */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono text-xs sm:text-sm font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors">
                          {channel.number}
                        </span>

                        <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-white/25 transition-all">
                          {renderIcon(channel.icon)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                              {channel.label}
                            </h3>
                            <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-500 uppercase">
                              ({channel.detail})
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 font-light truncate">
                            {channel.sublabel}
                          </p>
                        </div>
                      </div>

                      {/* Right: Copy button (for email/phone) & Action Arrow */}
                      <div className="flex items-center gap-2 shrink-0">
                        {hasCopyAction && (
                          <button
                            type="button"
                            onClick={(e) => handleCopyValue(channel, e)}
                            className="copy-action-btn p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/5"
                            title={`Copy ${channel.label.toLowerCase()} to clipboard`}
                            aria-label={`Copy ${channel.label.toLowerCase()}`}
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        )}

                        <div className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-200 shadow-md">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Copied feedback badge */}
                    {isCopied && (
                      <div className="absolute top-2 right-14 font-mono text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded animate-fadeIn">
                        ✓ Copied to clipboard!
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Support Note */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
              <p className="font-light">
                Open to full-time Data Analyst, Product Analyst, Business Analyst, and Business Intelligence opportunities.
              </p>
              <div className="flex items-center gap-2 text-zinc-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Rourkela, Odisha, India • {profileData.timezone}</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
