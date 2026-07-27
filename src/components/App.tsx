import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight, PhoneCall, MailCheck, MapPinned, ChevronDown, Home, Wrench, Building2, PencilRuler, Layers, Paintbrush, Hammer } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const GOLD = "#c8a96e";
const SERIF = "'EB Garamond', Georgia, serif";
const SANS = "'Raleway', system-ui, sans-serif";

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
    return () => { cancelled = true; };
  }, [active, target, duration]);
  return value;
}

// ── Building SVG ──────────────────────────────────────────────────────────────
function BuildingConstruction() {
  const darkFill = "#141210";
  const darkerFill = "#0e0d0b";

  // Ground floor arches: x positions, each 64px wide, arch shoulder y=390
  const groundArchXs = [26, 128, 230];
  // Piano nobile arched windows: x positions, 52px wide, shoulder y=280
  const pianoXs = [26, 98, 170, 242];
  // Floor 3 rectangular windows
  const f3Xs = [26, 100, 174, 248];
  // Attic windows
  const atticXs = [30, 105, 180, 255];

  return (
    <motion.svg
      viewBox="0 0 320 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Animazione di costruzione dell'edificio Maestro Edil Carpi"
    >
      <title>Edificio Maestro Edil Carpi</title>
      <desc>Animazione che mostra la costruzione passo-passo di un edificio classico italiano, simbolo dell'artigianalità di Maestro Edil Carpi.</desc>
      <defs>
        <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="winGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff4c2" stopOpacity="0.75" />
          <stop offset="60%" stopColor={GOLD} stopOpacity="0.3" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="buildingAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient aura behind building */}
      <motion.ellipse
        cx="160" cy="280" rx="180" ry="220"
        fill="url(#buildingAura)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.0 }}
      />

      {/* ─── Floor fills (behind outline, bottom → top) ─── */}
      {[
        { y: 339, h: 121, delay: 0.35 },
        { y: 236, h: 102, delay: 0.60 },
        { y: 143, h: 92,  delay: 0.85 },
        { y: 61,  h: 81,  delay: 1.05 },
      ].map(({ y, h, delay }, i) => (
        <motion.rect key={`fill-${i}`}
          x="11" y={y} width="298" height={h}
          fill={darkFill}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* ─── Base podium ─── */}
      <motion.rect
        x="2" y="460" width="316" height="14"
        fill={darkFill} stroke={GOLD} strokeWidth="0.9"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      />
      <motion.rect
        x="-5" y="472" width="330" height="8"
        fill={darkerFill} stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.35"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.3 }}
      />

      {/* ─── Main building outline (draws counter-clockwise from base) ─── */}
      {/* Path: start bottom-left → up left → top → down right → bottom → close */}
      <motion.path
        d="M 10,460 V 60 H 310 V 460 Z"
        stroke={GOLD} strokeWidth="1.3" fill="none"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.15 }}
      />

      {/* ─── Top cornice (slightly wider) ─── */}
      <motion.path
        d="M 3,52 H 317 V 63 H 3 Z"
        stroke={GOLD} strokeWidth="0.9" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 1.35 }}
      />

      {/* ─── Parapet / top balustrade ─── */}
      <motion.path
        d="M 48,34 H 272 V 54 H 48 Z"
        stroke={GOLD} strokeWidth="0.75" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 1.45 }}
      />

      {/* ─── Parapet finials (3 vertical stems) ─── */}
      {[62, 160, 258].map((x, i) => (
        <motion.path key={`fin-${x}`}
          d={`M ${x},34 V 25`}
          stroke={GOLD} strokeWidth="0.8" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, delay: 1.5 + i * 0.04 }}
        />
      ))}

             {/* ─── Central cartouche ─── */}
      <motion.path
        d="M 126,6 H 194 V 25 H 126 Z"
        stroke={GOLD} strokeWidth="0.75" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.25 }}
      />
      <motion.text
        x="160"
        y="47"
        fill={GOLD}
        fontSize="11"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="0.6em"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.25 }}
      >
        Maestro Edil Carpi
      </motion.text>


      <motion.path
        d="M 160,6 V -4"
        stroke={GOLD} strokeWidth="0.8" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 1.65, duration: 0.2 }}
      />

      {/* ─── Floor separators ─── */}
      {[142, 235, 338].map((y, i) => (
        <motion.path key={`sep-${y}`}
          d={`M 10,${y} H 310`}
          stroke={GOLD} strokeWidth="0.65" strokeOpacity="0.55" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.18 }}
        />
      ))}

      {/* ─── Vertical pilasters ─── */}
      {[110, 210].map((x, i) => (
        <motion.path key={`pil-${x}`}
          d={`M ${x},60 V 460`}
          stroke={GOLD} strokeWidth="0.4" strokeOpacity="0.2" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
        />
      ))}

      {/* ─── Ground floor arch openings ─── */}
      {groundArchXs.map((x, i) => (
        <motion.path key={`ga-${i}`}
          d={`M ${x},460 L ${x},390 A 32,32 0 0,1 ${x + 64},390 L ${x + 64},460 Z`}
          fill={darkerFill} stroke={GOLD} strokeWidth="0.9"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.45 + i * 0.06, duration: 0.35 }}
        />
      ))}

      {/* ─── Piano nobile arched windows ─── */}
      {pianoXs.map((x, i) => (
        <motion.path key={`pn-${i}`}
          d={`M ${x},334 L ${x},280 A 26,26 0 0,1 ${x + 52},280 L ${x + 52},334 Z`}
          fill={darkerFill} stroke={GOLD} strokeWidth="0.9"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 + i * 0.05, duration: 0.35 }}
        />
      ))}

      {/* ─── Floor 3 rectangular windows ─── */}
      {f3Xs.map((x, i) => (
        <motion.rect key={`f3-${i}`}
          x={x} y={155} width={46} height={62}
          fill={darkerFill} stroke={GOLD} strokeWidth="0.9"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.95 + i * 0.05, duration: 0.35 }}
        />
      ))}
      {/* Window sills under floor 3 */}
      {f3Xs.map((x, i) => (
        <motion.path key={`sill-${i}`}
          d={`M ${x - 3},218 H ${x + 49}`}
          stroke={GOLD} strokeWidth="1.4" strokeOpacity="0.6" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 1.0 + i * 0.05, duration: 0.2 }}
        />
      ))}

      {/* ─── Attic windows ─── */}
      {atticXs.map((x, i) => (
        <motion.rect key={`at-${i}`}
          x={x} y={72} width={36} height={55}
          fill={darkerFill} stroke={GOLD} strokeWidth="0.8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + i * 0.05, duration: 0.35 }}
        />
      ))}

      {/* ─── Window glow (warm light turning on) ─── */}
      {groundArchXs.map((x, i) => (
        <motion.path key={`ga-glow-${i}`}
          d={`M ${x},460 L ${x},390 A 32,32 0 0,1 ${x + 64},390 L ${x + 64},460 Z`}
          fill="url(#winGrad)" filter="url(#glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6 + i * 0.08, duration: 0.5 }}
        />
      ))}
      {pianoXs.map((x, i) => (
        <motion.path key={`pn-glow-${i}`}
          d={`M ${x},334 L ${x},280 A 26,26 0 0,1 ${x + 52},280 L ${x + 52},334 Z`}
          fill="url(#winGrad)" filter="url(#glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.75 + i * 0.06, duration: 0.5 }}
        />
      ))}
      {f3Xs.map((x, i) => (
        <motion.rect key={`f3-glow-${i}`}
          x={x} y={155} width={46} height={62}
          fill="url(#winGrad)" filter="url(#glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.9 + i * 0.05, duration: 0.5 }}
        />
      ))}
      {atticXs.map((x, i) => (
        <motion.rect key={`at-glow-${i}`}
          x={x} y={72} width={36} height={55}
          fill="url(#winGrad)" filter="url(#glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.0 + i * 0.05, duration: 0.5 }}
        />
      ))}

      {/* ─── Final text details ─── */}
      <motion.text x="160" y="18" textAnchor="middle"
        fill={GOLD} fontSize="7.5" fontFamily={SERIF} letterSpacing="4" fillOpacity="0.85"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.5 }}
      >
        M · E · C
      </motion.text>
      <motion.text x="160" y="487" textAnchor="middle"
        fill={GOLD} fontSize="6" fontFamily={SANS} letterSpacing="3.5" fillOpacity="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
      >
        EST. 1985
      </motion.text>
    </motion.svg>
  );
}

// ── Animated Logo Mark ────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 shrink-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer border with rounded corners */}
      <motion.rect
        x="1" y="1" width="38" height="38" rx="4"
        stroke={GOLD} strokeWidth="1.1" fill="none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Left leg of M (column) */}
      <motion.path
        d="M 10 32 L 10 12 L 14 12 L 14 32"
        stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />

      {/* Right leg of M (column) */}
      <motion.path
        d="M 26 32 L 26 12 L 30 12 L 30 32"
        stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />

      {/* Left diagonal of roof */}
      <motion.path
        d="M 12 12 L 20 6"
        stroke={GOLD} strokeWidth="1.6" strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.55 }}
      />

      {/* Right diagonal of roof */}
      <motion.path
        d="M 28 12 L 20 6"
        stroke={GOLD} strokeWidth="1.6" strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.7 }}
      />

      {/* Cross beam / horizontal bar */}
      <motion.path
        d="M 10 18 L 30 18"
        stroke={GOLD} strokeWidth="1.2" strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />

      {/* Apex diamond / keystone */}
      <motion.path
        d="M 20 3 L 22 6 L 20 9 L 18 6 Z"
        fill={GOLD}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
      />

      {/* Subtle pulse ring */}
      <motion.circle
        cx="20" cy="20" r="18"
        fill="none" stroke={GOLD} strokeWidth="0.3" strokeOpacity="0.2"
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.2, 0.05, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </motion.svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#chi-siamo", label: "Chi Siamo" },
  { href: "#servizi",   label: "Servizi" },
  { href: "#opere",     label: "Opere" },
  { href: "/blog/",     label: "Guide & Costi" },
  { href: "#contatti",  label: "Contatti" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(20,18,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}22` : "1px solid transparent",
      }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20" aria-label="Navigazione principale">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group" aria-label="Torna all'inizio">
          <LogoMark />
          <div className="text-left">
            <div className="text-foreground text-[11px] tracking-[0.22em] uppercase leading-tight" style={{ fontFamily: SANS }}>
              Maestro Edil
            </div>
            <div className="text-primary text-[10px] tracking-[0.28em] uppercase leading-tight" style={{ fontFamily: SANS, fontWeight: 300 }}>
              Carpi
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="menubar" aria-label="Menu di navigazione desktop">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} role="none">
              <button onClick={() => scrollTo(href)} role="menuitem"
                className="text-muted-foreground hover:text-foreground text-[11px] tracking-[0.22em] uppercase transition-colors duration-200"
                style={{ fontFamily: SANS }}>
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <button onClick={() => scrollTo("#contatti")}
            className="px-5 py-2.5 border border-primary text-primary text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ fontFamily: SANS }}
            aria-label="Richiedi un preventivo gratuito">
            Preventivo
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground p-1" onClick={() => setOpen(!open)}
          aria-label={open ? "Chiudi menu" : "Apri menu"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div className="lg:hidden border-b border-border px-6 pb-6"
          style={{ background: "rgba(20,18,16,0.97)" }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role="navigation" aria-label="Menu di navigazione mobile">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <button onClick={() => scrollTo(href)}
                  className="w-full text-left text-muted-foreground hover:text-foreground text-xs tracking-[0.22em] uppercase py-3 border-b border-border transition-colors"
                  style={{ fontFamily: SANS }}>
                  {label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <button onClick={() => scrollTo("#contatti")}
                className="w-full py-3 border border-primary text-primary text-[11px] tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                style={{ fontFamily: SANS }}>
                Richiedi Preventivo
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <motion.div className="flex items-center gap-5 mb-16"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
      role="presentation">
      <span className="text-primary text-[11px] tracking-[0.4em]" style={{ fontFamily: SANS }} aria-hidden="true">{num}</span>
      <div className="flex-1 h-px bg-border" role="presentation" />
      <span className="text-muted-foreground text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: SANS }}>{title}</span>
    </motion.div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Introduzione">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 80% at 68% 50%, rgba(200,169,110,0.05) 0%, transparent 65%)"
      }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]" style={{
        backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8 min-h-screen py-28">

          {/* Text — right on mobile (order-2), left on desktop (order-1) */}
          <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col justify-center">
            <motion.div className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}>
              <div className="w-7 h-px bg-primary" />
              <span className="text-primary text-[10px] tracking-[0.38em] uppercase" style={{ fontFamily: SANS }}>
                Carpi · Emilia-Romagna · Est. 1985
              </span>
            </motion.div>

            <h1 className="text-foreground leading-[0.88] mb-1"
              style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)" }}
              aria-label="Maestro Edil Carpi - Impresa Edile a Carpi, Modena e Reggio Emilia">
              <motion.span
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                Maestro
              </motion.span>
            </h1>
            <p className="leading-[0.88] mb-8 sr-only">Edil Carpi — Impresa Edile a Carpi, Modena e Reggio Emilia</p>
            <p className="leading-[0.88] mb-8" aria-hidden="true"
              style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic", color: GOLD, fontSize: "clamp(2rem, 3.8vw, 3.8rem)" }}>
              <motion.span
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                Edil Carpi
              </motion.span>
            </p>

            <motion.div className="h-px bg-border mb-7"
              initial={{ width: 0 }} animate={{ width: "100%" }}
              transition={{ delay: 1.1, duration: 0.75, ease: "easeOut" }} />

            <motion.p
              className="text-muted-foreground mb-5 leading-relaxed"
              style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.18rem" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}>
              "Costruiamo il futuro,<br />rispettiamo il passato."
            </motion.p>

            <motion.p
              className="text-muted-foreground leading-loose mb-10"
              style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.875rem", letterSpacing: "0.045em" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.7 }}>
              Da quarant'anni, portiamo avanti una tradizione di qualità
              artigianale e innovazione costruttiva nel cuore dell'Emilia.
            </motion.p>

            <motion.div className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}>
              <button
                onClick={() => document.querySelector("#opere")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-[10px] tracking-[0.22em] uppercase hover:bg-primary/85 transition-colors duration-300 group"
                style={{ fontFamily: SANS }}
                aria-label="Scopri le opere realizzate da Maestro Edil Carpi">
                Scopri le opere
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => document.querySelector("#contatti")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-border text-muted-foreground text-[10px] tracking-[0.22em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
                style={{ fontFamily: SANS }}
                aria-label="Contatta Maestro Edil Carpi">
                Contattaci
              </button>
            </motion.div>
          </div>

          {/* Building — top on mobile (order-1), right on desktop (order-2) */}
          <div className="lg:col-span-3 order-1 lg:order-2 flex items-center justify-center lg:justify-end relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 lg:w-[480px] lg:h-[560px] rounded-full"
                style={{ background: `radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 65%)` }} />
            </div>
            <motion.div
              className="w-full max-w-[280px] lg:max-w-[400px] h-[55vh] lg:h-[88vh]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              style={{ animation: "floatBuilding 5s ease-in-out 5.5s infinite" }}>
              <BuildingConstruction />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}
        aria-hidden="true">
        <span className="text-muted-foreground text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: SANS }}>Scorri</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={15} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="chi-siamo" className="py-28 lg:py-40 bg-background" aria-label="Chi Siamo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel num="01" title="Chi Siamo" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2
              className="text-foreground mb-8 leading-tight"
              style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(2.4rem, 4vw, 3.4rem)" }}>
              <motion.span
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}>
                Un'Impresa di<br />
                <em style={{ color: GOLD, fontStyle: "italic" }}>Eccellenza Artigianale</em>
              </motion.span>
            </h2>

            <motion.p
              className="text-muted-foreground mb-6 leading-loose"
              style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.04em" }}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}>
              Dal 1985, Maestro Edil Carpi trasforma la visione in realtà attraverso l'arte della costruzione.
              Con oltre quarant'anni di esperienza, portiamo avanti una tradizione di qualità artigianale
              combinata con una passione per il dettaglio e la cura del lavoro ben fatto.
            </motion.p>

            <motion.p
              className="text-muted-foreground mb-10 leading-loose"
              style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.04em" }}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.22 }}>
              Operiamo nel cuore dell'Emilia-Romagna con un approccio che mette al centro la qualità
              dei materiali, la precisione esecutiva e il rispetto delle tempistiche concordate.
            </motion.p>

            <div className="grid grid-cols-3 gap-5">
              {[
                { title: "Qualità", desc: "Materiali certificati e lavorazioni di alto livello" },
                { title: "Esperienza", desc: "40 anni di presenza nel mercato emiliano" },
                { title: "Innovazione", desc: "Soluzioni su misura per ogni progetto, grande o piccolo." },
              ].map(({ title, desc }, i) => (
                <motion.article key={title} className="border-t border-border pt-4"
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 + i * 0.1 }}>
                  <h3 className="text-primary text-[11px] tracking-[0.15em] uppercase font-medium mb-2"
                    style={{ fontFamily: SANS }}>{title}</h3>
                  <p className="text-muted-foreground text-[11px] leading-relaxed"
                    style={{ fontFamily: SANS, fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: desc }} />
                </motion.article>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="bg-card aspect-[4/5] overflow-hidden">
              <figure>
                <img
                  src="/vuad/cs.webp"
                  alt="Restauro di un antico palazzo italiano, opera di Maestro Edil Carpi, esperti in costruzioni e ristrutturazioni"
                  width="800"
                  height="1000"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-75 hover:opacity-95 transition-opacity duration-600"
                />
                <figcaption className="sr-only">Palazzo storico restaurato da Maestro Edil Carpi</figcaption>
              </figure>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/18 pointer-events-none" />
            <div className="absolute top-6 -left-5 bg-primary text-primary-foreground px-4 py-3">
              <div className="text-[9px] tracking-[0.35em] uppercase mb-0.5" style={{ fontFamily: SANS }}>Dal</div>
              <div className="leading-none" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.8rem" }}>1985</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "I",
    Icon: Home,
    title: "Pavimenti & Rivestimenti",
    body: "Posa e sostituzione di pavimenti, piastrelle, rivestimenti murali e ceramiche. Lavoriamo con tutti i materiali — gres porcellanato, ceramica, pietra naturale e laminato.",
  },
  {
    num: "II",
    Icon: Wrench,
    title: "Ristrutturazione Completa",
    body: "Trasformiamo ogni ambiente della vostra casa con ristrutturazioni complete chiavi in mano.Bagni, cucine, soggiorni e camere — gestiamo ogni fase del progetto con cura artigianale.",
  },
  {
    num: "III",
    Icon: Building2,
    title: "Bagni & Cucine",
    body: "Ristrutturazione completa di bagni e cucine - dalla demolizione alla posa, impianti idraulici di base, rivestimenti e finiture.Risultati professionali nei tempi concordati.",
  },
  {
    num: "IV",
    Icon: PencilRuler,
    title: "Consulenza & Progettazione",
    body: "Supporto tecnico dall'ideazione alla realizzazione. Il nostro team di professionisti è al vostro fianco in ogni fase del progetto.",
  },
  {
    num: "V",
    Icon: Layers,
    title: "Cartongesso & Controsoffitti",
    body: "Realizzazione di pareti in cartongesso, contropareti, controsoffitti e nicchie decorative. Soluzioni moderne per ottimizzare gli spazi interni.",
  },
  {
    num: "VI",
    Icon: Paintbrush,
    title: "Tinteggiatura & Finiture",
    body: "Tinteggiatura interna professionale, stucco veneziano, rasature e finiture decorative. Ogni dettaglio curato per un risultato impeccabile.",
  },
  {
    num: "VII",
    Icon: Hammer,
    title: "Piccoli Lavori & Manutenzione",
    body: "Riparazioni, piccoli interventi, montaggio arredi, installazione TV e ventilatori, ritocchi e manutenzione ordinaria. Intervento rapido nella provincia di Modena e Reggio Emilia.",
  },
];

function ServicesSection() {
  return (
    <section id="servizi" className="py-28 lg:py-40 bg-card" aria-label="I Nostri Servizi">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel num="02" title="I Nostri Servizi" />

        <h2
          className="text-foreground mb-16 max-w-xl"
          style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            Costruiamo ogni tipo di<br />
            <em style={{ color: GOLD }}>progetto con eccellenza</em>
          </motion.span>
        </h2>

        {/* 
          CLEAN CONTAINMENT LAYER:
          We removed bg-border and gap-px from here so no background leaks onto the sides.
        */}
        <div className="flex flex-wrap justify-center w-full">
          {SERVICES.map(({ num, Icon, title, body }, i) => (
            <motion.article key={num}
              /* 
                RESPONSIVE SIZING AND BORDERS:
                - Mobile: w-full (stacked single columns) with a bottom line divider.
                - Tablet (md): w-1/2 (2 per row) with right/bottom line dividers.
                - Desktop (lg): w-1/4 (4 items top, 3 centered bottom) with right/bottom dividers.
              */
              className="bg-card p-8 hover:bg-secondary transition-colors duration-350 group cursor-default h-full
                         w-full md:w-1/2 lg:w-1/4 
                         border-b border-border/20 md:border-r
                         [&:nth-child(2n)]:md:border-r-0
                         lg:[&:nth-child(2n)]:border-r
                         lg:[&:nth-child(4n)]:border-r-0
                         lg:last:border-r-0"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="flex items-start justify-between mb-6">
                <span className="text-primary text-xs tracking-[0.35em]" style={{ fontFamily: SANS }} aria-hidden="true">{num}</span>
                <Icon size={16} className="text-muted-foreground/40 group-hover:text-primary/50 transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-foreground mb-4 leading-snug"
                style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.18rem" }}>
                {title}
              </h3>
              <p className="text-muted-foreground text-xs leading-loose"
                style={{ fontFamily: SANS, fontWeight: 300 }}>
                {body}
              </p>
              <div className="mt-7 w-6 h-px bg-primary transition-all duration-400 group-hover:w-12" aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        {/* Button that leads to the organized servizi & citta page */}
        <motion.div className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <a href="/servizi-e-citta/"
            className="flex items-center gap-2 px-8 py-4 border border-primary text-primary text-[10px] tracking-[0.22em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            style={{ fontFamily: SANS }}
            aria-label="Esplora tutti i servizi e le città dove operiamo">
            Esplora Servizi & Città
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}


// ── Projects ──────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Open Space & Controsoffitti Moderni",
    subtitle: "Controsoffitti geometrici in cartongesso con tagli di luce LED integrati, tinteggiatura coordinata e finiture moderne per un living open-space elegante.",
    category: "Soluzioni in Cartongesso",
    image: "/vuad/cr.webp",
    alt: "Villa residenziale moderna con dettagli architettonici, progetto di costruzione residenziale di Maestro Edil Carpi",
  },
  {
    title: "Ristrutturazione",
    subtitle: "Ristrutturazione completo di una villa unifamiliare: rifacimento facciate, isolamento termico e ridistribuzione totale degli spazi interni con finiture d'eccellenza.",
    category: "Ristrutturazioni Chiavi in Mano",
    image: "/vuad/ris.webp",
    alt: "esempio di opere realizzate da Maestro Edil Carpi",
  },
  {
    title: "Bagni & Finiture d'Eccellenza",
    subtitle: "Rifacimento completo del bagno con posa di rivestimenti ceramici effetto pietra naturale, installazione di sanitari sospesi, vasca centro stanza e impianto di illuminazione integrato.",
    category: "Sala da Bagno in Pietra",
    image: "/vuad/bgn.webp",
    alt: "specialità di Maestro Edil Carpi in ristrutturazione e restauro",
  },
];

function ProjectsSection() {
  return (
    <section id="opere" className="py-28 lg:py-40 bg-background" aria-label="Le Nostre Opere">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel num="03" title="Le Nostre Opere" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          {PROJECTS.map(({ title, subtitle, category, image, alt }, i) => (
            <motion.article key={i}
              className="group relative overflow-hidden bg-card cursor-pointer"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.14 }}>
              <figure className="aspect-[3/4] overflow-hidden">
                <img src={image} alt={alt}
                  width="600"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-88 group-hover:scale-105 transition-all duration-700"
                />
              </figure>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: SANS }}>{category}</div>
                <h3 className="text-foreground text-xl mb-1"
                  style={{ fontFamily: SERIF, fontWeight: 600 }}
                  dangerouslySetInnerHTML={{ __html: title }} />
                <p className="text-muted-foreground text-xs" style={{ fontFamily: SANS, fontWeight: 300 }}>
                  {subtitle}
                </p>
              </div>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/22 transition-all duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        <motion.div className="flex justify-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}>

        </motion.div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 40,  suffix: "+", label: "Anni di Esperienza" },
  { value: 450, suffix: "+", label: "Progetti Completati" },
  { value: 120, suffix: "+", label: "Collaboratori" },
  { value: 98,  suffix: "%", label: "Clienti Soddisfatti" },
];

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 2.2, active);
  return (
    <div className="border-t border-border pt-8">
      <div className="flex items-end gap-0.5 mb-3">
        <span className="text-foreground" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "clamp(2.8rem, 4vw, 4.2rem)", lineHeight: 1 }}>
          <span aria-hidden="true">{count}</span>
          <span className="sr-only">{value}{suffix}</span>
        </span>
        <span className="text-primary mb-2" style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "2rem" }} aria-hidden="true">{suffix}</span>
      </div>
      <div className="text-muted-foreground text-[10px] tracking-[0.28em] uppercase" style={{ fontFamily: SANS }}>
        {label}
      </div>
    </div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-28 lg:py-36" style={{
      background: "linear-gradient(160deg, #141210 0%, #0c0b09 55%, #0f0e0c 100%)"
    }} aria-label="I nostri numeri in cifre">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-foreground mb-5"
              style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              <motion.span
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}>
                I Nostri<br />
                <em style={{ color: GOLD }}>Numeri</em>
              </motion.span>
            </h2>
            <motion.p className="text-muted-foreground text-sm leading-loose"
              style={{ fontFamily: SANS, fontWeight: 300 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.18 }}>
              Quarant'anni di attività, centinaia di opere realizzate e migliaia
              di famiglie che hanno scelto di affidarsi alla nostra esperienza.
            </motion.p>
          </div>

          <div ref={ref} className="lg:col-span-3 grid grid-cols-2 gap-8 lg:gap-10">
            {STATS.map(({ value, suffix, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <StatItem value={value} suffix={suffix} label={label} active={active} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SEO Text Section (crawlable content for Google) ──────────────────────────
function SeoTextSection() {
  return (
    <section className="py-20 lg:py-28 bg-background" aria-label="Informazioni sui nostri servizi edili">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h2 className="text-foreground mb-6 leading-tight"
          style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
          Impresa Edile a Carpi, Modena e Reggio Emilia
        </h2>
        <p className="text-muted-foreground mb-5 leading-loose"
          style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.03em" }}>
          <strong>Maestro Edil Carpi</strong> è un'<strong>impresa edile</strong> con sede operativa a <strong>Carpi (MO)</strong>, specializzata in{' '}
          <strong>ristrutturazioni complete</strong>, <strong>costruzioni</strong>, <strong>restauro edifici storici</strong> e{' '}
          <strong>manutenzione edilizia</strong> nelle province di <strong>Modena</strong> e <strong>Reggio Emilia</strong>.
          Con oltre 40 anni di attività nel settore edile emiliano, offriamo servizi professionali di{' '}
          <strong>pavimenti e rivestimenti</strong>, <strong>ristrutturazione bagni e cucine</strong>,{' '}
          <strong>cartongesso e controsoffitti</strong>, <strong>tinteggiatura e finiture decorative</strong>,{' '}
          e <strong>consulenza e progettazione edile</strong>.
        </p>
        <p className="text-muted-foreground mb-5 leading-loose"
          style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.03em" }}>
          Interveniamo rapidamente in tutti i comuni della provincia di Modena — Carpi, Modena città, Sassuolo, Vignola, Mirandola, Formigine, Castelfranco Emilia, Finale Emilia, Nonantola, Soliera — e della provincia di Reggio Emilia — Reggio Emilia città, Scandiano, Casalgrande, Castellarano, Rubiera, Correggio, Guastalla, Novellara, Bagnolo in Piano, Cavriago — e in molti altri comuni.
        </p>
        <p className="text-muted-foreground mb-8 leading-loose"
          style={{ fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem", letterSpacing: "0.03em" }}>
          Che si tratti di ristrutturare un appartamento nel centro di Modena,
          recuperare un edificio storico a Reggio Emilia o semplicemente sostituire il pavimento del bagno,
          il nostro team di professionisti è pronto a realizzare il tuo progetto con cura artigianale, materiali
          di prima qualità e finiture impeccabili. <strong>Preventivo gratuito e senza impegno.</strong>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/servizi/ristrutturazione-completa/", label: "Ristrutturazione Completa" },
            { href: "/servizi/pavimenti-e-rivestimenti/", label: "Pavimenti & Rivestimenti" },
            { href: "/servizi/bagni-e-cucine/", label: "Bagni & Cucine" },
            { href: "/servizi/restauro-edifici-storici/", label: "Restauro Edifici" },
          ].map(({ href, label }) => (
            <a key={href} href={href}
              className="block p-4 border border-border/20 hover:border-primary/40 transition-colors duration-200 text-center"
              style={{ fontFamily: SANS, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#d3c6af" }}>
              {label}
            </a>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-primary mb-4"
            style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.3rem" }}>
            Zone di Servizio
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Carpi", "Modena", "Reggio Emilia", "Sassuolo", "Vignola", "Mirandola", "Formigine", "Scandiano", "Casalgrande", "Castellarano", "Rubiera", "Correggio", "Maranello", "Finale Emilia", "Guastalla"].map(city => (
              <a key={city} href={`/citta/${city.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}/`}
                className="px-3 py-1.5 border border-border/15 hover:border-primary/40 hover:text-primary transition-all duration-200"
                style={{ fontFamily: SANS, fontSize: "0.72rem", letterSpacing: "0.05em", color: "#d3c6af" }}>
                {city}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const [state, handleSubmit] = useForm("xzdwwrrz");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    if (val.length > 0 && val.length < 15) {
      setMessageError("Il messaggio deve contenere almeno 15 caratteri.");
    } else {
      setMessageError("");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length < 15) {
      setMessageError("Il messaggio deve contenere almeno 15 caratteri.");
      return;
    }
    handleSubmit(e as any);
  };

  const inputClass = "w-full bg-secondary border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/35";

  return (
    <section id="contatti" className="py-28 lg:py-40 bg-card" aria-label="Contatti">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel num="04" title="Contatti" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-foreground mb-8 leading-tight"
              style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(2.4rem, 4vw, 3.4rem)" }}>
              Iniziamo a<br />
              <em style={{ color: GOLD }}>costruire insieme</em>
            </h2>
            <p className="text-muted-foreground mb-10 leading-loose text-sm"
              style={{ fontFamily: SANS, fontWeight: 300 }}>
              Siamo a vostra disposizione per qualsiasi richiesta. Contattateci
              per un preventivo gratuito o per una consulenza tecnica preliminare.
            </p>

            <address className="space-y-6 mb-10 not-italic">
              {[
                { Icon: MapPinned, text: "Sede operativa - Carpi (MO) 41012" },
                { Icon: PhoneCall, text: "WhatsApp  +39 375 542 8696" },
                { Icon: MailCheck,  text: "info@maestroedilcarpi.it" },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-5">
                  <Icon size={20} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="text-muted-foreground text-sm"
                    style={{ fontFamily: SANS, fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </address>

            <div className="border-t border-border pt-8">
              <div className="text-muted-foreground text-[10px] tracking-[0.28em] uppercase mb-4"
                style={{ fontFamily: SANS }}>Disponibilità Telefonica & Sopralluoghi</div>
              <div className="space-y-2">
                {[
                  ["Lunedì — Venerdì", "08:00 — 18:00"],
                  ["Sabato", "08:00 — 13:00"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm" style={{ fontFamily: SANS }}>
                    <span className="text-muted-foreground" style={{ fontWeight: 300 }}><time>{day}</time></span>
                    <span className="text-foreground"><time>{hours}</time></span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          {state.succeeded ? (
            <motion.div
              className="flex flex-col items-center justify-center text-center py-16"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-foreground mb-3"
                style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.5rem" }}>
                Messaggio Inviato!
              </h3>
              <p className="text-muted-foreground text-sm max-w-md"
                style={{ fontFamily: SANS, fontWeight: 300 }}>
                Grazie per averci contattato. Vi risponderemo al più presto via email o telefono.
              </p>
            </motion.div>
          ) : (
            <motion.form onSubmit={onSubmit} className="space-y-5"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              aria-label="Modulo di contatto per richiedere un preventivo">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: SANS }}>Nome e Cognome</label>
                <input id="contact-name" type="text" placeholder="Mario Rossi"
                  name="nome"
                  className={inputClass}
                  style={{ fontFamily: SANS }}
                  aria-required="true"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: SANS }}>Indirizzo Email</label>
                <input id="contact-email" type="email" placeholder="mario.rossi@email.it"
                  name="email"
                  className={inputClass}
                  style={{ fontFamily: SANS }}
                  aria-required="true"
                  required
                />
                <ValidationError field="email" errors={state.errors}
                  className="text-red-400 text-xs mt-1 block" />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: SANS }}>Numero di Telefono</label>
                <input id="contact-phone" type="tel" placeholder="+39 333 000 0000"
                  name="telefono"
                  className={inputClass}
                  style={{ fontFamily: SANS }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: SANS }}>Messaggio</label>
                <textarea id="contact-message" placeholder="Descrivi il vostro progetto (minimo 15 caratteri)..." rows={4}
                  name="messaggio"
                  value={message}
                  onChange={handleMessageChange}
                  className={`${inputClass} resize-none`}
                  style={{ fontFamily: SANS }}
                  required
                  minLength={15}
                />
                {messageError && (
                  <p className="text-red-400 text-xs mt-1">{messageError}</p>
                )}
                <ValidationError field="messaggio" errors={state.errors}
                  className="text-red-400 text-xs mt-1 block" />
              </div>

              {state.errors && (
                <p className="text-red-400 text-xs">
                  Si è verificato un errore nell'invio. Riprova o contattaci direttamente a info@maestroedilcarpi.it
                </p>
              )}

              <button type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-primary text-primary-foreground text-[10px] tracking-[0.32em] uppercase hover:bg-primary/85 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: SANS }}
                aria-label="Invia la richiesta di preventivo">
                {state.submitting ? "Invio in corso..." : "Invia Richiesta"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();
  const cols = [
    {
      title: "Servizi",
      links: [
        { href: "#servizi", label: "Pavimenti & Rivestimenti" },
        { href: "#servizi", label: "Ristrutturazione & Restauro" },
        { href: "#servizi", label: "Bagni & Cucine" },
        { href: "#servizi", label: "Progettazione" },
        { href: "#servizi", label: "Cartongesso & Controsoffitti" },
        { href: "#servizi", label: "Tinteggiatura & Finiture" },
        { href: "#servizi", label: "Piccoli Lavori & Manutenzione" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { href: "#chi-siamo", label: "Chi Siamo" },
        { href: "#opere", label: "Le Nostre Opere" },
        { href: "#", label: "Lavora con Noi" },
      ],
    },
    {
      title: "Contatti",
      links: [
        { href: "tel:+39 375 542 8696 ", label: "+39 375 542 8696" },
        { href: "mailto:info@maestroedilcarpi.it", label: "info@maestroedilcarpi.it" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border py-14" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoMark />
              <div>
                <div className="text-foreground text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: SANS }}>
                  Maestro Edil Carpi
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-loose"
              style={{ fontFamily: SANS, fontWeight: 300 }}>
              Costruiamo eccellenza dal 1985 nel territorio emiliano.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="w-4 h-px bg-primary/50" aria-hidden="true" />
              <span className="text-muted-foreground text-[10px] tracking-[0.3em]" style={{ fontFamily: SANS }}>
                Carpi, MO
              </span>
            </div>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-foreground text-[10px] tracking-[0.32em] uppercase mb-5"
                style={{ fontFamily: SANS }}>{title}</h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: SANS, fontWeight: 300 }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-xs text-center" style={{ fontFamily: SANS, fontWeight: 300 }}>
            &copy; {currentYear} Maestro Edil Carpi S.r.l. &middot;  &middot; Tutti i diritti riservati
          </p>
          <nav className="flex items-center gap-6" aria-label="Link legali">
            <a href="/privacy-policy/"
              className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
              style={{ fontFamily: SANS, fontWeight: 300 }}>Privacy Policy</a>
            <a href="/cookie-policy/"
              className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
              style={{ fontFamily: SANS, fontWeight: 300 }}>Cookie Policy</a>
          </nav>
        </div>
        <div className="mt-6 pt-4 border-t border-border/40 text-center">
          <p className="text-muted-foreground text-xs" style={{ fontFamily: SANS, fontWeight: 400 }}>
            Website by <a href="https://rayman.studio" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors duration-200">rayman.studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Layout ───────────────────────────────────────────────────────────────────
export function NavbarFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SubPageNavbar />
        {children}
        <SubPageFooter />
      </motion.div>
    </>
  );
}

// ── Sub-page Navbar (redirects to homepage sections) ──────────────────────────
function SubPageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const BASE = "";

  const navToHome = (hash: string) => {
    setOpen(false);
    window.location.href = `${BASE}/${hash}`;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(20,18,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}22` : "1px solid transparent",
      }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20" aria-label="Navigazione principale">
        {/* Logo */}
        <button onClick={() => navToHome("")}
          className="flex items-center gap-3 group" aria-label="Torna alla home Maestro Edil Carpi">
          <LogoMark />
          <div className="text-left">
            <div className="text-foreground text-[11px] tracking-[0.22em] uppercase leading-tight" style={{ fontFamily: SANS }}>
              Maestro Edil
            </div>
            <div className="text-primary text-[10px] tracking-[0.28em] uppercase leading-tight" style={{ fontFamily: SANS, fontWeight: 300 }}>
              Carpi
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="menubar" aria-label="Menu di navigazione desktop">
          <li role="none"><button onClick={() => navToHome("#chi-siamo")} role="menuitem" className="text-muted-foreground hover:text-foreground text-[11px] tracking-[0.22em] uppercase transition-colors duration-200" style={{ fontFamily: SANS }}>Chi Siamo</button></li>
          <li role="none"><button onClick={() => navToHome("#servizi")} role="menuitem" className="text-muted-foreground hover:text-foreground text-[11px] tracking-[0.22em] uppercase transition-colors duration-200" style={{ fontFamily: SANS }}>Servizi</button></li>
          <li role="none"><button onClick={() => navToHome("#opere")} role="menuitem" className="text-muted-foreground hover:text-foreground text-[11px] tracking-[0.22em] uppercase transition-colors duration-200" style={{ fontFamily: SANS }}>Opere</button></li>
          <li role="none"><button onClick={() => navToHome("#contatti")} role="menuitem" className="text-muted-foreground hover:text-foreground text-[11px] tracking-[0.22em] uppercase transition-colors duration-200" style={{ fontFamily: SANS }}>Contatti</button></li>
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <button onClick={() => navToHome("#contatti")}
            className="px-5 py-2.5 border border-primary text-primary text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ fontFamily: SANS }}
            aria-label="Richiedi un preventivo gratuito">
            Preventivo
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground p-1" onClick={() => setOpen(!open)}
          aria-label={open ? "Chiudi menu" : "Apri menu"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div className="lg:hidden border-b border-border px-6 pb-6"
          style={{ background: "rgba(20,18,16,0.97)" }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role="navigation" aria-label="Menu di navigazione mobile">
          <ul className="flex flex-col gap-1 pt-4">
            {[
              { href: "#chi-siamo", label: "Chi Siamo" },
              { href: "#servizi", label: "Servizi" },
              { href: "#opere", label: "Opere" },
              { href: "#contatti", label: "Contatti" },
            ].map(({ href, label }) => (
              <li key={href}>
                <button onClick={() => navToHome(href)}
                  className="w-full text-left text-muted-foreground hover:text-foreground text-xs tracking-[0.22em] uppercase py-3 border-b border-border transition-colors"
                  style={{ fontFamily: SANS }}>
                  {label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <button onClick={() => navToHome("#contatti")}
                className="w-full py-3 border border-primary text-primary text-[11px] tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                style={{ fontFamily: SANS }}>
                Richiedi Preventivo
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

// ── Sub-page Footer ──────────────────────────────────────────────────────────
function SubPageFooter() {
  const currentYear = new Date().getFullYear();
  const BASE = "";
  const cols = [
    {
      title: "Servizi",
      links: [
        { href: `${BASE}/servizi/pavimenti-e-rivestimenti/`, label: "Pavimenti & Rivestimenti" },
        { href: `${BASE}/servizi/ristrutturazione-completa/`, label: "Ristrutturazione & Restauro" },
        { href: `${BASE}/servizi/bagni-e-cucine/`, label: "Bagni & Cucine" },
        { href: `${BASE}/servizi/consulenza-e-progettazione/`, label: "Progettazione" },
        { href: `${BASE}/servizi/cartongesso-e-controsoffitti/`, label: "Cartongesso & Controsoffitti" },
        { href: `${BASE}/servizi/tinteggiatura-e-finiture/`, label: "Tinteggiatura & Finiture" },
        { href: `${BASE}/servizi/piccoli-lavori-e-manutenzione/`, label: "Piccoli Lavori & Manutenzione" },
      ],
    },
    {
      title: "Azienda",
      links: [
        { href: `${BASE}/`, label: "Home" },
        { href: `${BASE}/#chi-siamo`, label: "Chi Siamo" },
        { href: `${BASE}/#opere`, label: "Le Nostre Opere" },
      ],
    },
    {
      title: "Contatti",
      links: [
        { href: "tel:+39 375 542 8696 ", label: "+39 375 542 8696" },
        { href: "mailto:info@maestroedilcarpi.it", label: "info@maestroedilcarpi.it" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border py-14" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoMark />
              <div>
                <div className="text-foreground text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: SANS }}>
                  Maestro Edil Carpi
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-loose"
              style={{ fontFamily: SANS, fontWeight: 300 }}>
              Costruiamo eccellenza dal 1985 nel territorio emiliano.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="w-4 h-px bg-primary/50" aria-hidden="true" />
              <span className="text-muted-foreground text-[10px] tracking-[0.3em]" style={{ fontFamily: SANS }}>
                Carpi, MO
              </span>
            </div>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-foreground text-[10px] tracking-[0.32em] uppercase mb-5"
                style={{ fontFamily: SANS }}>{title}</h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href}
                      className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: SANS, fontWeight: 300 }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-xs text-center" style={{ fontFamily: SANS, fontWeight: 300 }}>
            &copy; {currentYear} Maestro Edil Carpi S.r.l. &middot; Tutti i diritti riservati
          </p>
          <nav className="flex items-center gap-6" aria-label="Link legali">
            <a href="/privacy-policy/"
              className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
              style={{ fontFamily: SANS, fontWeight: 300 }}>Privacy Policy</a>
            <a href="/cookie-policy/"
              className="text-muted-foreground text-xs hover:text-primary transition-colors duration-200"
              style={{ fontFamily: SANS, fontWeight: 300 }}>Cookie Policy</a>
          </nav>
        </div>
        <div className="mt-6 pt-4 border-t border-border/40 text-center">
          <p className="text-muted-foreground text-xs" style={{ fontFamily: SANS, fontWeight: 400 }}>
            Website by <a href="https://rayman.studio" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors duration-200">rayman.studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @keyframes floatBuilding {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <StatsSection />
          <SeoTextSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}