/* Brand pieces shared by the home page and the standalone resource pages. */

export const DISCLAIMER =
  'NeuroViu is currently a research-oriented neurotechnology platform. NeuroViu products and software are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Research findings should not be interpreted as clinical diagnosis or medical advice.'

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: 'linear-gradient(140deg, #4a3f98 0%, #8574cd 55%, #b1728f 100%)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(58, 47, 126, 0.28)',
          flex: 'none',
        }}
        aria-hidden="true"
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 4.6c-3 0-5.3 2.1-5.3 4.7 0 1.1.4 2 1 2.8-.5.7-.7 1.5-.7 2.3 0 2.3 2 4 5 4" />
          <path d="M12 4.6c3 0 5.3 2.1 5.3 4.7 0 1.1-.4 2-1 2.8.5.7.7 1.5.7 2.3 0 2.3-2 4-5 4" />
          <circle cx="12" cy="12" r="1.3" fill="#fff" stroke="none" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: '-0.025em',
          color: onDark ? '#fff' : 'var(--indigo-ink)',
        }}
      >
        NeuroViu
        <span style={{ fontSize: 10, verticalAlign: 'super', fontWeight: 400, opacity: 0.6 }}>™</span>
      </span>
    </span>
  )
}

/** Soft-framed photograph used across the home page and standalone pages. */
export function Photo({
  src,
  alt,
  caption,
  width,
  height,
  className = '',
}: {
  src: string
  alt: string
  caption?: React.ReactNode
  width: number
  height: number
  className?: string
}) {
  return (
    <figure className={`photo-figure ${className}`}>
      <span className="photo-frame">
        <img className="photo" src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </span>
      {caption ? <figcaption className="photo-cap">{caption}</figcaption> : null}
    </figure>
  )
}

/** Header + footer chrome for pages outside the single-page home site. */
const SUBPAGE_LINKS = [
  { label: 'She’s a Flame', href: '/shes-a-flame' },
  { label: 'Art + Research', href: '/art-research' },
  { label: 'Resources', href: '/resources' },
]

export function SubpageShell({ children, current }: { children: React.ReactNode; current?: string }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="topbar topbar-solid">
        <nav className="shell subnav" aria-label="Primary">
          <a href="/" style={{ textDecoration: 'none' }} aria-label="NeuroViu — home">
            <Wordmark />
          </a>
          <div className="subnav-links">
            {SUBPAGE_LINKS.map(link => (
              <a
                key={link.href}
                className="nav-link"
                href={link.href}
                aria-current={current === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            <a className="btn btn-primary btn-sm" href="/#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="panel-ink relative overflow-hidden" style={{ paddingBlock: '48px 34px' }}>
        <div className="shell relative">
          <a href="/" style={{ textDecoration: 'none' }} aria-label="NeuroViu — home">
            <Wordmark onDark />
          </a>
          <p className="body-dim" style={{ fontSize: 13.5, marginTop: 24, maxWidth: '86ch' }}>{DISCLAIMER}</p>
          <div className="footer-base">
            <span className="mono-label">© 2026 NeuroViu. All rights reserved.</span>
            <span className="mono-label">Research use only — not a medical device.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
