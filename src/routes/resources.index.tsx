import { createFileRoute } from '@tanstack/react-router'
import { SubpageShell } from '@/components/site'
import { RESOURCES } from '@/components/resources'

const TITLE = 'Resources | NeuroViu'
const DESCRIPTION =
  'Public research resources from NeuroViu, available for investigators to view, download, and adapt to their own protocols.'

export const Route = createFileRoute('/resources/')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: '/resources' }],
  }),
  component: ResourcesPage,
})

function ResourcesPage() {
  return (
    <SubpageShell current="/resources">
      <section className="panel-sky relative overflow-hidden subpage-section">
        <div className="aura aura-violet drift-slow" style={{ width: 480, height: 480, top: -140, right: -180, opacity: 0.5 }} aria-hidden="true" />
        <div className="shell relative">
          <span className="eyebrow">Resources</span>
          <h1 className="h-section" style={{ marginTop: 18 }}>
            Research <span className="italic-accent">resources</span>
          </h1>
          <p className="lede measure" style={{ marginTop: 20 }}>{DESCRIPTION}</p>

          <ul className="resource-list">
            {RESOURCES.map(r => (
              <li key={r.slug}>
                <article className="card card-lift resource-card">
                  <span className="mono-label" style={{ color: 'var(--indigo-soft)' }}>{r.kind}</span>
                  <h2 className="h-card" style={{ marginTop: 10 }}>
                    <a href={`/resources/${r.slug}`} className="resource-card-link">{r.title}</a>
                  </h2>
                  <p className="body-muted" style={{ fontSize: 15.5, marginTop: 12 }}>{r.summary}</p>
                  <div className="resource-card-foot">
                    <span className="mono-label">PDF · {r.pdf.pages} pages · {r.pdf.size}</span>
                    <span className="link-arrow" aria-hidden="true">
                      View resource
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  )
}
