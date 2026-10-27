/* Public resources hosted on NeuroViu. Each `slug` is a stable URL under
   /resources/ and each `pdf` is a stable file path under public/resources/ —
   other documents link to both, so neither should be renamed. */

export type Resource = {
  slug: string
  title: string
  kind: string
  summary: string
  pdf: { href: string; downloadName: string; pages: number; size: string }
}

export const ACCESSIBLE_VR_TOOLKIT: Resource = {
  slug: 'accessible-vr-clinical-research-toolkit',
  title: 'Accessible VR Clinical Research Toolkit',
  kind: 'Implementation toolkit',
  summary:
    'A cross-disability implementation resource for virtual reality, digital-health, behavioral, and technology-assisted clinical research.',
  pdf: {
    href: '/resources/accessible-vr-clinical-research-toolkit.pdf',
    downloadName: 'Accessible-VR-Clinical-Research-Toolkit.pdf',
    pages: 12,
    size: '72 KB',
  },
}

export const ACCOMMODATION_PLANNING_FORM: Resource = {
  slug: 'disability-inclusive-clinical-research-accommodation-planning-form',
  title: 'Disability-Inclusive Clinical Research Accommodation Planning Form',
  kind: 'Fillable form',
  summary:
    'A fillable form for identifying, planning, and documenting participant access needs for a research procedure without requiring unnecessary disability or diagnostic disclosure.',
  pdf: {
    href: '/resources/disability-inclusive-clinical-research-accommodation-planning-form.pdf',
    downloadName: 'Disability-Inclusive-Clinical-Research-Accommodation-Planning-Form.pdf',
    pages: 2,
    size: '76 KB',
  },
}

export const PAUSE_STOP_PROCEDURE: Resource = {
  slug: 'participant-pause-stop-modification-procedure',
  title: 'Participant Pause, Stop, and Modification Procedure',
  kind: 'Standard operating procedure',
  summary:
    'A reusable standard operating procedure for supporting participant control and accessibility when a participant asks to pause, modify, receive assistance with, or stop a technology-assisted research procedure.',
  pdf: {
    href: '/resources/participant-pause-stop-modification-procedure.pdf',
    downloadName: 'Participant-Pause-Stop-Modification-Procedure.pdf',
    pages: 3,
    size: '32 KB',
  },
}

export const INTERPRETATION_SAFEGUARDS: Resource = {
  slug: 'behavioral-data-interpretation-safeguards',
  title: 'Behavioral Data Interpretation Safeguards',
  kind: 'Best-practice guide',
  summary:
    'A best-practice guide for avoiding unsupported psychological or clinical interpretations of technology-derived behavior when disability, accessibility, assistive-device use, fatigue, or study context may offer alternative explanations.',
  pdf: {
    href: '/resources/behavioral-data-interpretation-safeguards.pdf',
    downloadName: 'Behavioral-Data-Interpretation-Safeguards.pdf',
    pages: 2,
    size: '31 KB',
  },
}

export const CO_DESIGN_GUIDE: Resource = {
  slug: 'disability-inclusive-research-co-design-guide',
  title: 'Disability-Inclusive Research Co-Design Guide',
  kind: 'Training & best-practice guide',
  summary:
    'A training and best-practice guide for engaging people with lived experience of disability as contributors to study design, accessibility planning, technology development, participant materials, procedures, and interpretation safeguards.',
  pdf: {
    href: '/resources/disability-inclusive-research-co-design-guide.pdf',
    downloadName: 'Disability-Inclusive-Research-Co-Design-Guide.pdf',
    pages: 3,
    size: '32 KB',
  },
}

export const DISABILITY_ACCESSIBILITY_TOOLKIT: Resource = {
  slug: 'disability-inclusive-clinical-research-accessibility-toolkit',
  title: 'NeuroViu Disability-Inclusive Clinical Research Accessibility Toolkit (v1.0)',
  kind: 'Accessibility toolkit',
  summary:
    'A cross-disability research toolkit with accessibility planning checklists, accommodation guidance, accessible communication practices, participant autonomy procedures, and continuous-improvement resources.',
  pdf: {
    href: '/resources/disability-inclusive-clinical-research-accessibility-toolkit.pdf',
    downloadName: 'NeuroViu-Disability-Inclusive-Clinical-Research-Accessibility-Toolkit-v1.pdf',
    pages: 11,
    size: '191 KB',
  },
}

export const RESOURCES: Resource[] = [
  DISABILITY_ACCESSIBILITY_TOOLKIT,
  ACCESSIBLE_VR_TOOLKIT,
  ACCOMMODATION_PLANNING_FORM,
  PAUSE_STOP_PROCEDURE,
  INTERPRETATION_SAFEGUARDS,
  CO_DESIGN_GUIDE,
]
