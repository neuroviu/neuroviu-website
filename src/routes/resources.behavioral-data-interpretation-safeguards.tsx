import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import {
  INTERPRETATION_SAFEGUARDS as GUIDE,
  ACCOMMODATION_PLANNING_FORM as FORM,
  PAUSE_STOP_PROCEDURE as SOP,
  ACCESSIBLE_VR_TOOLKIT as TOOLKIT,
} from '@/components/resources'

const TITLE = `${GUIDE.title} | NeuroViu`

export const Route = createFileRoute('/resources/behavioral-data-interpretation-safeguards')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: GUIDE.summary },
      { property: 'og:title', content: GUIDE.title },
      { property: 'og:description', content: GUIDE.summary },
      { property: 'og:type', content: 'article' },
    ],
    links: [
      { rel: 'canonical', href: `/resources/${GUIDE.slug}` },
      { rel: 'alternate', type: 'application/pdf', href: GUIDE.pdf.href, title: `${GUIDE.title} (PDF)` },
    ],
  }),
  component: InterpretationSafeguardsPage,
})

/* Mirrors the six sections of the PDF. Update alongside the PDF. */
const CONTENTS = [
  'Why this safeguard matters',
  'Interpretation safeguard table',
  'Six-step interpretation check',
  'Documentation template',
  'Recommended reporting language',
  'Integration with the Accessible Adaptive VR framework',
]

const SAFEGUARDS: { signal: string; avoid: string; consider: string }[] = [
  {
    signal: 'Slower approach / movement',
    avoid: 'Fear, avoidance, low motivation',
    consider: 'Mobility, balance, pain, fatigue, assistive-device use, cautious navigation, unfamiliar interface',
  },
  {
    signal: 'Postural sway / instability',
    avoid: 'Anxiety or heightened arousal',
    consider: 'Baseline balance, vestibular or motor differences, stance, footwear, support use, equipment setup',
  },
  {
    signal: 'Hesitation / pauses',
    avoid: 'Fear, disengagement, treatment resistance',
    consider: 'Processing time, fatigue, sensory load, communication needs, navigation uncertainty, accessibility barrier',
  },
  {
    signal: 'Gaze differences',
    avoid: 'Avoidance, inattention, low engagement',
    consider: 'Vision, eye-movement differences, display access, positioning, sensory strategy, task comprehension',
  },
  {
    signal: 'Longer response time',
    avoid: 'Confusion, low attention, impairment',
    consider: 'Motor response, communication method, cognitive processing time, interface accessibility, fatigue',
  },
  {
    signal: 'Use of railing / physical support',
    avoid: 'Fear or dependence',
    consider: 'Balance, mobility strategy, pain, safety preference, habitual support use',
  },
  {
    signal: 'Reduced speech / atypical speech pattern',
    avoid: 'Distress, disengagement, poor understanding',
    consider: 'Communication disability, speech difference, AAC use, processing time, participant preference',
  },
  {
    signal: 'Stopping or requesting a break',
    avoid: 'Treatment failure or noncompliance',
    consider: 'Access barrier, fatigue, pain, sensory load, equipment discomfort, need for modification, participant choice',
  },
]

const CHECK: { step: string; action: string }[] = [
  { step: 'Describe the observation', action: 'Record the measured behavior without embedding an interpretation — “approach speed decreased,” rather than “fear increased.”' },
  { step: 'Check participant context', action: 'Review relevant participant-reported experience, access needs, accommodations, and baseline behavior without requiring unnecessary diagnostic disclosure.' },
  { step: 'Check study context', action: 'Consider equipment fit, interface accessibility, environmental conditions, task instructions, sensory intensity, positioning, fatigue, and technical problems.' },
  { step: 'Identify plausible alternatives', action: 'Explicitly document disability-, access-, technology-, and context-related explanations that could produce the same signal.' },
  { step: 'Seek converging evidence', action: 'When the research question permits, interpret behavior alongside participant report and other validated measures rather than a single behavioral proxy.' },
  { step: 'Qualify the conclusion', action: 'Report uncertainty and avoid stronger psychological or clinical claims than the data support.' },
]

const TEMPLATE: { field: string; record: string }[] = [
  { field: 'Observed behavior', record: 'Objective description of the signal or event.' },
  { field: 'Initial analytic hypothesis', record: 'The construct the study intended the measure to represent.' },
  { field: 'Accessibility/context alternatives', record: 'Other plausible explanations related to access, disability, technology, environment, or accommodation.' },
  { field: 'Participant-reported context', record: 'Relevant feedback volunteered or collected through approved study procedures.' },
  { field: 'Converging evidence', record: 'Other measures that support, contradict, or leave the interpretation uncertain.' },
  { field: 'Final interpretation', record: 'Qualified conclusion and remaining uncertainty.' },
]

const DOWNLOAD_LABEL = `Download ${GUIDE.title} (PDF)`

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
    </svg>
  )
}

function DownloadButton() {
  return (
    <a className="btn btn-primary" href={GUIDE.pdf.href} download={GUIDE.pdf.downloadName}>
      <DownloadIcon />
      {DOWNLOAD_LABEL}
    </a>
  )
}

const STRONG = { color: 'var(--ink)', fontWeight: 600 }
const LINK = { color: 'var(--indigo-soft)' }

function InterpretationSafeguardsPage() {
  return (
    <SubpageShell>
      <section className="panel-sky relative overflow-hidden subpage-section" aria-labelledby="guide-title">
        <div className="aura aura-violet drift-slow" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.5 }} aria-hidden="true" />
        <div className="aura aura-rose drift" style={{ width: 360, height: 360, bottom: -140, left: -160, opacity: 0.4 }} aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/resources" className="crumb-link">Resources</a>
            <span aria-hidden="true"> / </span>
            <span>{GUIDE.kind}</span>
          </nav>

          <h1 id="guide-title" className="h-section" style={{ marginTop: 22, maxWidth: '20ch' }}>
            Behavioral Data <span className="italic-accent">Interpretation</span> Safeguards
          </h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{GUIDE.summary}</p>

          <div className="toolkit-actions">
            <DownloadButton />
            <a className="btn btn-quiet" href={GUIDE.pdf.href} target="_blank" rel="noopener">
              View in browser
            </a>
          </div>
          <p className="mono-label" style={{ marginTop: 16 }}>
            PDF · {GUIDE.pdf.pages} pages · {GUIDE.pdf.size} · Free to view, download, and adapt
          </p>
        </div>
      </section>

      <section className="panel-ivory subpage-body">
        <div className="shell toolkit-grid">
          <div>
            <h2 className="h-card">About this guide</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              VR, wearables, motion tracking, eye tracking, mobile applications, and behavioral tasks can produce
              precise measurements while still supporting an incorrect interpretation. A slower approach, greater sway,
              delayed response, reduced gaze, pause, or use of physical support may be relevant to an outcome — but the
              same observation can also reflect mobility, balance, sensory, communication, fatigue, interface,
              equipment, or accommodation factors. This guide helps investigators separate{' '}
              <strong style={STRONG}>what was measured</strong> from{' '}
              <strong style={STRONG}>what the researcher believes it means</strong>.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={STRONG}>Core rule:</strong> a behavioral signal is an observation, not a diagnosis.
              Interpret behavior using participant-reported context, known study conditions, accommodation records, and
              multiple converging measures whenever possible.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Interpretation safeguard table</h2>
            <div className="card resource-table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th scope="col">Observed signal</th>
                    <th scope="col">Do not automatically infer</th>
                    <th scope="col">Consider before interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {SAFEGUARDS.map(s => (
                    <tr key={s.signal}>
                      <th scope="row">{s.signal}</th>
                      <td>{s.avoid}</td>
                      <td>{s.consider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="h-card" style={{ marginTop: 44 }}>Six-step interpretation check</h2>
            <ul className="toolkit-principles">
              {CHECK.map((c, i) => (
                <li key={c.step}>
                  <div className="h-mini" style={{ fontSize: 17 }}>
                    <span className="mono-label" style={{ marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>
                    {c.step}
                  </div>
                  <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>{c.action}</p>
                </li>
              ))}
            </ul>

            <h2 className="h-card" style={{ marginTop: 44 }}>Documentation template</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              For important behavioral signals, research teams can document the interpretation pathway using the
              following structure.
            </p>
            <div className="card resource-table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">What to record</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPLATE.map(t => (
                    <tr key={t.field}>
                      <th scope="row">{t.field}</th>
                      <td>{t.record}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="h-card" style={{ marginTop: 44 }}>Recommended reporting language</h2>
            <blockquote className="card" style={{ margin: '18px 0 0', padding: '22px 26px' }}>
              <div className="mono-label" style={{ color: 'var(--indigo-soft)' }}>Prefer</div>
              <p className="body-muted" style={{ fontSize: 16.5, fontStyle: 'italic', marginTop: 8 }}>
                “Participants differed in approach speed. Because approach speed may also be influenced by mobility,
                balance, assistive-device use, familiarity with the interface, and other contextual factors, the measure
                was not interpreted as a standalone indicator of fear.”
              </p>
            </blockquote>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 18 }}>
              <strong style={STRONG}>Avoid:</strong> statements that equate a single movement, gaze, speech,
              response-time, or support-use measure with fear, anxiety, attention, understanding, motivation, or
              treatment response without adequate validation and contextual evidence.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Integration with the Accessible Adaptive VR framework</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Use this guide alongside the{' '}
              <a href={`/resources/${FORM.slug}`} className="crumb-link" style={LINK}>{FORM.title}</a> and the{' '}
              <a href={`/resources/${SOP.slug}`} className="crumb-link" style={LINK}>{SOP.title}</a>. When an access
              barrier or accommodation could influence a behavioral measure, record that context and consider it during
              analysis. Recurring interpretation problems feed back into the{' '}
              <strong style={STRONG}>Barrier → Accommodation → Participant Response → Design Modification</strong>{' '}
              process described in the{' '}
              <a href={`/resources/${TOOLKIT.slug}`} className="crumb-link" style={LINK}>{TOOLKIT.title}</a>.
            </p>
          </div>

          <aside>
            <div className="card toolkit-contents">
              <div className="mono-label">Contents</div>
              <ol>
                {CONTENTS.map(c => <li key={c}>{c}</li>)}
              </ol>
              <a className="btn btn-quiet btn-sm" href={GUIDE.pdf.href} download={GUIDE.pdf.downloadName} style={{ marginTop: 22, width: '100%' }}>
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          </aside>
        </div>

        <div className="shell" style={{ marginTop: 48 }}>
          <div className="notice" style={{ padding: '24px 28px' }}>
            <div className="h-mini">Scope note</div>
            <p className="body-muted" style={{ fontSize: 15, marginTop: 8, maxWidth: '82ch' }}>
              These safeguards are best-practice guidance, not a substitute for validated measurement models,
              statistical analysis plans, clinical assessment, accessibility expertise, or ethics review. They are
              designed to improve transparency and reduce unsupported interpretation in disability-inclusive research.
            </p>
          </div>

          <div className="toolkit-closing">
            <div>
              <div className="h-mini">Using or adapting the guide?</div>
              <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>
                We welcome feedback on interpretation challenges and implementation lessons from other research teams.
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
