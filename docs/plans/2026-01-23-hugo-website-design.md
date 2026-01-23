# Mean IT Consultancy Website Design

## Overview

Hugo website for Mean IT Consultancy using the Ananke theme.

- **Domain:** meanit.nl
- **Company focus:** Accessibility and development consultancy
- **Type:** Informational/brochure site

## Site Structure

```
meanit.nl/
├── content/
│   ├── _index.md          (Dutch homepage)
│   ├── over.md            (Dutch about page → /over/)
│   ├── contact.md         (Dutch contact page)
│   └── en/
│       ├── _index.md      (English homepage)
│       ├── about.md       (English about page → /en/about/)
│       └── contact.md     (English contact page)
├── hugo.toml              (main config with i18n settings)
├── themes/
│   └── ananke/            (installed as Hugo module)
└── static/
    └── images/            (logo, favicon, etc.)
```

## URL Structure

| URL | Content |
|-----|---------|
| meanit.nl/ | Dutch homepage |
| meanit.nl/over/ | Dutch about |
| meanit.nl/contact/ | Dutch contact |
| meanit.nl/en/ | English homepage |
| meanit.nl/en/about/ | English about |
| meanit.nl/en/contact/ | English contact |

## Languages

- **Default:** Dutch (at root)
- **Secondary:** English (under /en/)
- Language switcher in navigation via Ananke theme

## Pages

### Homepage
- Hero section with company name and tagline
- Brief intro to Mean IT Consultancy
- Focus on accessibility & development expertise
- Call-to-action to contact page

### About (over.md / about.md)
- Company background
- Mission/approach
- Expertise areas (accessibility, development)

### Contact
- Email address display
- Brief invitation to get in touch

## Technical Decisions

| Aspect | Decision |
|--------|----------|
| Theme installation | Hugo module |
| i18n approach | Content directories with translationKey |
| Contact method | Email only (no form) |

## Implementation Steps

1. Install Go via winget
2. Initialize Hugo site in current directory
3. Add Ananke theme as Hugo module
4. Configure hugo.toml with i18n settings
5. Create content pages (Dutch + English)
6. Test locally with `hugo server`

## Out of Scope

- Blog/news section
- Contact form
- Services page
- Team page
- Analytics
