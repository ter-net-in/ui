# UI standardization tasks

Implementation authorized through live deployment. Implementation, publication, and live deployment are complete. Follow [the plan](plan.md), [the specification](../SPEC.md), and each repository's local instructions. The dependencies below are task ids, not separate worktrees or agent assignments.

Each component slice normally touches its source, story, registry catalog, and generated output. Generated files count as required output, not an excuse to omit them. Split broad app migrations into the listed screens and avoid formatting unrelated files.

## Baseline and dependency slices

- [x] A1 — Record current validation and choose compatible update sets per repository.
  - Acceptance: preserve user work; reproduce existing checks; record package/advisory paths and any out-of-range fix.
  - Verify: commands in SPEC; `bun outdated --filter '*'`; `bun audit`.
  - Files: update this plan's baseline notes only; source changes wait for the applicable slice. Depends: none.
- [x] A2 — Patch internet-ui dependencies.
  - Acceptance: compatible packages and peers align; remaining audit findings explained without weakening checks.
  - Verify: lint/typecheck/docs build/Storybook build/audit.
  - Files: root/docs/UI/CLI manifests and `bun.lock`; split tooling updates if needed. Depends: A1.
- [x] A3 — Patch authkit dependencies.
  - Acceptance: compatible auth/OAuth/web dependencies align without changing auth configuration or schemas.
  - Verify: authkit lint/typecheck/build/audit; affected authentication tests or development smoke checks.
  - Files: affected manifests and lockfile, normally 3–5 files. Depends: A1.
- [x] A4 — Patch rok dependencies.
  - Acceptance: compatible web/server dependencies align; existing TCP and CLI work remains intact.
  - Verify: rok typecheck/tests/web build/CLI build/audit.
  - Files: affected manifests and lockfile, split by web/server if over five files. Depends: A1.
- [x] A5 — Apply justified compatible mail updates.
  - Acceptance: respect pinned runtime/type contracts and its installation policy; do not introduce broader Vite/Motion upgrades.
  - Verify: mail lint/typecheck/tests/build/high-severity audit.
  - Files: affected manifests and lockfile, or a documented no-change result. Depends: A1.

## Library foundation

- [x] B1 — Prove the proposed tokens on a representative auth/admin story.
  - Acceptance: fields/card/table plus menu/dialog demonstrate the fixed geometry, scoped typography, both themes, and mobile hierarchy.
  - Verify: compile story; inspect 390px/1440px and keyboard/portal states; record design review outcome.
  - Files: shared theme, one composed story, directly needed styles (up to five). Depends: A2.
- [x] B2 — Apply the house treatment to buttons and form inputs.
  - Acceptance: no radius/shadow props in the migrated group; semantic variants and labels remain intact.
  - Verify: typecheck and focused interactive stories. Files: at most two component/story pairs per slice. Depends: B1.
  - Repeat as separate slices for input/select/combobox/autocomplete, then checkbox/radio/switch/slider/number/OTP and field/form wrappers.
- [x] B3 — Apply the house treatment to containers and overlays.
  - Acceptance: static surfaces stay flat; popups/modals use fixed elevation; keyboard, focus, and portal themes work.
  - Verify: focused stories, typecheck, reduced motion and focus restoration. Files: at most two component/story pairs per slice. Depends: B1.
  - Repeat separately for card/code, dialog/alert-dialog/drawer, menu/context-menu/navigation-menu, and popover/preview-card/tooltip/toast.
- [x] B4 — Finish navigation, data, and remaining display components.
  - Acceptance: all 41 existing components use the same treatment without public cosmetic knobs.
  - Verify: typecheck and relevant stories/table interactions. Files: at most two component/story pairs per slice. Depends: B2–B3.
- [x] B5 — Add focused CLI compatibility tests and remove defaults substitution.
  - Acceptance: new installs use fixed styling; legacy defaults are explained; unsupported old-registry combinations fail before writes; alias and overwrite behavior remain correct.
  - Verify: failing regression cases first, then `bun test apps/cli/src`; CLI typecheck/build.
  - Files: config, transform, add/init integration, focused test files; split tests/implementation only if each intermediate state remains coherent. Depends: B4.
- [x] B6 — Retire obsolete helper and preview plumbing coherently.
  - Acceptance: no active `ui-defaults` dependency, no radius/shadow preview selectors or globals; docs still render all examples.
  - Verify: registry generation/typecheck/docs/Storybook builds; review generated deletion and catalog changes.
  - Files: shared utility/defaults, Storybook preview/CSS, docs browser, registry catalog/output; atomic cross-file migration. Depends: B4–B5.
- [x] B7 — Bound registry package versions to tested compatible ranges.
  - Acceptance: a fresh install cannot silently receive newer Motion/Table majors; all transitive registry dependencies resolve.
  - Verify: generated-registry tests plus an isolated React consumer install/typecheck.
  - Files: registry catalog, builder/test if needed, generated output. Depends: B5–B6.
- [x] Checkpoint B — Review the complete library and fresh consumer before app migrations.
  - Verify: lint/typecheck/build/Storybook/registry checks plus keyboard/theme/mobile evidence. Depends: B7.

## Shared page patterns and authkit

- [x] C1 — Add page-layout and auth-layout compositions.
  - Acceptance: static/server-compatible wrappers, shared hierarchy/gutters, explicit content and actions; no routing/auth logic.
  - Verify: stories in both themes and viewports; isolated CLI install of each registry item.
  - Files: one component/story pair plus registry/output per slice. Depends: checkpoint B.
- [x] C2 — Add stat, badge, alert, and empty/loading feedback as needed by auth.
  - Acceptance: semantic statuses and accessible announcements; no invented data or app fetching logic.
  - Verify: focused stories including long text and recovery actions; registry installation.
  - Files: one component/story pair plus registry/output per slice. Depends: C1.
- [x] C3 — Migrate authkit's copied foundations and centered screens.
  - Acceptance: reviewed config/paths; login/invite/consent and public identity remain correct; no blind overwrite.
  - Verify: auth checks and development flow smoke tests; distinguish unavailable service checks.
  - Files: first copied source/theme/config, then at most two screen/component files per slice. Depends: A3, C1–C2.
- [x] C4 — Migrate authkit's admin workspace.
  - Acceptance: shared page/stat/feedback composition; preserve invitation/OAuth management and role-dependent views.
  - Verify: empty/populated and member/admin cases, keyboard forms, both themes/viewports.
  - Files: dashboard page and invite/client-manager components, up to five per slice. Depends: C3.
- [x] Checkpoint C — Confirm the first real consumer before propagating the patterns.
  - Verify: shared geometry matches registry source and all auth workflows retain their contracts. Depends: C4.

## Rok

- [x] D1 — Add settings-section and complete the shared table/filter composition.
  - Acceptance: reusable structure, existing table behavior, no new data engine or configuration DSL.
  - Verify: table filtering/sorting/pagination and settings stories; isolated registry install.
  - Files: one component/story pair plus registry/output per slice. Depends: checkpoint C.
- [x] D2 — Migrate rok's copied source and signed-in tunnel/token view.
  - Acceptance: valid web-app CLI paths; preserve public wordmark/artwork and existing tunnel/token behavior.
  - Verify: rok typecheck/tests/web build plus public/signed-in visual states.
  - Files: copied foundations first, then `apps/web/src/app/page.tsx` and directly related presentation files. Depends: A4, D1.
- [x] D3 — Migrate rok's admin tables and metrics.
  - Acceptance: quiet shared hierarchy; retain filters, authorization, counts, row actions, and pagination.
  - Verify: populated/empty/filtered/admin-denied states and existing tests.
  - Files: admin page and relevant table presentation, at most five per slice. Depends: D2.
- [x] Checkpoint D — Confirm public/operational separation and table behavior. Depends: D3.

## Mail

- [x] E1 — Add app-shell and accessible sidebar composition.
  - Acceptance: independent scroll regions and app-owned destinations; mobile drawer has correct focus/Escape behavior.
  - Verify: keyboard, long navigation, both themes/viewports, isolated registry install.
  - Files: one component/story pair plus registry/output per slice. Depends: checkpoint C.
- [x] E2 — Add split-pane, textarea, and input-group.
  - Acceptance: controlled mobile pane visibility; native editing and labels; joined geometry without cosmetic props.
  - Verify: long/empty content, focus when panes switch, keyboard input, registry install.
  - Files: one component/story pair plus registry/output per slice. Depends: E1.
- [x] E3 — Reconcile mail's copied components and configuration.
  - Acceptance: preserve local relative imports and fixes; normalize actual CLI paths; keep theme persistence; migrate auth/onboarding first.
  - Verify: mail auth-screen tests/typecheck/build; fresh staged-registry installation comparison.
  - Files: config/theme/copied source, then auth-screens; split by component group. Depends: A5, E2.
- [x] E4 — Migrate the folder/list/detail workspace.
  - Acceptance: app-owned selection and fetching, usable mobile back/drawer flow, preserved folder/search/read/pagination behavior.
  - Verify: existing tests plus fixture-driven desktop/mobile/browser state coverage.
  - Files: webmail, status, and directly related styles, at most five per slice. Depends: E3.
- [x] E5 — Migrate compose and settings.
  - Acceptance: shared sections/forms/dialogs; preserve reply/send and verified-forwarding behavior without test emails to real users.
  - Verify: dialog focus and form errors; development-service integration checks; complete mail check suite.
  - Files: compose/settings and necessary focused tests, at most five per slice. Depends: E4.
- [x] Checkpoint E — Confirm text-only rendering, ownership/forwarding constraints, and changed UI workflows. Depends: E5.

## Distribution and completion

- [x] F1 — Finish complete auth/admin/settings/workspace example pages and catalog entries.
  - Acceptance: examples compile from public registry imports, use fictional data, and demonstrate states in both themes.
  - Verify: docs/Storybook build, clean consumer install, catalog/LLM counts agree.
  - Files: one example/story plus its catalog/registry entries per slice. Depends: checkpoints D–E.
- [x] F2 — Write migration/release notes and update agent/install guidance.
  - Acceptance: document removed props/defaults, config compatibility, tested ranges, source-copy reconciliation, and breaking-update version choice.
  - Verify: commands and before/after examples against the built CLI and local registry.
  - Files: README, internet-ui skill, migration guide, relevant metadata/generated docs; preserve user-owned design notes until deliberately updated. Depends: F1.
- [x] F3 — Complete cross-repository validation and record remaining external checks.
  - Acceptance: every changed app/source/install path has evidence; baseline failures and unresolved advisories are explicit; unrelated diffs remain intact.
  - Verify: SPEC command matrix, scoped `git diff --check`, keyboard/theme/mobile checks, generated-registry reproducibility.
  - Files: verification notes and fixes justified by actual failures. Depends: F2.
- [x] Final checkpoint — Review the complete result; prepare publication/deployment as a separate action with rollback information. Depends: F3.
