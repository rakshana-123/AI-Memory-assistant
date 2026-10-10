# Admin Panel UI (Pathii Admin Console) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete admin panel UI in `frontend/` as a pixel-exact replica of the 13 admin mockups in `admin/`, using the reference TSX components in `admin/` as ground truth where they exist (12 of 13 pages), and generating the Notifications page directly from its mockup.

**Architecture:** Same as the user panel (docs/superpowers/plans/2026-10-10-user-panel-ui.md): Next.js App Router, one self-contained client page per route under `frontend/app/admin/**`, per-page duplicated sidebar markup (fidelity over DRY), navigable sidebar items via aliased `next/link`.

**Tech Stack:** Next.js 16.2.12, React 19.2.4, Tailwind CSS 4, `lucide-react`, `recharts` (all already installed and working from the user-panel build).

## Global Constraints

- **Pixel fidelity:** every page renders exactly like its reference PNG in `admin/`. The matching reference TSX in `admin/` is ground-truth code — copy it, do not redesign. Do not modify anything inside `admin/` or `refernce/`.
- **Route map (fixed):**

  | Route | Source (`admin/`) | Reference PNG (`admin/`) |
  |---|---|---|
  | `/admin` | `pathii_admin_dashboard.tsx` | `Pathii Admin Dashboard Overview.png` |
  | `/admin/users` | `pathii_users_management_dashboard.tsx` | `Pathii Users Management Dashboard.png` |
  | `/admin/memories` | `pathii_memory_management_dashboard.tsx` | `Pathii Memory Management Dashboard.png` |
  | `/admin/documents` | `pathii_admin_dashboard (2).tsx` | `Pathii Document Management Dashboard.png` |
  | `/admin/tasks` | `pathii_admin_dashboard (1).tsx` | `Pathii Tasks & Events Dashboard.png` |
  | `/admin/ai-usage` | `pathii_ai_usage_dashboard.tsx` | `Pathii AI Usage Analytics Dashboard.png` |
  | `/admin/integrations` | `pathii_integrations_management_dashboard.tsx` | `Pathii Integrations Management Dashboard.png` |
  | `/admin/analytics` | `pathii_admin_dashboard (3).tsx` | `Pathii Analytics Dashboard.png` |
  | `/admin/reports` | `reports_analytics_dashboard.tsx` | `Pathii Reports Analytics Dashboard.png` |
  | `/admin/notifications` | **none — generate from PNG** | `Pathii Notifications Management Dashboard.png` |
  | `/admin/system-health` | `pathii_system_health_dashboard.tsx` | `Pathii System Health Dashboard.png` |
  | `/admin/roles` | `pathii_roles_permissions_dashboard.tsx` | `Pathii Roles & Permissions Dashboard.png` |
  | `/admin/settings` | `pathii_admin_settings_dashboard.tsx` | `Pathii Admin Settings Dashboard.png` |

  Note: the four numbered `pathii_admin_dashboard*.tsx` files are DIFFERENT pages (Overview / Tasks & Events / Documents / Analytics — verified by each file's active sidebar item), not iterations.
- **Admin sidebar href map (used by every admin page, labels stay verbatim per file):** Overview→`/admin`, Users→`/admin/users`, Memories→`/admin/memories`, Documents→`/admin/documents`, Tasks & Events→`/admin/tasks`, AI Usage→`/admin/ai-usage`, Integrations→`/admin/integrations`, Analytics→`/admin/analytics`, Reports→`/admin/reports`, Notifications→`/admin/notifications`, System Health→`/admin/system-health`, Settings→`/admin/settings`. Exception: the Roles page's own sidebar has a 13th item, `Roles & Permissions`→`/admin/roles` (no other page links to it). Icon choices stay verbatim per file (e.g. the Settings page uses its own icon set: LayoutDashboard/Cpu/FileSpreadsheet — do not normalize).
- **Adaptation recipe (identical to user panel):** copy reference file → `frontend/app/<route>/page.tsx`, then ONLY: (a) `"use client";` line 1; (b) `import NextLink from "next/link";` (aliased — lucide-react owns `Link`); (c) make sidebar nav items navigable with NextLink per the href map, `active` only on the page's own item, classNames verbatim; (d) minimal TS-strict fixes (`: any`, narrow casts) with no rendered-output change; trailing newline at EOF is the established convention.
- **Hydration safety (lesson from user panel):** NO `Math.random()`, `Date.now()`, or `new Date()` at module scope or render path. Two admin references violate this — `pathii_admin_dashboard (3).tsx` (Analytics) and `pathii_system_health_dashboard.tsx` — replace with a seeded mulberry32 PRNG (constant seeds) exactly as done in `frontend/app/insights/page.tsx:34-50` (documented deviation from byte-fidelity, like the user-panel fix).
- **Every page file:** `"use client";` line 1, exactly one default-exported component.
- **No new dependencies.** `npm run build` must exit 0 at the end of every task (it type-checks and prerenders every route — the per-task verification cycle; TDD is not applicable to verbatim UI transcription).
- **Do not touch** the existing user-panel pages (`frontend/app/*` outside `admin/`), `admin/`, or `refernce/`.
- Work happens on branch `feature/admin-panel-ui` (from `main`). Never commit on `main`.
- Avatar URLs (`pravatar.cc`) and any external URLs stay verbatim from the reference files.

---

### Task 1: Branch + Admin Overview (`/admin`)

**Files:**
- Create: `frontend/app/admin/page.tsx`

**Interfaces:**
- Consumes: existing deps, Inter font, established user-panel adaptation pattern (see `frontend/app/memories/page.tsx` for a worked example).
- Produces: the branch; `/admin` route; the admin adaptation pattern later tasks repeat.

- [ ] **Step 1: Create feature branch**

```bash
cd "C:\Users\Devesh B\OneDrive\Documents\DEVESH\RAKS\AI-Memory-assistant"
git checkout -b feature/admin-panel-ui
```

- [ ] **Step 2: Adapt `admin/pathii_admin_dashboard.tsx` → `frontend/app/admin/page.tsx`**

Adaptation recipe: copy the reference file entirely, then (a) line 1 `"use client";`, (b) `import NextLink from "next/link";`, (c) in the file's own sidebar item component (or inline rows), add `href` and replace the outer element with `<NextLink href={href}>` keeping every className verbatim; pass hrefs per the admin sidebar href map; `active` only on Overview. Keep everything else byte-identical (class strings, copy, numbers, SVGs, URLs). Minimal-only TS fixes if the build blocks.

- [ ] **Step 3: Verify build**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes `/admin`.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/admin/page.tsx
git commit -m "feat(frontend): add Admin Overview page from reference design"
```

---

### Task 2: Documents (`/admin/documents`), Tasks & Events (`/admin/tasks`), Analytics (`/admin/analytics`)

**Files:**
- Create: `frontend/app/admin/documents/page.tsx`
- Create: `frontend/app/admin/tasks/page.tsx`
- Create: `frontend/app/admin/analytics/page.tsx`

**Interfaces:**
- Consumes: Task 1's branch and adaptation pattern (recipe restated below).

- [ ] **Step 1: Adapt `admin/pathii_admin_dashboard (2).tsx` → `frontend/app/admin/documents/page.tsx`** (active: Documents). Recipe: copy entirely; `"use client";` line 1; `import NextLink from "next/link";`; sidebar items → `<NextLink href={href}>` with classNames verbatim, hrefs per admin map, active only on Documents; everything else byte-identical; minimal TS fixes only.

- [ ] **Step 2: Adapt `admin/pathii_admin_dashboard (1).tsx` → `frontend/app/admin/tasks/page.tsx`** (active: Tasks & Events), same recipe.

- [ ] **Step 3: Adapt `admin/pathii_admin_dashboard (3).tsx` → `frontend/app/admin/analytics/page.tsx`** (active: Analytics), same recipe PLUS hydration fix: this reference uses `Math.random()` — replace with a seeded mulberry32 PRNG (constant seeds, fresh instance per generator) exactly as in `frontend/app/insights/page.tsx:34-50`, preserving the value ranges and visual distribution; note it in the commit body as a documented deviation.

- [ ] **Step 4: Verify build**

```bash
cd frontend && npm run build
```

Expected: exit 0; route list includes the three new admin routes.

- [ ] **Step 5: Commit**

```bash
git add frontend/app/admin/documents/page.tsx frontend/app/admin/tasks/page.tsx frontend/app/admin/analytics/page.tsx
git commit -m "feat(frontend): add admin Documents, Tasks & Events, Analytics pages"
```

---

### Task 3: Users (`/admin/users`) and Memories (`/admin/memories`)

**Files:**
- Create: `frontend/app/admin/users/page.tsx`
- Create: `frontend/app/admin/memories/page.tsx`

**Interfaces:** Task 1 pattern (recipe restated below).

- [ ] **Step 1: Adapt `admin/pathii_users_management_dashboard.tsx` → `frontend/app/admin/users/page.tsx`** (active: Users). Recipe: copy entirely; `"use client";` line 1; `import NextLink from "next/link";`; sidebar items → `<NextLink href={href}>` with classNames verbatim, hrefs per admin map, active only on Users; everything else byte-identical; minimal TS fixes only.

- [ ] **Step 2: Adapt `admin/pathii_memory_management_dashboard.tsx` → `frontend/app/admin/memories/page.tsx`** (active: Memories), same recipe.

- [ ] **Step 3: Verify build** — `cd frontend && npm run build`, exit 0, both routes listed.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/admin/users/page.tsx frontend/app/admin/memories/page.tsx
git commit -m "feat(frontend): add admin Users and Memories management pages"
```

---

### Task 4: AI Usage (`/admin/ai-usage`) and Integrations (`/admin/integrations`)

**Files:**
- Create: `frontend/app/admin/ai-usage/page.tsx`
- Create: `frontend/app/admin/integrations/page.tsx`

**Interfaces:** Task 1 pattern (recipe restated below).

- [ ] **Step 1: Adapt `admin/pathii_ai_usage_dashboard.tsx` → `frontend/app/admin/ai-usage/page.tsx`** (active: AI Usage). Recipe: copy entirely; `"use client";` line 1; `import NextLink from "next/link";`; sidebar items → `<NextLink href={href}>` with classNames verbatim, hrefs per admin map, active only on AI Usage; recharts imports/chart code byte-identical; everything else byte-identical; minimal TS fixes only.

- [ ] **Step 2: Adapt `admin/pathii_integrations_management_dashboard.tsx` → `frontend/app/admin/integrations/page.tsx`** (active: Integrations), same recipe.

- [ ] **Step 3: Verify build** — `cd frontend && npm run build`, exit 0, both routes listed.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/admin/ai-usage/page.tsx frontend/app/admin/integrations/page.tsx
git commit -m "feat(frontend): add admin AI Usage and Integrations pages"
```

---

### Task 5: Reports (`/admin/reports`) and System Health (`/admin/system-health`)

**Files:**
- Create: `frontend/app/admin/reports/page.tsx`
- Create: `frontend/app/admin/system-health/page.tsx`

**Interfaces:** Task 1 pattern (recipe restated below).

- [ ] **Step 1: Adapt `admin/reports_analytics_dashboard.tsx` → `frontend/app/admin/reports/page.tsx`** (active: Reports). Recipe: copy entirely; `"use client";` line 1; `import NextLink from "next/link";`; sidebar items → `<NextLink href={href}>` with classNames verbatim, hrefs per admin map, active only on Reports; recharts code byte-identical; minimal TS fixes only.

- [ ] **Step 2: Adapt `admin/pathii_system_health_dashboard.tsx` → `frontend/app/admin/system-health/page.tsx`** (active: System Health), same recipe PLUS hydration fix: this reference uses `Math.random()`/`Date.now()` — replace with seeded mulberry32 PRNG (constant seeds) and static timestamps copied verbatim from the reference's displayed values, exactly as `frontend/app/insights/page.tsx:34-50` does; documented deviation in commit body.

- [ ] **Step 3: Verify build** — `cd frontend && npm run build`, exit 0, both routes listed.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/admin/reports/page.tsx frontend/app/admin/system-health/page.tsx
git commit -m "feat(frontend): add admin Reports and System Health pages"
```

---

### Task 6: Roles & Permissions (`/admin/roles`) and Settings (`/admin/settings`)

**Files:**
- Create: `frontend/app/admin/roles/page.tsx`
- Create: `frontend/app/admin/settings/page.tsx`

**Interfaces:** Task 1 pattern (recipe restated below).

- [ ] **Step 1: Adapt `admin/pathii_roles_permissions_dashboard.tsx` → `frontend/app/admin/roles/page.tsx`** (active: Roles & Permissions). Recipe: copy entirely; `"use client";` line 1; `import NextLink from "next/link";`; sidebar items → `<NextLink href={href}>` with classNames verbatim; this file's sidebar has 13 items — the standard 12 per the admin map PLUS `Roles & Permissions`→`/admin/roles` as its own active item; everything else byte-identical; minimal TS fixes only.

- [ ] **Step 2: Adapt `admin/pathii_admin_settings_dashboard.tsx` → `frontend/app/admin/settings/page.tsx`** (active: Settings), same recipe — note this file renders its sidebar from a nav-item array (`{ icon, label, badge?, active? }` objects around line 118): add `href` to each object and wrap the rendered nav element in `<NextLink href={item.href}>` keeping classNames verbatim; hrefs per admin map, active only on Settings.

- [ ] **Step 3: Verify build** — `cd frontend && npm run build`, exit 0, both routes listed.

- [ ] **Step 4: Commit**

```bash
git add frontend/app/admin/roles/page.tsx frontend/app/admin/settings/page.tsx
git commit -m "feat(frontend): add admin Roles & Permissions and Settings pages"
```

---

### Task 7: Notifications (`/admin/notifications`) — generate from mockup

**Files:**
- Create: `frontend/app/admin/notifications/page.tsx`

**Interfaces:**
- Consumes: sibling admin pages as the design-system reference (read `frontend/app/admin/page.tsx` and `frontend/app/admin/users/page.tsx` for the exact sidebar markup, header pattern, stat-card and card idioms).
- Produces: `/admin/notifications` matching `admin/Pathii Notifications Management Dashboard.png`.

- [ ] **Step 1: Study the mockup.** Read `C:\...\admin\Pathii Notifications Management Dashboard.png` (Read tool → returns CDN URL) and call `mcp__4_5v_mcp__analyze_image` on it with a prompt requesting exhaustive layout/style/component description. CAUTION (lesson from user-panel QA): image analysis of small text is unreliable — treat confidently-readable strings (page title, section/card titles, big numbers, button labels) as spec; for small body text write plausible admin-console content in the same voice. Layout, colors, card structure, chart types are spec.

- [ ] **Step 2: Write the page** in the sibling pages' exact idiom: same sidebar (12 items per admin href map, Notifications active), same header pattern, recharts for any charts, lucide-react icons, pravatar avatars where the mockup shows people, `"use client";`, seeded PRNG only if randomness is needed (no Math.random/Date.now).

- [ ] **Step 3: Screenshot and compare.** Start `npm run dev` (background), screenshot the route at 1920×1080 (headless Chromium as in the user-panel QA; Task 7 of that plan), Read the screenshot → `analyze_image` → compare against the mockup description: sidebar correct + Notifications active, zone structure, card grid, colors, chart shapes, no clipping. Iterate until it matches.

- [ ] **Step 4: Verify build** — `cd frontend && npm run build`, exit 0, route listed. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/app/admin/notifications/page.tsx
git commit -m "feat(frontend): add admin Notifications page generated from mockup"
```

---

### Task 8: Visual QA — screenshot all 13 admin routes against PNGs and fix discrepancies

**Files:**
- Modify (only where QA finds discrepancies): `frontend/app/admin/**/page.tsx`
- Create: `docs/superpowers/admin-visual-qa-report.md` (committed) + `.superpowers/sdd/admin-visual-qa-report.md` (scratch copy)

- [ ] **Step 1:** Dev server (`cd frontend && npm run dev`, background, wait Ready).
- [ ] **Step 2:** Screenshot all 13 routes at 1920×1080 (headless Chromium) into `.superpowers/sdd/admin-shots/<route>.png`: `/admin`, `/admin/users`, `/admin/memories`, `/admin/documents`, `/admin/tasks`, `/admin/ai-usage`, `/admin/integrations`, `/admin/analytics`, `/admin/reports`, `/admin/notifications`, `/admin/system-health`, `/admin/roles`, `/admin/settings`.
- [ ] **Step 3:** For the 12 transcription pages: verify text content via SOURCE DIFF against `admin/*.tsx` (deterministic — do NOT rely on image-text reading); verify layout/colors/active-state via screenshot-vs-PNG image analysis (zone structure, sidebar active item, card grid, colors, chart shapes). For `/admin/notifications`: verify layout/colors/structure only (no source of truth exists).
- [ ] **Step 4:** Write the report: one section per route — PASS or discrepancies (severity: layout-breaking / styling / text-content) + fix + re-verification. External avatar/thumbnail differences and chart-animation mid-frames are NOT discrepancies.
- [ ] **Step 5:** Fix every real discrepancy by restoring toward the reference TSX (transcription pages) or the mockup (Notifications); re-screenshot fixed routes.
- [ ] **Step 6:** `cd frontend && npm run build` exit 0; stop dev server; commit `git add -A frontend/app docs/superpowers/admin-visual-qa-report.md` + `git commit -m "fix(frontend): admin visual QA corrections against reference mockups"` (or docs-only commit if zero fixes).

---

### Task 9: Final whole-branch review and finish

- [ ] **Step 1:** Controller generates the whole-branch review package (merge-base of `main`..HEAD) and dispatches the final code reviewer per `superpowers:requesting-code-review`.
- [ ] **Step 2:** Dispatch ONE fix subagent for any Critical/Important findings; re-review.
- [ ] **Step 3:** Use `superpowers:finishing-a-development-branch` to complete the branch (default: merge locally if the human doesn't respond; never push without consent).
