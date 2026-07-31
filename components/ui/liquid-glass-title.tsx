"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";

/* ========================================================================
 *  3D Liquid Glass Typography  —  AGUS COLLECTION brand title
 * ------------------------------------------------------------------------
 *  Font        : Clash Display Bold 700 (Fontshare CDN, luxury fashion brand font)
 *  3D depth    : 16-layer extrusion text-shadow (8–16 px)
 *  Glassmorphism: translucent backdrop-blur container
 *  Metallic    : gold/champagne gradient fill + reflection overlay
 *  Bevel       : top-left highlight + bottom-right depth
 *  Inner glow  : warm gold ambient
 *  HDR         : specular white micro-shadow
 *  Ambient     : soft elliptical drop shadow beneath
 *  Float       : gentle 3 px sinusoidal bob
 *  Shine sweep : diagonal gold/white overlay every 4 s
 *  Parallax    : cursor-reactive perspective rotate
 * ======================================================================== */

/* ------------------------------------------------------------------ */
/*  Shared character styles (avoids object re-creation per render)    */
/* ------------------------------------------------------------------ */
const CHAR_FONT: React.CSSProperties = {
  fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)",
  lineHeight: 1.05,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

/* 16-layer 3D extrusion shadow */
const EXTRUSION_SHADOW = `
  /* soft ambient */
  0 2px 14px rgba(0,0,0,0.55),
  /* extrusion 1-16 */
  0 1px 0 #1a1100,
  0 2px 0 rgba(26,17,0,0.92),
  0 3px 0 rgba(26,17,0,0.87),
  0 4px 0 rgba(26,17,0,0.82),
  0 5px 0 rgba(26,17,0,0.76),
  0 6px 0 rgba(26,17,0,0.70),
  0 7px 0 rgba(26,17,0,0.64),
  0 8px 0 rgba(26,17,0,0.58),
  0 9px 2px rgba(26,17,0,0.52),
  0 10px 3px rgba(26,17,0,0.46),
  0 11px 4px rgba(26,17,0,0.40),
  0 12px 5px rgba(26,17,0,0.35),
  0 13px 6px rgba(26,17,0,0.28),
  0 14px 7px rgba(26,17,0,0.22),
  0 15px 8px rgba(26,17,0,0.16),
  0 16px 10px rgba(26,17,0,0.10),
  /* bevel highlight top-left */
  -1px -1px 0 rgba(255,255,255,0.14),
  -2px -2px 0 rgba(255,255,255,0.07),
  /* inner glow warm gold */
  0 0 3px rgba(255,215,0,0.28),
  0 0 6px rgba(255,215,0,0.12),
  /* HDR specular */
  0 0 1px rgba(255,255,255,0.35)
`;

/* =================================================================== */

export default memo(function LiquidGlassTitle({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const raf = useRef(0);

  const onMove = useCallback((e: MouseEvent) => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) { raf.current = 0; return; }
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;  // -0.5 → 0.5
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      setMouse({ x: dx * 10, y: dy * 10 }); // ±10 px range
      raf.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [onMove]);

  const letters = text.split("");

  return (
    <div ref={ref} className="relative inline-flex" style={{ perspective: 900 }}>
      {/* ---- parallax wrapper ---- */}
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateX(${mouse.x}px) translateY(${mouse.y}px) rotateY(${mouse.x * 0.6}deg) rotateX(${-mouse.y * 0.6}deg)`,
        }}
      >
        {/* ---- ambient shadow ---- */}
        <div
          className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2"
          aria-hidden="true"
          style={{
            width: "115%",
            height: 36,
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 72%)",
            filter: "blur(14px)",
          }}
        />

        {/* ---- glassmorphism pill ---- */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.07) 100%)",
            backdropFilter: "blur(28px) saturate(2)",
            WebkitBackdropFilter: "blur(28px) saturate(2)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 20,
            boxShadow:
              "0 12px 52px rgba(0,0,0,0.55), 0 0 90px rgba(251,191,36,0.05), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.25)",
            padding: "15px 34px",
            animation: "lgFloat 5s ease-in-out infinite",
          }}
        >
          {/* static metallic champagne reflection */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(105deg, transparent 8%, rgba(255,215,0,0.04) 28%, rgba(255,248,220,0.06) 44%, rgba(255,215,0,0.03) 56%, rgba(255,248,220,0.05) 72%, transparent 92%)",
            }}
          />

          {/* shine sweep (every 4 s) */}
          <div
            className="pointer-events-none absolute -inset-6"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, transparent 32%, rgba(255,215,0,0.20) 46%, rgba(255,255,255,0.32) 50%, rgba(255,215,0,0.20) 54%, transparent 68%, transparent 100%)",
              backgroundSize: "300% 100%",
              animation: "lgShine 4s ease-in-out infinite",
              borderRadius: 26,
              mixBlendMode: "overlay",
            }}
          />

          {/* border highlight (HDR) */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              borderRadius: 20,
              border: "1px solid transparent",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 50%, rgba(255,215,0,0.18) 100%) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* ===== LETTERS ===== */}
          <div className="relative z-10 flex items-center whitespace-nowrap">
            {letters.map((ch, i) => (
              <span key={i} className="relative inline-block">
                {ch === " " ? (
                  <span className="inline-block" style={{ width: "0.22em" }} />
                ) : (
                  <>
                    {/* LAYER 1 — 3D extrusion (dark solid + shadow) */}
                    <span
                      aria-hidden="true"
                      className="block select-none"
                      style={{
                        ...CHAR_FONT,
                        color: "#1a1100",
                        textShadow: EXTRUSION_SHADOW,
                      }}
                    >
                      {ch}
                    </span>

                    {/* LAYER 2 — gold gradient fill */}
                    <span
                      className="absolute inset-0"
                      style={{
                        ...CHAR_FONT,
                        color: "transparent",
                        background:
                          "linear-gradient(90deg, #B8860B 0%, #FFD700 14%, #FFF8DC 28%, #FFD700 42%, #DAA520 56%, #FFD700 70%, #FFF8DC 84%, #B8860B 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        animation: "lgTextShimmer 6s ease-in-out infinite",
                      }}
                    >
                      {ch}
                    </span>

                    {/* LAYER 3 — metallic reflection overlay */}
                    <span
                      className="pointer-events-none absolute inset-0"
                      aria-hidden="true"
                      style={{
                        ...CHAR_FONT,
                        color: "transparent",
                        background:
                          "linear-gradient(160deg, rgba(255,255,255,0.22) 0%, transparent 35%, transparent 65%, rgba(255,215,0,0.08) 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {ch}
                    </span>
                  </>
                )}
              </span>
            ))}
          </div>

          {/* inner glow on pill */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              borderRadius: 20,
              boxShadow:
                "inset 0 2px 10px rgba(255,255,255,0.06), inset 0 -2px 10px rgba(0,0,0,0.18)",
            }}
          />
        </div>
      </div>

      {/* ---- global keyframes ---- */}
      <style jsx global>{`
        @keyframes lgFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes lgShine {
          0%   { background-position: 250% 0; }
          100% { background-position: -250% 0; }
        }
        @keyframes lgTextShimmer {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </div>
  );
});
