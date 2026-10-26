import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import { ACCOMMODATION_PLANNING_FORM as FORM, ACCESSIBLE_VR_TOOLKIT as TOOLKIT } from '@/components/resources'

const TITLE = `${FORM.title} | NeuroViu`

export const Route = createFileRoute('/resources/disability-inclusive-clinical-research-accommodation-planning-form')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: FORM.summary },
      { property: 'og:title', content: FORM.title },
      { property: 'og:description', content: FORM.summary },
      { property: 'og:type', content: 'article' },
    ],
    links: [
      { rel: 'canonical', href: `/resources/${FORM.slug}` },
      { rel: 'alternate', type: 'application/pdf', href: FORM.pdf.href, title: `${FORM.title} (PDF)` },
    ],
  }),
  component: AccommodationFormPage,
})

/* Mirrors the two pages of the PDF. Update alongside the PDF. */
const SECTIONS: { title: string; fields: string[] }[] = [
  {
    title: 'Page 1 · Accommodation planning',
    fields: [
      'Participant / study ID',
      'Preferred communication method(s)',
      'Study activity, visit, procedure, or technology involved',
      'Access need or barrier identified',
      'Accommodation requested or proposed',
      'Participant preference or comments',
      'Safety, protocol, or measurement considerations',
    ],
  },
  {
    title: 'Page 2 · Implementation record',
    fields: [
      'Accommodation agreed / action to be taken',
      'Responsible study team member / role',
      'Date or study stage for review / testing',
      'Implementation result',
      'Participant response / accessibility feedback',
      'Effect on data collection or interpretation',
      'Resulting protocol, technology, material, or training modification',
      'Follow-up status',
    ],
  },
]

const DOWNLOAD_LABEL = `Download ${FORM.title} (PDF)`

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
    </svg>
  )
}

function DownloadButton() {
  return (
    <a className="btn btn-primary" href={FORM.pdf.href} download={FORM.pdf.downloadName}>
      <DownloadIcon />
      {DOWNLOAD_LABEL}
    </a>
  )
}

function AccommodationFormPage() {
  return (
    <SubpageShell>
      <section className="panel-sky relative overflow-hidden subpage-section" aria-labelledby="form-title">
        <div className="aura aura-violet drift-slow" style={{ width: 520, height: 520, top: -160, right: -200, opacity: 0.5 }} aria-hidden="true" />
        <div className="aura aura-rose drift" style={{ width: 360, height: 360, bottom: -140, left: -160, opacity: 0.4 }} aria-hidden="true" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/resources" className="crumb-link">Resources</a>
            <span aria-hidden="true"> / </span>
            <span>{FORM.kind}</span>
          </nav>

          <h1 id="form-title" className="h-section" style={{ marginTop: 22, maxWidth: '20ch' }}>
            Disability-Inclusive Clinical Research <span className="italic-accent">Accommodation Planning</span> Form
          </h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{FORM.summary}</p>

          <div className="toolkit-actions">
            <DownloadButton />
            <a className="btn btn-quiet" href={FORM.pdf.href} target="_blank" rel="noopener">
              View in browser
            </a>
          </div>
          <p className="mono-label" style={{ marginTop: 16 }}>
            PDF · {FORM.pdf.pages} pages · {FORM.pdf.size} · Fillable · Free to view, download, and adapt
          </p>
        </div>
      </section>

      <section className="panel-ivory subpage-body">
        <div className="shell toolkit-grid">
          <div>
            <h2 className="h-card">About this form</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The form helps research teams identify and plan access needs for a specific study activity, visit,
              procedure, or technology. Teams complete only the fields relevant to the study and participant, and it
              is designed to capture what is needed for access without collecting unnecessary personal, disability,
              or diagnostic information.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              Before the procedure, the study team confirms how the participant can request a pause, modification,
              assistance, or stop. An accommodation request should not by itself be treated as a reason for
              exclusion; safety and scientific requirements still apply.
            </p>

            <h2 className="h-card" style={{ marginTop: 44 }}>From accommodation to design improvement</h2>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The second page is an implementation record that follows the{' '}
              <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
                Barrier → Accommodation → Participant Response → Design Modification
              </strong>{' '}
              sequence. It records what happened when the accommodation was used, how the participant experienced it,
              and whether it affected data collection, so teams can decide whether a one-time accommodation should
              become a standard protocol, technology, material, or staff-training improvement.
            </p>
            <p className="body-muted" style={{ fontSize: 16.5, marginTop: 14 }}>
              The form is part of the Accessible Adaptive VR framework and also appears in the{' '}
              <a href={`/resources/${TOOLKIT.slug}`} className="crumb-link" style={{ color: 'var(--indigo-soft)' }}>
                {TOOLKIT.title}
              </a>
              . It is offered here as a standalone, fillable document for teams that need only the form.
            </p>
          </div>

          <aside>
            <div className="card toolkit-contents">
              {SECTIONS.map((s, i) => (
                <div key={s.title} style={i > 0 ? { marginTop: 22 } : undefined}>
                  <div className="mono-label">{s.title}</div>
                  <ol>
                    {s.fields.map(f => <li key={f}>{f}</li>)}
                  </ol>
                </div>
              ))}
              <a className="btn btn-quiet btn-sm" href={FORM.pdf.href} download={FORM.pdf.downloadName} style={{ marginTop: 22, width: '100%' }}>
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
              This form is research-process guidance. Adapt it to institutional policy, approved protocols,
              participant populations, and applicable ethics or legal requirements. It is not medical advice and not
              a substitute for institutional ethics review, accessibility expertise, or participant-specific clinical
              judgment.
            </p>
          </div>

          <div className="toolkit-closing">
            <div>
              <div className="h-mini">Using or adapting the form?</div>
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
