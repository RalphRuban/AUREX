import React, { useEffect, useState } from 'react';
import { AurexLogo } from './AurexLogo';

interface CinematicIntroProps {
  onComplete: () => void;
}

const LETTERS = ['A', 'U', 'R', 'E', 'X'];

const BOOT_STRINGS = ['VERIFYING SIGNAL VECTORS', 'MAPPING DIFF TIMELINE', 'RISK MODEL ACTIVE'];

// Deterministic drifting dust motes (no randomness at render time).
const STARS = Array.from({ length: 44 }, (_, i) => {
  const x = ((i + 1) * 137.508) % 100;
  const y = ((i + 1) * 61.803) % 100;
  return {
    x,
    y,
    size: i % 7 === 0 ? 2 : 1,
    delay: (i % 11) * -0.6,
    dur: 4 + (i % 6) * 0.8,
    ty: -(12 + (i % 5) * 9)
  };
});

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [emblem, setEmblem] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [bootPct, setBootPct] = useState(0);
  const [bootStrIndex, setBootStrIndex] = useState(0);

  // Laser-unveil finishes ~1.0s in; then swap to the emblem phase.
  useEffect(() => {
    const timer = window.setTimeout(() => setEmblem(true), 1750);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!emblem) return;
    const stringTimer = window.setInterval(() => {
      setBootStrIndex((i) => (i + 1) % BOOT_STRINGS.length);
    }, 420);

    // Smooth eased progress: counter is swept up over the emblem phase and
    // only lands on 100 right as the exit begins (~3.6s in).
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1800);
      const eased = 1 - Math.pow(1 - p, 3);
      setBootPct(eased * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 3600);
    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      window.clearInterval(stringTimer);
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [emblem, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#020B1A] pointer-events-none"
      aria-hidden="true"
    >
      {/* Drifting dust motes — parallax depth layer */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="intro-star absolute rounded-full bg-[#7FD8FF]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            ['--dur' as string]: `${s.dur}s`,
            ['--delay' as string]: `${s.delay}s`,
            ['--ty' as string]: `${s.ty}px`
          }}
        />
      ))}

      {/* Vignette + rotating god-rays + breathing aurora */}
      <div className="absolute inset-0 bg-radial-vignette" />
      <div className="intro-ray absolute top-1/2 left-1/2 h-[170vmax] w-[170vmax] -translate-x-1/2 -translate-y-1/2" />
      <div
        className="intro-aurora absolute top-1/2 left-1/2 w-[110vmax] h-[110vmax]"
        style={{
          ['--aurora-o' as string]: 0.6,
          background:
            'radial-gradient(circle at 50% 40%, rgba(0,168,255,0.1) 0%, rgba(0,168,255,0.04) 28%, rgba(2,11,26,0) 62%)'
        }}
      />

      {/* Edge-faded technical grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(120,165,200,0.05) 0px, rgba(120,165,200,0.05) 1px, transparent 1px, transparent 96px), repeating-linear-gradient(90deg, rgba(120,165,200,0.05) 0px, rgba(120,165,200,0.05) 1px, transparent 1px, transparent 96px)',
          maskImage: 'radial-gradient(circle at 50% 45%, black 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 0%, transparent 78%)'
        }}
      />

      {/* CRT scanlines + a wander scan bar */}
      <div className="intro-scanlines absolute inset-0" />
      <div className="intro-scan-bar absolute inset-x-0 h-24" />

      {/* Warm power-on rise (one-shot) */}
      <span className="intro-power absolute inset-x-0 bottom-0 h-1/2" />

      {/* Quiet corner ticks */}
      <div className="intro-tick absolute top-6 left-6 h-8 w-8 border-l border-t border-[#00A8FF]/45" />
      <div className="intro-tick absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#00A8FF]/45" style={{ animationDelay: '1.2s' }} />

      {/* Slim metadata — static, muted */}
      <span className="absolute top-6 right-8 font-mono text-[10px] tracking-[0.4em] text-[#5F7694]">
        AUREX&nbsp;v2.4.0
      </span>

      {/* Slim footer strip */}
      <span className="absolute bottom-6 left-8 font-mono text-[10px] tracking-[0.35em] text-[#5F7694]">
        GITHUB&nbsp;·&nbsp;DEVSECOPS&nbsp;ENABLED
      </span>

      {/* Hero — camera drift, then fade + letterbox close on exit (transition-driven) */}
      <div
        className="intro-hero-exit relative flex h-full w-full items-center justify-center"
        style={{ opacity: exiting ? 0 : 1, transform: exiting ? 'scale(1.06)' : 'scale(1)' }}
      >
        <div className="intro-pan relative flex flex-col items-center px-6">
          {/* Stage that holds the wordmark, then crossfades to the emblem */}
          <div className="relative h-48 w-full flex items-center justify-center sm:h-52">
            {/* Wordmark phase */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 motion-reduce:transition-none ${
                emblem ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              <div className="relative flex items-center [text-shadow:0_0_28px_rgba(0,168,255,0.35)]">
                {/* Laser beam traveling over the wordmark */}
                <span className="intro-beam pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden">
                  <span className="intro-beam-head absolute top-1/2 h-24 w-0.5 -translate-y-1/2 bg-[#BDE9FF] shadow-[0_0_18px_2px_rgba(0,168,255,0.9)]" />
                </span>

                {LETTERS.map((letter, i) => (
                  <span
                    key={i}
                    className={`intro-letter intro-letter-${i % 2 === 0 ? 'a' : 'b'} font-black font-mono text-6xl tracking-tight text-[#F2F6FA] sm:text-7xl`}
                    style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                    {letter}
                  </span>
                ))}

                {/* Two sparks ignite at the leading edge while letters reveal */}
                <span className="intro-spark-l absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#BDE9FF] shadow-[0_0_14px_2px_rgba(0,168,255,0.8)]" />
                <span className="intro-spark-r absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#BDE9FF] shadow-[0_0_14px_2px_rgba(0,168,255,0.8)]" />
              </div>

              {/* Terminus baseline drawing beneath the wordmark */}
              <span className="intro-baseline absolute -bottom-4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#2E9BFF]/80 to-transparent" />

              <p className="intro-fade-up mt-6 whitespace-nowrap font-mono text-[9px] leading-none tracking-[0.3em] text-[#7FA1C2] sm:text-[11px] sm:tracking-[0.36em]">
                AUTONOMOUS&nbsp;PULL-REQUEST&nbsp;SECURITY
              </p>
            </div>

            {/* Emblem phase — hex induction, no circles */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 motion-reduce:transition-none ${
                emblem ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="intro-emblem relative h-[150px] w-[150px]">
                {/* Hex wireframe drawing itself around the logo */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 150 150" fill="none">
                  <polygon
                    points="129.6,106.5 75,138 20.4,106.5 20.4,43.5 75,12 129.6,43.5"
                    pathLength={1}
                    className="intro-hex"
                    stroke="rgba(0,168,255,0.5)"
                    strokeWidth={1}
                    strokeLinejoin="round"
                  />
                  {/* Vertex nodes sparking as the frame completes */}
                  <circle cx="75" cy="12" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '0.8s' }} />
                  <circle cx="129.6" cy="43.5" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '0.86s' }} />
                  <circle cx="129.6" cy="106.5" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '0.92s' }} />
                  <circle cx="75" cy="138" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '0.98s' }} />
                  <circle cx="20.4" cy="106.5" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '1.04s' }} />
                  <circle cx="20.4" cy="43.5" r="1.6" fill="#BDE9FF" className="intro-hex-node" style={{ animationDelay: '1.1s' }} />
                </svg>

                {/* Breathing halo behind the logo */}
                <span className="intro-logo-halo absolute inset-0 rounded-full" />

                {/* Cinematic gloss sheen sweeping across the emblem */}
                <span className="intro-sheen absolute inset-0" />

                <div className="intro-logo-settle absolute inset-0 flex items-center justify-center" style={{ filter: 'drop-shadow(0 6px 22px rgba(0,168,255,0.28))' }}>
                  <AurexLogo size={96} withGlow={false} />
                </div>

                {/* Corner brackets snapping onto the emblem stage */}
                <span className="intro-emblem-corner absolute -top-1 -left-1 h-6 w-6 border-t border-l border-[#00A8FF]/70" />
                <span className="intro-emblem-corner absolute -top-1 -right-1 h-6 w-6 border-t border-r border-[#00A8FF]/70" />
                <span className="intro-emblem-corner absolute -bottom-1 -left-1 h-6 w-6 border-b border-l border-[#00A8FF]/70" />
                <span className="intro-emblem-corner absolute -bottom-1 -right-1 h-6 w-6 border-b border-r border-[#00A8FF]/70" />
              </div>
            </div>
          </div>

          {/* Shared divider hairline that self-draws */}
          <div className="intro-grow mt-8 h-px w-44 bg-gradient-to-r from-transparent via-[#17406E] to-transparent" />

          {/* Lower line: tagline while the wordmark is up, live readout during the emblem phase */}
          <div className="mt-6 h-10 flex items-center justify-center">
            {!emblem ? (
              <p className="intro-fade-up font-mono text-[10px] tracking-[0.4em] text-[#5F7694]">
                PR-LEVEL&nbsp;DIFF&nbsp;ANALYSIS
              </p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] tabular-nums">
                  <span className="text-[#00A8FF]">{Math.round(bootPct).toString().padStart(3, '0')}%</span>
                  <span className="text-[#8FA6C0]">·</span>
                  <span className="text-[#5F7694]">{BOOT_STRINGS[bootStrIndex]}</span>
                  <span className="intro-cursor text-[#00A8FF]">▮</span>
                </div>
                <div className="relative h-[3px] w-56 overflow-hidden rounded-full bg-[#0B2A5E]/70">
                  <div className="absolute inset-0 flex" style={{ width: `${bootPct}%` }}>
                    <div
                      className="h-full w-full rounded-full bg-gradient-to-r from-[#005BB5] via-[#00A8FF] to-[#BDE9FF]"
                      style={{ boxShadow: '0 0 10px rgba(0,168,255,0.75)' }}
                    />
                    <span className="ml-auto h-full w-[3px] -translate-y-[1px] bg-[#EAF7FF] shadow-[0_0_8px_2px_rgba(120,220,255,0.95)]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exposure flash -> cinematic letterbox close on exit */}
      <div className={`intro-flash absolute inset-0 ${exiting ? 'intro-flash-on' : ''}`} />
      <div className="intro-bar intro-bar-top" style={{ transform: exiting ? 'scaleY(1)' : 'scaleY(0)' }} />
      <div className="intro-bar intro-bar-bottom" style={{ transform: exiting ? 'scaleY(1)' : 'scaleY(0)' }} />
    </div>
  );
};