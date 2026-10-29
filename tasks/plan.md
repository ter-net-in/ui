# UI standardization implementation plan

Status: approved implementation sequence for the confirmed brief in [SPEC.md](../SPEC.md). Tasks are tracked in [todo.md](todo.md). The dependency inventory is [dependency-baseline.md](dependency-baseline.md).

## Delivery order

1. Compatible security/dependency changes, separately for each repository.
2. A library authentication/admin example proving the proposed geometry and hierarchy, followed by the complete house-style/CLI migration.
3. Shared page/auth/feedback components and authkit as the first real consumer.
4. Table/settings patterns, followed by rok's operational screens.
5. Sidebar/split-pane patterns, followed by mail's workspace.
6. Complete examples, migration documentation, registry/CLI compatibility checks, and cross-project validation.

This is a sequence, not a proposal to rebuild product capabilities. The library remains the source of truth; consumer migrations follow the shared source they need. Small dependency changes can proceed independently, but consumers must not depend on unfinished or unpublished public registry output. No parallel agents are required.

## Phase A: establish a trustworthy baseline

Before changing a repository, record its worktree status and identify overlapping user edits. Run its existing checks to distinguish baseline failures from regressions. Keep changes away from authkit's authentication configuration, rok's TCP work, and mail's deployment/Caddy work.

Use current official release notes and the registry to select updates within existing ranges; update React-related peers and Better Auth-related peers coherently. Keep dependency changes separate from UI changes. Re-run the audit and record remaining dependency paths. For a fix outside the compatibility policy, prepare a narrow exception with affected behavior and verification rather than forcing an unrelated migration.

**Checkpoint:** each dependency change has manifest/lockfile evidence, appropriate tests/builds, and a truthful advisory disposition. A remaining finding is never hidden by a reduced gate.

## Phase B: prove the house style and remove customization

Build one representative library story from existing authentication/admin building blocks, showing fields, validation, buttons, a static card, a table, and a floating menu/dialog. Prove both light/dark modes and narrow/wide layouts before propagating the proposed 6px control / 8px surface geometry.

Then apply the house tokens to the full component set in coherent groups. Keep useful variants and Base UI behavior. Existing consumers keep their old copied source until their own migration; there is no requirement to break all applications at once.

Once all library source uses the fixed rules, retire the shared variants/defaults plumbing. Change CLI config handling, transformation, generated registry, Storybook globals/overrides, docs controls, and installation guidance coherently. Detect incompatible old registry output before writes. Publish neither the CLI nor the registry during this phase.

**Checkpoint:** the existing 41 components, representative fixtures, generated registry, docs build, and Storybook build agree; legacy config behavior and fresh installs are verified in isolated consumers.

## Phase C: page/auth patterns and authkit

Add the smallest useful page, authentication, settings, metric, badge, and feedback compositions as actual screens exercise them. Each registry item includes source, a working story, explicit dependencies, and generated output.

Authkit is the first real migration: its centered forms and bounded admin workspace provide a compact check of the system. Preserve login redirects, invite-only behavior, OAuth consent, admin actions, and the active user's session. Migrate copied source selectively; establish a valid CLI config based on its actual alias/output paths. Scope display typography and decorations to the public page.

**Checkpoint:** auth's public page, login/invite/consent screens, and populated/empty admin workspace pass the visual/state matrix. Shared components installed into the app match the local registry rather than a parallel handcrafted kit.

## Phase D: table/settings patterns and rok

Use the same page header, stat, feedback, and form vocabulary for the signed-in tunnel/token interface and admin tables. Keep the data table's current sorting, filtering, pagination, and row-action behavior. Standardize useful filter/toolbar and settings patterns without adding a new table engine.

Rok's landing page retains its expressive wordmark, grid/artwork, and selected decorative cards. Its operational pages use the quieter hierarchy. Do not refactor tunnel transport, CLI behavior, or authentication to make the UI migration easier.

**Checkpoint:** signed-out and signed-in views, admin authorization, filtered/empty tables, token actions, and existing tunnel tests remain correct.

## Phase E: shell/sidebar/split-pane and mail

Add a composable app shell, an accessible mobile sidebar, and controlled list/detail panes. The app owns active folders, messages, and routes. On small screens, render the selected pane rather than shrinking the three-column desktop workspace into unusable columns. Add textarea/input-group support for compose and mailbox onboarding.

Mail's copied components and configuration have diverged. Compare each source file, preserve local import conventions and accessibility behavior, and normalize only the config needed for a valid migration. Do not run a blind CLI overwrite. Keep its existing theme preference persistence.

**Checkpoint:** folders, search, pagination, empty/error/loading states, read/reply/compose, settings/forwarding, mobile drawer/back navigation, and theme switching pass using development fixtures/services. Mail's backend/ownership/rendering protections remain intact.

## Phase F: distribution and release readiness

Complete self-contained auth/admin/settings/mail-style example pages and document their composition. Make layouts discoverable in the docs catalog, Storybook, registry, and LLM output. Add the migration guide and deliberate breaking-update version notes.

Smoke-test a clean React consumer and the actual apps against the staged local registry. Verify declared compatibility ranges so new installs cannot receive unintended major dependencies. Test both legacy configuration notices and clearly rejected incompatible registry versions. No runtime UI package is introduced.

**Checkpoint:** every changed repository has a verification record; generated output is current; the visual/state matrix is complete. Publication and deployment are a separate release action with a reproducible revision and rollback plan.

## Verification matrix

| Area         | Required evidence                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Distribution | CLI init/add, transitive dependency resolution, aliases, overwrite refusal, legacy config notice, incompatible registry handling, compatible package ranges |
| Shared UI    | Default/hover/focus/disabled/invalid/loading states; keyboard and portal behavior; no public cosmetic props                                                 |
| Layout       | 390px and 1440px; both themes; long labels/data; scoped overflow; sidebar and list/detail navigation                                                        |
| Auth         | Redirect/invite/consent behavior and admin forms remain equivalent                                                                                          |
| Rok          | Filtering/sorting/pagination and token/tunnel actions remain equivalent; existing TCP/CLI work stays intact                                                 |
| Mail         | Mailbox ownership, text-only rendering, forwarding verification, compose/reply, and drawer focus remain equivalent                                          |
| Repository   | Existing lint/type/test/build commands from SPEC; generated-registry reproducibility; audit disposition; clean scoped diff                                  |

Inspect desktop/mobile together, batch fixes, and perform at most one confirmation pass for each completed surface group. Automated tests cover real behavior; visual review covers hierarchy and geometry. Do not substitute static markup checks for authenticated runtime verification.

## Risks and responses

- **Copies have drifted:** stage and compare source, preserve aliases/import style and local fixes, migrate one app at a time.
- **Old CLI and registry may mix:** test the old/new combination explicitly and reject known unsupported output before touching files.
- **Compatible updates can still change behavior:** isolate them and run the owning repository's checks; do not use semver as a test substitute.
- **Security fixes may exceed current ranges:** record and review the smallest exception; keep existing audit requirements.
- **Public style leaks into apps:** scope display headings/decorations and test representative public and operational pages side by side.
- **Interactive layouts can regress accessibility:** build from existing primitives and test focus, Escape, responsive visibility, and restoration.
- **Services may be unavailable:** use fixtures for visual review and report unverified authenticated/integration cases explicitly. Never fetch production mail or alter accounts to obtain test content.
- **Concurrent work is present:** recheck overlapping files before editing and never stage/reset unrelated changes.

## Review and execution notes

The product brief and implementation sequence are approved, including live deployment. The user approved the narrow Drizzle 0.45, Zod 4, and webpack-dev-middleware 7.4.5 security exceptions. All other framework major upgrades remain deferred. Record any approved changes here instead of accumulating competing plans in consumer repositories.
