# User Panel UI (Pathii – AI Memory Assistant) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete user panel UI in `frontend/` as a pixel-exact replica of the 11 reference mockups in `refernce/`, using the pre-generated reference TSX components in `refernce/` as ground-truth code.

**Architecture:** Next.js App Router. Each mockup becomes one self-contained client page at its own route. Every page keeps its own sidebar/logo markup copied verbatim from its reference file (pixel fidelity over DRY — this duplication is intentional and mandated); sidebar items are made navigable with `next/link` using a fixed href map. No shared component extraction.

**Tech Stack:** Next.js 16.2.12 (App Router, TypeScript), React 19.2.4, Tailwind CSS 4, `lucide-react` (icons), `recharts` (Insights page only), Inter font via `next/font`.

## Global Constraints

- **Pixel fidelity:** Every page must render exactly like its reference PNG in `refernce/`. The matching reference TSX file in `refernce/` is ground-truth code — copy it, do not redesign it. Do not modify anything inside `refernce/`.
- **Route map (fixed):**

  | Route | Source reference file (`refernce/`) | Reference PNG (`refernce/`) |
  |---|---|---|
  | `/` | `pathii_dashboard.tsx` | `Pathii AI Memory Dashboard.png` |
  | `/voice-capture` | `voice_capture_dashboard.tsx` | `Pathii Voice Capture Dashboard.png` |
  | `/memories` | `ai_memory_dashboard.tsx` | `AI Memory Assistant Dashboard.png` |
  | `/memories-classic` | `memories_dashboard.tsx` | `AI Memory Assistant Dashboard (1).png` |
  | `/tasks` | `tasks_dashboard.tsx` | `Pathii Tasks & Schedule Dashboard.png` |
  | `/calendar` | `pathii_calendar_dashboard.tsx` | `Pathii Calendar Dashboard Overview.png` |
  | `/documents` | `pathii_documents_dashboard.tsx` | `Pathii Documents Dashboard.png` |
  | `/people` | `pathii_people_dashboard.tsx` | `Pathii People Dashboard Interface.png` |
  | `/integrations` | `pathii_integrations_dashboard.tsx` | `Pathii Integrations Dashboard.png` |
  | `/insights` | `pathii_insights_dashboard.tsx` | `Pathii AI Memory Insights Dashboard.png` |
  | `/settings` | `pathii_settings_dashboard.tsx` | `Pathii AI Memory Assistant Settings Dashboard.png` |

- **Sidebar href map (used by every page):** Dashboard→`/`, Voice Capture→`/voice-capture`, Memories→`/memories`, Tasks & Schedule→`/tasks`, Calendar→`/calendar`, Documents→`/documents`, People→`/people`, Integrations→`/integrations`, Insights→`/insights`, Settings→`/settings`. Keep each page's exact label text from its own reference file (e.g. the home page's sidebar says `Tasks`, all other pages say `Tasks & Schedule` — preserve those differences verbatim). `/memories-classic` is NOT a sidebar item anywhere.
- **Every page file:** `"use client";` as line 1, exactly one default-exported React component.
- **No new dependencies** beyond `lucide-react` and `recharts`.
- **`npm run build` must exit 0 at the end of every task** (it type-checks and prerenders every route, so it is the per-task verification cycle; TDD is not applicable to verbatim UI transcription).
- **Per-page duplication** of `BrainLogo` / `SidebarItem` / sidebar markup is intentional — do NOT extract shared components.
- **Next.js is 16.2.12 with breaking changes.** When unsure about a convention (fonts, metadata, Link), consult `node_modules/next/dist/docs/` after install; follow the patterns already used by the existing scaffold in `frontend/app/`.
- **Avatar images:** keep the reference files' `https://i.pravatar.cc/...` URLs on plain `<img>` tags exactly as written.
- Work happens on branch `feature/user-panel-ui` (created from `main` in Task 1). Never commit on `main`. `node_modules/` must never appear in `git status` after install (the scaffold `.gitignore` covers it — verify once in Task 1).

---

### Task 1: Foundation — branch, dependencies, font, metadata

**Files:**
- Modify: `frontend/package.json` (add `lucide-react`, `recharts`)
- Modify: `frontend/app/layout.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Produces: installable project with Inter font active; `lucide-react` and `recharts` importable by all later tasks.

- [ ] **Step 1: Create feature branch**

```bash
cd "C:\Users\Devesh B\OneDrive\Documents\DEVESH\RAKS\AI-Memory-assistant"
git checkout -b feature/user-panel-ui
```

Expected: `Switched to a new branch 'feature/user-panel-ui'`

- [ ] **Step 2: Install dependencies**

```bash
cd frontend
npm install
npm install lucide-react recharts
```

Expected: exit 0, `package.json` gains `"lucide-react"` and `"recharts"` in `dependencies`. Verify `git status` shows only `package.json` / `package-lock.json` modified (no `node_modules`).

- [ ] **Step 3: Switch layout to Inter font and Pathii metadata**

Replace `frontend/app/layout.tsx` content with (keeping the existing html/body structure conventions; if Next 16 docs in `node_modules/next/dist/docs/` contradict any API used here, follow the docs and note it in the report):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pathii – AI Memory Assistant",
  description: "AI Memory Assistant user panel — capture, organize and recall everything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Clean globals.css for a light-theme dashboard**

Replace `frontend/app/globals.css` content with:

```css
@import "tailwindcss";

:root {
  --background: #f4f7f9;
  --foreground: #0f172a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

(This removes the scaffold's dark-mode auto-switch, which would fight the light-theme mockups, and makes Tailwind's `font-sans` resolve to Inter — the mockups' typeface.)

- [ ] **Step 5: Verify build**

```bash
cd frontend && npm run build
```

Expected: exit 0 with the default scaffold page still compiling.

- [ ] **Step 6: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/app/layout.tsx frontend/app/globals.css
git commit -m "chore(frontend): add lucide-react/recharts, Inter font, Pathii metadata"
```

---

### Task 2: Home (`/`) and Voice Capture (`/voice-capture`) pages

This task establishes the page-adaptation pattern every later task repeats.

**Files:**
- Create: `frontend/app/page.tsx` (replaces scaffold content)
- Create: `frontend/app/voice-capture/page.tsx`

**Interfaces:**
- Consumes: Inter font + deps from Task 1.
- Produces: navigable `/` and `/voice-capture`; the Link-enabled `SidebarItem` pattern documented below for later tasks.

- [ ] **Step 1: Adapt `refernce/pathii_dashboard.tsx` → `frontend/app/page.tsx`**

Apply this adaptation recipe (all later page tasks use the same recipe):

1. Copy the reference file's entire content to the new page file, then:
2. Make line 1: `"use client";`
3. Directly under it add: `import Link from "next/link";`
4. Make the sidebar navigable with the SMALLEST possible diff: in the file's own `SidebarItem` component, add an `href` prop and replace its outer element with `<Link href={href}>`, keeping every className verbatim. Example for the home file's component:

```tsx
const SidebarItem = ({ icon: Icon, label, active, href }) => (
  <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors mb-1 ${active ? 'bg-[#E5EFFF] text-[#2563EB] font-semibold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}>
    <Icon size={20} className={active ? 'text-[#2563EB]' : 'text-slate-500'} />
    <span className="text-[14.5px]">{label}</span>
  </Link>
);
```

(The class string above is illustrative — always use the class string already present in the file you are copying.) Then pass `href` to every `<SidebarItem>` per the sidebar href map in Global Constraints, and set `active` ONLY on the item whose route is this page. If a page builds sidebar rows with inline JSX instead of a component, wrap each row's outer element in `<Link href={...}>` the same way.

5. Keep EVERYTHING else byte-identical: all class strings, text copy, numbers, inline SVGs, `pravatar.cc` avatar URLs, comments. Only the three changes above ("use client", Link import, Link-wrapped sidebar items) are allowed.
6. If the build fails on TypeScript/ESLint (e.g. unused imports from the trimmed icon list, `react/no-unescaped-entities` on apostrophes), make the minimal fix that does not change rendered output: remove genuinely-unused imports; escape `'` in JSX text as `&apos;`.

- [ ] **Step 2: Adapt `refernce/voice_capture_dashboard.tsx` → `frontend/app/voice-capture/page.tsx`** using the same recipe (active item: Voice Capture).

- [ ] **Step 3: Verify build prerenders both routes**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list in output includes `/` and `/voice-capture`.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/page.tsx frontend/app/voice-capture/page.tsx
git commit -m "feat(frontend): add Home and Voice Capture pages from reference designs"
```

---

### Task 3: Memories (`/memories`) and Memories-classic (`/memories-classic`) pages

Two different Memories designs exist in the reference set; this task ships both and verifies which file matches which image.

**Files:**
- Create: `frontend/app/memories/page.tsx`
- Create: `frontend/app/memories-classic/page.tsx`

**Interfaces:**
- Consumes: Task 1 deps; Task 2 adaptation recipe (restated fully below — do not look it up elsewhere).

- [ ] **Step 1: Adapt `refernce/ai_memory_dashboard.tsx` → `frontend/app/memories/page.tsx`**

Adaptation recipe: copy the reference file entirely, then (a) line 1 `"use client";`, (b) add `import Link from "next/link";`, (c) in the file's own `SidebarItem` (or inline sidebar rows), add `href` and replace the outer element with `<Link href={href}>` keeping every className verbatim; pass hrefs per the sidebar href map (Memories→`/memories`); `active` only on Memories. Keep everything else byte-identical (class strings, copy, waveforms, SVGs, avatar URLs). Minimal-only fixes if TS/ESLint blocks the build, without changing rendered output.

- [ ] **Step 2: Adapt `refernce/memories_dashboard.tsx` → `frontend/app/memories-classic/page.tsx`** using the same recipe (active item: Memories).

- [ ] **Step 3: Verify build prerenders both routes**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes `/memories` and `/memories-classic`.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/memories/page.tsx frontend/app/memories-classic/page.tsx
git commit -m "feat(frontend): add both Memories page designs from reference"
```

---

### Task 4: Tasks (`/tasks`) and Calendar (`/calendar`) pages

**Files:**
- Create: `frontend/app/tasks/page.tsx`
- Create: `frontend/app/calendar/page.tsx`

**Interfaces:**
- Consumes: Task 1 deps; adaptation recipe restated below.

- [ ] **Step 1: Adapt `refernce/tasks_dashboard.tsx` → `frontend/app/tasks/page.tsx`**

Adaptation recipe: copy the reference file entirely, then (a) line 1 `"use client";`, (b) add `import Link from "next/link";`, (c) in the file's own `SidebarItem` (or inline sidebar rows), add `href` and replace the outer element with `<Link href={href}>` keeping every className verbatim; pass hrefs per the sidebar href map (Tasks & Schedule→`/tasks`); `active` only on Tasks & Schedule. Keep everything else byte-identical. Minimal-only fixes if TS/ESLint blocks the build, without changing rendered output.

- [ ] **Step 2: Adapt `refernce/pathii_calendar_dashboard.tsx` → `frontend/app/calendar/page.tsx`** using the same recipe (active item: Calendar).

- [ ] **Step 3: Verify build prerenders both routes**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes `/tasks` and `/calendar`.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/tasks/page.tsx frontend/app/calendar/page.tsx
git commit -m "feat(frontend): add Tasks and Calendar pages from reference designs"
```

---

### Task 5: Documents (`/documents`) and People (`/people`) pages

**Files:**
- Create: `frontend/app/documents/page.tsx`
- Create: `frontend/app/people/page.tsx`

**Interfaces:**
- Consumes: Task 1 deps; adaptation recipe restated below.

- [ ] **Step 1: Adapt `refernce/pathii_documents_dashboard.tsx` → `frontend/app/documents/page.tsx`**

Adaptation recipe: copy the reference file entirely, then (a) line 1 `"use client";`, (b) add `import Link from "next/link";`, (c) in the file's own `SidebarItem` (or inline sidebar rows), add `href` and replace the outer element with `<Link href={href}>` keeping every className verbatim; pass hrefs per the sidebar href map (Documents→`/documents`); `active` only on Documents. Keep everything else byte-identical. Minimal-only fixes if TS/ESLint blocks the build, without changing rendered output.

- [ ] **Step 2: Adapt `refernce/pathii_people_dashboard.tsx` → `frontend/app/people/page.tsx`** using the same recipe (active item: People).

- [ ] **Step 3: Verify build prerenders both routes**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes `/documents` and `/people`.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/documents/page.tsx frontend/app/people/page.tsx
git commit -m "feat(frontend): add Documents and People pages from reference designs"
```

---

### Task 6: Integrations (`/integrations`), Insights (`/insights`, recharts), Settings (`/settings`)

**Files:**
- Create: `frontend/app/integrations/page.tsx`
- Create: `frontend/app/insights/page.tsx`
- Create: `frontend/app/settings/page.tsx`

**Interfaces:**
- Consumes: Task 1 deps (`recharts` used here); adaptation recipe restated below.

- [ ] **Step 1: Adapt `refernce/pathii_integrations_dashboard.tsx` → `frontend/app/integrations/page.tsx`**

Adaptation recipe: copy the reference file entirely, then (a) line 1 `"use client";`, (b) add `import Link from "next/link";`, (c) in the file's own `SidebarItem` (or inline sidebar rows), add `href` and replace the outer element with `<Link href={href}>` keeping every className verbatim; pass hrefs per the sidebar href map (Integrations→`/integrations`); `active` only on Integrations. Keep everything else byte-identical. Minimal-only fixes if TS/ESLint blocks the build, without changing rendered output.

- [ ] **Step 2: Adapt `refernce/pathii_insights_dashboard.tsx` → `frontend/app/insights/page.tsx`** using the same recipe (active item: Insights). This file imports from `recharts` — keep those imports and chart code exactly as written.

- [ ] **Step 3: Adapt `refernce/pathii_settings_dashboard.tsx` → `frontend/app/settings/page.tsx`** using the same recipe (active item: Settings).

- [ ] **Step 4: Verify build prerenders all three routes**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes `/integrations`, `/insights`, `/settings`.

- [ ] **Step 5: Commit**

```bash
git add frontend/app/integrations/page.tsx frontend/app/insights/page.tsx frontend/app/settings/page.tsx
git commit -m "feat(frontend): add Integrations, Insights and Settings pages from reference designs"
```

---

### Task 7: Visual QA — screenshot every route against its PNG and fix discrepancies

**Files:**
- Modify (only where QA finds discrepancies): any `frontend/app/**/page.tsx`, `frontend/app/layout.tsx`, `frontend/app/globals.css`
- Create: `.superpowers/sdd/visual-qa-report.md`

**Interfaces:**
- Consumes: all 11 routes built in Tasks 2–6.
- Produces: visual-qa-report.md listing every discrepancy found and its fix status.

- [ ] **Step 1: Start the dev server**

```bash
cd frontend && npm run dev
```

Run in background; wait for `Ready` on `http://localhost:3000`.

- [ ] **Step 2: Screenshot all 11 routes at a desktop viewport (1920×1080)**

Use the browser-use skill (Skill tool, `browser-use:control-browser`) to open and screenshot each route: `/`, `/voice-capture`, `/memories`, `/memories-classic`, `/tasks`, `/calendar`, `/documents`, `/people`, `/integrations`, `/insights`, `/settings`.

- [ ] **Step 3: Compare each screenshot to its reference PNG** (route→PNG map in Global Constraints). Reading each PNG with the Read tool yields a CDN URL; use the `analyze_image` MCP tool on that URL with a prompt asking for an exhaustive structural/styling description, and compare against the live screenshot's description the same way. Check: sidebar labels + active state, fonts/weights, colors, card corners/shadows, every text string, icon choices, chart shapes, spacing rhythm.

- [ ] **Step 4: Write `.superpowers/sdd/visual-qa-report.md`** — one section per route: PASS, or listed discrepancies with severity (layout-breaking / styling / text-content).

- [ ] **Step 5: Fix every layout-breaking and styling discrepancy** by editing the page file back toward its reference TSX (the reference file remains ground truth; a discrepancy means the adaptation drifted — restore the reference markup). Re-screenshot fixed routes to confirm.

- [ ] **Step 6: Verify build still passes, then commit**

```bash
cd frontend && npm run build
git add -A frontend/app
git add .superpowers/sdd/visual-qa-report.md
git commit -m "fix(frontend): visual QA corrections against reference mockups"
```

---

### Task 8: Final whole-branch review and finish

- [ ] **Step 1:** Controller generates the whole-branch review package (`scripts/review-package` from `feature/user-panel-ui`'s merge-base with `main` to HEAD) and dispatches the final code reviewer per `superpowers:requesting-code-review`.
- [ ] **Step 2:** Dispatch ONE fix subagent for any Critical/Important findings; re-review.
- [ ] **Step 3:** Use `superpowers:finishing-a-development-branch` to complete the branch (ask the human about merge preference).
