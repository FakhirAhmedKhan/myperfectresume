<div align="center">

# ✨ Smart Resume Studio

**A professional-grade resume builder and ATS analyzer — built entirely on the client side.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Build beautiful, ATS-optimized resumes and instantly score them against industry standards — **no server, no sign-up, 100 % offline-capable.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [ATS Scoring Engine](#-ats-scoring-engine)
- [Resume Templates](#-resume-templates)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔎 Overview

**Smart Resume Studio** is a privacy-first, single-page application that combines two powerful tools:

| Module | Purpose |
|--------|---------|
| **CV Builder** | Create and edit professional resumes with real-time preview, multiple templates, and one-click PDF export. |
| **ATS Checker** | Deep-scan any resume against 25+ role-specific keyword databases, structural best-practices, and optional job-description matching. |

Everything runs **entirely in the browser** — your data never leaves your machine. Resume content is persisted in `localStorage` so you can close the tab and pick up right where you left off.

---

## 🚀 Key Features

### Resume Builder
- 📝 **Interactive form editor** — Personal info, experience, education, projects, skills, and certifications
- 👁️ **Live preview** — Instant visual feedback as you type
- 🎨 **Multiple templates** — Switch between *Professional* (classic serif) and *Modern* (sidebar-based) layouts
- 📄 **One-click PDF export** — High-fidelity PDF download via `html2pdf.js` with oklch color sanitization for maximum compatibility
- 💾 **Auto-save** — All data automatically persisted to `localStorage`
- 📱 **Responsive design** — Mobile-first with a tab toggle between edit and preview on small screens

### ATS Checker
- 🔍 **Multi-dimensional scoring** — Six scoring modules: Sections, Keywords, Impact, Formatting, Essentials, and JD Match
- 🏷️ **25+ role profiles** — Pre-built keyword databases for Frontend, Backend, Fullstack, DevOps, ML Engineer, Data Scientist, Cybersecurity, and many more
- 📋 **Job description matching** — Paste a JD to get a tailored match score with missing keyword suggestions
- 📂 **PDF upload with OCR** — Extract text from uploaded PDFs using `pdfjs-dist`; falls back to `tesseract.js` OCR for scanned documents
- 🔄 **Builder sync** — One-click import of resume data from the CV Builder
- 💡 **Actionable suggestions** — Specific, prioritized improvement tips based on analysis results

### General
- 🌗 **Dark / light mode** — System-aware theme toggle with persistence
- ⚡ **Code-split & lazy-loaded** — All pages, UI components, icons, and heavy libraries are dynamically imported
- 🧊 **Glassmorphism UI** — Premium frosted-glass navbar, gradient text, and smooth micro-animations
- 🔤 **Custom SVG icon set** — 24 hand-crafted icons with zero external icon-library dependency

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **UI Framework** | React | 19.2 |
| **Build Tool** | Vite + Rolldown | 8.0 |
| **Styling** | Tailwind CSS (v4, Vite plugin) | 4.2 |
| **Animations** | Framer Motion (LazyMotion) | 12.38 |
| **PDF Export** | html2pdf.js | 0.14 |
| **PDF Parsing** | pdfjs-dist | 5.6 |
| **OCR Engine** | Tesseract.js | 7.0 |
| **Linting** | ESLint + react-hooks + react-refresh | 9.39 |
| **Package Manager** | pnpm | — |

> **Note:** This is a **frontend-only** project — there is no backend server, database, or API layer. All data is stored client-side in `localStorage`.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Layout.jsx                            │
│  ┌─────────┐  ┌──────────────────────────────────────────┐   │
│  │ NavBar  │  │              Page Content                │   │
│  │(glass)  │  │  ┌──────────┬───────────┬────────────┐   │   │
│  └─────────┘  │  │ HomePage │ Builder   │ Checker     │   │   │
│               │  │          │  Page     │  Page       │   │   │
│               │  └──────────┴───────────┴────────────┘   │   │
│               └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘

State Management:
  • CvBuilderProvider (Context) → ResumeForm ↔ ResumePreview
  • CvCheckerProvider (Context) → InputColumn ↔ ResultsColumn

Scoring Pipeline (ATS Checker):
  Resume Text ──► calculateATSScore() ──► Weighted Composite Score
                    ├─ calculateSectionScore()
                    ├─ calculateKeywordScore()
                    ├─ calculateImpactScore()
                    ├─ calculateFormattingScore()
                    ├─ calculateEssentialsScore()
                    └─ calculateJDMatchScore()
```

**Navigation** is handled via simple `useState` page switching (no router library), with the active page persisted to `localStorage`.

---

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) — or npm / yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/FakhirAhmedKhan/myperfectresume.git
cd myperfectresume

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm run dev
```

The app will be available at **`http://localhost:5173`** (default Vite port).

### Production Build

```bash
# Build optimized production bundle
pnpm run build

# Preview the production build locally
pnpm run preview
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `pnpm run dev` | Start Vite dev server with HMR |
| `build` | `pnpm run build` | Create optimized production build in `dist/` |
| `preview` | `pnpm run preview` | Serve the production build locally |
| `lint` | `pnpm run lint` | Run ESLint on all `.js` and `.jsx` files |

---

## 📁 Project Structure

```
myperfectresume/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Tailwind + path aliases + chunk splitting
├── jsconfig.json               # Path alias (@/ → src/) for IDE support
├── eslint.config.js            # ESLint flat config (React hooks + refresh)
├── package.json                # Dependencies & scripts
│
├── src/
│   ├── Layout.jsx              # Root component — app shell, routing, footer
│   ├── index.js                # Lazy-loaded icon re-exports
│   ├── index.css               # Global styles, theme tokens, print styles, glassmorphism
│   ├── CustomIcons.jsx          # 24 custom SVG icon components
│   ├── favicon.svg             # App favicon
│   │
│   ├── components/
│   │   ├── index.js            # Centralized lazy component exports
│   │   ├── HomePage.jsx        # Landing page (Hero + Features)
│   │   ├── BuilderPage.jsx     # Resume builder page wrapper
│   │   ├── CheckerPage.jsx     # ATS checker page wrapper
│   │   ├── Navbar.jsx          # Glass navbar with page switcher & theme toggle
│   │   │
│   │   └── ui/                 # Presentational UI components
│   │       ├── HeroSection.jsx           # Landing hero with CTA buttons
│   │       ├── FeatureHighlights.jsx     # Feature cards grid
│   │       ├── FeatureCard.jsx           # Individual feature card
│   │       ├── ResumeForm.jsx            # Builder form (all sections)
│   │       ├── FormSections.jsx          # Dynamic add/remove section component
│   │       ├── ResumePreview.jsx         # Preview container (template switcher)
│   │       ├── ProfessionalTemplate.jsx  # Classic serif resume template
│   │       ├── ModernTemplate.jsx        # Sidebar-based modern template
│   │       ├── BuildPageHeader.jsx       # Builder header (template & download controls)
│   │       ├── MobileTabToggle.jsx       # Mobile edit/preview tab switcher
│   │       ├── Input.jsx                 # Reusable styled input
│   │       ├── Textarea.jsx             # Reusable styled textarea
│   │       ├── ContactItem.jsx          # Contact info line item
│   │       ├── InputColumn.jsx          # ATS checker left panel (inputs)
│   │       ├── ResultsColumn.jsx        # ATS checker right panel (results)
│   │       ├── ResumeInputPanel.jsx     # Resume text/upload panel
│   │       ├── JobDescriptionPanel.jsx  # JD paste panel
│   │       ├── RoleSelector.jsx         # Role dropdown for keyword matching
│   │       ├── ATSResults.jsx           # ATS results wrapper
│   │       ├── ScoreCard.jsx            # Circular score display
│   │       ├── ScoreBreakdown.jsx       # Category score breakdown bars
│   │       ├── KeywordMatchPanel.jsx    # Found/missing keywords display
│   │       ├── MissingSectionsPanel.jsx # Missing sections alert
│   │       └── SuggestionsPanel.jsx     # Improvement suggestions list
│   │
│   └── configs/                # Business logic, helpers & state management
│       ├── index.js            # Barrel export for all configs
│       ├── useCvBuilder.js     # Builder Context provider + hooks
│       ├── useCvChecker.js     # Checker Context provider + hooks
│       ├── useTheme.js         # Dark/light theme hook
│       ├── useHandleDownload.js  # PDF export logic (html2pdf.js)
│       ├── useHandleFileUpload.js # PDF text extraction (pdfjs + Tesseract OCR)
│       ├── initialResumeData.js  # Empty resume data schema
│       ├── resumeHelpers.js    # Resume data flattening utilities
│       ├── keywordHelpers.js   # Keyword extraction & comparison
│       ├── bulletAnalysis.js   # Bullet point quality analysis
│       ├── normalizeText.js    # Text normalization & contact extraction
│       ├── regexHelpers.js     # Regex utility functions
│       ├── sectionAliases.js   # Section name aliases (9 categories)
│       ├── sectionHelpers.js   # Section detection logic
│       ├── scoringWeights.js   # Scoring weight configuration
│       ├── roleKeywords.js     # 25+ role-specific keyword databases
│       ├── mockJobDescription.js  # Sample JD for testing
│       ├── mockResumeText.js      # Sample resume text for testing
│       │
│       └── scoring/            # Modular ATS scoring engine
│           ├── calculateATSScore.js       # Master scorer (weighted aggregation)
│           ├── calculateSectionScore.js   # Section presence scoring
│           ├── calculateKeywordScore.js   # Role keyword matching
│           ├── calculateImpactScore.js    # Metrics & action verb analysis
│           ├── calculateFormattingScore.js # Length & structure checks
│           ├── calculateEssentialsScore.js # Contact info completeness
│           └── calculateJDMatchScore.js   # Job description alignment
│
└── dist/                       # Production build output (gitignored)
```

---

## ⚙️ How It Works

### CV Builder Flow
1. User fills in resume sections (personal info, experience, education, projects, skills) via interactive form
2. Data is managed by `CvBuilderProvider` (React Context) and auto-saved to `localStorage`
3. `ResumePreview` renders the data in real-time using the selected template (Professional or Modern)
4. On download, `html2pdf.js` is dynamically imported, the preview DOM is cloned, oklch colors are sanitized to hex for `html2canvas` compatibility, and a high-fidelity PDF is generated

### ATS Checker Flow
1. User provides resume content via one of three methods:
   - **Manual entry** — Type/paste into structured form fields
   - **PDF upload** — Text extracted via `pdfjs-dist`, with `tesseract.js` OCR fallback for scanned PDFs
   - **Builder import** — One-click sync from CV Builder's `localStorage`
2. Optionally, user pastes a Job Description and/or selects a target role
3. On analysis, the resume text is passed through 6 scoring modules with configurable weights
4. Results are displayed as a composite score, category breakdown, keyword matches, and actionable suggestions

---

## 📊 ATS Scoring Engine

The scoring engine is **fully modular** — each dimension is scored independently, then combined using configurable weights.

### Scoring Modules

| Module | Weight (Standard) | Weight (With JD) | What It Measures |
|--------|:-:|:-:|-----------------|
| **Sections** | 25% | 15% | Presence of key resume sections (Summary, Experience, Education, Skills, etc.) with alias matching |
| **Keywords** | 30% | — | Match against role-specific keyword database (critical 60%, important 40%, bonus up to +15) |
| **Impact** | 20% | 20% | Quantified achievements (numbers/metrics) and action verb usage in bullet points |
| **Formatting** | 10% | 15% | Resume length, bullet point formatting, section ordering |
| **Essentials** | 15% | 10% | Contact information completeness (email, phone, LinkedIn) |
| **JD Match** | — | 40% | Keyword overlap between resume and provided job description |

### Supported Role Profiles

> `general` · `frontend` · `backend` · `fullstack` · `dataAnalyst` · `android` · `ios` · `mlEngineer` · `devops` · `qaEngineer` · `projectManager` · `productManager` · `uiuxDesigner` · `mobile` · `gameDeveloper` · `embeddedSystems` · `blockchain` · `cybersecurity` · `cloudEngineer` · `dataScientist` · `dataEngineer` · `qaAutomation` · `technicalWriter` · `itSupport` · `networkEngineer` · `salesEngineer` · `businessAnalyst` · `projectCoordinator` · `qaLead` · `softwareArchitect`

Each profile defines **critical**, **important**, and **bonus** keywords that are weighted differently in the scoring algorithm.

---

## 🎨 Resume Templates

### Professional Template
- Classic, serif-based typography
- Centered header with contact details
- Clean section dividers with uppercase tracking
- Traditional single-column layout

### Modern Template
- Dark sidebar with contact info and skill tags
- Two-column layout (sidebar + main content)
- Timeline-style experience section with blue accent dots
- Sans-serif typography with bold section headers

Both templates are optimized for **PDF export** and **print media** via dedicated CSS `@media print` rules.

---

## ⚙️ Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory, configured in both `vite.config.js` and `jsconfig.json`:

```js
// vite.config.js
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
},
```

### Bundle Splitting

Vite's `advancedChunks` configuration splits heavy dependencies into separate chunks for optimal loading:

- `react-vendor` — React + ReactDOM
- `framer-vendor` — Framer Motion
- `pdfjs-dist-vendor` — PDF.js
- `tesseract-vendor` — Tesseract.js OCR
- `html2pdf-vendor` — html2pdf.js

### Theme System

Custom CSS theme tokens are defined in `src/index.css` using Tailwind's `@theme` and `@layer base` directives, with HEX color overrides for `html2canvas` compatibility (which doesn't support oklch).

### Environment Variables

This project does **not** require any environment variables. All configuration is embedded in the source code, and all functionality runs client-side.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Fakhir Ahmed Khan](https://github.com/FakhirAhmedKhan)**

</div>
