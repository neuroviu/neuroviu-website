import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Photo, SubpageShell, Wordmark } from '@/components/site'

const TITLE = 'She’s a Flame Women’s Health Conference | NeuroViu'
const DESCRIPTION =
  'She’s a Flame is a women-centered health and wellness conference presented by NeuroViu™, where science, wellness, innovation, and lived experience meet.'

/* ═══════════════════════════════════════════════════════════════════════════
   Editable conference content
   ═══════════════════════════════════════════════════════════════════════════ */

/* Conference image or promotional graphic. Drop the file in `public/media/`
   and set `src` (plus its real pixel size) here. While `src` is empty, the hero
   shows the built-in flame graphic instead. */
const CONFERENCE_IMAGE = {
  src: '',
  alt: 'She’s a Flame Women’s Health Conference promotional graphic',
  width: 1200,
  height: 1500,
}

/* Conference details. Update each value as it is confirmed. */
const CONFERENCE_INFO: { label: string; value: string }[] = [
  { label: 'Date', value: 'To Be Announced' },
  { label: 'Location', value: 'To Be Announced' },
  { label: 'Hosted by', value: 'NeuroViu™' },
  { label: 'Founder', value: 'Ashlei Lewis' },
  { label: 'Format', value: 'Talks, panels, educational sessions, demonstrations, and community conversations' },
]

/* Speakers & contributors. Add one entry per confirmed speaker; put photos in
   `public/media/` and reference them as '/media/your-photo.jpg'. Every field
   except `name` is optional. While the list is empty, the section shows
   "to be announced" cards. */
type Speaker = {
  name: string
  photo?: string
  credentials?: string
  organization?: string
  session?: string
  bio?: string
}

const SPEAKERS: Speaker[] = []

/* Where the three call-to-action buttons lead. They open the temporary
   interest form on this page; replace a value with a registration or
   application URL once one is available. */
type InquiryType = 'interest-list' | 'speaker-interest' | 'partner'

const INQUIRY_TYPES: { value: InquiryType; label: string; note: string; href: string }[] = [
  { value: 'interest-list', label: 'Join the Interest List', note: 'Hear first when the date, venue, and registration open.', href: '' },
  { value: 'speaker-interest', label: 'Speaker Interest', note: 'Share a talk, panel, demonstration, or story you’d like to bring.', href: '' },
  { value: 'partner', label: 'Partner With Us', note: 'Sponsor, exhibit, host, or collaborate on the program.', href: '' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Static content
   ═══════════════════════════════════════════════════════════════════════════ */

const TOPICS = [
  'Brain health',
  'Cognitive wellness',
  'Women’s health',
  'Mental well-being',
  'Healthy aging',
  'Neurodiversity',
  'Emerging health technology',
  'Complementary health practices',
  'Lived experience in research & care',
]

const FOCUS_AREAS: { title: string; body: string; a: string; b: string; icon: React.ReactNode }[] = [
  {
    title: 'Brain & Cognitive Health',
    body: 'Brain health, cognition, neurological wellness, aging, and emerging neuroscience.',
    a: '#b7a9e4',
    b: '#5a4cb0',
    icon: (
      <>
        <path d="M12 4.6c-3 0-5.3 2.1-5.3 4.7 0 1.1.4 2 1 2.8-.5.7-.7 1.5-.7 2.3 0 2.3 2 4 5 4" />
        <path d="M12 4.6c3 0 5.3 2.1 5.3 4.7 0 1.1-.4 2-1 2.8.5.7.7 1.5.7 2.3 0 2.3-2 4-5 4" />
        <path d="M12 4.6v13.8" opacity="0.5" />
      </>
    ),
  },
  {
    title: 'Women’s Health',
    body: 'Health experiences, research gaps, prevention, education, and improving representation of women in health research.',
    a: '#f0b9a2',
    b: '#c4573a',
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M12 14v7M9 18h6" />
      </>
    ),
  },
  {
    title: 'Health Technology & Innovation',
    body: 'Wearable technology, digital health, AI, neurotechnology, and new approaches to understanding health.',
    a: '#b3c6ec',
    b: '#4f6fc0',
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9.5 12h1.2l.8-2 1.4 4 .8-2h.8" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" opacity="0.6" />
      </>
    ),
  },
  {
    title: 'Whole-Person Wellness',
    body: 'Evidence-informed conversations around lifestyle, stress, sleep, nutrition, movement, and complementary approaches to wellness.',
    a: '#c9dcb8',
    b: '#4f7a52',
    icon: (
      <>
        <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
        <path d="M5 19c3-4 6-7 9.5-9.5" opacity="0.6" />
      </>
    ),
  },
  {
    title: 'Lived Experience',
    body: 'Centering the perspectives of patients, caregivers, people with disabilities, neurodivergent individuals, and communities historically underrepresented in research.',
    a: '#e3c2d3',
    b: '#a2637f',
    icon: (
      <>
        <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 014 13.5z" />
        <path d="M12 13s-3-1.8-3-3.7a1.6 1.6 0 013-.8 1.6 1.6 0 013 .8C15 11.2 12 13 12 13z" opacity="0.7" />
      </>
    ),
  },
  {
    title: 'Community & Education',
    body: 'Making science and health information accessible outside traditional academic and clinical environments.',
    a: '#f3d29c',
    b: '#b07726',
    icon: (
      <>
        <circle cx="8" cy="8.5" r="2.6" />
        <circle cx="16" cy="8.5" r="2.6" />
        <path d="M3 19c.4-3 2.4-5 5-5s4.6 2 5 5M11 19c.4-3 2.4-5 5-5s4.6 2 5 5" />
      </>
    ),
  },
]

const HISTORY = [
  {
    label: 'Where it began',
    body: 'A community-centered exploration of women’s wellness and alternative approaches to health.',
  },
  {
    label: 'What carries forward',
    body: 'An emphasis on community, curiosity, and lived experience.',
  },
  {
    label: 'The next chapter',
    body: 'Hosted by NeuroViu™, expanding the conversation to neuroscience, research, health technology, women’s health, and evidence-informed wellness.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Bits
   ═══════════════════════════════════════════════════════════════════════════ */

/** Stagger helper for scroll-reveal elements. */
const rd = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as unknown as React.CSSProperties

function Glyph({ children, size = 22 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/* Stand-in promotional graphic: a flame drawn from layered signal lines,
   echoing NeuroViu's EEG traces. Shown until CONFERENCE_IMAGE.src is set. */
const SIGNAL_LINES = Array.from({ length: 7 }, (_, i) => {
  const y = 300 + i * 22
  const amp = 6 + (i % 3) * 4
  let d = `M0 ${y}`
  for (let x = 0; x <= 400; x += 20) {
    const dy = Math.sin(x / 31 + i * 0.9) * amp + Math.sin(x / 11 + i) * (amp / 3)
    d += ` L${x} ${(y + dy).toFixed(1)}`
  }
  return { d, opacity: (0.12 + (i % 3) * 0.06).toFixed(2) }
})

function FlamePoster() {
  return (
    <div className="sf-poster" role="img" aria-label="She’s a Flame promotional graphic: a stylized flame rising from signal lines">
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sf-outer" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c4573a" />
            <stop offset="55%" stopColor="#e0a050" />
            <stop offset="100%" stopColor="#f6dccd" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="sf-inner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff4ea" />
            <stop offset="100%" stopColor="#f3c58a" />
          </linearGradient>
          <linearGradient id="sf-violet" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8574cd" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#b7a9e4" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="sf-glow" cx="50%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#e0a050" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e0a050" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="320" r="190" fill="url(#sf-glow)" />

        {SIGNAL_LINES.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke="#f6dccd" strokeWidth="1" opacity={l.opacity} />
        ))}

        <g className="sf-flicker">
          <path
            d="M200 70 C238 128 292 170 292 262 C292 336 252 384 200 384 C148 384 108 336 108 268 C108 214 138 182 160 152 C168 186 178 204 194 214 C206 168 196 118 200 70 Z"
            fill="url(#sf-outer)"
            opacity="0.94"
          />
        </g>
        <g className="sf-flicker sf-flicker-b">
          <path
            d="M248 150 C276 196 290 234 278 290 C270 324 250 346 226 356 C252 316 256 272 248 150 Z"
            fill="url(#sf-violet)"
          />
          <path
            d="M200 214 C222 250 246 276 246 314 C246 350 226 372 200 372 C174 372 154 350 154 318 C154 292 168 274 182 258 C186 276 192 286 200 290 C206 268 202 242 200 214 Z"
            fill="url(#sf-inner)"
          />
        </g>

        <text x="200" y="438" textAnchor="middle" fill="#f6f4fb" fontFamily="Fraunces, serif" fontSize="34" fontStyle="italic" fontWeight="300">
          She’s a Flame
        </text>
        <text x="200" y="462" textAnchor="middle" fill="#c3bcdf" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3">
          WOMEN’S HEALTH CONFERENCE
        </text>
      </svg>
      <div className="sf-poster-label" aria-hidden="true">
        <span>Presented by NeuroViu™</span>
        <span>Graphic placeholder</span>
      </div>
    </div>
  )
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const details = [speaker.credentials, speaker.organization].filter(Boolean).join(' · ')
  return (
    <article className="card card-lift sf-speaker">
      <div className="sf-speaker-photo">
        {speaker.photo ? (
          <img src={speaker.photo} alt={`Portrait of ${speaker.name}`} loading="lazy" decoding="async" />
        ) : (
          <Glyph size={56}>
            <circle cx="12" cy="8.5" r="3.6" />
            <path d="M4.8 20c.6-3.8 3.4-6.2 7.2-6.2s6.6 2.4 7.2 6.2" />
          </Glyph>
        )}
      </div>
      <div className="sf-speaker-body">
        <h3 className="h-card" style={{ fontSize: 22 }}>{speaker.name}</h3>
        {details && <p className="body-muted" style={{ fontSize: 14.5, marginTop: 6 }}>{details}</p>}
        {speaker.session && (
          <div className="sf-session">
            <span className="mono-label" style={{ display: 'block', fontSize: 10.5, marginBottom: 4 }}>Session</span>
            {speaker.session}
          </div>
        )}
        {speaker.bio && (
          <details className="sf-bio">
            <summary>
              Read biography
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p>{speaker.bio}</p>
          </details>
        )}
      </div>
    </article>
  )
}

function SpeakerPlaceholder({ n }: { n: number }) {
  return (
    <article className="card sf-speaker sf-speaker-tba">
      <div className="sf-speaker-photo">
        <Glyph size={56}>
          <circle cx="12" cy="8.5" r="3.6" />
          <path d="M4.8 20c.6-3.8 3.4-6.2 7.2-6.2s6.6 2.4 7.2 6.2" />
        </Glyph>
      </div>
      <div className="sf-speaker-body">
        <span className="mono-label">Speaker {String(n).padStart(2, '0')}</span>
        <h3 className="h-card" style={{ fontSize: 22, marginTop: 8 }}>To be announced</h3>
        <p className="body-muted" style={{ fontSize: 14.5, marginTop: 8 }}>
          Name, credentials, organization, session title, and biography will appear here as speakers are confirmed.
        </p>
      </div>
    </article>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Interest form — Netlify Forms (AJAX to the static skeleton at /__forms.html).
   A temporary stand-in until registration and speaker applications open.
   ═══════════════════════════════════════════════════════════════════════════ */

function InterestForm({ type, setType }: { type: InquiryType; setType: (t: InquiryType) => void }) {
  const [fields, setFields] = useState({ name: '', email: '', organization: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }))

  const current = INQUIRY_TYPES.find(t => t.value === type) ?? INQUIRY_TYPES[0]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // GitHub Pages cannot process Netlify Forms. Never claim a submission succeeded.
    setStatus('error')
  }

  if (status === 'done') {
    return (
      <div className="card" style={{ padding: '44px 32px', textAlign: 'center' }} role="status">
        <span className="sf-focus-icon" style={{ '--sf-a': '#f0b9a2', '--sf-b': '#c4573a', marginBottom: 18 } as unknown as React.CSSProperties}>
          <Glyph size={24}><path d="M4.4 12.6l5.2 5.2L19.6 7" /></Glyph>
        </span>
        <h3 className="h-card">Thank you — you’re on our list.</h3>
        <p className="body-muted" style={{ marginTop: 12, fontSize: 16 }}>
          The NeuroViu team will be in touch as She’s a Flame details are confirmed.
        </p>
      </div>
    )
  }

  return (
    <form
      name="shes-a-flame-interest"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card"
      style={{ padding: '30px 26px' }}
      aria-describedby="sf-form-note"
    >
      <input type="hidden" name="form-name" value="shes-a-flame-interest" />
      <input type="hidden" name="inquiry-type" value={type} />
      <p style={{ position: 'absolute', left: -9999, top: 'auto' }} aria-hidden="true">
        <label>
          Do not fill this out
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="sf-tabs" role="group" aria-label="I’m interested in">
        {INQUIRY_TYPES.map(t => (
          <button key={t.value} type="button" className="sf-tab" aria-pressed={type === t.value} onClick={() => setType(t.value)}>
            {t.label}
          </button>
        ))}
      </div>
      <h3 className="h-card" style={{ marginTop: 22 }}>{current.label}</h3>
      <p className="body-muted" style={{ fontSize: 15, marginTop: 6 }}>{current.note}</p>

      <div style={{ display: 'grid', gap: 18, marginTop: 22 }}>
        <div>
          <label className="field-label" htmlFor="sf-name">Name</label>
          <input id="sf-name" className="field" type="text" name="name" autoComplete="name"
            value={fields.name} onChange={set('name')} required />
        </div>
        <div>
          <label className="field-label" htmlFor="sf-email">Email</label>
          <input id="sf-email" className="field" type="email" name="email" autoComplete="email"
            placeholder="you@example.com" value={fields.email} onChange={set('email')} required />
        </div>
        <div>
          <label className="field-label" htmlFor="sf-org">
            Organization or affiliation <span className="body-dim" style={{ fontWeight: 400 }}>(optional)</span>
          </label>
          <input id="sf-org" className="field" type="text" name="organization" autoComplete="organization"
            value={fields.organization} onChange={set('organization')} />
        </div>
        <div>
          <label className="field-label" htmlFor="sf-message">
            {type === 'speaker-interest'
              ? 'Proposed topic or session idea'
              : type === 'partner'
                ? 'How you’d like to partner'
                : 'Anything you’d like us to know'}
            {type === 'interest-list' && <span className="body-dim" style={{ fontWeight: 400 }}> (optional)</span>}
          </label>
          <textarea id="sf-message" className="field" name="message"
            value={fields.message} onChange={set('message')} required={type !== 'interest-list'} />
        </div>

        <button type="submit" className="btn btn-ember" style={{ width: '100%' }} disabled={status === 'sending'}>
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
              Submit
              <Arrow size={18} />
            </>
          )}
        </button>

        {status === 'error' && (
          <p role="alert" style={{ color: '#a33d5c', fontSize: 14.5, margin: 0 }}>
            That did not go through. Please try again in a moment.
          </p>
        )}

        <p id="sf-form-note" className="body-dim" style={{ fontSize: 13, margin: 0 }}>
          This is a temporary interest form while registration and speaker applications are being prepared. By
          submitting, you agree to be contacted by NeuroViu about She’s a Flame.
        </p>
      </div>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */

export const Route = createFileRoute('/shes-a-flame')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: '/shes-a-flame' }],
  }),
  component: SheIsAFlamePage,
})

function SheIsAFlamePage() {
  const [inquiry, setInquiry] = useState<InquiryType>('interest-list')

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

  /* Each CTA goes to its external URL once set; until then it preselects the
     matching tab on the temporary form below. */
  const ctaProps = (t: (typeof INQUIRY_TYPES)[number]) =>
    t.href ? { href: t.href } : { href: '#get-involved', onClick: () => setInquiry(t.value) }

  return (
    <SubpageShell current="/shes-a-flame">
      <div className="sf">
        {/* ─────────────── HERO ─────────────── */}
        <section className="sf-hero panel-ivory relative overflow-hidden" aria-labelledby="sf-title">
          <div className="aura aura-ember drift" style={{ width: 600, height: 600, top: -200, right: -180, opacity: 0.6 }} aria-hidden="true" />
          <div className="aura aura-violet drift-slow" style={{ width: 460, height: 460, bottom: -200, left: -180, opacity: 0.4 }} aria-hidden="true" />
          <div className="shell relative">
            <div className="sf-hero-grid">
              <div>
                <span className="eyebrow" data-reveal>A NeuroViu™ Initiative</span>
                <h1 id="sf-title" className="sf-display" data-reveal style={rd(80)}>
                  She’s a <em>Flame</em>
                  <span className="sf-display-sub">Women’s Health Conference</span>
                </h1>
                <p className="sf-tagline" data-reveal style={rd(160)}>
                  Where science, wellness, innovation, and lived experience meet.
                </p>
                <div data-reveal style={rd(220)}>
                  <a href="/" className="sf-presented" style={{ textDecoration: 'none' }} aria-label="Presented by NeuroViu — home">
                    <Wordmark />
                    <span className="mono-label">Presented by NeuroViu™</span>
                  </a>
                </div>
                <div className="sf-actions" data-reveal style={rd(280)}>
                  {INQUIRY_TYPES.map((t, i) => (
                    <a key={t.value} className={`btn ${i === 0 ? 'btn-ember' : 'btn-quiet'}`} {...ctaProps(t)}>
                      {t.label}
                      {i === 0 && <Arrow />}
                    </a>
                  ))}
                </div>
              </div>

              <div className="sf-media" data-reveal style={rd(180)}>
                {CONFERENCE_IMAGE.src ? (
                  <Photo
                    src={CONFERENCE_IMAGE.src}
                    alt={CONFERENCE_IMAGE.alt}
                    width={CONFERENCE_IMAGE.width}
                    height={CONFERENCE_IMAGE.height}
                  />
                ) : (
                  <FlamePoster />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── ABOUT ─────────────── */}
        <section id="about" className="section panel-peach relative overflow-hidden" aria-labelledby="sf-about-title">
          <div className="shell relative">
            <div className="sf-split">
              <div data-reveal>
                <span className="eyebrow">About the Conference</span>
                <h2 id="sf-about-title" className="h-section" style={{ marginTop: 18 }}>
                  Health, seen from <span className="italic-accent">many perspectives</span>
                </h2>
              </div>
              <div className="sf-prose" data-reveal style={rd(100)}>
                <p>
                  She’s a Flame creates a space for women to explore health from multiple perspectives. Hosted by
                  NeuroViu™, the conference connects researchers, health professionals, innovators, educators,
                  advocates, creators, and community voices for conversations that make health information more
                  understandable, inclusive, and relevant to everyday life.
                </p>
                <p>
                  The conference reflects NeuroViu’s broader commitment to brain health, health innovation, research,
                  education, and human-centered approaches to wellness. Topics may span:
                </p>
                <ul className="sf-topics" style={{ listStyle: 'none', padding: 0 }}>
                  {TOPICS.map(t => (
                    <li key={t} className="topic-tag">{t}</li>
                  ))}
                </ul>
                <p className="sf-note">
                  She’s a Flame is educational and community-focused. It does not provide medical diagnosis or
                  individualized medical treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── FOCUS AREAS ─────────────── */}
        <section id="focus" className="section panel-ivory relative overflow-hidden" aria-labelledby="sf-focus-title">
          <div className="aura aura-amber drift-slow" style={{ width: 480, height: 480, top: 40, left: -220, opacity: 0.45 }} aria-hidden="true" />
          <div className="shell relative">
            <div data-reveal>
              <span className="eyebrow">Conference Focus Areas</span>
              <h2 id="sf-focus-title" className="h-section measure" style={{ marginTop: 18 }}>
                Six threads, <span className="italic-accent">one conversation</span>
              </h2>
            </div>
            <ul className="sf-focus-grid">
              {FOCUS_AREAS.map((f, i) => (
                <li key={f.title} data-reveal style={rd((i % 3) * 90)}>
                  <article
                    className="card card-lift sf-focus"
                    style={{ '--sf-a': f.a, '--sf-b': f.b } as unknown as React.CSSProperties}
                  >
                    <span className="sf-focus-icon"><Glyph>{f.icon}</Glyph></span>
                    <span className="mono-label sf-focus-n">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="h-card" style={{ fontSize: 22, marginTop: 22 }}>{f.title}</h3>
                    <p className="body-muted" style={{ fontSize: 15.5, marginTop: 10 }}>{f.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────── SPEAKERS ─────────────── */}
        <section id="speakers" className="section panel-mist relative overflow-hidden" aria-labelledby="sf-speakers-title">
          <div className="shell relative">
            <div className="sf-split" style={{ alignItems: 'end' }}>
              <div data-reveal>
                <span className="eyebrow">Speakers &amp; Contributors</span>
                <h2 id="sf-speakers-title" className="h-section" style={{ marginTop: 18 }}>
                  Researchers. Practitioners. Innovators. <span className="italic-accent">Community Voices.</span>
                </h2>
              </div>
              <div data-reveal style={rd(100)}>
                <p className="lede">
                  Speakers will be announced as the program comes together. Interested in contributing a talk, panel,
                  demonstration, or story?
                </p>
                <a className="link-arrow" style={{ marginTop: 16 }} {...ctaProps(INQUIRY_TYPES[1])}>
                  Share speaker interest
                  <Arrow />
                </a>
              </div>
            </div>
            <ul className="sf-speaker-grid">
              {SPEAKERS.length > 0
                ? SPEAKERS.map((s, i) => (
                    <li key={s.name} data-reveal style={rd((i % 3) * 90)}>
                      <SpeakerCard speaker={s} />
                    </li>
                  ))
                : [1, 2, 3].map(n => (
                    <li key={n} data-reveal style={rd((n - 1) * 90)}>
                      <SpeakerPlaceholder n={n} />
                    </li>
                  ))}
            </ul>
          </div>
        </section>

        {/* ─────────────── CONFERENCE INFORMATION ─────────────── */}
        <section id="details" className="section panel-ink relative overflow-hidden" aria-labelledby="sf-info-title">
          <div className="aura aura-ember drift" style={{ width: 520, height: 520, bottom: -220, right: -160, opacity: 0.5 }} aria-hidden="true" />
          <div className="shell relative">
            <div className="sf-info-grid">
              <div data-reveal>
                <span className="eyebrow">Conference Information</span>
                <h2 id="sf-info-title" className="h-section" style={{ marginTop: 18, marginBottom: 32 }}>
                  Save your <span className="italic-accent">spark</span>
                </h2>
                <dl className="sf-info">
                  {CONFERENCE_INFO.map(row => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="sf-cta-stack" data-reveal style={rd(120)}>
                {INQUIRY_TYPES.map((t, i) => (
                  <a key={t.value} className={`sf-cta ${i === 0 ? 'sf-cta-primary' : ''}`} {...ctaProps(t)}>
                    <span>
                      <span className="sf-cta-title">{t.label}</span>
                      <span className="sf-cta-note">{t.note}</span>
                    </span>
                    <Arrow size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── A NEW CHAPTER ─────────────── */}
        <section id="history" className="section panel-ivory relative overflow-hidden" aria-labelledby="sf-history-title">
          <div className="shell relative">
            <div className="sf-chapter">
              <div data-reveal>
                <span className="eyebrow">History</span>
                <h2 id="sf-history-title" className="h-section" style={{ marginTop: 18 }}>
                  A New <span className="italic-accent">Chapter</span>
                </h2>
                <p className="lede" style={{ marginTop: 20 }}>
                  She’s a Flame began as a community-centered exploration of women’s wellness and alternative
                  approaches to health. Its next chapter brings the conference under NeuroViu™, expanding the
                  conversation to include neuroscience, research, health technology, women’s health, and
                  evidence-informed wellness while preserving its emphasis on community, curiosity, and lived
                  experience.
                </p>
              </div>
              <ol className="sf-timeline" data-reveal style={rd(120)}>
                {HISTORY.map(h => (
                  <li key={h.label}>
                    <span className="sf-timeline-dot" aria-hidden="true" />
                    <span className="mono-label">{h.label}</span>
                    <p className="body-muted" style={{ fontSize: 16, marginTop: 6 }}>{h.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─────────────── GET INVOLVED ─────────────── */}
        <section id="get-involved" className="section panel-peach relative overflow-hidden" aria-labelledby="sf-form-title">
          <div className="aura aura-rose drift-slow" style={{ width: 440, height: 440, top: -120, right: -160, opacity: 0.45 }} aria-hidden="true" />
          <div className="shell relative">
            <div className="sf-form-grid">
              <div data-reveal>
                <span className="eyebrow">Get Involved</span>
                <h2 id="sf-form-title" className="h-section" style={{ marginTop: 18 }}>
                  Help keep the <span className="italic-accent">flame</span> lit
                </h2>
                <p className="lede" style={{ marginTop: 20 }}>
                  Registration and speaker applications are not open yet. Join the interest list, tell us about a
                  session you’d like to bring, or explore partnering with NeuroViu on She’s a Flame.
                </p>
                <p className="body-dim" style={{ fontSize: 14.5, marginTop: 20 }}>
                  Research and partnership questions about NeuroViu itself? <a className="crumb-link" href="/#contact">Contact NeuroViu</a>.
                </p>
              </div>
              <div data-reveal style={rd(100)}>
                <InterestForm type={inquiry} setType={setInquiry} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </SubpageShell>
  )
}
