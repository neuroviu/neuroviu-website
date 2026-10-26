import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import {
  PAUSE_STOP_PROCEDURE as SOP,
  ACCOMMODATION_PLANNING_FORM as FORM,
  ACCESSIBLE_VR_TOOLKIT as TOOLKIT,
} from '@/components/resources'

const TITLE = `${SOP.title} | NeuroViu`

export const Route = createFileRoute('/resources/participant-pause-stop-modification-procedure')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: SOP.summary },
      { property: 'og:title', content: SOP.title },
      { property: 'og:description', content: SOP.summary },
      { property: 'og:type', content: 'article' },
    ],
    links: [
      { rel: 'canonical', href: `/resources/${SOP.slug}` },
      { rel: 'alternate', type: 'application/pdf', href: SOP.pdf.href, title: `${SOP.title} (PDF)` },
    ],
  }),
  component: PauseStopProcedurePage,
})

/* Mirrors the six sections of the PDF. Update alongside the PDF. */
const CONTENTS = [
  'Before the research session',
  'When a participant requests a pause',
  'Modification pathway',
  'When a participant chooses to stop or withdraw',
  'Documentation',
  'Post-session review and continuous improvement',
]

const PATHWAY: { step: string; action: string }[] = [
  { step: 'Identify', action: 'Clarify the barrier or access need relevant to the procedure.' },
  { step: 'Discuss', action: 'Ask the participant what change would help and consider available alternatives.' },
  { step: 'Evaluate', action: 'Confirm that the proposed modification is safe, feasible, and compatible with essential study requirements.' },
  { step: 'Implement', action: 'Apply the agreed modification and explain any change to the procedure.' },
  { step: 'Confirm', action: 'Ask whether the modification adequately addressed the barrier.' },
  { step: 'Document', action: 'Record the barrier, accommodation, participant response, and any effect on data collection or interpretation.' },
]

const DOWNLOAD_LABEL = `Download ${SOP.title} (PDF)`

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
    </svg>
  )
}

function DownloadButton() {
  return (
    <a className="btn btn-primary" href={SOP.pdf.href} download={SOP.pdf.downloadName}>
      <DownloadIcon />
      {DOWNLOAD_LABEL}
    </a>
  )
}

function PauseStopProcedurePage() {
  return (
    <SubpageShell>
      <section className="panel-sky relative overflow-hidden subpage-section" aria-labelledby="sop-title">
        <div className="aura aura-violet drift-slow" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.5 }} aria-hidden="true" />
        <div className="aura aura-rose drift" style={{ width: 360, height: 360, bottom: -140, left: -160, opacity: 0.4 }} aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/resources" className="crumb-link">Resources</a>
            <span aria-hidden="true"> / </span>
            <span>{SOP.kind}</span>
          </nav>

          <h1 id="sop-title" className="h-section" style={{ marginTop: 22, maxWidth: '20ch' }}>
            Participant <span className="italic-accent">Pause, Stop, and Modification</span> Procedure
          </h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{SOP.summary}</p>

          <div className="toolkit-actions">
            <DownloadButton />
            <a className="btn btn-quiet" href={SOP.pdf.href} target="_blank" rel="noopener">
              View in browser
            </a>
          </div>
          <p className="mono-label" style={{ marginTop: 16 }}>
            PDF · {SOP.pdf.pages} pages · {SOP.pdf.size} · Free to view, download, and adapt
          </p>
        </div>
      </section>

      <section className="panel-ivory subpage-body">
        <div className="shell toolkit-grid">
          <div>
            <h2 className="h-card">About this procedure</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              This standard operating procedure gives research teams a reusable process for supporting participant
              control and accessibility during VR, digital-health, behavioral, rehabilitation, wearable-technology,
              and other technology-assisted clinical research. It covers what to do before a session, when a
              participant asks to pause, how to work through a modification, what to do when a participant stops or
              withdraws, and how to document and learn from each event.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Core principle:</strong> a request to pause,
              modify, receive assistance, or stop is treated as participant communication and an accessibility
              consideration — not automatically as noncompliance, treatment failure, or a reason for exclusion.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Scope:</strong> cross-disability, and intended to
              be adapted to the approved protocol, institutional policy, study population, technology, safety
              requirements, and applicable ethics or legal requirements.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Suggested participant-facing statement</h2>
            <blockquote className="card" style={{ margin: '18px 0 0', padding: '22px 26px' }}>
              <p className="body-muted" style={{ fontSize: 16.5, fontStyle: 'italic' }}>
                “You can ask to pause, change something about the setup or procedure, get assistance, or stop at any
                time. If something is uncomfortable, inaccessible, confusing, or difficult to use, please tell us. We
                will discuss what can be adjusted safely and within the study requirements. You may also choose to
                stop or withdraw.”
              </p>
            </blockquote>

            <h2 className="h-card" style={{ marginTop: 44 }}>Modification pathway</h2>
            <ul className="toolkit-principles">
              {PATHWAY.map((p, i) => (
                <li key={p.step}>
                  <div className="h-mini" style={{ fontSize: 17 }}>
                    <span className="mono-label" style={{ marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>
                    {p.step}
                  </div>
                  <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>{p.action}</p>
                </li>
              ))}
            </ul>

            <h2 className="h-card" style={{ marginTop: 44 }}>Documentation and continuous improvement</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Each pause, modification, or withdrawal is documented using the{' '}
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
                Barrier → Accommodation → Participant Response → Design Modification
              </strong>{' '}
              process, recording only what is necessary for research operations, safety, interpretation, and approved
              study records. Where relevant, teams note whether an accommodation affected measurement conditions, so
              accommodation-related differences are not automatically interpreted as psychological or behavioral
              outcomes. Post-session review looks for recurring barriers, and changes that affect approved procedures
              go through the institution’s required review before implementation.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The procedure is a public dissemination component of the Accessible Adaptive VR framework and pairs with
              the{' '}
              <a href={`/resources/${FORM.slug}`} className="crumb-link" style={{ color: 'var(--indigo-soft)' }}>
                {FORM.title}
              </a>{' '}
              and the{' '}
              <a href={`/resources/${TOOLKIT.slug}`} className="crumb-link" style={{ color: 'var(--indigo-soft)' }}>
                {TOOLKIT.title}
              </a>
              . Skyward Sojourn provides the initial implementation context for the broader framework; the earlier
              eight-participant study was not designed to demonstrate disability inclusion.
            </p>
          </div>

          <aside>
            <div className="card toolkit-contents">
              <div className="mono-label">Contents</div>
              <ol>
                {CONTENTS.map(c => <li key={c}>{c}</li>)}
              </ol>
              <a className="btn btn-quiet btn-sm" href={SOP.pdf.href} download={SOP.pdf.downloadName} style={{ marginTop: 22, width: '100%' }}>
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
              This procedure is research-process guidance. Adapt it to institutional policy, approved protocols,
              participant populations, and applicable ethics or legal requirements. It is not medical advice and does
              not replace clinical judgment, emergency procedures, or institutional ethics review.
            </p>
          </div>

          <div className="toolkit-closing">
            <div>
              <div className="h-mini">Using or adapting the procedure?</div>
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
