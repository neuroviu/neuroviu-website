import { Outlet, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

const TITLE = 'NeuroViu | Wearable EEG & AI for Brain Health Research'
const DESCRIPTION =
  'NeuroViu develops wearable EEG and AI-powered neurotechnology for research into traumatic brain injury, cognitive aging, dementia, and Alzheimer’s disease.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      {
        name: 'keywords',
        content:
          'wearable EEG, EEG research, traumatic brain injury, TBI research, Alzheimer’s research, dementia research, cognitive aging, mild cognitive impairment, neural connectivity, quantitative EEG, neurotechnology, brain health, EEG AI, computational neuroscience',
      },
      { name: 'author', content: 'NeuroViu' },
      { name: 'theme-color', content: '#fbf9f7' },
      { property: 'og:site_name', content: 'NeuroViu' },
      { property: 'og:title', content: 'NeuroViu — See the brain. Track the change.' },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'NeuroViu — See the brain. Track the change.' },
      { name: 'twitter:description', content: DESCRIPTION },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Instrument+Sans:ital,wght@0,400..700;1,400..600&family=IBM+Plex+Mono:wght@300;400;500&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

const ORG_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NeuroViu',
  slogan: 'See the brain. Track the change.',
  description: DESCRIPTION,
})

const NOSCRIPT_CSS = '.js [data-reveal] { opacity: 1; transform: none; }'

function RootDocument({ children }: { children: React.ReactNode }) {
  return <>{children}<div className="grain" aria-hidden="true" /></>
}
