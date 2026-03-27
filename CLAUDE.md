# The Path — Project Brief for Claude Code

## What This Project Is

"The Path" is a rational, evidence-based Islamic dawah website. It guides users through the biggest questions a human being can ask — starting from the existence of the universe — and follows the logic step by step toward Islam.

The site is NOT preachy. It does NOT lecture. It asks questions, presents concrete evidence, and lets the user follow the reasoning at their own pace.

---

## Current State

A working single-file prototype exists: `the-path-v2.html`
This file contains everything — HTML, CSS, JS, and all content — in one place.
The job of this project is to expand it into a proper, maintainable multi-file structure.

---

## Project Structure (Target)

```
the-path/
  index.html              ← User-facing journey
  admin.html              ← Admin content management panel
  CLAUDE.md               ← This file
  css/
    style.css             ← All styles (light + dark mode)
  js/
    app.js                ← Journey logic (navigation, speech, form, rendering)
    admin.js              ← Admin panel logic
    tree/
      index.js            ← Merges all branch files into one TREE object
      root.js             ← Starting node (who are you?)
      atheist.js          ← Full atheist/no-god branch
      agnostic.js         ← Agnostic/unsure branch
      monotheist.js       ← Believes in one God but not Islam
      polytheist.js       ← Believes in multiple gods
      messenger.js        ← Prophet Muhammad ﷺ and prophethood branch
      quran.js            ← Quran authenticity, science, literary miracle
      purpose.js          ← Purpose of life branch
      conclusions.js      ← All conclusion nodes
      dead_ends.js        ← All dead-end/contact nodes
  data/
    tree.en.js            ← English content (auto-generated from tree/ files)
    tree.ar.js            ← Arabic content (to be added later)
```

---

## Node Types

Every node in the content tree has one of four types:

| Type | Purpose | Has options? |
|---|---|---|
| `question` | Main question posed to user with multiple answer options | ✅ Unlimited |
| `rebuttal` | Shown when user disagrees — presents evidence, then one continue button | ✅ One (continue) |
| `dead_end` | No more content for this branch yet — shows contact form | ❌ |
| `conclusion` | End of a completed path — shows summary, next steps, optional contact | ❌ |

---

## Node Data Structure

```js
{
  id: "unique_node_id",           // snake_case, unique across all nodes
  type: "question",               // question | rebuttal | dead_end | conclusion
  status: "live",                 // live | draft
  content: {
    en: {
      question: "...",            // Main question or heading text
      subtitle: "...",            // Supporting sentence (optional)
      message: "...",             // For dead_end nodes only
    },
    ar: {                         // Arabic translation (add later)
      question: "...",
      subtitle: "...",
      message: "...",
    }
  },
  options: [                      // Answer buttons shown to user
    {
      label: { en: "...", ar: "..." },  // Button text per language
      next: "target_node_id"            // Which node this leads to
    }
  ],
  evidence: {                     // Optional evidence panel (null if none)
    title: { en: "...", ar: "..." },
    points: [
      {
        id: "unique_point_id",
        blocks: [                 // Freeform content blocks, any combination
          { type: "text", content: "..." },
          { type: "link", label: "...", url: "...", linkType: "article|video|book|study" },
          { type: "image", url: "...", caption: "..." },
          { type: "quote", content: "...", source: "..." },
        ],
        readMore: "..."           // Expanded text shown on Read More (optional)
      }
    ]
  },
  steps: [                        // For conclusion nodes only
    { label: "...", url: "...", type: "article|video" }
  ],
  showContact: false,             // For conclusion nodes — show contact form?
}
```

---

## Content Tree Overview

The journey starts at `root` → `start` node which asks "Who are you?" and branches into:

```
start
├── Atheist / No God          → atheist_universe → atheist_beginning → atheist_cause
│                               → atheist_creator_exists → atheist_one_or_many
│                               → creator_communicates → which_messenger
│                               → muhammad_intro → quran_intro → quran_scientific
│                               → purpose_of_life → islam_purpose_answer → conclusion
│
├── Polytheist                → polytheist_start → [argument from unity]
│                               → creator_communicates → [continues as above]
│
├── Monotheist (not Islam)    → monotheist_start → [tailored questions]
│                               → muhammad_intro / quran_intro → [continues]
│
├── Agnostic / Unsure         → agnostic_start → [branches by reason for doubt]
│                               → atheist_universe → [continues as atheist path]
│
└── Muslim with doubts        → muslim_doubts → [scientific / historical / personal]
                                → quran_scientific / muhammad_intro / dead_end
```

Each "No" or disagreement → rebuttal node → rejoins main path OR → dead_end
Each dead_end → contact form (with full path log sent to admin)

---

## User Journey Features

- **Landing page** — title, tagline, topic list, fine print, "Begin the journey" CTA
- **One question at a time** — full focus, no distractions
- **Unlimited answer options** per question
- **"None of these represent my view"** button on every question → dead_end contact form
- **Evidence panel** — toggleable, shows 1–2 points with Read More expansion
- **Back button** — always available, goes back one step
- **Progress bar** — subtle, based on history length
- **Text-to-speech** — optional, user-triggered, reads current question aloud
- **Light/dark mode** — toggle in header, respects user preference
- **Path log** — every step the user took is tracked and included in contact form submission
- **Contact form** — name, email, message + full path log → submitted to Formspree
- **Formspree ID**: `mdapnwgd`

---

## Admin Panel Features

- **Password protected** — default password: `admin1234` (change before going live)
- **Node list** — all nodes listed with type color and live/draft status
- **Search** — filter nodes by ID or content
- **Node editor** — edit question, subtitle, evidence, options, status, type
- **Block builder** — each evidence point is built from freeform blocks (text, link, image, quote)
- **Unlimited options** — add/remove answer options, each linked to any node
- **AI Generate** — sends node context to Claude API, drafts content, user reviews and approves
- **Incoming links** — shows which nodes link to the currently selected node
- **Export JSON** — downloads full tree as `the-path-data.json`
- **Import JSON** — loads a saved tree back in
- **Status** — nodes can be Live or Draft (Draft nodes are hidden from users)

---

## Multilingual Architecture

Language support is built into the node structure from day one.

- All text content lives under `content.en`, `content.ar`, etc.
- Option labels are also per-language: `label.en`, `label.ar`
- The active language is stored in a global `lang` variable (default: `"en"`)
- A language switcher in the header toggles `lang` and re-renders the current node
- RTL layout (Arabic) is handled by adding `dir="rtl"` to the `<html>` tag and a `.rtl` CSS class
- Arabic is the next language to be added after English content is complete and reviewed

---

## Design System

### Philosophy
Wikipedia-inspired. Content is king. The design never competes with the ideas.
Feels like reading something important and true. No hype. Just clarity.

### Colors (CSS variables)
```css
/* Light mode */
--bg: #f8f8f6;
--surface: #ffffff;
--border: #e0e0e0;
--text: #1a1a1a;
--muted: #666666;
--accent: #1d4ed8;
--accent-text: #ffffff;
--evid-bg: #f0f7f0;
--evid-border: #86c986;
--btn-bg: #ffffff;
--btn-border: #d0d8f0;
--btn-hover: #f0f4ff;

/* Dark mode (body.dark) */
--bg: #1a1a1a;
--surface: #242424;
--border: #333333;
--text: #e8e8e8;
--muted: #888888;
--accent: #3b82f6;
--evid-bg: #1a2a1a;
--evid-border: #2d4a2d;
--btn-bg: #2a2a2a;
--btn-border: #3a3a3a;
--btn-hover: #333333;
```

### Typography
- Questions/headings: `Georgia, serif`
- Body/UI: `'Lato', system-ui, sans-serif`
- Monospace (IDs, code): `monospace`

### Key measurements
- Max content width: `660px`
- Main padding: `36px 18px 80px`
- Border radius: `8px` (cards), `6px` (inputs/buttons), `20px` (chips)
- Progress bar height: `3px`

### Animations
- Page load: `fadeUp` (opacity + translateY, staggered)
- Node transitions: `fadeSlide` (0.35s ease)
- All transitions: `0.3s` for color/background, `0.15s` for hover states

---

## Accessibility Requirements

- Fully responsive — mobile first, works from 320px width up
- Large tap targets — buttons minimum 48px height on mobile
- Screen reader compatible — proper ARIA labels on all interactive elements
- Keyboard navigable — Tab, Enter, arrow keys work throughout
- WCAG AA contrast minimum
- Text-to-speech support (Web Speech API, user-triggered)
- Works on slow 3G connections — no heavy assets required
- No account, no cookies, no tracking
- Zoom up to 200% without breaking layout
- `dir="rtl"` support ready for Arabic

---

## Deployment

- **Target host**: Any static host (Netlify, Cloudflare Pages, Vercel, or custom domain)
- **No build step required** — plain HTML/CSS/JS
- **No server required** — fully static
- **Formspree** handles form submission (ID: `mdapnwgd`)
- When deploying, add the production domain to Formspree's allowed origins

---

## Content Guidelines

- **Tone**: Rational, simple, direct. No jargon. No lecturing.
- **Voice**: Neutral at first, gradually Islamic as the journey progresses
- **Evidence**: Concrete and specific — no vague philosophical claims
- **Depth**: 1–2 evidence points per node + optional Read More expansion
- **Sources**: Prefer peer-reviewed, academic, or well-known institutional sources
- **Links**: Always open in new tab (`target="_blank" rel="noopener noreferrer"`)
- **Quran quotes**: Always include Arabic + translation + reference (Surah:Ayah)
- **Muhammad ﷺ**: Always include the salutation ﷺ (Unicode: \uFDFA)

---

## What Still Needs to Be Built

- [ ] Refactor single HTML file into proper multi-file structure
- [ ] Migrate content tree to multilingual node structure
- [ ] Split tree into branch files (atheist.js, agnostic.js, etc.)
- [ ] Rebuild admin panel with block builder and AI generate
- [ ] Add Arabic translations
- [ ] Add RTL layout support
- [ ] Wire up proper deployment pipeline
- [ ] Add more branches and deeper content (50–100+ nodes planned)
- [ ] Add image support to evidence blocks
- [ ] Add analytics (privacy-friendly, e.g. Plausible or Fathom)

---

## Important Notes for Claude Code

- Always preserve the `FORMSPREE_ID = "mdapnwgd"` — do not change it
- Default admin password is `admin1234` — remind the developer to change it before going live
- The `ﷺ` character (Unicode U+FDFA) must always follow "Muhammad" — never omit it
- Dead-end nodes always show the contact form with the full path log
- The "None of these represent my view" button must appear on every question node
- Evidence panels are optional per node — not every question needs one
- Draft nodes are visible in admin but hidden from users on the live site
- When adding new nodes, always check for incoming links using the admin panel
- The tree must always have a valid path from `start` to at least one `conclusion` node
