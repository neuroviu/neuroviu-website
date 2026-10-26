import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import {
  CO_DESIGN_GUIDE as GUIDE,
  ACCOMMODATION_PLANNING_FORM as FORM,
  PAUSE_STOP_PROCEDURE as SOP,
  INTERPRETATION_SAFEGUARDS as SAFEGUARDS,
  ACCESSIBLE_VR_TOOLKIT as TOOLKIT,
} from '@/components/resources'

const TITLE = `${GUIDE.title} | NeuroViu`

export const Route = createFileRoute('/resources/disability-inclusive-research-co-design-guide')({
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
  component: CoDesignGuidePage,
})

/* Mirrors the eight sections of the PDF. Update alongside the PDF. */
const CONTENTS = [
  'Define the decisions open to co-design',
  'Seek relevant and varied perspectives',
  'Make the engagement process accessible',
  'Co-design session workflow',
  'Co-design decision log',
  'Questions to ask contributors',
  'Indicators of meaningful engagement',
  'Integration with Accessible Adaptive VR',
]

const ACCESS: { area: string; questions: string }[] = [
  { area: 'Communication', questions: 'Can contributors participate using their preferred accessible communication method? Are materials available in usable formats and sufficiently in advance?' },
  { area: 'Scheduling / energy', questions: 'Can timing, session length, breaks, pacing, or asynchronous participation be adjusted when feasible?' },
  { area: 'Physical / technology access', questions: 'Can contributors access the meeting environment, platform, device, controls, or prototype being reviewed?' },
  { area: 'Sensory access', questions: 'Can visual, auditory, motion, brightness, volume, or other sensory demands be adjusted when feasible?' },
  { area: 'Support', questions: 'Can a support person, interpreter, communication aid, assistive technology, or other access support be used when appropriate?' },
  { area: 'Compensation', questions: 'When feasible and appropriate, are lived-experience contributors compensated for their time and expertise?' },
]

const WORKFLOW: { step: string; action: string }[] = [
  { step: 'Orient', action: 'Explain the study, technology, research question, known constraints, and which decisions contributors can influence.' },
  { step: 'Experience', action: 'When safe and appropriate, allow contributors to review or interact with the relevant materials, workflow, prototype, or research environment using needed accommodations.' },
  { step: 'Identify barriers', action: 'Ask what could make recruitment, consent, participation, communication, technology use, data collection, or follow-up inaccessible or unnecessarily difficult.' },
  { step: 'Generate options', action: 'Ask contributors what accommodations, alternatives, or design changes could reduce the identified barriers.' },
  { step: 'Prioritize', action: 'Discuss feasibility, safety, scientific requirements, participant burden, and which changes should be tested first.' },
  { step: 'Test and refine', action: 'Evaluate modifications with relevant users when feasible rather than assuming the proposed solution resolves the barrier.' },
  { step: 'Close the loop', action: 'Tell contributors what changed, what did not change, and why.' },
]

const DECISION_LOG: { field: string; record: string }[] = [
  { field: 'Decision / component', record: 'What part of the study, technology, material, or procedure was reviewed?' },
  { field: 'Perspective engaged', record: 'Relevant lived-experience/access perspective; avoid unnecessary diagnostic detail.' },
  { field: 'Barrier / recommendation', record: 'What problem or recommendation did the contributor identify?' },
  { field: 'Research-team response', record: 'Accepted, adapted, deferred, or not adopted — with rationale.' },
  { field: 'Modification', record: 'What changed in the protocol, technology, material, environment, or training?' },
  { field: 'Follow-up', record: 'Was the modification reviewed or tested again, and what was the response?' },
]

const QUESTIONS = [
  'What part of this procedure would be hardest to access?',
  'What would make the instructions or consent easier to use?',
  'Is there anything about the physical or sensory environment that should be adjustable?',
  'Could the technology require a movement, communication method, or response that some participants cannot use?',
  'What could researchers misinterpret about participant behavior?',
  'What would make it easier to pause, request help, modify the procedure, or stop?',
  'How should participants be told what accommodations are available?',
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

function CoDesignGuidePage() {
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
            Disability-Inclusive Research <span className="italic-accent">Co-Design</span> Guide
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
              This guide helps research teams engage people with lived experience of disability as contributors to
              study design, accessibility planning, technology development, participant-facing materials, procedures,
              and interpretation safeguards. The goal is to move from one-time feedback toward a{' '}
              <strong style={STRONG}>traceable process</strong> in which lived-experience input can influence research
              decisions.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={STRONG}>Core principle:</strong> meaningful engagement requires more than asking whether a
              finished study is accessible. Research teams should identify decisions that participants and
              lived-experience contributors can genuinely influence, make the engagement process accessible, document
              recommendations, and show what changed or why a recommendation could not be adopted.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Define the decisions open to co-design</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Before engagement begins, identify which study decisions are still changeable — for example recruitment
              language, consent format, visit length, communication methods, sensory settings, physical setup,
              technology controls, pause/stop procedures, accommodation workflows, behavioral measures, staff
              instructions, and dissemination materials. Avoid inviting contributors to “co-design” a process when all
              substantive decisions have already been finalized.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Seek relevant and varied perspectives</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Disability is not a single experience. Seek perspectives relevant to the study’s likely access demands
              and population — which, depending on the research, may include physical or mobility, sensory, cognitive,
              intellectual or developmental, communication or speech, chronic illness or energy-limiting,
              mental-health-related, and multiple or intersecting access perspectives. Do not assume one contributor
              represents an entire disability community, and document the scope and limitations of the perspectives
              included.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Make the engagement process accessible</h2>
            <div className="card resource-table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Questions for the research team</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS.map(a => (
                    <tr key={a.area}>
                      <th scope="row">{a.area}</th>
                      <td>{a.questions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="h-card" style={{ marginTop: 44 }}>Co-design session workflow</h2>
            <ul className="toolkit-principles">
              {WORKFLOW.map((w, i) => (
                <li key={w.step}>
                  <div className="h-mini" style={{ fontSize: 17 }}>
                    <span className="mono-label" style={{ marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>
                    {w.step}
                  </div>
                  <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>{w.action}</p>
                </li>
              ))}
            </ul>

            <h2 className="h-card" style={{ marginTop: 44 }}>Co-design decision log</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Use a decision log so engagement can be traced to concrete research or technology changes.
            </p>
            <div className="card resource-table-wrap">
              <table className="resource-table">
                <thead>
                  <tr>
                    <th scope="col">Document</th>
                    <th scope="col">Record</th>
                  </tr>
                </thead>
                <tbody>
                  {DECISION_LOG.map(d => (
                    <tr key={d.field}>
                      <th scope="row">{d.field}</th>
                      <td>{d.record}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="h-card" style={{ marginTop: 44 }}>Questions to ask contributors</h2>
            <ul className="toolkit-principles">
              {QUESTIONS.map(q => (
                <li key={q}>
                  <p className="body-muted" style={{ fontSize: 15.5 }}>{q}</p>
                </li>
              ))}
            </ul>

            <h2 className="h-card" style={{ marginTop: 44 }}>Indicators of meaningful engagement</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Research teams can document the number and range of contributors engaged; the study stages at which
              engagement occurred; barriers and recommendations identified; the proportion of recommendations resulting
              in modifications; reasons recommendations were not adopted; the accessibility of the engagement process
              itself; contributor feedback on whether their input was understood; and whether contributors were
              informed about resulting changes.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>Integration with Accessible Adaptive VR</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Co-design findings feed directly into the{' '}
              <strong style={STRONG}>Barrier → Accommodation → Participant Response → Design Modification</strong>{' '}
              process described in the{' '}
              <a href={`/resources/${TOOLKIT.slug}`} className="crumb-link" style={LINK}>{TOOLKIT.title}</a>. Relevant
              changes can then be reflected in the{' '}
              <a href={`/resources/${FORM.slug}`} className="crumb-link" style={LINK}>{FORM.title}</a>, the{' '}
              <a href={`/resources/${SOP.slug}`} className="crumb-link" style={LINK}>{SOP.title}</a>, the{' '}
              <a href={`/resources/${SAFEGUARDS.slug}`} className="crumb-link" style={LINK}>{SAFEGUARDS.title}</a>, and
              in the study protocol, participant materials, technology, and staff training.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              <strong style={STRONG}>Implementation note:</strong> the original eight-participant Skyward Sojourn study
              was not designed as a disability co-design study, and disability status was not systematically
              documented. This guide supports the current pilot/refinement phase of the broader Accessible Adaptive VR
              framework and future ethically reviewed implementation. It should not be used to characterize the earlier
              study as evidence of disability engagement.
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
              This guide is intended for adaptation and does not replace community-specific expertise, institutional
              accessibility requirements, ethics review, or applicable law.
            </p>
          </div>

          <div className="toolkit-closing">
            <div>
              <div className="h-mini">Using or adapting the guide?</div>
              <p className="body-dim" style={{ fontSize: 15, marginTop: 6 }}>
                We welcome feedback on co-design practices and implementation lessons from other research teams.
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
