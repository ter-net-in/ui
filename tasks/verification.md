# UI standardization verification

Release branch: `feature/ui-standardization` in ui, auth, rok, and mail. No database schema changes. Pre-rollout revisions are recorded in dependency-baseline.md and local baseline patches preserve unrelated work.

## Implementation evidence

- Library/docs/CLI type checks, production build, and Storybook 9.1.21 production build pass. Storybook development preview compiles with webpack-dev-middleware 7.4.5+ and renders the authentication example.
- CLI migration: four integration tests pass, including legacy notice, rejection before writes, aliases, transitive dependencies, and overwrite refusal.
- A clean React 19 consumer initialized through the built CLI, installed all four complete example blocks from the staged registry, installed bounded dependencies, and passed TypeScript.
- Nine browser tests pass across example actions, focus restoration, joined corners, four example pages, 390px/1440px and light/dark.
- Auth, rok, and mail type checks and production builds pass. Rok CLI build passes. Auth/rok security regression tests pass with Drizzle 0.45 and Zod 4.
- Mail unit tests and four browser workflow tests pass: mobile folders/read/back/focus, text-only rendering, failed-send draft retention, verified-forwarding payloads and announcements, theme persistence, and availability-gated onboarding.
- All four high-severity dependency audit gates pass. Remaining low/moderate development dependency advisories remain visible; no audit gate was weakened.

- Auth ran against an isolated PostgreSQL 17 fixture: migrations, invited admin signup, populated dashboard, consent view, rejected password, and successful login redirect all passed. Auth and rok admin layouts fit both themes at 390px/1440px. Rok fixture checks exercised token creation and table filtering.
- Browser axe WCAG A/AA checks passed for auth login and the library settings/admin screens once theme hydration settled; switch names were manually verified.

## Independent review

A separate model reviewed library/CLI contracts and consumer workflows. Two required findings were fixed: CSS seam precedence (with one/two/three-child browser regression coverage), and mail forwarding live announcements. No other required findings were reported.

## Release checks

Clean staged-tree validation, final consumer runtime evidence, CI, published CLI version, deployment revisions, live endpoints, and rollback references are recorded below as the rollout progresses. Local Docker is unavailable; container and service integration validation runs in the existing CI/deployment environment.

## Clean release validation

All four staged trees passed fresh frozen installs, type checks, unit/security tests, and production builds. UI/auth/mail lint passed. Rok has no lint command; its web and CLI builds and tests passed. Release trees excluded all preexisting uncommitted backend/TCP/infra edits and used their own workspace dependency links. Auth's PostgreSQL migration passed against a temporary local database. The database-backed auth and fixture-backed rok browser checks also passed against these exact clean builds, including login redirects, admin layouts, token creation, and filters. Mail shell/settings axe checks reported no WCAG A/AA violations after animations settled; Base UI focus guards were manually covered by the keyboard tests.

Remaining advisories from the final audit: ui has two moderate Vitest mocker findings plus four low tooling findings; auth has one moderate and one low esbuild finding; rok has one moderate esbuild finding; mail has one low deepmerge finding. These do not fail the unchanged high-severity gates. Broader tooling migrations remain deferred.

Rollback starting revisions: ui `8ccfd529994b79a8491419cf0421a95b0653662b`; auth `c0a39683c9199c87dbdac215ac02dead1a0bef4f`; rok `61bf692674cb23e1f12efbf0315e16d1f32ca8d7`; mail `e6aebd1731d36e7f1de8a00f359955425da65f0f`. Revert the rollout commit and deploy through each existing workflow; mail additionally has its existing revision-based rollback workflow. No database rollback is required.
