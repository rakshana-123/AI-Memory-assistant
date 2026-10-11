# Production Ready: Strip Demo Data + Productionize

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Remove ALL fake/demo data from the 24 pages (empty-by-default app with clean empty states; all interactivity preserved so real data can be added through the UI), eliminate external image dependencies, and make the project production-ready (production serve mode, metadata/favicon, 404 page, README).

**Architecture:** Same self-contained pages. Each page's mock data arrays initialize EMPTY; lists/tables/grids render a consistent inline empty state; stat cards show 0 with trends hidden; charts hide behind "No data yet" panels when their data array is empty; data-driven badges hide at 0; pravatar/unsplash `<img>` avatars become initials circles. All existing handlers keep working against the (now empty) state. Demo data remains recoverable from git history (pre-branch commits).

**Tech Stack:** unchanged.

## Global Constraints

- **Empty-by-default:** every mock/demo record array initializes to `[]` (or removed where the array existed purely as static content). Fictional dates/timestamps that are part of record data go with the data. Static page chrome (titles, section headers, hero copy, form labels, nav) stays.
- **Empty-state pattern (consistent, inline per page — self-contained convention):** for lists/tables/grids: a centered block inside the existing card — page's relevant lucide icon in a muted circle, `No <things> yet` title (text-[15px] font-semibold text-slate-700), one short subline (text-[13px] text-slate-400, e.g. "Records you add will appear here."), `py-12`. Keep the card/header/pagination chrome; table headers may stay with an empty body row spanning columns (`No users yet` centered) OR the empty block replaces the tbody — pick whichever is the smaller diff per page, be consistent within the page.
- **Stat cards:** numeric values become 0; trend deltas hide when the underlying value is 0 (`{value > 0 && ...}` or data-driven conditional); card titles/icons stay.
- **Charts:** when the page's chart source array is empty, render the empty-state block in place of the chart (charts with empty arrays render broken axes — never show that). If a chart's data is static decorative series NOT tied to record arrays (e.g., a gradient backdrop shape), keep it.
- **Badges/counters driven by data** (e.g., Notifications "3") hide at 0.
- **Avatars:** replace every `pravatar.cc`/`unsplash` `<img>` with an initials circle (`w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[13px] font-bold` sized to match the original) using the row's name initial — most vanish with empty data, but the code must contain zero external image URLs. The sidebar profile chip keeps its name text but gets an initials avatar.
- **Interactivity preserved:** every wired handler keeps working (add-buttons append real rows to empty lists; filters/search operate on empty arrays gracefully — no crashes on `.filter`/`.map` of `[]`).
- **Hydration safety:** no Math.random/Date.now/new Date in render (unchanged rule).
- **No new deps.** `"use client"`/NextLink/single-export conventions preserved.
- **Production chrome:** keep all responsive + toast work intact.
- Do not touch `admin/` or `refernce/`. Branch `feature/production-ready` from `main`. `npm run build` exit 0 after every task.

---

### Task 1: Production chrome (config, metadata, favicon, 404, README)

**Files:**
- Create: `frontend/app/not-found.tsx`, `frontend/app/icon.svg`
- Modify: `frontend/app/layout.tsx` (metadata: title template, description, icons; viewport themeColor), `README.md` (root: run/build/start instructions)
- Verify `frontend/next.config.ts` is production-sane (keep devIndicators:false, turbopack.root).

Steps: branch; write icon.svg (simple Pathii brain mark, blue #2563EB, from the BrainLogo SVG path in any page); not-found.tsx styled to the design system (centered card, brain icon, "Page not found", link home) — client component, no data; metadata: `title: { default: "Pathii – AI Memory Assistant", template: "%s | Pathii" }`, description, `icons`; README quickstart (dev/build/start + route map one-liner). Build exit 0. Commit `feat(frontend): production chrome — favicon, 404, metadata, README`.

### Task 2: Strip demo data — user panel batch 1 (home, voice-capture, memories, memories-classic, tasks)

Apply Global Constraints to each page. Verify build + spot-render (empty states visible, no pravatar URLs in file, add-button still appends a row). Commit `feat(frontend): strip demo data — user panel batch 1 (empty-by-default)`.

### Task 3: Strip demo data — user panel batch 2 (calendar, documents, people, integrations, insights, settings)

Calendar: empty events (grid stays, day cells empty; event-add still works); insights: charts behind empty panels, stat cards 0; settings: keep all form chrome/defaults (forms are config, not records — keep values like timezone defaults; only record-like lists empty). Commit `feat(frontend): strip demo data — user panel batch 2`.

### Task 4: Strip demo data — admin batch 1 (overview, users, memories, documents, tasks, ai-usage)

Tables empty; stat cards 0; charts hidden at empty; "Recent Users"/activity lists empty; heatmap/system panels per rules. Commit `feat(frontend): strip demo data — admin batch 1`.

### Task 5: Strip demo data — admin batch 2 (integrations, analytics, reports, notifications, system-health, roles, settings)

Roles: role cards/table empty; permission matrix chrome may keep its static permission-row labels (that's feature config, not records) but role columns empty; settings: keep config forms. Commit `feat(frontend): strip demo data — admin batch 2`.

### Task 6: Production run + verification

Stop dev server; `npm run build`; `npm start` (background, port 3000); verify: all 24 routes 200; served HTML contains no `pravatar.cc`/`unsplash` references; empty-state text present on key routes; a live add-button click appends a row in the browser. Fix anything broken. Commit fixes.

### Task 7: Final review + finish

Whole-branch review (merge-base main..HEAD): empty-state consistency, no dead references to removed data (e.g., a stat card reading a removed array's length), zero external image URLs, handlers safe on empty arrays, build green. One fix wave if needed; merge to main (no push).
