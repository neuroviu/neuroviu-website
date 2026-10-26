import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Photo, SubpageShell } from '@/components/site'

const TITLE = 'Art + Research | NeuroViu'
const DESCRIPTION =
  'NeuroViu × Aerith Dawn: interdisciplinary artistic research at the intersection of neuroscience, wearable sensing, AI, music, performance, VR, and immersive media.'

/* Link to the Art + Research portfolio PDF. Drop the file in `public/` (for
   example `public/art-research-portfolio.pdf`) and set this to its path, e.g.
   '/art-research-portfolio.pdf', or paste a full external URL. While empty, the
   button routes visitors to the contact form to request a copy. */
const PORTFOLIO_URL = ''

export const Route = createFileRoute('/art-research')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: '/art-research' }],
  }),
  component: ArtResearchPage,
})

/** Stagger helper for scroll-reveal elements. */
const rd = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as unknown as React.CSSProperties

/* ═══════════════════════════════════════════════════════════════════════════
   Work status — every section and image says what kind of work it shows
   ═══════════════════════════════════════════════════════════════════════════ */

type WorkStatus = 'documented' | 'prototype' | 'ongoing' | 'concept' | 'rendering' | 'future'

const STATUS: Record<WorkStatus, { label: string; color: string }> = {
  documented: { label: 'Documentation', color: '#3f7a68' },
  prototype: { label: 'Prototype', color: '#4f6fc0' },
  ongoing: { label: 'Ongoing experimentation', color: '#6a59bd' },
  concept: { label: 'Proposed concept', color: '#a2637f' },
  rendering: { label: 'Product rendering', color: '#8a6d3b' },
  future: { label: 'Future direction', color: '#79738c' },
}

function StatusTag({ status, label, onDark = false }: { status: WorkStatus; label?: string; onDark?: boolean }) {
  const { color } = STATUS[status]
  return (
    <span
      className="status-pill ar-status"
      style={
        onDark
          ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)', color: 'var(--on-dark)' }
          : { background: `${color}12`, border: `1px solid ${color}38`, color }
      }
    >
      <span className="ar-status-dot" style={{ background: onDark ? 'var(--violet-pale)' : color }} aria-hidden="true" />
      {label ?? STATUS[status].label}
    </span>
  )
}

function Chapter({ n, label }: { n: string; label: string }) {
  return (
    <div className="ar-chapter">
      <span className="ar-chapter-n">{n}</span>
      <span className="ar-chapter-line" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   The Responsive Mind — concept visualization (illustration, not documentation)
   A participant stands in a room; presence ripples across the floor while
   sound ribbons, light, and the projected field on the far wall respond.
   Coordinates are rounded so SSR and client markup match.
   ═══════════════════════════════════════════════════════════════════════════ */

const r1 = (n: number) => n.toFixed(1)

function ribbonPath(seed: number, cy: number, amp: number) {
  const x0 = 288
  const x1 = 912
  const steps = 64
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = x0 + (x1 - x0) * t
    const env = Math.sin(Math.PI * t)
    const y =
      cy +
      amp * env * (Math.sin(t * 7.2 + seed) * 0.62 + Math.sin(t * 15.4 + seed * 1.9) * 0.26 + Math.sin(t * 3.1 + seed * 0.7) * 0.4)
    d += `${i === 0 ? 'M' : 'L'}${r1(x)} ${r1(y)} `
  }
  return d.trim()
}

const RIBBONS = Array.from({ length: 9 }, (_, i) => ({
  d: ribbonPath(i * 0.85, 196 + (i - 4) * 9, 46 + (i % 3) * 14),
  stroke: i % 3 === 0 ? 'url(#rm-ribbon-a)' : i % 3 === 1 ? 'url(#rm-ribbon-b)' : 'url(#rm-ribbon-c)',
  width: i === 4 ? 2.4 : 1.2,
  opacity: i === 4 ? 0.95 : 0.36 + (i % 4) * 0.1,
  delay: `${(i * 0.7).toFixed(1)}s`,
}))

const MOTES = Array.from({ length: 46 }, (_, i) => ({
  cx: r1(150 + ((i * 263.7) % 900)),
  cy: r1(40 + ((i * 97.3) % 340)),
  r: r1(0.9 + (i % 4) * 0.55),
  delay: `${((i * 0.37) % 5).toFixed(2)}s`,
  rose: i % 5 === 0,
}))

const FLOOR_RAYS = Array.from({ length: 11 }, (_, i) => ({
  x1: r1(262 + i * 67.6),
  x2: r1(-260 + i * 172),
}))

const FLOOR_RINGS = [392, 420, 458, 510, 584].map(y => {
  const t = (y - 370) / 270
  return { y, x1: r1(262 - t * 522), x2: r1(938 + t * 522) }
})

const LEGEND = [
  { swatch: 'linear-gradient(90deg, #b7a9e4, #8574cd)', label: 'Sound', note: 'Spatial layers that thicken, thin, or move' },
  { swatch: 'linear-gradient(90deg, #b3c6ec, #6c8ad4)', label: 'Projected field', note: 'Visual movement across the far wall' },
  { swatch: 'linear-gradient(90deg, #e3c2d3, #b1728f)', label: 'Light & atmosphere', note: 'Brightness, color, and density in the air' },
  { swatch: 'linear-gradient(90deg, #f6f4fb, #c3bcdf)', label: 'Presence', note: 'The participant whose input shapes the room' },
]

function ResponsiveMindVisual() {
  return (
    <figure className="ar-concept" data-reveal>
      <div className="ar-concept-stage">
        <svg viewBox="0 0 1200 640" className="ar-concept-svg" role="img" aria-labelledby="rm-vis-title rm-vis-desc" preserveAspectRatio="xMidYMid slice">
          <title id="rm-vis-title">The Responsive Mind — concept visualization</title>
          <desc id="rm-vis-desc">
            An illustrated immersive room. A single participant stands at the center while ripples spread across the
            floor, and flowing ribbons of light and sound move across a projected wall in response.
          </desc>
          <defs>
            <radialGradient id="rm-bg" cx="50%" cy="34%" r="70%">
              <stop offset="0%" stopColor="#3a3180" />
              <stop offset="55%" stopColor="#1f1a47" />
              <stop offset="100%" stopColor="#120f2b" />
            </radialGradient>
            <radialGradient id="rm-wall" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#8574cd" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#8574cd" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rm-pool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e3c2d3" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e3c2d3" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rm-ribbon-a" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#b7a9e4" stopOpacity="0" />
              <stop offset="35%" stopColor="#b7a9e4" />
              <stop offset="70%" stopColor="#8574cd" />
              <stop offset="100%" stopColor="#8574cd" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rm-ribbon-b" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#b3c6ec" stopOpacity="0" />
              <stop offset="40%" stopColor="#b3c6ec" />
              <stop offset="75%" stopColor="#6c8ad4" />
              <stop offset="100%" stopColor="#6c8ad4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rm-ribbon-c" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#e3c2d3" stopOpacity="0" />
              <stop offset="45%" stopColor="#e3c2d3" />
              <stop offset="80%" stopColor="#b1728f" />
              <stop offset="100%" stopColor="#b1728f" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rm-beam" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c3bcdf" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#c3bcdf" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1200" height="640" fill="url(#rm-bg)" />

          {/* Room geometry */}
          <g stroke="#c3bcdf" strokeOpacity="0.16" strokeWidth="1" fill="none">
            <rect x="262" y="58" width="676" height="312" />
            <path d="M262 58 L-60 -120 M938 58 L1260 -120" />
            {FLOOR_RAYS.map((l, i) => (
              <line key={i} x1={l.x1} y1="370" x2={l.x2} y2="640" />
            ))}
            {FLOOR_RINGS.map(l => (
              <line key={l.y} x1={l.x1} y1={l.y} x2={l.x2} y2={l.y} />
            ))}
          </g>

          {/* Projected field on the far wall */}
          <rect x="262" y="58" width="676" height="312" fill="url(#rm-wall)" className="ar-breathe" />
          <g fill="none" strokeLinecap="round">
            {RIBBONS.map((rb, i) => (
              <path
                key={i}
                d={rb.d}
                stroke={rb.stroke}
                strokeWidth={rb.width}
                opacity={rb.opacity}
                className="ar-ribbon"
                style={{ animationDelay: rb.delay }}
              />
            ))}
          </g>

          {/* Light falling into the room */}
          <path d="M520 0 L680 0 L760 640 L440 640 Z" fill="url(#rm-beam)" className="ar-breathe" style={{ animationDelay: '1.4s' }} />
          {MOTES.map((m, i) => (
            <circle key={i} cx={m.cx} cy={m.cy} r={m.r} fill={m.rose ? '#e3c2d3' : '#f6f4fb'} className="ar-mote" style={{ animationDelay: m.delay }} />
          ))}

          {/* Signal threads from participant to environment */}
          <g fill="none" stroke="#b7a9e4" strokeWidth="1" strokeOpacity="0.45">
            <path d="M600 446 C 560 380, 430 330, 380 230" className="trace-loop" />
            <path d="M600 446 C 600 380, 610 300, 600 205" className="trace-loop" style={{ animationDelay: '0.6s' }} />
            <path d="M600 446 C 650 380, 770 330, 830 180" className="trace-loop" style={{ animationDelay: '1.2s' }} />
          </g>

          {/* Presence ripples on the floor */}
          <ellipse cx="600" cy="548" rx="230" ry="44" fill="url(#rm-pool)" />
          {[0, 1, 2, 3].map(i => (
            <ellipse
              key={i}
              cx="600"
              cy="548"
              rx="90"
              ry="17"
              fill="none"
              stroke="#f6f4fb"
              strokeWidth="1.2"
              className="ar-ripple"
              style={{ animationDelay: `${i * 1.5}s` }}
            />
          ))}

          {/* Participant */}
          <g>
            <circle cx="600" cy="446" r="14" fill="#0e0c22" stroke="#c3bcdf" strokeOpacity="0.55" />
            <path d="M578 548 C578 500 586 468 600 468 C614 468 622 500 622 548 Z" fill="#0e0c22" stroke="#c3bcdf" strokeOpacity="0.55" />
            <circle cx="600" cy="446" r="14" fill="none" stroke="#b7a9e4" className="halo" />
          </g>
        </svg>

        <div className="ar-concept-badge">
          <StatusTag status="concept" label="Concept visualization" onDark />
        </div>
      </div>

      <ul className="ar-legend">
        {LEGEND.map(l => (
          <li key={l.label}>
            <span className="ar-legend-swatch" style={{ background: l.swatch }} aria-hidden="true" />
            <span>
              <span className="ar-legend-label">{l.label}</span>
              <span className="ar-legend-note">{l.note}</span>
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="ar-concept-cap">Concept visualization. Not documentation of a completed installation.</figcaption>
    </figure>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Content
   ═══════════════════════════════════════════════════════════════════════════ */

const CHAPTERS = [
  { id: 'aerith-dawn', label: 'NeuroViu × Aerith Dawn' },
  { id: 'responsive-mind', label: 'The Responsive Mind' },
  { id: 'golden-square', label: 'The Golden Square' },
  { id: 'performance', label: 'The Body, Voice & Signal' },
  { id: 'immersive', label: 'Immersive Experimentation' },
  { id: 'sound', label: 'From Data to Sound' },
  { id: 'framework', label: 'From Lab to Stage' },
  { id: 'philosophy', label: 'Philosophy' },
]

type GalleryImage = {
  src: string
  alt: string
  width: number
  height: number
  kind: string
  caption: string
  status: WorkStatus
}

const GOLDEN_SQUARE: GalleryImage[] = [
  {
    src: '/media/art-research/golden-square-render.jpg',
    alt: 'A brushed-gold square NeuroViu module engraved with the NeuroViu name, resting on dark felt.',
    width: 1179,
    height: 990,
    kind: 'Product',
    caption: 'The Golden Square — rendered product visualization',
    status: 'rendering',
  },
  {
    src: '/media/art-research/golden-square-desk.jpg',
    alt: 'The gold NeuroViu module on a felt desk mat beside a laptop and phone.',
    width: 1179,
    height: 1042,
    kind: 'Product',
    caption: 'The Golden Square at the workstation',
    status: 'prototype',
  },
  {
    src: '/media/platform-app.jpg',
    alt: 'A person holding the NeuroViu module at the temple beside a phone showing the companion research app.',
    width: 1100,
    height: 1040,
    kind: 'Temple-worn',
    caption: 'Temple placement with the companion app',
    status: 'prototype',
  },
  {
    src: '/media/eeg-session.jpg',
    alt: 'A person wearing the gold module at the temple alongside scalp electrodes and bundled leads.',
    width: 1200,
    height: 1109,
    kind: 'Sensors & cables',
    caption: 'Temple-worn module alongside scalp electrodes',
    status: 'prototype',
  },
  {
    src: '/media/lite-device.jpg',
    alt: 'The NeuroViu circuit module seated in its open gold enclosure, viewed from above.',
    width: 1200,
    height: 1131,
    kind: 'Electronics',
    caption: 'Circuit module in the open enclosure',
    status: 'prototype',
  },
  {
    src: '/media/lite-internals.jpg',
    alt: 'Close-up of a NeuroViu board and battery inside the enclosure.',
    width: 900,
    height: 1037,
    kind: 'Electronics',
    caption: 'Board and battery inside the enclosure',
    status: 'prototype',
  },
  {
    src: '/media/team.jpg',
    alt: 'Three members of the NeuroViu team together, one holding up the gold module.',
    width: 1200,
    height: 1118,
    kind: 'Development',
    caption: 'Prototype development with the team',
    status: 'documented',
  },
  {
    src: '/media/ai-development.jpg',
    alt: 'A development workstation running code next to a phone showing a live tracking view.',
    width: 1000,
    height: 1160,
    kind: 'Software',
    caption: 'Software development and testing',
    status: 'ongoing',
  },
]

const SIGNAL_FLOW = [
  { label: 'Human signal', note: 'Input from wearable sensing, movement, or interaction' },
  { label: 'Process', note: 'Cleaning and structuring the changing input' },
  { label: 'Translate', note: 'Mapping input onto chosen artistic parameters' },
  { label: 'Artistic response', note: 'Sound, image, light, or space changes in turn' },
]

const MAPPINGS = [
  { from: 'Signal intensity', to: 'visual brightness or density' },
  { from: 'Movement', to: 'direction or movement of projected forms' },
  { from: 'Interaction', to: 'musical layers entering or disappearing' },
  { from: 'Changing input', to: 'sound, color, texture, light, or virtual space' },
]

const VR_FLOW = ['Sensing', 'Immersion', 'Interaction', 'Experience']

const SOUND_MAPPINGS = ['Rhythm', 'Texture', 'Sound density', 'Spatial audio', 'Visual movement', 'Lighting', 'Environmental change']

const STAGES: {
  name: string
  body: string
  status: WorkStatus
  image?: { src: string; alt: string; width: number; height: number }
}[] = [
  {
    name: 'Lab',
    body: 'EEG and experimental sensing establish the research foundation.',
    status: 'ongoing',
    image: { src: '/media/art-research/lab-eeg-cap.jpg', alt: 'Ashlei Lewis smiling in a white EEG cap during a lab session.', width: 1179, height: 1085 },
  },
  {
    name: 'Stage',
    body: 'Performance introduces voice, embodiment, music, and audience presence.',
    status: 'documented',
    image: { src: '/media/art-research/performance-voice.jpg', alt: 'A performer in a pink EEG cap singing into a microphone on a dark stage.', width: 1179, height: 1124 },
  },
  {
    name: 'VR',
    body: 'Immersive technology creates a space for testing responsive environments.',
    status: 'ongoing',
    image: { src: '/media/art-research/eeg-vr.jpg', alt: 'A participant wearing a VR headset over an EEG cap.', width: 1179, height: 1035 },
  },
  {
    name: 'Studio',
    body: 'Music and digital tools provide creative parameters that can be shaped and transformed.',
    status: 'ongoing',
    image: { src: '/media/art-research/studio-mixer.jpg', alt: 'Hands on a mixing console beside a laptop and synthesizer in a studio.', width: 1179, height: 614 },
  },
  {
    name: 'Installation',
    body: 'These elements can eventually come together in responsive audiovisual environments influenced by participant presence or interaction.',
    status: 'future',
  },
]

const BECOMES = [
  { a: 'Sensing', b: 'input' },
  { a: 'Data', b: 'material' },
  { a: 'Mapping', b: 'composition' },
  { a: 'Response', b: 'experience' },
]

/* The portfolio gallery. To add a project, performance, prototype, publication,
   exhibition, or residency, append an entry here. `image` and `link` are
   optional; set `placeholder: true` for a slot that is still awaiting details. */
type WorkEntry = {
  title: string
  kind: string
  year: string
  status: WorkStatus
  description: string
  image?: { src: string; alt: string; width: number; height: number }
  link?: { href: string; label?: string }
  placeholder?: boolean
}

const WORK: WorkEntry[] = [
  {
    title: 'The Responsive Mind',
    kind: 'Residency proposal',
    year: 'Proposed',
    status: 'concept',
    description: 'A neuroadaptive immersive experience in which music, sound, projected visuals, and light respond to the person experiencing the work.',
    link: { href: '#responsive-mind', label: 'Read the concept' },
  },
  {
    title: 'The Golden Square',
    kind: 'Sensing prototype',
    year: 'Ongoing',
    status: 'prototype',
    description: 'NeuroViu’s experimental sensing hardware, explored as an interface between participant and environment.',
    image: { src: '/media/art-research/golden-square-desk.jpg', alt: 'The gold NeuroViu module on a felt desk mat.', width: 1179, height: 1042 },
    link: { href: '#golden-square', label: 'View the prototype' },
  },
  {
    title: 'The Body, Voice & Signal',
    kind: 'Performance',
    year: 'Aerith Dawn',
    status: 'documented',
    description: 'Live performance with EEG sensing worn on stage, exploring embodiment, voice, and signal as parts of one creative environment.',
    image: { src: '/media/art-research/performance-triptych.jpg', alt: 'Three frames of a performer in an EEG cap singing on stage.', width: 1179, height: 1092 },
    link: { href: '#performance', label: 'View the performance' },
  },
  {
    title: 'Immersive Experimentation',
    kind: 'EEG + VR',
    year: 'Ongoing',
    status: 'ongoing',
    description: 'Testing which relationships between participant and virtual environment feel intentional, expressive, and meaningful.',
    image: { src: '/media/art-research/eeg-vr.jpg', alt: 'A participant wearing a VR headset over an EEG cap.', width: 1179, height: 1035 },
    link: { href: '#immersive', label: 'View the experiments' },
  },
  {
    title: 'From Data to Sound',
    kind: 'Music + digital media',
    year: 'Ongoing',
    status: 'ongoing',
    description: 'Studio experiments treating human input as another source of creative variation in music and visual systems.',
    image: { src: '/media/art-research/studio-neon.jpg', alt: 'A music studio with a pink neon NeuroViu sign above the monitors.', width: 1170, height: 780 },
    link: { href: '#sound', label: 'View the studio work' },
  },
  {
    title: 'Exhibitions, Residencies & Publications',
    kind: 'Forthcoming',
    year: 'To be announced',
    status: 'future',
    description: 'Space reserved for exhibitions, residency outcomes, performances, and writing as they are confirmed.',
    placeholder: true,
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */

function ArtResearchPage() {
  /* Scroll-reveal, mirroring the home page. Elements start hidden only when JS is
     available (the `js` class on <html>), so no-JS visitors still see everything. */
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

  const portfolioHref = PORTFOLIO_URL || '/#contact'

  return (
    <SubpageShell current="/art-research">
      {/* ─────────────── HERO ─────────────── */}
      <section className="ar-hero panel-ivory relative overflow-hidden" aria-labelledby="ar-title">
        <div className="aura aura-rose drift" style={{ width: 560, height: 560, top: -180, right: -160, opacity: 0.55 }} aria-hidden="true" />
        <div className="aura aura-violet drift-slow" style={{ width: 460, height: 460, bottom: -200, left: -180, opacity: 0.45 }} aria-hidden="true" />
        <div className="shell relative">
          <p className="ar-kicker" data-reveal>Art × Science × Technology × Human Experience</p>

          <div className="ar-hero-grid">
            <div>
              <span className="eyebrow" data-reveal style={rd(60)}>Art + Research</span>
              <h1 id="ar-title" className="ar-display" data-reveal style={rd(120)}>
                Where Brain Signals Become <span className="italic-accent">Creative Material</span>
              </h1>
              <p className="ar-sub" data-reveal style={rd(200)}>
                NeuroViu × Aerith Dawn explores the intersection of neuroscience, music, performance, immersive media,
                and responsive technology.
              </p>
              <div className="ar-hero-copy" data-reveal style={rd(260)}>
                <p>
                  NeuroViu began as a neurotechnology and neural analytics research platform. Our artistic research
                  explores another possibility: what happens when human signals become part of the creative process?
                </p>
                <p>
                  Through wearable sensing, immersive environments, music, performance, VR, and experimental digital
                  media, we explore how technology can create more responsive relationships between people and artistic
                  environments.
                </p>
              </div>
            </div>

            <div className="ar-hero-media" data-reveal style={rd(180)}>
              <Photo
                className="ar-crop-portrait"
                src="/media/art-research/performance-voice.jpg"
                alt="A performer in a pink EEG cap with electrode leads singing into a microphone under stage light."
                width={1179}
                height={1124}
                caption="Aerith Dawn · EEG sensing worn during live performance"
              />
            </div>
          </div>

          <nav className="ar-index" aria-label="Art + Research sections" data-reveal>
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="ar-index-n">{String(i + 1).padStart(2, '0')}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="ar-key" data-reveal>
            <span className="mono-label">How to read this page</span>
            <ul>
              {(['documented', 'prototype', 'ongoing', 'concept'] as WorkStatus[]).map(s => (
                <li key={s}><StatusTag status={s} /></li>
              ))}
            </ul>
            <p className="body-dim">
              Each section and image is labeled by what it shows: documented work, prototypes, ongoing experimentation,
              or proposed concepts. Concept visualizations are illustrations, not photographs of finished work.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── 01 · NEUROVIU × AERITH DAWN ─────────────── */}
      <section id="aerith-dawn" className="section panel-mist relative overflow-hidden" aria-labelledby="ad-title">
        <div className="shell relative">
          <div className="ar-split">
            <div data-reveal>
              <Chapter n="01" label="Practice" />
              <h2 id="ad-title" className="h-section" style={{ marginTop: 22 }}>
                NeuroViu <span className="italic-accent">×</span> Aerith Dawn
              </h2>
              <div className="ar-prose">
                <p className="lede">
                  NeuroViu × Aerith Dawn brings together two sides of founder Ashlei Lewis’s practice: neurotechnology
                  research and creative expression.
                </p>
                <div className="ar-duo">
                  <div>
                    <span className="mono-label" style={{ color: 'var(--indigo-soft)' }}>Through NeuroViu</span>
                    <p>The work explores wearable EEG, neural analytics, AI, human-centered technology, and responsive systems.</p>
                  </div>
                  <div>
                    <span className="mono-label" style={{ color: 'var(--rose)' }}>Through Aerith Dawn</span>
                    <p>The work expands into music, performance, visual storytelling, immersive media, and experimental audience experiences.</p>
                  </div>
                </div>
                <p className="ar-pull">Together, these practices explore how scientific tools can become creative tools.</p>
              </div>
            </div>

            <div className="ar-pair" data-reveal style={rd(120)}>
              <Photo
                className="ar-pair-main"
                src="/media/art-research/studio-neon.jpg"
                alt="Ashlei Lewis in a music studio beneath a pink neon NeuroViu sign, monitors and synthesizers around her."
                width={1170}
                height={780}
                caption="Studio · where both practices meet"
              />
              <Photo
                className="ar-pair-inset photo-square"
                src="/media/module-portrait.jpg"
                alt="A person holding the compact NeuroViu wearable module between two fingers."
                width={1100}
                height={1098}
                caption="The NeuroViu module"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 02 · THE RESPONSIVE MIND ─────────────── */}
      <section id="responsive-mind" className="section panel-ink relative overflow-hidden" aria-labelledby="rm-title">
        <div className="shell relative">
          <div className="ar-rm-head">
            <div data-reveal>
              <Chapter n="02" label="Residency" />
              <h2 id="rm-title" className="h-section" style={{ marginTop: 22 }}>The Responsive Mind</h2>
              <p className="ar-sub" style={{ color: 'var(--on-dark-2)' }}>A Neuroadaptive Immersive Experience</p>
              <div style={{ marginTop: 22 }}>
                <StatusTag status="concept" label="Proposed residency project / Concept visualization" onDark />
              </div>
            </div>
            <div className="ar-prose" data-reveal style={rd(120)}>
              <p className="lede">
                The Responsive Mind is an immersive artistic research project exploring what happens when an artwork
                responds to the person experiencing it.
              </p>
              <p className="body-muted">
                The proposed experience combines music, sound, projected or augmented visuals, spatial environments, and
                responsive technology.
              </p>
              <p className="body-muted">
                Instead of presenting human signals as scientific measurements, the project explores how changing inputs
                might become creative material that influences sound, visual movement, light, atmosphere, or other
                elements of an immersive environment.
              </p>
            </div>
          </div>

          <ResponsiveMindVisual />

          <div className="notice ar-notice" data-reveal>
            <span className="mono-label">Experimental artistic concept</span>
            <p>This is an experimental artistic concept. It is not a diagnostic or clinical application.</p>
          </div>
        </div>
      </section>

      {/* ─────────────── 03 · THE GOLDEN SQUARE ─────────────── */}
      <section id="golden-square" className="section panel-ivory relative overflow-hidden" aria-labelledby="gs-title">
        <div className="aura aura-blue drift" style={{ width: 460, height: 460, top: 60, left: -220, opacity: 0.35 }} aria-hidden="true" />
        <div className="shell relative">
          <div className="ar-rm-head">
            <div data-reveal>
              <Chapter n="03" label="Prototype" />
              <h2 id="gs-title" className="h-section" style={{ marginTop: 22 }}>The Golden Square</h2>
              <p className="ar-sub">From sensing interface to creative interface</p>
              <div style={{ marginTop: 22 }}><StatusTag status="prototype" /></div>
            </div>
            <div className="ar-prose" data-reveal style={rd(120)}>
              <p className="lede">
                The Golden Square represents one physical expression of NeuroViu’s experimental sensing technology.
              </p>
              <p className="body-muted">
                In an artistic context, the device is not the artwork itself. It can become an interface between
                participant and environment.
              </p>
              <p className="body-muted">
                The creative process begins when human input is translated into artistic parameters.
              </p>
            </div>
          </div>

          <ul className="ar-gallery">
            {GOLDEN_SQUARE.map((g, i) => (
              <li key={g.src} data-reveal style={rd((i % 4) * 80)}>
                <figure className="photo-figure ar-tile">
                  <span className="photo-frame">
                    <img className="photo" src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" />
                  </span>
                  <figcaption>
                    <span className="mono-label" style={{ color: 'var(--indigo-soft)' }}>{g.kind}</span>
                    <span className="ar-tile-cap">{g.caption}</span>
                    <StatusTag status={g.status} />
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="ar-translate" data-reveal>
            <span className="mono-label">From input to artwork</span>
            <ol className="ar-flow" aria-label="Signal to artistic response">
              {SIGNAL_FLOW.map((s, i) => (
                <li key={s.label}>
                  <span className="ar-flow-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ar-flow-label">{s.label}</span>
                  <span className="ar-flow-note">{s.note}</span>
                </li>
              ))}
            </ol>

            <ul className="ar-map">
              {MAPPINGS.map(m => (
                <li key={m.from}>
                  <span className="ar-map-from">{m.from}</span>
                  <span className="ar-map-arrow" aria-label="maps to"><Arrow size={18} /></span>
                  <span className="ar-map-to">{m.to}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="ar-note" data-reveal>
            Prototype and concept imagery. Artistic applications remain experimental and non-diagnostic.
          </p>
        </div>
      </section>

      {/* ─────────────── 04 · THE BODY, VOICE & SIGNAL ─────────────── */}
      <section id="performance" className="section ar-panel-blush relative overflow-hidden" aria-labelledby="pf-title">
        <div className="aura aura-rose drift-slow" style={{ width: 520, height: 520, top: -120, right: -200, opacity: 0.5 }} aria-hidden="true" />
        <div className="shell relative">
          <div className="ar-split ar-split-wide">
            <div data-reveal>
              <Photo
                src="/media/art-research/performance-triptych.jpg"
                alt="Three frames of a performer in a pink EEG cap and a light-studded costume singing into a microphone on stage."
                width={1179}
                height={1092}
                caption="Aerith Dawn · performance documentation"
              />
            </div>

            <div data-reveal style={rd(120)}>
              <Chapter n="04" label="Performance + EEG" />
              <h2 id="pf-title" className="h-section" style={{ marginTop: 22 }}>
                The Body, Voice <span className="amp">&amp;</span> <span className="italic-accent">Signal</span>
              </h2>
              <div style={{ marginTop: 20 }}><StatusTag status="documented" label="Performance documentation" /></div>
              <div className="ar-prose">
                <p className="lede">Performance introduces another dimension to the research: embodiment.</p>
                <p className="body-muted">
                  Placing sensing technology alongside voice, music, movement, and stage presence raises an artistic
                  question:
                </p>
                <p className="ar-pull">
                  What if signals generated during a performance could become another layer of the composition?
                </p>
                <p className="body-muted">
                  The performer, microphone, sensing equipment, costume, sound, and audience can become parts of the same
                  creative environment.
                </p>
              </div>
              <p className="ar-note">
                These photographs show EEG sensing worn alongside live performance. They are not presented as
                documentation of signals controlling the music or performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 05 · IMMERSIVE EXPERIMENTATION ─────────────── */}
      <section id="immersive" className="section panel-sky relative overflow-hidden" aria-labelledby="vr-title">
        <div className="shell relative">
          <div className="ar-split">
            <div data-reveal>
              <Chapter n="05" label="EEG + VR" />
              <h2 id="vr-title" className="h-section" style={{ marginTop: 22 }}>
                Immersive <span className="italic-accent">Experimentation</span>
              </h2>
              <div style={{ marginTop: 20 }}><StatusTag status="ongoing" /></div>
              <div className="ar-prose">
                <p className="lede">
                  Virtual reality provides a testing space for exploring how responsive environments can change around a
                  participant.
                </p>
                <p className="body-muted">
                  Rather than simply demonstrating that a sensor can trigger an effect, this work asks which relationships
                  between participant and environment actually feel intentional, expressive, and meaningful.
                </p>
              </div>
            </div>

            <div className="ar-duo-photos" data-reveal style={rd(120)}>
              <Photo
                className="ar-crop-portrait"
                src="/media/art-research/eeg-vr.jpg"
                alt="Ashlei Lewis wearing a VR headset over an EEG cap, smiling and gesturing toward the camera."
                width={1179}
                height={1035}
                caption="EEG cap with VR headset"
              />
              <Photo
                className="ar-crop-portrait ar-offset"
                src="/media/art-research/lab-eeg-cap.jpg"
                alt="Ashlei Lewis in a white EEG cap with electrodes during a lab session."
                width={1179}
                height={1085}
                caption="Sensing setup before immersion"
              />
            </div>
          </div>

          <ol className="ar-flow ar-flow-quiet" aria-label="Sensing to experience" data-reveal>
            {VR_FLOW.map((s, i) => (
              <li key={s}>
                <span className="ar-flow-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="ar-flow-label">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── 06 · FROM DATA TO SOUND ─────────────── */}
      <section id="sound" className="section panel-ivory relative overflow-hidden" aria-labelledby="snd-title">
        <div className="aura aura-violet drift" style={{ width: 480, height: 480, bottom: -160, right: -180, opacity: 0.4 }} aria-hidden="true" />
        <div className="shell relative">
          <div className="ar-rm-head">
            <div data-reveal>
              <Chapter n="06" label="Music + digital media" />
              <h2 id="snd-title" className="h-section" style={{ marginTop: 22 }}>
                From Data <span className="italic-accent">to Sound</span>
              </h2>
              <div style={{ marginTop: 20 }}><StatusTag status="ongoing" /></div>
            </div>
            <div className="ar-prose" data-reveal style={rd(120)}>
              <p className="lede">Music production provides a natural environment for signal-to-art experimentation.</p>
              <p className="body-muted">
                Digital instruments, synthesizers, mixers, visual systems, and production software already operate through
                changing parameters.
              </p>
              <p className="body-muted">
                NeuroViu explores whether human input can become another source of creative variation within these
                systems.
              </p>
            </div>
          </div>

          <div className="ar-wide-photos">
            <div data-reveal>
              <Photo
                src="/media/art-research/studio-mixer.jpg"
                alt="Ashlei Lewis at a mixing console with a laptop and synthesizer in a studio."
                width={1179}
                height={614}
                caption="Production session · mixing console and synthesizer"
              />
            </div>
            <div data-reveal style={rd(120)}>
              <Photo
                src="/media/art-research/studio-session.jpg"
                alt="Ashlei Lewis smiling at a mixing desk with a laptop while others sit in the room behind her."
                width={1179}
                height={628}
                caption="Working with digital instruments and production software"
              />
            </div>
          </div>

          <div className="ar-mappings" data-reveal>
            <span className="mono-label">Possible artistic mappings</span>
            <ul className="topic-list" style={{ marginTop: 14 }}>
              {SOUND_MAPPINGS.map(m => (
                <li key={m}><span className="topic-tag ar-tag">{m}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────── 07 · THE ARTISTIC FRAMEWORK ─────────────── */}
      <section id="framework" className="section panel-ink relative overflow-hidden" aria-labelledby="fw-title">
        <div className="shell relative">
          <div style={{ maxWidth: 820 }} data-reveal>
            <Chapter n="07" label="The artistic framework" />
            <h2 id="fw-title" className="h-section" style={{ marginTop: 22 }}>
              From Lab to Stage to <span className="italic-accent">Immersive Space</span>
            </h2>
          </div>

          <ol className="ar-stages">
            {STAGES.map((s, i) => (
              <li key={s.name} data-reveal style={rd(i * 90)}>
                <div className="ar-stage-media">
                  {s.image ? (
                    <img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} loading="lazy" decoding="async" />
                  ) : (
                    <div className="ar-stage-future" aria-hidden="true">
                      <svg viewBox="0 0 120 120" width="72%" fill="none">
                        <rect x="14" y="20" width="92" height="56" rx="3" stroke="#b7a9e4" strokeOpacity="0.6" strokeDasharray="4 5" />
                        <path d="M22 50 C 40 30, 52 66, 70 46 S 96 40, 98 48" stroke="#e3c2d3" strokeWidth="1.6" />
                        <ellipse cx="60" cy="100" rx="30" ry="6" stroke="#c3bcdf" strokeOpacity="0.6" />
                        <circle cx="60" cy="88" r="4" fill="#c3bcdf" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ar-stage-body">
                  <span className="ar-stage-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ar-stage-name">{s.name}</h3>
                  <p className="body-muted">{s.body}</p>
                  <div style={{ marginTop: 14 }}>
                    <StatusTag status={s.status} label={s.status === 'documented' ? 'Documented' : undefined} onDark />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── 08 · PHILOSOPHY ─────────────── */}
      <section id="philosophy" className="section panel-ivory relative overflow-hidden" aria-labelledby="ph-title">
        <div className="aura aura-rose drift-slow" style={{ width: 600, height: 600, top: -100, left: '30%', opacity: 0.35 }} aria-hidden="true" />
        <div className="shell relative">
          <div data-reveal>
            <Chapter n="08" label="Philosophy" />
          </div>
          <h2 id="ph-title" className="ar-statement" data-reveal style={rd(80)}>
            The technology should eventually <span className="ar-fade">disappear.</span>
          </h2>

          <div className="ar-philosophy">
            <div className="ar-prose" data-reveal style={{ marginTop: 0 }}>
              <p className="lede">
                For the audience, the most important experience is not the hardware or data pipeline. It is the feeling
                that their presence matters.
              </p>
              <p className="body-muted">
                NeuroViu becomes an artistic medium when sensing becomes input, data becomes material, mapping becomes
                composition, and response becomes experience.
              </p>
            </div>

            <ul className="ar-becomes">
              {BECOMES.map((b, i) => (
                <li key={b.a} data-reveal style={rd(i * 110)}>
                  {b.a} <span className="italic-accent">becomes</span> {b.b}.
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────── PORTFOLIO ─────────────── */}
      <section id="portfolio" className="section panel-sky relative overflow-hidden" aria-labelledby="pt-title">
        <div className="aura aura-violet drift" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.45 }} aria-hidden="true" />
        <div className="shell relative">
          <div className="ar-portfolio-head">
            <div data-reveal>
              <span className="eyebrow">Portfolio</span>
              <h2 id="pt-title" className="h-section" style={{ marginTop: 18 }}>
                Explore the <span className="italic-accent">Work</span>
              </h2>
              <p className="lede measure" style={{ marginTop: 18 }}>
                Projects, performances, prototypes, and residency proposals from NeuroViu × Aerith Dawn.
              </p>
            </div>
            <div className="ar-portfolio-cta" data-reveal style={rd(120)}>
              <a
                className="btn btn-primary"
                href={portfolioHref}
                {...(PORTFOLIO_URL ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                View Art + Research Portfolio
                <Arrow />
                {PORTFOLIO_URL ? <span className="sr-only"> (PDF, opens in a new tab)</span> : null}
              </a>
              <span className="mono-label">{PORTFOLIO_URL ? 'PDF portfolio' : 'Portfolio PDF available on request'}</span>
            </div>
          </div>

          <ul className="fp-grid">
            {WORK.map((w, i) => {
              const color = STATUS[w.status].color
              return (
                <li key={w.title} style={rd((i % 3) * 90)} data-reveal>
                  <article
                    className={`card card-lift fp-card ${w.placeholder ? 'fp-card-placeholder' : ''}`}
                    style={{ '--fp-accent': color } as unknown as React.CSSProperties}
                  >
                    {w.image && (
                      <Photo className="fp-image" src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} />
                    )}
                    <div className="flex items-start justify-between" style={{ gap: 12 }}>
                      <span className="mono-label" style={{ color: 'var(--indigo-soft)' }}>{w.kind}</span>
                      <StatusTag status={w.status} />
                    </div>
                    <h3 className="h-card" style={{ fontSize: 21, marginTop: 14 }}>{w.title}</h3>
                    <div className="fp-meta"><span>{w.year}</span></div>
                    <p className="body-muted" style={{ fontSize: 15, marginTop: 12, flex: 1 }}>{w.description}</p>
                    <div className="fp-foot">
                      {w.link ? (
                        <a className="link-arrow" href={w.link.href}>
                          {w.link.label ?? 'View project'}
                          <Arrow />
                        </a>
                      ) : (
                        <span className="mono-label">Details forthcoming</span>
                      )}
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>

          <p className="fp-disclaimer" data-reveal>
            <span className="mono-label">Note on artistic research</span>
            NeuroViu’s artistic work is experimental and non-diagnostic. It does not read thoughts, identify emotions, or
            provide medical information, and artistic uses of sensing are not clinical applications. Work is labeled as
            documentation, prototype, ongoing experimentation, or proposed concept so it is never mistaken for a
            completed installation.
          </p>
        </div>
      </section>
    </SubpageShell>
  )
}
