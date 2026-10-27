import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import { DISABILITY_ACCESSIBILITY_TOOLKIT as TOOLKIT } from '@/components/resources'

export const Route = createFileRoute('/resources/disability-inclusive-clinical-research-accessibility-toolkit')({
  head: () => ({
    meta: [
      { title: `${TOOLKIT.title} | NeuroViu` },
      { name: 'description', content: TOOLKIT.summary },
      { property: 'og:title', content: TOOLKIT.title },
      { property: 'og:description', content: TOOLKIT.summary },
    ],
    links: [
      { rel: 'canonical', href: `/resources/${TOOLKIT.slug}` },
      { rel: 'alternate', type: 'application/pdf', href: TOOLKIT.pdf.href, title: `${TOOLKIT.title} (PDF)` },
    ],
  }),
  component: AccessibilityToolkitPage,
})

function AccessibilityToolkitPage() {
  return (
    <SubpageShell current="/resources">
      <section className="panel-sky relative overflow-hidden subpage-section">
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/resources" className="crumb-link">Resources</a>
            <span aria-hidden="true"> / </span>
            <span>Accessibility toolkit</span>
          </nav>
          <h1 className="h-section" style={{ marginTop: 22 }}>{TOOLKIT.title}</h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{TOOLKIT.summary}</p>
          <div className="toolkit-actions">
            <a className="btn btn-primary" href={TOOLKIT.pdf.href} download={TOOLKIT.pdf.downloadName}>Download accessible PDF</a>
            <a className="btn btn-quiet" href={TOOLKIT.pdf.href} target="_blank" rel="noopener noreferrer">View PDF in browser</a>
          </div>
          <p className="mono-label" style={{ marginTop: 16 }}>PDF · {TOOLKIT.pdf.pages} pages · {TOOLKIT.pdf.size} · PDF/UA-1 validated</p>
        </div>
      </section>
      <section className="panel-ivory subpage-body">
        <div className="shell">
          <h2 className="h-card">About this resource</h2>
          <p className="body-muted" style={{ marginTop: 14, maxWidth: 760 }}>
            Developed by NeuroViu to help research teams plan accessible recruitment, informed participation,
            accommodations, participant autonomy, accessible feedback, and documentation of improvements.
          </p>
          <p className="body-muted" style={{ marginTop: 14, maxWidth: 760 }}>
            The downloadable document passed automated PDF/UA-1 validation. Automated validation does not by itself
            establish complete Section 508 conformance.
          </p>
          <p style={{ marginTop: 24 }}><a href="/resources">← Back to all resources</a></p>
        </div>
      </section>
    </SubpageShell>
  )
}
