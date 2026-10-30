import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { DISCLAIMER, Photo, Wordmark } from '@/components/site'

export const Route = createFileRoute('/')({
  head: () => ({ links: [{ rel: 'canonical', href: '/' }] }),
  component: NeuroViuHome,
})

/* ═══════════════════════════════════════════════════════════════════════════
   Primitives
   ═══════════════════════════════════════════════════════════════════════════ */

/** Stagger helper for scroll-reveal elements. */
const rd = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as unknown as React.CSSProperties

type IconName =
  | 'wave' | 'metrics' | 'spark' | 'timeline' | 'measure' | 'analyze' | 'track'
  | 'wireless' | 'compact' | 'shield' | 'mri' | 'cognition' | 'connectivity'
  | 'explain' | 'campus' | 'lab' | 'clinical' | 'rehab' | 'neuro' | 'biotech'
  | 'arrow' | 'check' | 'layers' | 'flag' | 'orbit' | 'book' | 'external' | 'flame'

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  wave: <path d="M2 12h2.6l1.6-5.4L9 17l2.2-7.4L13.4 14l1.5-2.6H22" />,
  metrics: (
    <>
      <path d="M3 20h18" />
      <path d="M6.5 20v-6M11.5 20V5M16.5 20v-9.5M21 20v-4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.2l1.9 5.4 5.4 1.9-5.4 1.9L12 17.8l-1.9-5.4L4.7 10.5l5.4-1.9z" />
      <circle cx="18.6" cy="18" r="1.5" />
    </>
  ),
  timeline: (
    <>
      <path d="M3 19h18" />
      <path d="M5 15.5l4.5-4 3.5 2.6 6-7" />
      <circle cx="9.5" cy="11.5" r="1.4" />
      <circle cx="13" cy="14.1" r="1.4" />
    </>
  ),
  measure: (
    <>
      <circle cx="12" cy="12" r="2.1" />
      <path d="M7.7 7.7a6 6 0 000 8.6M16.3 16.3a6 6 0 000-8.6" />
      <path d="M4.9 4.9a10 10 0 000 14.2M19.1 19.1a10 10 0 000-14.2" opacity="0.5" />
    </>
  ),
  analyze: (
    <>
      <circle cx="6" cy="17.5" r="2.1" />
      <circle cx="12" cy="6" r="2.1" />
      <circle cx="18.5" cy="15" r="2.1" />
      <path d="M7.4 15.8L10.8 8M13.6 7.3l4 5.9M8 17.9l8.4-2.3" />
    </>
  ),
  track: (
    <>
      <path d="M3 17.5l4.5-5 3.5 2.5 4-6 6 3.5" />
      <path d="M3 21h18" opacity="0.4" />
      <circle cx="7.5" cy="12.5" r="1.3" />
      <circle cx="15" cy="9" r="1.3" />
    </>
  ),
  wireless: (
    <>
      <circle cx="12" cy="17.5" r="1.7" />
      <path d="M8.2 13.8a5.4 5.4 0 017.6 0" />
      <path d="M5.3 10.6a9.6 9.6 0 0113.4 0" />
      <path d="M2.6 7.5a13.6 13.6 0 0118.8 0" opacity="0.5" />
    </>
  ),
  compact: (
    <>
      <rect x="3.2" y="8" width="17.6" height="8.4" rx="4.2" />
      <path d="M8.6 8v8.4M15.4 8v8.4" opacity="0.5" />
      <path d="M3.2 11H1.6M22.4 11h-1.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2l7.2 2.7v5.4c0 4.3-3 8-7.2 9.4-4.2-1.4-7.2-5.1-7.2-9.4V5.9z" />
      <path d="M9 12l2.3 2.4 4-4.4" />
    </>
  ),
  mri: (
    <>
      <path d="M15.6 20.4v-2.6c2.7-1.3 4.4-3.9 4.4-7 0-4.3-3.6-7.6-8-7.6S4 6.5 4 10.8c0 1.6.5 3 1.4 4.2v2.1h2.2v3.3" />
      <path d="M8.4 10.8h7.2M12 7.4v6.8" opacity="0.55" />
    </>
  ),
  cognition: (
    <>
      <path d="M15.4 20.6v-2.4c2.8-1.2 4.6-3.9 4.6-7 0-4.3-3.6-7.8-8-7.8S4 6.9 4 11.2c0 1.7.5 3.1 1.5 4.3v2.2h2.3v2.9" />
      <circle cx="10" cy="10.4" r="1.3" />
      <circle cx="15" cy="12.6" r="1.3" />
      <path d="M11.2 11.1l2.6 1.1" />
    </>
  ),
  connectivity: (
    <>
      <circle cx="5.5" cy="7" r="2" />
      <circle cx="18.5" cy="6.4" r="2" />
      <circle cx="12" cy="13" r="2" />
      <circle cx="6.4" cy="18.4" r="2" />
      <circle cx="18" cy="17.6" r="2" />
      <path d="M7.2 8.3l3.4 3.3M16.7 7.7L13.4 12M10.6 14.3l-2.8 2.9M13.5 14.2l3.1 2.2M7.5 8.9l-.9 7.5M17.6 8.3l.3 7.3" opacity="0.7" />
    </>
  ),
  explain: (
    <>
      <circle cx="10.6" cy="10.6" r="6.2" />
      <path d="M15.2 15.2L21 21" />
      <path d="M7.4 11.2l1.8-2.4 1.6 4 1.7-3.2 1.1 1.6" />
    </>
  ),
  campus: (
    <>
      <path d="M3.2 10.4L12 5.6l8.8 4.8" />
      <path d="M5.6 11.8v7.4M10 11.8v7.4M14 11.8v7.4M18.4 11.8v7.4" />
      <path d="M3 19.6h18" />
    </>
  ),
  lab: (
    <>
      <path d="M9.4 3.4h5.2M10.6 3.4v5.3l-4.5 8.3a2.4 2.4 0 002.1 3.6h7.6a2.4 2.4 0 002.1-3.6l-4.5-8.3V3.4" />
      <path d="M7.2 15.2h9.6" opacity="0.6" />
    </>
  ),
  clinical: (
    <>
      <rect x="4.6" y="4.2" width="14.8" height="16.2" rx="3" />
      <path d="M9 4.2V2.8h6v1.4" />
      <path d="M7.8 13.4h2.4l1.3-2.8 1.6 5 1.2-2.2h1.9" />
    </>
  ),
  rehab: (
    <>
      <path d="M20.4 12a8.4 8.4 0 10-3 6.4" />
      <path d="M20.6 19.4v-4.6H16" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  neuro: (
    <>
      <path d="M12 4.2c-3.4 0-6 2.4-6 5.4 0 1.3.4 2.3 1.1 3.2-.5.8-.8 1.7-.8 2.7 0 2.6 2.3 4.5 5.7 4.5" />
      <path d="M12 4.2c3.4 0 6 2.4 6 5.4 0 1.3-.4 2.3-1.1 3.2.5.8.8 1.7.8 2.7 0 2.6-2.3 4.5-5.7 4.5" />
      <path d="M12 4.6V19.8" opacity="0.45" />
    </>
  ),
  biotech: (
    <>
      <path d="M8 3c0 6 8 6 8 12 0 3.2-1.6 5.6-4 6" />
      <path d="M16 3c0 6-8 6-8 12 0 3.2 1.6 5.6 4 6" />
      <path d="M8.9 7.6h6.2M7.6 12.4h8.8M9.2 17.2h5.6" opacity="0.6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.4l8.4 4.3-8.4 4.3-8.4-4.3z" />
      <path d="M3.6 12.2l8.4 4.3 8.4-4.3" />
      <path d="M3.6 16.4l8.4 4.3 8.4-4.3" opacity="0.5" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4.4c3.6-1.6 7.2 1.6 10.8 0V14c-3.6 1.6-7.2-1.6-10.8 0" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <ellipse cx="12" cy="12" rx="9.4" ry="4.2" transform="rotate(-24 12 12)" />
      <circle cx="19.6" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.4C10.2 5 7.6 4.4 4 4.6v13.6c3.6-.2 6.2.4 8 1.8 1.8-1.4 4.4-2 8-1.8V4.6c-3.6-.2-6.2.4-8 1.8z" />
      <path d="M12 6.4V20" opacity="0.5" />
    </>
  ),
  external: (
    <>
      <path d="M13.6 4H20v6.4M20 4l-8.6 8.6" />
      <path d="M18 14.4V19a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h4.6" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21c-3.9 0-6.6-2.7-6.6-6.3 0-3.4 2.4-5.4 3.8-7.6.9 1.4 1.4 2.6 1.5 3.9C12.4 9.2 13 6.4 12.4 3c3.6 2.2 6.2 6.2 6.2 11.2 0 4-2.8 6.8-6.6 6.8z" />
      <path d="M12 21c-1.6 0-2.8-1.2-2.8-2.8 0-1.7 1.4-2.6 2.2-4 .9 1 2.4 2.4 2.4 4.1 0 1.5-.8 2.7-1.8 2.7z" opacity="0.6" />
    </>
  ),
  arrow: <path d="M4 12h14.4M13 6.2l6 5.8-6 5.8" />,
  check: <path d="M4.4 12.6l5.2 5.2L19.6 7" />,
}

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

/**
 * Deterministic EEG-like trace. Coordinates are rounded so the server and the
 * client serialize identical attribute strings (avoids hydration mismatches).
 */
function wavePath(seed: number, width: number, mid: number, amp: number, steps = 72) {
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const t = (i / steps) * Math.PI * 2
    const y =
      mid +
      amp *
        (Math.sin(t * 3 + seed) * 0.52 +
          Math.sin(t * 7.3 + seed * 1.7) * 0.29 +
          Math.sin(t * 13.1 + seed * 2.9) * 0.19)
    d += `${i === 0 ? 'M' : ' L'}${x.toFixed(2)},${y.toFixed(2)}`
  }
  return d
}

/** Small inline EEG sparkline used along the longitudinal timeline. */
function Sparkline({ seed, amp, color, width = 180, height = 44 }: {
  seed: number; amp: number; color: string; width?: number; height?: number
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={wavePath(seed, width, height / 2, amp)}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="trace"
      />
    </svg>
  )
}

/** Ambient neural field used behind light sections. */
function AmbientNeural({ opacity = 0.5 }: { opacity?: number }) {
  const nodes = [
    [40, 70], [120, 130], [96, 236], [188, 58], [206, 186], [176, 292],
    [280, 120], [296, 248], [368, 66], [382, 190], [356, 300],
    [462, 132], [470, 254], [548, 78], [560, 196], [532, 296],
    [640, 124], [656, 242], [726, 74], [740, 188],
  ] as const
  const edges = [
    [0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7],
    [6, 8], [6, 9], [7, 9], [7, 10], [9, 11], [10, 12], [11, 13], [11, 14],
    [12, 14], [12, 15], [14, 16], [14, 17], [15, 17], [16, 18], [16, 19], [17, 19],
  ] as const

  return (
    <svg
      viewBox="0 0 780 360"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      aria-hidden="true"
      focusable="false"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={i % 3 === 0 ? '#8574cd' : i % 3 === 1 ? '#6c8ad4' : '#b1728f'}
          strokeWidth="1"
          className="edge-breathe"
          style={{ animationDelay: `${(i * 0.31) % 6}s` }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 4.2 : 2.8}
          fill={i % 3 === 0 ? '#8574cd' : i % 3 === 1 ? '#6c8ad4' : '#c48ba6'}
          className="node-pulse"
          style={{ animationDelay: `${(i * 0.37) % 4.2}s` }}
        />
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Hero visual — abstract wearable EEG concept + neural activity
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroVisual() {
  const cluster = [
    [452, 96], [516, 66], [576, 104],
    [446, 162], [512, 148], [580, 176],
    [458, 228], [520, 232], [574, 254],
  ] as const
  const clusterEdges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
    [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [0, 4], [4, 8],
  ] as const
  const contacts = [
    [286, 150], [318, 133], [350, 118],
  ] as const

  return (
    <div className="relative">
      <div className="card-glass relative overflow-hidden" style={{ padding: '22px 20px 18px' }}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="chip chip-dot">Wearable neural sensing</span>
          <span className="mono-label" style={{ fontSize: 10.5 }}>Research use only</span>
        </div>

        <svg viewBox="0 0 640 330" className="w-full" role="img" aria-label="Abstract illustration of a wearable EEG device streaming neural signals into a connectivity network">
          <defs>
            <linearGradient id="hv-frame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b3183" />
              <stop offset="100%" stopColor="#8574cd" />
            </linearGradient>
            <linearGradient id="hv-signal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8574cd" stopOpacity="0" />
              <stop offset="22%" stopColor="#8574cd" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6c8ad4" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="hv-signal-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b1728f" stopOpacity="0" />
              <stop offset="26%" stopColor="#b1728f" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#8574cd" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="hv-lens" cx="35%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#e9e4f8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#cdd8f0" stopOpacity="0.55" />
            </radialGradient>
            <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8574cd" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#8574cd" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="200" cy="168" rx="180" ry="120" fill="url(#hv-glow)" />
          <circle
            cx="516"
            cy="162"
            r="126"
            fill="none"
            stroke="#8574cd"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="3 9"
            className="spin-slow"
          />

          {/* Wearable frame — abstract temple-based sensing device */}
          <g className="bob">
            <path
              d="M96 138c-14-4-26-10-38-19"
              stroke="url(#hv-frame)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
            />
            <rect x="96" y="112" width="96" height="74" rx="30" fill="url(#hv-lens)" stroke="url(#hv-frame)" strokeWidth="3" />
            <rect x="204" y="112" width="96" height="74" rx="30" fill="url(#hv-lens)" stroke="url(#hv-frame)" strokeWidth="3" />
            <path d="M192 140h12" stroke="url(#hv-frame)" strokeWidth="3" strokeLinecap="round" />
            <path d="M300 142c26-6 48-20 70-40" stroke="url(#hv-frame)" strokeWidth="3" strokeLinecap="round" fill="none" />
            {contacts.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="9" fill="#8574cd" fillOpacity="0.2" className="halo" style={{ animationDelay: `${i * 1.1}s` }} />
                <circle cx={x} cy={y} r="4.6" fill="#5a4cb0" className="node-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
              </g>
            ))}
          </g>

          {/* Signals flowing from the device into the network */}
          <path d="M372 104c36-10 44 6 76-6" stroke="url(#hv-signal)" strokeWidth="1.8" fill="none" className="trace" />
          <path d="M372 104c34 12 42 34 72 46" stroke="url(#hv-signal-2)" strokeWidth="1.6" fill="none" className="trace" style={{ animationDelay: '0.25s' }} />
          <path d="M372 104c20 44 38 88 82 122" stroke="url(#hv-signal)" strokeWidth="1.3" fill="none" className="trace" style={{ animationDelay: '0.5s' }} />

          {/* Connectivity cluster */}
          {clusterEdges.map(([a, b], i) => (
            <line
              key={i}
              x1={cluster[a][0]}
              y1={cluster[a][1]}
              x2={cluster[b][0]}
              y2={cluster[b][1]}
              stroke={i % 2 === 0 ? '#8574cd' : '#6c8ad4'}
              strokeWidth="1.1"
              className="edge-breathe"
              style={{ animationDelay: `${(i * 0.4) % 5}s` }}
            />
          ))}
          {cluster.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 6.4 : 4.4}
              fill={i % 3 === 0 ? '#5a4cb0' : i % 3 === 1 ? '#6c8ad4' : '#b1728f'}
              className="node-pulse"
              style={{ animationDelay: `${(i * 0.42) % 4}s` }}
            />
          ))}

          {/* Channel traces */}
          {[
            { label: 'FRONTAL', seed: 0.6, y: 268, color: '#5a4cb0' },
            { label: 'CENTRAL', seed: 2.1, y: 292, color: '#6c8ad4' },
            { label: 'OCCIPITAL', seed: 3.7, y: 316, color: '#b1728f' },
          ].map((row, i) => (
            <g key={row.label}>
              <text x="0" y={row.y + 3.5} fill="#79738c" fontSize="9" fontFamily="IBM Plex Mono, monospace" letterSpacing="1">
                {row.label}
              </text>
              <path
                d={wavePath(row.seed, 540, row.y, 9)}
                transform="translate(80 0)"
                fill="none"
                stroke={row.color}
                strokeWidth="1.4"
                strokeLinecap="round"
                className="trace"
                style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Offset satellite card — asymmetry + longitudinal cue. Only in the
          two-column hero, where it has room to hang off the visual. */}
      <div
        className="card card-glass absolute hidden lg:block"
        style={{ left: '-26px', bottom: '-34px', width: 214, padding: '14px 16px', borderRadius: 22 }}
      >
        <div className="mono-label" style={{ fontSize: 10 }}>Session 04 · repeat visit</div>
        <div className="h-mini" style={{ marginTop: 4, marginBottom: 2 }}>Change over time</div>
        <Sparkline seed={4.3} amp={13} color="#8574cd" height={34} />
        <div className="body-dim" style={{ fontSize: 12, lineHeight: 1.4 }}>
          Illustrative research view
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   NeuroViu AI — layered neural graph with gentle focus cycling
   ═══════════════════════════════════════════════════════════════════════════ */

const GRAPH_LAYERS = [
  { label: 'Signal', x: 74, ys: [70, 136, 202, 268] },
  { label: 'Features', x: 206, ys: [52, 118, 184, 250, 300] },
  { label: 'Connectivity', x: 338, ys: [86, 152, 218, 284] },
  { label: 'Model', x: 462, ys: [120, 196, 262] },
] as const

function NeuralGraph() {
  const [active, setActive] = useState(1)
  const paused = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (!paused.current) setActive(a => (a + 1) % GRAPH_LAYERS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  const edges: { x1: number; y1: number; x2: number; y2: number; layer: number }[] = []
  GRAPH_LAYERS.forEach((layer, li) => {
    const next = GRAPH_LAYERS[li + 1]
    if (!next) return
    layer.ys.forEach((y1, i) => {
      next.ys.forEach((y2, j) => {
        if ((i + j) % 2 === 0 || Math.abs(i - j) < 2) {
          edges.push({ x1: layer.x, y1, x2: next.x, y2, layer: li })
        }
      })
    })
  })

  return (
    <div
      className="card-ink relative overflow-hidden h-full"
      style={{ padding: '26px 22px' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="mono-label">Layered analysis graph</span>
        <span className="mono-label" style={{ color: '#b7a9e4' }}>
          {GRAPH_LAYERS[active].label}
        </span>
      </div>

      <svg viewBox="0 0 536 340" className="w-full" aria-hidden="true" focusable="false">
        {edges.map((e, i) => {
          const on = e.layer === active || e.layer === active - 1
          return (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={on ? '#b7a9e4' : '#ffffff'}
              strokeOpacity={on ? 0.5 : 0.11}
              strokeWidth={on ? 1.2 : 0.8}
              style={{ transition: 'stroke-opacity 0.8s ease, stroke 0.8s ease' }}
            />
          )
        })}
        {GRAPH_LAYERS.map((layer, li) => (
          <g key={layer.label}>
            {layer.ys.map((y, i) => {
              const on = li === active
              return (
                <circle
                  key={i}
                  cx={layer.x}
                  cy={y}
                  r={on ? 7 : 5}
                  fill={on ? '#ffffff' : '#b7a9e4'}
                  fillOpacity={on ? 1 : 0.45}
                  style={{ transition: 'r 0.7s ease, fill-opacity 0.7s ease' }}
                />
              )
            })}
            <text
              x={layer.x}
              y={324}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="10"
              letterSpacing="1"
              fill={li === active ? '#e8e3f5' : '#9a92bd'}
            >
              {layer.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      <p className="body-dim" style={{ fontSize: 13, marginTop: 10 }}>
        Schematic view of how NeuroViu moves from raw signal to research models. Illustrative, not output from a study.
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Section scaffolding
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionHead({ eyebrow, title, sub, align = 'left', id }: {
  eyebrow: string
  title: React.ReactNode
  sub?: React.ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <div
      className={align === 'center' ? 'text-center mx-auto' : ''}
      style={{ maxWidth: align === 'center' ? 760 : 820 }}
      data-reveal
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="h-section" style={{ marginTop: 18 }}>
        {title}
      </h2>
      {sub && (
        <p className="lede" style={{ marginTop: 20 }}>
          {sub}
        </p>
      )}
    </div>
  )
}

type NavLink = { label: string; href: string }

/* An entry with `children` renders as a disclosure menu on desktop and as a
   labeled group in the mobile sheet. */
const NAV_ITEMS: (NavLink & { children?: NavLink[] })[] = [
  { label: 'Technology', href: '#technology' },
  { label: 'Research', href: '#research' },
  { label: 'Platform', href: '#platform' },
  { label: 'About', href: '#about' },
  {
    label: 'Initiatives',
    href: '/shes-a-flame',
    children: [
      { label: 'She’s a Flame Conference', href: '/shes-a-flame' },
      { label: 'Art + Research', href: '/art-research' },
      { label: 'Lipstick on Labcoats Podcast', href: '#podcast' },
      { label: 'Special Projects', href: '#founder-research' },
    ],
  },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '#contact' },
]

function NavMenu({ item }: { item: NavLink & { children: NavLink[] } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="nav-menu"
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        type="button"
        className="nav-link nav-menu-trigger"
        aria-expanded={open}
        aria-controls="nav-menu-initiatives"
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="nav-menu-list" id="nav-menu-initiatives">
          {item.children.map(child => (
            <li key={child.href}>
              <a className="nav-menu-item" href={child.href} onClick={() => setOpen(false)}>
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`topbar ${solid || open ? 'topbar-solid' : ''}`}>
      <nav className="shell flex items-center justify-between" style={{ height: 76 }} aria-label="Primary">
        <a href="#top" style={{ textDecoration: 'none' }} aria-label="NeuroViu — home">
          <Wordmark />
        </a>

        <div className="hidden lg:flex items-center" style={{ gap: 'clamp(16px, 1.9vw, 34px)' }}>
          {NAV_ITEMS.map(item =>
            item.children ? (
              <NavMenu key={item.label} item={{ ...item, children: item.children }} />
            ) : (
              <a key={item.label} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden lg:block">
          <a className="btn btn-primary btn-sm" href="#contact">
            Research With Us
          </a>
        </div>

        <button
          type="button"
          className="burger lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className="mobile-sheet lg:hidden" id="mobile-menu">
          <div className="shell" style={{ paddingBottom: 26, paddingTop: 6 }}>
            {NAV_ITEMS.map(item =>
              item.children ? (
                <div key={item.label} className="mobile-group">
                  <div className="mono-label mobile-group-label">{item.label}</div>
                  {item.children.map(child => (
                    <a key={child.href} className="mobile-item mobile-subitem" href={child.href} onClick={() => setOpen(false)}>
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a key={item.label} className="mobile-item" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ),
            )}
            <a
              className="btn btn-primary"
              href="#contact"
              style={{ width: '100%', marginTop: 22 }}
              onClick={() => setOpen(false)}
            >
              Research With Us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Content
   ═══════════════════════════════════════════════════════════════════════════ */

const PILLARS: { icon: IconName; label: string; note: string }[] = [
  { icon: 'compact', label: 'Wearable EEG', note: 'Neural sensing you can take to the participant' },
  { icon: 'metrics', label: 'Quantitative Neural Analytics', note: 'Spectral, time-frequency, and connectivity measures' },
  { icon: 'spark', label: 'AI & Machine Learning', note: 'Research models over structured neural features' },
  { icon: 'timeline', label: 'Longitudinal Brain Research', note: 'Repeated sessions, studied as a trajectory' },
]

const APPROACH: { icon: IconName; step: string; title: string; body: string }[] = [
  {
    icon: 'measure',
    step: '01',
    title: 'Measure',
    body: 'Capture wearable EEG signals.',
  },
  {
    icon: 'analyze',
    step: '02',
    title: 'Analyze',
    body: 'Transform neural signals into quantitative features and connectivity measures.',
  },
  {
    icon: 'track',
    step: '03',
    title: 'Track',
    body: 'Study how brain activity changes over time.',
  },
]

type ResearchArea = {
  key: string
  title: React.ReactNode
  body: string
  topics: string[]
  cta: string
  interest: string
  accent: string
  tint: string
  icon: IconName
}

const AREAS: ResearchArea[] = [
  {
    key: 'tbi',
    title: 'Traumatic Brain Injury',
    body: 'Investigating neural changes associated with traumatic brain injury and recovery through wearable EEG and quantitative neural analytics.',
    topics: ['Mild TBI and concussion', 'Recovery', 'Cognitive changes', 'Neural connectivity', 'Rehabilitation research', 'Longitudinal monitoring'],
    cta: 'Explore TBI Research',
    interest: 'tbi-research',
    accent: '#3b3183',
    tint: 'rgba(59, 49, 131, 0.07)',
    icon: 'wave',
  },
  {
    key: 'aging',
    title: <>Cognitive Aging <span className="amp">&amp;</span> MCI</>,
    body: 'Studying neural patterns associated with healthy aging, mild cognitive impairment, memory, attention, and changes in cognitive function.',
    topics: ['Healthy aging', 'Mild cognitive impairment', 'Memory', 'Attention', 'Executive function', 'Longitudinal cognitive research'],
    cta: 'Explore Cognitive Aging',
    interest: 'cognitive-aging',
    accent: '#6a59bd',
    tint: 'rgba(133, 116, 205, 0.09)',
    icon: 'cognition',
  },
  {
    key: 'alzheimers',
    title: "Alzheimer's Research",
    body: "Investigating EEG-derived biomarkers and neural connectivity patterns associated with Alzheimer's disease and neurodegeneration.",
    topics: ['EEG biomarkers', 'Neural connectivity', 'Cognitive decline', 'Disease progression research', 'AI-assisted biomarker discovery', 'EEG + MRI research'],
    cta: "Explore Alzheimer's Research",
    interest: 'alzheimers-research',
    accent: '#a2637f',
    tint: 'rgba(177, 114, 143, 0.08)',
    icon: 'connectivity',
  },
]

const PIPELINE: { icon: IconName; title: string; body: string }[] = [
  { icon: 'compact', title: 'Wearable EEG', body: 'Neural signals captured with a compact wearable device.' },
  { icon: 'wave', title: 'Signal Processing', body: 'Filtering, artifact handling, and signal quality control.' },
  { icon: 'metrics', title: 'Quantitative EEG', body: 'Spectral and time-frequency features derived from the recording.' },
  { icon: 'connectivity', title: 'Neural Connectivity', body: 'Relationships between brain regions and neural networks.' },
  { icon: 'spark', title: 'AI / Machine Learning', body: 'Research models for classification, prediction, and representation learning.' },
  { icon: 'timeline', title: 'Longitudinal Analysis', body: 'Comparison of measures across repeated research sessions.' },
]

const LITE_FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'compact', title: 'Wearable', body: 'Compact form factor designed for flexible data collection.' },
  { icon: 'wave', title: 'EEG', body: 'Captures electrical activity from the brain.' },
  { icon: 'wireless', title: 'Wireless', body: 'Designed for wireless data transmission.' },
  { icon: 'lab', title: 'Research Ready', body: 'Built around research workflows and quantitative analysis.' },
]

const AI_FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'wave', title: 'Signal Analytics', body: 'EEG preprocessing, artifact handling, spectral and time-frequency analysis.' },
  { icon: 'connectivity', title: 'Connectivity', body: 'Explore relationships between brain regions and neural networks.' },
  { icon: 'spark', title: 'Machine Learning', body: 'Develop research models for classification, prediction, and representation learning.' },
  { icon: 'explain', title: 'Explainable AI', body: 'Explore which neural features contribute to model outputs.' },
]

const MODALITIES: { icon: IconName; label: string; note: string }[] = [
  { icon: 'wave', label: 'EEG', note: 'Electrical activity over time' },
  { icon: 'mri', label: 'MRI', note: 'Structural context' },
  { icon: 'cognition', label: 'Cognitive Data', note: 'Behavioral and cognitive measures' },
  { icon: 'spark', label: 'AI', note: 'Pattern analysis across modalities' },
]

const SESSIONS = [
  { label: 'Session 01', note: 'Baseline recording', seed: 0.9, amp: 11, color: '#6c8ad4' },
  { label: 'Session 02', note: 'Repeat visit', seed: 2.4, amp: 13.5, color: '#7b6ac6' },
  { label: 'Session 03', note: 'Repeat visit', seed: 4.1, amp: 9.5, color: '#8574cd' },
  { label: 'Session 04', note: 'Repeat visit', seed: 5.8, amp: 15, color: '#a2637f' },
]

const WORKFLOW: { n: string; icon: IconName; title: string; body: string }[] = [
  { n: '01', icon: 'flag', title: 'Study', body: 'Research protocol and participant organization.' },
  { n: '02', icon: 'compact', title: 'Capture', body: 'Wearable EEG data collection.' },
  { n: '03', icon: 'layers', title: 'Process', body: 'Signal quality control and preprocessing.' },
  { n: '04', icon: 'metrics', title: 'Analyze', body: 'Quantitative EEG and connectivity analysis.' },
  { n: '05', icon: 'spark', title: 'Model', body: 'Statistical and machine-learning analysis.' },
  { n: '06', icon: 'timeline', title: 'Track', body: 'Longitudinal comparison and visualization.' },
]

const PARTNER_TYPES: { icon: IconName; label: string }[] = [
  { icon: 'campus', label: 'Universities' },
  { icon: 'lab', label: 'Research Laboratories' },
  { icon: 'clinical', label: 'Clinical Research Teams' },
  { icon: 'rehab', label: 'Rehabilitation Research' },
  { icon: 'neuro', label: 'Neuroscience Programs' },
  { icon: 'biotech', label: 'Biotech & Pharmaceutical Research' },
]

type Publication = {
  title: string
  area: string
  abstract: string
  status: string
  statusColor: string
  available: boolean
}

/* Only work already documented in this project is listed. Status labels state
   exactly where each item stands — nothing here is presented as peer reviewed. */
const PUBLICATIONS: Publication[] = [
  {
    title: 'Advancing TBI Monitoring Through Quantitative EEG and AI',
    area: 'Traumatic Brain Injury',
    abstract: 'Surveys quantitative EEG features and machine-learning approaches under investigation for characterizing changes in brain function associated with traumatic brain injury.',
    status: 'Manuscript in preparation',
    statusColor: '#6a59bd',
    available: true,
  },
  {
    title: 'Advanced EEG Signal Processing for Functional Brain Connectivity Estimation',
    area: 'Connectivity · Signal Processing',
    abstract: 'Describes signal-processing methods under development for estimating functional connectivity between brain regions from wearable EEG recordings, including artifact handling and channel-reduction tradeoffs.',
    status: 'Research project · ongoing',
    statusColor: '#3b3183',
    available: true,
  },
  {
    title: 'Foundations for Real-Time Neural Analytics in Wearable Research Systems',
    area: 'Wearable Systems',
    abstract: 'Outlines the signal-processing and system-architecture constraints involved in delivering neural analytics from a wearable, dry-electrode EEG platform outside the traditional laboratory.',
    status: 'Technical paper',
    statusColor: '#a2637f',
    available: true,
  },
  {
    title: 'Reserved for upcoming work in cognitive aging and neurodegeneration',
    area: 'Cognitive Aging · Alzheimer’s',
    abstract: 'Placeholder. Studies in these areas are in early development; entries will appear here as work is written up, with its status labeled honestly.',
    status: 'Placeholder',
    statusColor: '#79738c',
    available: false,
  },
]

/* Founder research & special projects. These are projects involving NeuroViu's
   founder that sit outside NeuroViu's own product program — each entry says how
   she was involved, and nothing here implies an organization partners with NeuroViu.
   Entries flagged `placeholder` are category slots awaiting real project details. */
type ProjectFilter = 'neuroscience' | 'ai' | 'space' | 'publications' | 'special'

const PROJECT_FILTERS: { value: 'all' | ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'neuroscience', label: 'Neuroscience' },
  { value: 'ai', label: 'AI' },
  { value: 'space', label: 'Space & Human Performance' },
  { value: 'publications', label: 'Publications' },
  { value: 'special', label: 'Special Projects' },
]

type ProjectStatus = 'Research' | 'Challenge' | 'Publication' | 'In Progress' | 'Submitted' | 'Completed' | 'NeuroViu Initiative'

const PROJECT_STATUS_COLOR: Record<ProjectStatus, string> = {
  Research: '#3b3183',
  Challenge: '#4f6fc0',
  Publication: '#a2637f',
  'In Progress': '#6a59bd',
  Submitted: '#5a4cb0',
  Completed: '#3f7a68',
  'NeuroViu Initiative': '#b4583f',
}

type FounderProject = {
  title: string
  org: string
  year: string
  area: string
  description: string
  status: ProjectStatus
  involvement: string
  icon: IconName
  filters: ProjectFilter[]
  link?: { href: string; label?: string }
  image?: { src: string; alt: string; width: number; height: number }
  placeholder?: boolean
}

const FOUNDER_PROJECTS: FounderProject[] = [
  {
    title: 'She’s a Flame Women’s Health Conference',
    org: 'Presented by NeuroViu™',
    year: 'Date TBA',
    area: 'Women’s Health · Brain Health · Community',
    description: 'A women-centered health and wellness conference hosted by NeuroViu, bringing together researchers, practitioners, innovators, and community voices for accessible conversations on brain health, women’s health, health technology, and evidence-informed wellness.',
    status: 'NeuroViu Initiative',
    involvement: 'Official NeuroViu initiative',
    icon: 'flame',
    filters: ['special'],
    link: { href: '/shes-a-flame', label: 'View conference' },
  },
  {
    title: 'NASA Artemis II Human Research Data Methodology Challenge',
    org: 'NASA',
    year: '2026',
    area: 'Spaceflight Human Research · Data Science',
    description: 'Participation in a research methodology challenge centered on extracting meaningful scientific insight from the exceptionally small Artemis II crew sample. The challenge explores approaches for analyzing multimodal physiological and human-performance data across multiple systems and time points in a four-person deep-space mission context.',
    status: 'Challenge',
    involvement: 'Challenge participation',
    icon: 'orbit',
    filters: ['space', 'ai', 'special'],
  },
  {
    title: 'Wearable EEG & AI Research',
    org: 'Independent & academic research',
    year: 'Ongoing',
    area: 'Neuroscience · Artificial Intelligence',
    description: 'Research exploring quantitative EEG, artificial intelligence, neural signal processing, cognitive performance, and accessible approaches to brain-health research.',
    status: 'Research',
    involvement: 'Research conducted by the founder',
    icon: 'wave',
    filters: ['neuroscience', 'ai'],
    placeholder: true,
  },
  {
    title: 'Scientific Publications & Book Chapters',
    org: 'Academic publishing',
    year: 'Ongoing',
    area: 'Scholarly Work',
    description: 'Peer-reviewed manuscripts, academic book chapters, literature reviews, and other scholarly work spanning wearable neurotechnology, computational neuroscience, AI, and brain health.',
    status: 'Publication',
    involvement: 'Academic work',
    icon: 'book',
    filters: ['publications', 'neuroscience', 'ai'],
    placeholder: true,
  },
  {
    title: 'Human Performance Research',
    org: 'Independent research',
    year: 'Ongoing',
    area: 'Cognition · Human Performance',
    description: 'Projects examining cognition, attention, workload, fatigue, neurodiversity, and human performance using neuroscience and computational methods.',
    status: 'In Progress',
    involvement: 'Independent research',
    icon: 'cognition',
    filters: ['space', 'neuroscience'],
    placeholder: true,
  },
  {
    title: 'Emerging Research & Innovation',
    org: 'Challenges, fellowships & collaborations',
    year: 'Ongoing',
    area: 'Special Projects',
    description: 'A flexible category for research challenges, fellowships, collaborative projects, open-science initiatives, and experimental work outside NeuroViu’s primary product-development program.',
    status: 'Research',
    involvement: 'External & independent work',
    icon: 'spark',
    filters: ['special'],
    placeholder: true,
  },
]

const FOUNDER_DISCLAIMER =
  'Projects listed in this section may represent independent research, challenge participation, academic work, or external collaborations involving NeuroViu’s founder. Inclusion does not imply sponsorship, endorsement, partnership, or affiliation between NeuroViu and the organizations named unless explicitly stated.'

const TEAM: { label: string; body: string }[] = [
  { label: 'Research Psychology', body: 'Cognitive science expertise shaping study design and human-subject research protocols.' },
  { label: 'Engineering', body: 'Wearable hardware, firmware, and signal-acquisition systems design.' },
  { label: 'Finance & Operations', body: 'Company operations, research budgeting, and partnership logistics.' },
  { label: 'Media & Communications', body: 'Scientific communication, research storytelling, and public engagement.' },
  { label: 'Scientific Collaborators', body: 'Affiliated researchers across neuroscience, neural signal analysis, and AI.' },
]

const INQUIRY_OPTIONS = [
  { value: 'research-collaboration', label: 'Research Collaboration' },
  { value: 'tbi-research', label: 'TBI Research' },
  { value: 'cognitive-aging', label: 'Cognitive Aging & MCI' },
  { value: 'alzheimers-research', label: "Alzheimer's & Dementia Research" },
  { value: 'technology-partnerships', label: 'Technology Partnerships' },
  { value: 'academic-collaboration', label: 'Academic Collaboration' },
  { value: 'media-speaking', label: 'Media & Speaking' },
  { value: 'other', label: 'Other' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Founder Research & Special Projects — filterable research portfolio
   ═══════════════════════════════════════════════════════════════════════════ */

function FounderProjects({ onAsk }: { onAsk: () => void }) {
  const [filter, setFilter] = useState<'all' | ProjectFilter>('all')
  const shown = FOUNDER_PROJECTS.filter(p => filter === 'all' || p.filters.includes(filter)).length
  const activeLabel = PROJECT_FILTERS.find(f => f.value === filter)?.label ?? 'All'

  return (
    <section id="founder-research" className="section panel-sky relative overflow-hidden" aria-labelledby="founder-title">
      <div className="aura aura-violet drift-slow" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.5 }} aria-hidden="true" />
      <div className="aura aura-rose drift" style={{ width: 380, height: 380, bottom: -140, left: -160, opacity: 0.45 }} aria-hidden="true" />
      <div className="shell relative">
        <div className="fp-head">
          <div data-reveal>
            <span className="eyebrow">Founder Research</span>
            <h2 id="founder-title" className="h-section" style={{ marginTop: 18 }}>
              Founder Research <span className="amp">&amp;</span> <span className="italic-accent">Special Projects</span>
            </h2>
            <p className="fp-subtitle">Beyond NeuroViu: Research, Innovation &amp; Scientific Exploration</p>
          </div>
          <p className="lede" style={{ margin: 0 }} data-reveal>
            Beyond her work developing NeuroViu, Dr. Ashlei Lewis participates in interdisciplinary research,
            scientific challenges, academic publishing, and emerging technology initiatives spanning neuroscience,
            artificial intelligence, human performance, brain health, and space-related research.
          </p>
        </div>

        <div className="fp-toolbar" data-reveal>
          <div className="fp-filters" role="group" aria-label="Filter founder projects by category">
            {PROJECT_FILTERS.map(f => (
              <button
                key={f.value}
                type="button"
                className="fp-filter"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="mono-label" aria-live="polite">
            {String(shown).padStart(2, '0')} / {String(FOUNDER_PROJECTS.length).padStart(2, '0')} · {activeLabel}
          </span>
        </div>

        <ul className="fp-grid">
          {FOUNDER_PROJECTS.map((p, i) => {
            const visible = filter === 'all' || p.filters.includes(filter)
            const color = PROJECT_STATUS_COLOR[p.status]
            return (
              <li key={p.title} className={visible ? '' : 'fp-hidden'} style={rd((i % 3) * 90)} data-reveal>
                <article
                  className={`card card-lift fp-card ${p.placeholder ? 'fp-card-placeholder' : ''}`}
                  style={{ '--fp-accent': color } as unknown as React.CSSProperties}
                >
                  {p.image && (
                    <Photo className="fp-image" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} />
                  )}
                  <div className="flex items-start justify-between" style={{ gap: 12 }}>
                    <span className="icon-tile" style={{ width: 42, height: 42, borderRadius: 13 }}>
                      <Icon name={p.icon} size={20} />
                    </span>
                    <span
                      className="status-pill"
                      style={{ background: `${color}14`, border: `1px solid ${color}38`, color }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <span className="mono-label" style={{ display: 'block', color: 'var(--indigo-soft)', marginTop: 20 }}>{p.area}</span>
                  <h3 className="h-card" style={{ fontSize: 21, marginTop: 10 }}>{p.title}</h3>
                  <div className="fp-meta">
                    <span>{p.org}</span>
                    <span aria-hidden="true" className="fp-meta-dot" />
                    <span>{p.year}</span>
                  </div>
                  <p className="body-muted" style={{ fontSize: 15, marginTop: 14, flex: 1 }}>{p.description}</p>
                  <div className="fp-foot">
                    <span className="mono-label">{p.involvement}</span>
                    {p.link?.href.startsWith('/') ? (
                      <a className="link-arrow" href={p.link.href}>
                        {p.link.label ?? 'View project'}
                        <Icon name="arrow" size={15} />
                      </a>
                    ) : p.link ? (
                      <a className="link-arrow" href={p.link.href} target="_blank" rel="noopener noreferrer">
                        {p.link.label ?? 'View project'}
                        <Icon name="external" size={15} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : p.placeholder ? (
                      <span className="mono-label" style={{ color: 'var(--ink-3)' }}>Details forthcoming</span>
                    ) : null}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <div className="fp-cta" data-reveal>
          <div>
            <div className="h-mini" style={{ fontSize: 18 }}>Explore the Research</div>
            <p className="body-muted" style={{ fontSize: 15, marginTop: 6, maxWidth: '58ch' }}>
              See NeuroViu’s own publications and research projects, or reach out to discuss academic work and
              scientific collaboration.
            </p>
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: 18 }}>
            <a className="btn btn-quiet btn-sm" href="#publications">
              Explore the Research
              <Icon name="arrow" size={16} />
            </a>
            <a className="link-arrow" href="#contact" onClick={onAsk}>
              Get in touch
              <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>

        <p className="fp-disclaimer" data-reveal>
          <span className="mono-label">Note on affiliation</span>
          {FOUNDER_DISCLAIMER}
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Lipstick on Labcoats — NeuroViu Network podcast
   ═══════════════════════════════════════════════════════════════════════════ */

/* Spotify and Apple Podcasts are the show's verified listings. The show isn't
   indexed on iHeartRadio yet, so that button opens iHeart's search for the
   title; "More platforms" is the show's Spotify for Creators profile, which
   carries the public RSS feed for every other podcast app. */
const PODCAST_PLATFORMS: { label: string; href: string; glyph: React.ReactNode }[] = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/73BCUgTxF6w6GRSwYtKemT',
    glyph: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M7 9.6c3.4-1 7-.7 10 .9M7.6 12.6c2.8-.8 5.6-.5 8 .8M8.3 15.4c2.1-.5 4.2-.3 6 .6" />
      </>
    ),
  },
  {
    label: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/us/podcast/lipstick-on-labcoats/id1504301804',
    glyph: (
      <>
        <circle cx="12" cy="9.6" r="2.4" />
        <path d="M12 13.6v6.4" />
        <path d="M7.4 15.2a6.5 6.5 0 1 1 9.2 0" />
      </>
    ),
  },
  {
    label: 'iHeartRadio',
    href: 'https://www.iheart.com/search/?q=Lipstick%20on%20Labcoats',
    glyph: <path d="M12 19.5s-7.5-4.4-7.5-9.6A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6z" />,
  },
  {
    label: 'More Platforms',
    href: 'https://creators.spotify.com/pod/profile/lipstickonlabcoats/',
    glyph: (
      <>
        <path d="M5 11a7 7 0 0 1 7 7M5 5.5A12.5 12.5 0 0 1 17.5 18" />
        <circle cx="6" cy="17" r="1.4" />
      </>
    ),
  },
]

function PodcastSection() {
  return (
    <section id="podcast" className="lol relative overflow-hidden" aria-labelledby="podcast-title">
      <div className="shell">
        <div className="lol-card" data-reveal>
          <div className="lol-media">
            <img
              className="lol-host"
              src="/media/lipstick-on-labcoats-host.jpg"
              alt="Ashlei Lewis in a white lab coat, smiling and holding a pink card that reads “Ashlei Lewis presents Lipstick on Labcoats.”"
              width={900}
              height={889}
              loading="lazy"
              decoding="async"
            />
            <img
              className="lol-logo"
              src="/media/lipstick-on-labcoats-logo.jpg"
              alt="Lipstick on Labcoats podcast logo: a brain inside a lab flask beside a lipstick"
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="lol-body">
            <span className="lol-label">A NeuroViu Network Original</span>
            <h2 id="podcast-title" className="lol-title">
              <span aria-hidden="true">💋 </span>Lipstick on Labcoats
            </h2>
            <p className="lol-tagline">Big Brains. Bold Questions. A Little Lipstick.</p>
            <p className="lol-copy">
              Explore science, neuroscience, psychology, philosophy, spirituality, and everyday life through
              meaningful conversations, humor, and curiosity — hosted by Ashlei Lewis.
            </p>

            <div className="lol-listen" id="podcast-listen">
              <span aria-hidden="true">🎙️ </span>Listen on Your Favorite Platform
            </div>
            <ul className="lol-platforms" aria-labelledby="podcast-listen">
              {PODCAST_PLATFORMS.map(p => (
                <li key={p.label}>
                  <a className="lol-platform" href={p.href} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {p.glyph}
                    </svg>
                    {p.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Contact — Netlify Forms (AJAX to the static skeleton at /__forms.html)
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactForm({ interest, setInterest }: { interest: string; setInterest: (v: string) => void }) {
  const [fields, setFields] = useState({ name: '', organization: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // GitHub Pages cannot process Netlify Forms. Never claim a submission succeeded.
    setStatus('error')
  }

  if (status === 'done') {
    return (
      <div className="card" style={{ padding: '44px 32px', textAlign: 'center' }} role="status">
        <span className="icon-tile" style={{ width: 56, height: 56, borderRadius: 18, marginBottom: 18 }}>
          <Icon name="check" size={26} />
        </span>
        <h3 className="h-card">Message received.</h3>
        <p className="body-muted" style={{ marginTop: 12, fontSize: 16 }}>
          Thank you for reaching out. Someone from NeuroViu will follow up about your research interest.
        </p>
      </div>
    )
  }

  return (
    <form
      name="research-inquiry"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card"
      style={{ padding: '30px 26px' }}
      aria-describedby="form-privacy"
    >
      <input type="hidden" name="form-name" value="research-inquiry" />
      <p style={{ position: 'absolute', left: -9999, top: 'auto' }} aria-hidden="true">
        <label>
          Do not fill this out
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <h3 className="h-card">Start a research conversation</h3>

      <div style={{ display: 'grid', gap: 18, marginTop: 24 }}>
        <div>
          <label className="field-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" className="field" type="text" name="name" autoComplete="name"
            placeholder="Dr. Lena Ostrowski" value={fields.name} onChange={set('name')} required />
        </div>
        <div>
          <label className="field-label" htmlFor="cf-org">Organization</label>
          <input id="cf-org" className="field" type="text" name="organization" autoComplete="organization"
            placeholder="University, laboratory, or company" value={fields.organization} onChange={set('organization')} />
        </div>
        <div>
          <label className="field-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" className="field" type="email" name="email" autoComplete="email"
            placeholder="you@institution.edu" value={fields.email} onChange={set('email')} required />
        </div>
        <div>
          <label className="field-label" htmlFor="interest">Area of interest</label>
          <select id="interest" className="field" name="interest" value={interest}
            onChange={e => setInterest(e.target.value)} required>
            <option value="" disabled>Select an area</option>
            {INQUIRY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="cf-message">Message</label>
          <textarea id="cf-message" className="field" name="message"
            placeholder="Tell us about your study, research question, or collaboration idea."
            value={fields.message} onChange={set('message')} required />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <svg className="spinner" width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.2" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                <path d="M14.2 8A6.2 6.2 0 008 1.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Sending
            </>
          ) : (
            <>
              Send inquiry
              <Icon name="arrow" size={18} />
            </>
          )}
        </button>

        {status === 'error' && (
          <p role="alert" style={{ color: '#a33d5c', fontSize: 14.5, margin: 0 }}>
            That did not go through. Please try again, or reach out through your usual NeuroViu contact.
          </p>
        )}

        <p id="form-privacy" className="body-dim" style={{ fontSize: 13, margin: 0 }}>
          By submitting, you agree to be contacted by NeuroViu about your inquiry.
        </p>
      </div>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */

function NeuroViuHome() {
  const [interest, setInterest] = useState('')

  /* Scroll-reveal. Elements start hidden only when JS is available (the `js`
     class is set in the document head), so no-JS visitors still see everything. */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const pickArea = (value: string) => () => setInterest(value)

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />

      <main id="main">
        {/* ─────────────── HERO ─────────────── */}
        <section id="top" className="section panel-ivory relative overflow-hidden" style={{ paddingTop: 128 }} aria-labelledby="hero-title">
          <div className="aura aura-violet drift" style={{ width: 620, height: 620, top: -220, right: -180 }} aria-hidden="true" />
          <div className="aura aura-blue drift-slow" style={{ width: 520, height: 520, top: 180, left: -220 }} aria-hidden="true" />
          <div className="aura aura-rose drift" style={{ width: 380, height: 380, bottom: -160, right: 120, opacity: 0.7 }} aria-hidden="true" />
          <div className="absolute inset-0" style={{ opacity: 0.55 }} aria-hidden="true">
            <AmbientNeural opacity={0.42} />
          </div>

          <div className="shell relative">
            <div className="hero-grid">
              <div>
                <span className="eyebrow" data-reveal>Wearable EEG · Brain health research</span>
                <h1 id="hero-title" className="h-hero" style={{ marginTop: 22 }} data-reveal>
                  See the brain.
                  <br />
                  <span className="italic-accent">Track the change.</span>
                </h1>
                <p className="lede measure" style={{ marginTop: 26, fontSize: 'clamp(18px, 1.6vw, 22px)' }} data-reveal>
                  Wearable EEG and AI-powered neurotechnology for the next generation of brain health research.
                </p>
                <p className="body-muted measure" style={{ marginTop: 18, fontSize: 16.5 }} data-reveal>
                  NeuroViu combines wearable neural sensing, quantitative EEG, neural connectivity analysis, and
                  artificial intelligence to help researchers investigate traumatic brain injury, cognitive decline,
                  dementia, and Alzheimer&rsquo;s disease.
                </p>
                <div className="hero-actions flex flex-wrap items-center" style={{ gap: 14, marginTop: 34 }} data-reveal>
                  <a className="btn btn-primary" href="#technology">
                    Explore the Technology
                    <Icon name="arrow" size={18} />
                  </a>
                  <a className="btn btn-quiet" href="#contact">Research With NeuroViu</a>
                </div>
                <div className="flex flex-wrap items-center" style={{ gap: 10, marginTop: 30 }} data-reveal>
                  <span className="chip">Research use only</span>
                  <span className="chip">Not a medical device</span>
                </div>
              </div>

              <div data-reveal style={rd(180)}>
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── POSITIONING STRIP ─────────────── */}
        <section className="panel-mist" style={{ paddingBlock: 40 }} aria-label="What NeuroViu builds">
          <div className="shell">
            <ul className="pillar-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {PILLARS.map((p, i) => (
                <li key={p.label} data-reveal style={rd(i * 90)}>
                  <span className="icon-tile" style={{ marginBottom: 14 }}>
                    <Icon name={p.icon} size={21} />
                  </span>
                  <div className="h-mini">{p.label}</div>
                  <p className="body-dim" style={{ fontSize: 14.5, marginTop: 6 }}>{p.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────── WHY NEUROVIU ─────────────── */}
        <section className="section panel-ivory relative overflow-hidden" aria-labelledby="why-title">
          <div className="aura aura-violet drift-slow" style={{ width: 440, height: 440, top: 60, left: -200, opacity: 0.6 }} aria-hidden="true" />
          <div className="shell relative">
            <div className="why-head">
              <SectionHead
                id="why-title"
                eyebrow="Why NeuroViu"
                title={<>A different way to <span className="italic-accent">study the brain.</span></>}
              />
              <p className="lede" style={{ maxWidth: 520 }} data-reveal>
                Brain changes don&rsquo;t always happen in a laboratory. NeuroViu is developing wearable technology that
                can help researchers capture and analyze neural signals across repeated sessions and real-world
                research environments.
              </p>
            </div>

            <div className="approach-grid">
              {APPROACH.map((a, i) => (
                <article
                  key={a.title}
                  className="card card-lift"
                  style={{ ...rd(i * 120), padding: '30px 28px' }}
                  data-reveal
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
                    <span className="icon-tile"><Icon name={a.icon} size={21} /></span>
                    <span className="mono-label" style={{ fontSize: 12 }}>{a.step}</span>
                  </div>
                  <h3 className="h-card">{a.title}</h3>
                  <p className="body-muted" style={{ marginTop: 12, fontSize: 16 }}>{a.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── RESEARCH AREAS ─────────────── */}
        <section id="research" className="section panel-mist relative overflow-hidden" aria-labelledby="research-title">
          <div className="shell relative">
            <SectionHead
              id="research-title"
              eyebrow="Research areas"
              title={<>Researching the <span className="italic-accent">changing brain</span></>}
              sub="NeuroViu is focused on three interconnected areas of brain health research."
            />

            <div className="area-grid" style={{ marginTop: 56 }}>
              {AREAS.map((area, i) => (
                <article
                  key={area.key}
                  className={`card card-lift area-card area-card-${i + 1}`}
                  style={{ ...rd(i * 110), padding: 0, overflow: 'hidden' }}
                  data-reveal
                >
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${area.accent}, ${area.accent}22)` }} aria-hidden="true" />
                  <div className="area-inner">
                    <div>
                      <span className="icon-tile" style={{ background: area.tint, borderColor: `${area.accent}2e`, color: area.accent }}>
                        <Icon name={area.icon} size={21} />
                      </span>
                      <h3 className="h-card" style={{ marginTop: 20 }}>{area.title}</h3>
                      <p className="body-muted" style={{ marginTop: 14, fontSize: 16, maxWidth: '46ch' }}>{area.body}</p>
                      <a
                        className="link-arrow"
                        href="#contact"
                        style={{ marginTop: 22, color: area.accent }}
                        onClick={pickArea(area.interest)}
                      >
                        {area.cta}
                        <Icon name="arrow" size={17} />
                      </a>
                    </div>
                    <div>
                      <div className="mono-label" style={{ marginBottom: 12 }}>Research topics</div>
                      <ul className="topic-list">
                        {area.topics.map(t => (
                          <li key={t}><span className="topic-tag">{t}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── TECHNOLOGY PIPELINE ─────────────── */}
        <section id="technology" className="section panel-ivory relative overflow-hidden" aria-labelledby="tech-title">
          <div className="aura aura-blue drift" style={{ width: 520, height: 520, bottom: -200, right: -180, opacity: 0.6 }} aria-hidden="true" />
          <div className="shell relative tech-grid">
            <div>
              <SectionHead
                id="tech-title"
                eyebrow="The technology"
                title={<>From neural signals to <span className="italic-accent">research insights.</span></>}
                sub="NeuroViu brings neural sensing and computational neuroscience together in a single research-oriented platform."
              />
              <div className="card" style={{ padding: '22px 24px', marginTop: 34, maxWidth: 460 }} data-reveal>
                <div className="mono-label">Signal integrity first</div>
                <p className="body-muted" style={{ marginTop: 10, fontSize: 15.5 }}>
                  Every downstream measure depends on the quality of the recording. Preprocessing and quality control
                  sit at the center of the pipeline, not at the edges.
                </p>
              </div>
              <Photo
                className="tech-photo"
                src="/media/eeg-session.jpg"
                alt="A person wearing scalp EEG electrodes with leads bundled to a recording system."
                caption="Scalp EEG recording session · research use only"
                width={1200}
                height={1109}
              />
            </div>

            <div className="relative">
              <div className="pipe-rail rail-flow" aria-hidden="true" />
              <ol className="pipe-list">
                {PIPELINE.map((step, i) => (
                  <li key={step.title} className="pipe-step" data-reveal style={rd(i * 90)}>
                    <span className="pipe-marker">
                      <Icon name={step.icon} size={21} />
                    </span>
                    <div style={{ paddingTop: 6 }}>
                      <div className="h-mini">{step.title}</div>
                      <p className="body-muted" style={{ fontSize: 15, marginTop: 5 }}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─────────────── NEUROVIU LITE ─────────────── */}
        <section id="lite" className="section panel-sky relative overflow-hidden" aria-labelledby="lite-title">
          <div className="shell relative">
            <SectionHead
              id="lite-title"
              eyebrow="Hardware"
              title={<>Meet <span className="italic-accent">NeuroViu Lite</span></>}
              sub="Wearable EEG designed for research beyond the traditional laboratory."
            />

            <div className="lite-grid" style={{ marginTop: 52 }}>
              <div className="lite-photos" data-reveal>
                <Photo
                  className="photo-square"
                  src="/media/lite-device.jpg"
                  alt="The NeuroViu Lite circuit module seated in its open enclosure, viewed from above."
                  caption="NeuroViu Lite hardware"
                  width={1200}
                  height={1131}
                />
                <Photo
                  className="photo-square"
                  src="/media/lite-internals.jpg"
                  alt="Close-up of the NeuroViu Lite board and battery inside the enclosure."
                  caption="Inside the enclosure"
                  width={900}
                  height={1037}
                />
              </div>

              <div>
                <p className="lede" data-reveal>
                  A compact wearable EEG platform designed to capture neural signals in flexible research environments.
                </p>

                <div className="lite-features">
                  {LITE_FEATURES.map((f, i) => (
                    <article key={f.title} className="card card-lift" style={{ ...rd(i * 90), padding: '24px 22px' }} data-reveal>
                      <span className="icon-tile" style={{ marginBottom: 16 }}>
                        <Icon name={f.icon} size={21} />
                      </span>
                      <div className="h-mini">{f.title}</div>
                      <p className="body-muted" style={{ fontSize: 15, marginTop: 7 }}>{f.body}</p>
                    </article>
                  ))}
                </div>

                <div className="notice" style={{ padding: '18px 22px', marginTop: 26 }} data-reveal>
                  <div className="mono-label" style={{ color: 'var(--indigo-soft)' }}>Research use only</div>
                  <p className="body-muted" style={{ fontSize: 14.5, marginTop: 6 }}>
                    NeuroViu Lite is a research instrument. It is not intended to diagnose, treat, or monitor any
                    disease or medical condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── NEUROVIU AI ─────────────── */}
        <section id="ai" className="section panel-ink relative overflow-hidden" aria-labelledby="ai-title">
          <div className="shell relative">
            <SectionHead
              id="ai-title"
              eyebrow="Software"
              title={<>NeuroViu <span className="italic-accent">AI</span></>}
              sub="Turning neural signals into structured research data."
            />
            <p className="body-muted" style={{ maxWidth: 720, marginTop: 20, fontSize: 16.5 }} data-reveal>
              NeuroViu combines signal processing, quantitative EEG, neural connectivity analysis, and machine learning
              to help researchers investigate complex patterns in brain activity.
            </p>

            <div className="ai-grid" style={{ marginTop: 48 }}>
              <div data-reveal>
                <NeuralGraph />
                <Photo
                  className="ai-photo"
                  src="/media/ai-development.jpg"
                  alt="A development workstation running analysis code next to a phone showing a live tracking view."
                  caption="Building and testing the analysis stack"
                  width={1000}
                  height={1160}
                />
              </div>
              <div className="ai-features">
                {AI_FEATURES.map((f, i) => (
                  <article key={f.title} className="card-ink card-lift" style={{ ...rd(i * 90), padding: '24px 22px' }} data-reveal>
                    <span className="icon-tile" style={{ marginBottom: 16 }}>
                      <Icon name={f.icon} size={21} />
                    </span>
                    <div className="h-mini" style={{ color: '#fff' }}>{f.title}</div>
                    <p className="body-muted" style={{ fontSize: 15, marginTop: 7 }}>{f.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── EEG + MRI ─────────────── */}
        <section id="multimodal" className="section panel-ivory relative overflow-hidden" aria-labelledby="multimodal-title">
          <div className="aura aura-rose drift-slow" style={{ width: 460, height: 460, top: 40, right: -190, opacity: 0.55 }} aria-hidden="true" />
          <div className="shell relative">
            <SectionHead
              id="multimodal-title"
              eyebrow="Multimodal neuroscience"
              title={<>Connecting electrical activity with <span className="italic-accent">brain structure.</span></>}
              sub="NeuroViu's research framework can combine EEG-derived measures with MRI and cognitive data to investigate relationships between brain activity, connectivity, structure, and behavior."
            />

            <div className="equation" style={{ marginTop: 52 }}>
              {MODALITIES.map((m, i) => (
                <div key={m.label} className="equation-part" data-reveal style={rd(i * 80)}>
                  <div className="card" style={{ padding: '22px 20px', textAlign: 'center', height: '100%' }}>
                    <span className="icon-tile" style={{ marginBottom: 14 }}>
                      <Icon name={m.icon} size={21} />
                    </span>
                    <div className="h-mini">{m.label}</div>
                    <p className="body-dim" style={{ fontSize: 13.5, marginTop: 6 }}>{m.note}</p>
                  </div>
                  <span className="equation-op" aria-hidden="true">{i < MODALITIES.length - 1 ? '×' : '='}</span>
                </div>
              ))}
              <div className="equation-result" data-reveal style={rd(340)}>
                <div className="card" style={{ padding: '26px 24px', height: '100%', background: 'linear-gradient(140deg, #ffffff 0%, #f3f1fa 100%)' }}>
                  <div className="mono-label">Result</div>
                  <div className="h-card" style={{ marginTop: 8 }}>Multimodal Brain Analytics</div>
                  <p className="body-muted" style={{ fontSize: 15, marginTop: 10 }}>
                    A combined view of signal, structure, and behavior for research questions that no single modality
                    answers on its own.
                  </p>
                </div>
              </div>
            </div>

            <p className="body-dim" style={{ fontSize: 14, marginTop: 26, maxWidth: 640 }} data-reveal>
              This framework is under development for research purposes. No clinical or diagnostic performance is
              claimed.
            </p>
          </div>
        </section>

        {/* ─────────────── LONGITUDINAL ─────────────── */}
        <section id="longitudinal" className="section panel-mist relative overflow-hidden" aria-labelledby="long-title">
          <div className="shell relative">
            <SectionHead
              id="long-title"
              eyebrow="Longitudinal research"
              title={<>The brain <span className="italic-accent">changes over time.</span></>}
              sub="A single measurement provides a snapshot. Longitudinal data can reveal patterns of change. NeuroViu is designed around the idea of studying neural signals across repeated research sessions."
            />

            <div className="timeline" style={{ marginTop: 56 }}>
              <div className="timeline-rail-v md:hidden" aria-hidden="true" />
              <div className="timeline-rail-h hidden md:block" aria-hidden="true" />
              <ol className="timeline-list">
                {SESSIONS.map((s, i) => (
                  <li key={s.label} className="timeline-item" data-reveal style={rd(i * 110)}>
                    <span className="timeline-dot" style={{ background: s.color }} aria-hidden="true" />
                    <div className="card" style={{ padding: '18px 18px 12px', width: '100%' }}>
                      <div className="mono-label" style={{ fontSize: 11 }}>{s.label}</div>
                      <div className="body-muted" style={{ fontSize: 14.5, marginTop: 2, marginBottom: 6 }}>{s.note}</div>
                      <Sparkline seed={s.seed} amp={s.amp} color={s.color} height={40} />
                    </div>
                  </li>
                ))}
                <li className="timeline-item timeline-item-final" data-reveal style={rd(470)}>
                  <span className="timeline-dot timeline-dot-final" aria-hidden="true" />
                  <div className="card" style={{ padding: '18px', width: '100%', background: 'linear-gradient(140deg, #ffffff, #efebfa)' }}>
                    <div className="mono-label" style={{ fontSize: 11, color: 'var(--indigo-soft)' }}>Longitudinal pattern</div>
                    <div className="h-mini" style={{ marginTop: 4 }}>Change, not a snapshot</div>
                    <p className="body-dim" style={{ fontSize: 13.5, marginTop: 6 }}>
                      Sessions compared as a trajectory of neural measures.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ─────────────── RESEARCH PLATFORM ─────────────── */}
        <section id="platform" className="section panel-ivory relative overflow-hidden" aria-labelledby="platform-title">
          <div className="aura aura-violet drift" style={{ width: 480, height: 480, bottom: -220, left: -160, opacity: 0.5 }} aria-hidden="true" />
          <div className="shell relative">
            <SectionHead
              id="platform-title"
              eyebrow="Platform"
              title={<>The NeuroViu <span className="italic-accent">Research Platform</span></>}
              sub="One workflow from neural signal to analysis."
            />

            <div data-reveal style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
              <a
                href="https://neuroviu-neurosim.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 24px', borderRadius: 999, background: '#3b3183', color: '#fff', fontWeight: 600, textDecoration: 'none' }}
                aria-label="Launch NeuroSim interactive 3D neuroscience simulator in a new tab"
              >
                Launch NeuroSim <Icon name="external" size={17} />
              </a>
              <span className="body-dim" style={{ fontSize: 13 }}>
                Explore an interactive 3D brain model · Opens in a new tab
              </span>
            </div>

            <ol className="workflow-grid" style={{ marginTop: 52 }}>
              {WORKFLOW.map((w, i) => (
                <li key={w.n} className="card card-lift" style={{ ...rd((i % 3) * 90), padding: '28px 26px' }} data-reveal>
                  <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
                    <span
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: 34,
                        fontWeight: 300,
                        letterSpacing: '-0.03em',
                        color: 'var(--violet-pale)',
                        lineHeight: 1,
                      }}
                    >
                      {w.n}
                    </span>
                    <span className="icon-tile" style={{ width: 40, height: 40, borderRadius: 12 }}>
                      <Icon name={w.icon} size={19} />
                    </span>
                  </div>
                  <div className="h-mini">{w.title}</div>
                  <p className="body-muted" style={{ fontSize: 15, marginTop: 7 }}>{w.body}</p>
                </li>
              ))}
            </ol>

            <div className="platform-close" style={{ marginTop: 52 }} data-reveal>
              <Photo
                src="/media/platform-app.jpg"
                alt="A person holding the NeuroViu module beside a phone showing the companion research app."
                caption="The wearable module and its companion research app"
                width={1100}
                height={1040}
              />
              <div>
                <p className="lede" style={{ maxWidth: 440 }}>
                  Bring your study to the platform, or bring the platform to your study.
                </p>
                <a
                  className="btn btn-primary"
                  href="#contact"
                  style={{ marginTop: 26 }}
                  onClick={pickArea('research-collaboration')}
                >
                  Partner With NeuroViu
                  <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── PARTNERS ─────────────── */}
        <section id="partners" className="section panel-sky relative overflow-hidden" aria-labelledby="partners-title">
          <div className="shell relative partners-grid">
            <div>
              <SectionHead
                id="partners-title"
                eyebrow="Collaboration"
                title={<>Built for <span className="italic-accent">collaborative neuroscience.</span></>}
                sub="NeuroViu is designed to support researchers investigating brain injury, cognitive aging, dementia, neurodegeneration, and neural biomarkers."
              />
              <div style={{ marginTop: 32 }} data-reveal>
                <a className="btn btn-primary" href="#contact" onClick={pickArea('research-collaboration')}>
                  Start a Research Collaboration
                  <Icon name="arrow" size={18} />
                </a>
              </div>
              <Photo
                className="partners-photo"
                src="/media/team.jpg"
                alt="Three members of the NeuroViu team together, one holding the wearable EEG module."
                caption="The NeuroViu team"
                width={1200}
                height={1118}
              />
            </div>

            <ul className="partner-list">
              {PARTNER_TYPES.map((p, i) => (
                <li key={p.label} className="card card-lift" style={{ ...rd(i * 70), padding: '20px 20px' }} data-reveal>
                  <span className="icon-tile" style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 14 }}>
                    <Icon name={p.icon} size={19} />
                  </span>
                  <div className="h-mini" style={{ fontSize: 17 }}>{p.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────── PUBLICATIONS ─────────────── */}
        <section id="publications" className="section panel-ivory relative overflow-hidden" aria-labelledby="pubs-title">
          <div className="shell relative">
            <SectionHead
              id="pubs-title"
              eyebrow="Science"
              title={<>Research <span className="amp">&amp;</span> <span className="italic-accent">Publications</span></>}
              sub="Work in progress, labeled by its real status. Items that have not completed peer review are never presented as though they have."
            />

            <div className="pub-grid" style={{ marginTop: 48 }}>
              {PUBLICATIONS.map((pub, i) => (
                <article
                  key={pub.title}
                  className={`card ${pub.available ? 'card-lift' : ''}`}
                  style={{ ...rd(i * 90), padding: '28px 26px', display: 'flex', flexDirection: 'column', opacity: pub.available ? 1 : 0.85 }}
                  data-reveal
                >
                  <div className="flex items-start justify-between" style={{ gap: 12, marginBottom: 16 }}>
                    <span className="mono-label" style={{ color: 'var(--indigo-soft)' }}>{pub.area}</span>
                    <span
                      className="status-pill"
                      style={{ background: `${pub.statusColor}14`, border: `1px solid ${pub.statusColor}38`, color: pub.statusColor }}
                    >
                      {pub.status}
                    </span>
                  </div>
                  <h3 className="h-card" style={{ fontSize: 22 }}>{pub.title}</h3>
                  <p className="body-muted" style={{ fontSize: 15.5, marginTop: 12, flex: 1 }}>{pub.abstract}</p>
                  {pub.available ? (
                    <a className="link-arrow" href="#contact" style={{ marginTop: 18 }} onClick={pickArea('academic-collaboration')}>
                      Read More
                      <Icon name="arrow" size={17} />
                    </a>
                  ) : (
                    <span className="mono-label" style={{ marginTop: 18 }}>Awaiting write-up</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── ABOUT ─────────────── */}
        <section id="about" className="section panel-mist relative overflow-hidden" aria-labelledby="about-title">
          <div className="shell relative">
            <SectionHead
              id="about-title"
              eyebrow="About NeuroViu"
              title={<>Built at the intersection of neuroscience, engineering, and <span className="italic-accent">artificial intelligence.</span></>}
            />

            <div className="about-grid" style={{ marginTop: 44 }}>
              <div className="about-copy" data-reveal>
                <p className="lede">
                  NeuroViu grew from a simple question: can wearable technology make it easier to study changes in the
                  brain?
                </p>
                <p className="body-muted" style={{ marginTop: 20, fontSize: 16.5 }}>
                  Our work brings together neuroscience, biomedical engineering, wearable neural sensing, EEG
                  analytics, artificial intelligence, and computational approaches to brain connectivity.
                </p>
                <p className="body-muted" style={{ marginTop: 16, fontSize: 16.5 }}>
                  We are building tools that give researchers new ways to investigate the brain across injury, aging,
                  and neurodegenerative disease.
                </p>
                <Photo
                  className="about-photo"
                  src="/media/module-portrait.jpg"
                  alt="A person holding the compact NeuroViu wearable EEG module between two fingers."
                  caption="The NeuroViu wearable EEG module"
                  width={1100}
                  height={1098}
                />
              </div>

              <div className="card" style={{ padding: '30px 28px' }} data-reveal>
                <div className="flex items-center" style={{ gap: 16 }}>
                  <span
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(140deg, #4a3f98, #8574cd 60%, #b1728f)',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Fraunces, serif',
                      fontSize: 22,
                      fontWeight: 600,
                      flex: 'none',
                      boxShadow: '0 6px 18px rgba(58, 47, 126, 0.24)',
                    }}
                    aria-hidden="true"
                  >
                    AL
                  </span>
                  <div>
                    <div className="h-card" style={{ fontSize: 24 }}>Ashlei Lewis</div>
                    <div className="mono-label" style={{ marginTop: 4 }}>Founder &amp; CEO · Neurotechnology Engineer</div>
                  </div>
                </div>
                <p className="body-muted" style={{ fontSize: 15.5, marginTop: 20 }}>
                  Ashlei founded NeuroViu to close the gap between laboratory-grade EEG research and the settings where
                  brain change actually unfolds — bringing an engineering background in wearable sensing to the design
                  of NeuroViu Lite and the broader analytics platform. Research interests include wearable neural
                  sensing architecture, EEG signal processing, and quantitative analysis of brain connectivity.
                </p>
              </div>
            </div>

            <div className="card thanks-card" data-reveal>
              <Photo
                src="/media/founders.jpg"
                alt="Ashlei Lewis, Dr. Alexa Yung, and Dr. Raul Patel standing together beneath the NeuroViu sign."
                width={1100}
                height={828}
              />
              <div>
                <div className="mono-label">With thanks</div>
                <p className="body-muted" style={{ fontSize: 16, marginTop: 12, maxWidth: '54ch' }}>
                  NeuroViu is shaped by the people who build it. Our thanks to{' '}
                  <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Ashlei Lewis</strong>,{' '}
                  <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Dr. Alexa Yung</strong>, and{' '}
                  <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Dr. Raul Patel</strong> for their
                  contributions to this work.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="mono-label" data-reveal>Interdisciplinary team</div>
              <ul className="team-grid" style={{ marginTop: 18 }}>
                {TEAM.map((t, i) => (
                  <li key={t.label} data-reveal style={rd(i * 70)}>
                    <div className="h-mini" style={{ fontSize: 17 }}>{t.label}</div>
                    <p className="body-dim" style={{ fontSize: 14.5, marginTop: 6 }}>{t.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─────────────── FOUNDER RESEARCH & SPECIAL PROJECTS ─────────────── */}
        <FounderProjects onAsk={pickArea('academic-collaboration')} />

        {/* ─────────────── LIPSTICK ON LABCOATS PODCAST ─────────────── */}
        <PodcastSection />

        {/* ─────────────── RESEARCH USE ONLY ─────────────── */}
        <section className="panel-ivory" style={{ paddingBlock: 56 }} aria-labelledby="ruo-title">
          <div className="shell">
            <div className="notice" style={{ padding: '26px 28px', display: 'flex', gap: 18, alignItems: 'flex-start' }} data-reveal>
              <span className="icon-tile" style={{ width: 42, height: 42, borderRadius: 13 }}>
                <Icon name="shield" size={20} />
              </span>
              <div>
                <div className="h-mini" id="ruo-title">Research Use Only</div>
                <p className="body-muted" style={{ fontSize: 15, marginTop: 8, maxWidth: '78ch' }}>{DISCLAIMER}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── FINAL CTA ─────────────── */}
        <section className="section panel-ink relative overflow-hidden" aria-labelledby="cta-title">
          <div className="absolute inset-0" style={{ opacity: 0.35 }} aria-hidden="true">
            <AmbientNeural opacity={0.5} />
          </div>
          <div className="shell relative" style={{ textAlign: 'center' }}>
            <h2 id="cta-title" className="h-section" style={{ maxWidth: 820, margin: '0 auto' }} data-reveal>
              The future of brain research is <span className="italic-accent">longitudinal.</span>
            </h2>
            <p className="lede" style={{ maxWidth: 640, margin: '22px auto 0' }} data-reveal>
              We&rsquo;re building tools to help researchers understand how neural signals change across injury, aging,
              and neurodegeneration.
            </p>
            <div className="flex flex-wrap items-center justify-center" style={{ gap: 14, marginTop: 34 }} data-reveal>
              <a className="btn btn-on-ink" href="#contact" onClick={pickArea('research-collaboration')}>
                Partner With Us
                <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-on-ink-quiet" href="#technology">Explore NeuroViu</a>
            </div>
          </div>
        </section>

        {/* ─────────────── CONTACT ─────────────── */}
        <section id="contact" className="section panel-ivory relative overflow-hidden" aria-labelledby="contact-title">
          <div className="aura aura-blue drift-slow" style={{ width: 460, height: 460, top: -120, left: -180, opacity: 0.55 }} aria-hidden="true" />
          <div className="shell relative contact-grid">
            <div>
              <SectionHead
                id="contact-title"
                eyebrow="Contact"
                title={<>Research <span className="italic-accent">with NeuroViu.</span></>}
                sub="Tell us about your study. We work with researchers investigating brain injury, cognitive aging, dementia, and neurodegeneration."
              />
              <ul className="inquiry-list" style={{ marginTop: 30 }}>
                {['Research collaborations and study design', 'Wearable EEG for a specific research protocol', 'Quantitative EEG, connectivity, and AI analysis', 'Academic, biotech, and rehabilitation research partnerships'].map((item, i) => (
                  <li key={item} data-reveal style={rd(i * 70)}>
                    <span style={{ color: 'var(--violet)', flex: 'none', marginTop: 2 }}><Icon name="check" size={17} /></span>
                    <span className="body-muted" style={{ fontSize: 15.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal>
              <ContactForm interest={interest} setInterest={setInterest} />
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="panel-ink relative overflow-hidden" style={{ paddingBlock: '64px 34px' }}>
        <div className="shell relative">
          <div className="footer-grid">
            <div>
              <Wordmark onDark />
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: 19, marginTop: 16, color: 'var(--on-dark)' }}>
                See the brain. Track the change.
              </p>
              <p className="body-muted" style={{ fontSize: 15, marginTop: 8, maxWidth: '38ch' }}>
                Wearable EEG and AI for brain health research.
              </p>
              <span className="chip" style={{ marginTop: 20, background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.18)', color: 'var(--on-dark-2)' }}>
                Research Use Only
              </span>
            </div>

            <nav aria-label="Site">
              <div className="mono-label">Navigate</div>
              <ul className="footer-list">
                {[
                  { l: 'Technology', h: '#technology' },
                  { l: 'Research', h: '#research' },
                  { l: 'NeuroViu Lite', h: '#lite' },
                  { l: 'NeuroViu AI', h: '#ai' },
                  { l: 'About', h: '#about' },
                  { l: 'Art + Research', h: '/art-research' },
                  { l: 'She’s a Flame Conference', h: '/shes-a-flame' },
                  { l: 'Lipstick on Labcoats', h: '#podcast' },
                  { l: 'Resources', h: '/resources' },
                  { l: 'Contact', h: '#contact' },
                ].map(l => (
                  <li key={l.l}><a className="footer-link" href={l.h}>{l.l}</a></li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Research areas">
              <div className="mono-label">Research areas</div>
              <ul className="footer-list">
                {[
                  { l: 'TBI', h: '#research' },
                  { l: 'Cognitive Aging', h: '#research' },
                  { l: 'Dementia', h: '#research' },
                  { l: "Alzheimer's", h: '#research' },
                ].map(l => (
                  <li key={l.l}><a className="footer-link" href={l.h}>{l.l}</a></li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="body-dim" style={{ fontSize: 13.5, marginTop: 40, maxWidth: '86ch' }}>{DISCLAIMER}</p>

          <div className="footer-base">
            <span className="mono-label">© 2026 NeuroViu. All rights reserved.</span>
            <span className="mono-label">Research use only — not a medical device.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
