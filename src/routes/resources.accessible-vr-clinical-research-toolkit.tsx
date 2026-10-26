import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import { ACCESSIBLE_VR_TOOLKIT as TOOLKIT } from '@/components/resources'

const TITLE = `${TOOLKIT.title} | NeuroViu`

export const Route = createFileRoute('/resources/accessible-vr-clinical-research-toolkit')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: TOOLKIT.summary },
      { property: 'og:title', content: TOOLKIT.title },
      { property: 'og:description', content: TOOLKIT.summary },
      { property: 'og:type', content: 'article' },
    ],
    links: [
      { rel: 'canonical', href: `/resources/${TOOLKIT.slug}` },
      { rel: 'alternate', type: 'application/pdf', href: TOOLKIT.pdf.href, title: `${TOOLKIT.title} (PDF)` },
    ],
  }),
  component: ToolkitPage,
})

/* Mirrors the toolkit's table of contents. Update alongside the PDF. */
const CONTENTS = [
  'Accessible Adaptive VR Framework',
  'Accessibility Planning Checklist',
  'Participant Accommodation Planning Form',
  'Accessible Consent and Communication Checklist',
  'Participant Pause / Stop / Modification Procedure',
  'Barrier → Accommodation → Participant Response → Design Modification Log',
  'Behavioral Data Interpretation Safeguards',
  'Lived-Experience Co-Design Guide',
  'Implementation and Adaptation Guide',
  'Skyward Sojourn Implementation Context',
]

const PRINCIPLES: { title: string; body: string }[] = [
  { title: 'Anticipate barriers', body: 'Examine design, recruitment, consent, technology, procedures, data collection, and dissemination before participants encounter them.' },
  { title: 'Ask rather than assume', body: 'Provide a clear process for participants to describe access needs and preferred accommodations.' },
  { title: 'Preserve participant control', body: 'Define pause, stop, modification, and withdrawal pathways that are easy to use during technology-assisted procedures.' },
  { title: 'Use lived experience', body: 'Involve people with disabilities in identifying barriers, reviewing materials, and testing procedures.' },
  { title: 'Interpret behavior cautiously', body: 'Do not automatically assign psychological meaning to movement, posture, gaze, or response patterns that may reflect disability or assistive-technology use.' },
  { title: 'Document and improve', body: 'Turn recurring barriers and participant feedback into lasting protocol, technology, and training changes.' },
]

const DOWNLOAD_LABEL = `Download ${TOOLKIT.title} (PDF)`

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
    </svg>
  )
}

function DownloadButton() {
  return (
    <a className="btn btn-primary" href={TOOLKIT.pdf.href} download={TOOLKIT.pdf.downloadName}>
      <DownloadIcon />
      {DOWNLOAD_LABEL}
    </a>
  )
}

function ToolkitPage() {
  return (
    <SubpageShell>
      <section className="panel-sky relative overflow-hidden subpage-section" aria-labelledby="toolkit-title">
        <div className="aura aura-violet drift-slow" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.5 }} aria-hidden="true" />
        <div className="aura aura-rose drift" style={{ width: 360, height: 360, bottom: -140, left: -160, opacity: 0.4 }} aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/resources" className="crumb-link">Resources</a>
            <span aria-hidden="true"> / </span>
            <span>{TOOLKIT.kind}</span>
          </nav>

          <h1 id="toolkit-title" className="h-section" style={{ marginTop: 22, maxWidth: '18ch' }}>
            Accessible VR <span className="italic-accent">Clinical Research</span> Toolkit
          </h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{TOOLKIT.summary}</p>

          <div className="toolkit-actions">
            <DownloadButton />
            <a className="btn btn-quiet" href={TOOLKIT.pdf.href} target="_blank" rel="noopener">
              View in browser
            </a>
          </div>
          <p className="mono-label" style={{ marginTop: 16 }}>
            PDF · {TOOLKIT.pdf.pages} pages · {TOOLKIT.pdf.size} · Free to view, download, and adapt
          </p>
        </div>
      </section>

      <section className="panel-ivory subpage-body">
        <div className="shell toolkit-grid">
          <div>
            <h2 className="h-card">About this toolkit</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The toolkit translates the Accessible Adaptive VR framework into practical steps, checklists, forms,
              and safeguards that research teams can adapt to their own protocols. It treats accessibility as a
              prospective research-design responsibility rather than a problem addressed only after enrollment, and
              applies to immersive VR, wearables, mobile applications, remote assessments, behavioral interventions,
              and other technology-assisted research.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Intended users:</strong> principal investigators,
              study coordinators, research assistants, accessibility leads, technology developers, facilitators, and
              community and lived-experience partners.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Scope:</strong> cross-disability — mobility and
              physical, vision, hearing, cognitive, intellectual and developmental, communication and speech, chronic
              illness and energy-limiting, mental-health, sensory, and multiple access needs, without assuming that one
              accommodation works for everyone.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Core principles</h2>
            <ul className="toolkit-principles">
              {PRINCIPLES.map(p => (
                <li key={p.title}>
                  <div className="h-mini" style={{ fontSize: 17 }}>{p.title}</div>
                  <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>{p.body}</p>
                </li>
              ))}
            </ul>

            <h2 className="h-card" style={{ marginTop: 44 }}>Implementation context</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The framework’s initial implementation context is Skyward Sojourn, a virtual-reality exposure platform
              developed through NeuroViu. The earlier eight-participant Skyward Sojourn study established use of the
              underlying VR research environment; it was not designed to evaluate disability inclusion. The
              disability-inclusion framework described in the toolkit is being piloted and refined for subsequent
              research, and the toolkit will be updated as implementation lessons are documented.
            </p>
          </div>

          <aside>
            <div className="card toolkit-contents">
              <div className="mono-label">Contents</div>
              <ol>
                {CONTENTS.map(c => <li key={c}>{c}</li>)}
              </ol>
              <a className="btn btn-quiet btn-sm" href={TOOLKIT.pdf.href} download={TOOLKIT.pdf.downloadName} style={{ marginTop: 22, width: '100%' }}>
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          </aside>
        </div>

        <div className="shell" style={{ marginTop: 48 }}>
          <div className="notice" style={{ padding: '24px 28px' }}>
            <div className="h-mini">Important</div>
            <p className="body-muted" style={{ fontSize: 15, marginTop: 8, maxWidth: '82ch' }}>
              This toolkit is research-process guidance. It is not medical advice and not a substitute for
              institutional ethics review, accessibility expertise, participant-specific clinical judgment, or
              applicable law and policy. Human-participant research using this framework should proceed under
              appropriate ethics review before enrollment.
            </p>
          </div>

          <div className="toolkit-closing">
            <div>
              <div className="h-mini">Using or adapting the toolkit?</div>
              <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>
                We welcome feedback on barriers, accommodations, and implementation lessons from other research teams.
              </p>
            </div>
            <div className="toolkit-actions" style={{ marginTop: 0 }}>
              <DownloadButton />
              <a className="btn btn-quiet" href="/#contact">Share feedback</a>
            </div>
          </div>
        </div>
      </section>
    </SubpageShell>
  )
}
