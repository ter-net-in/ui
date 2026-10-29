# ter.net.in UI standardization

Status: approved for complete implementation and live deployment by the user.

This specification records the user's confirmed direction and the proposed details needed to implement it. Authentication, tunneling, and webmail retain their existing product contracts throughout the migration. The ordered delivery plan is in [tasks/plan.md](tasks/plan.md), with executable work items in [tasks/todo.md](tasks/todo.md).

## Objective and confirmed decisions

Make internet-ui a consistent, opinionated source-owned design system for developers, coding agents, and people using the ter.net.in applications.

- Keep the blue identity. Application screens should be compact and restrained, inspired by Cloudflare's dashboard rather than copied from it.
- Selected public pages may retain expressive typography, ASCII artwork, and corner brackets. Operational screens use a quieter hierarchy.
- Remove radius and shadow choices from component props, project defaults, preview controls, and agent-facing installation instructions. Define fixed treatments by component role.
- Supply composable layouts through the existing CLI, with complete example pages showing their use.
- Migrate internet-ui, auth.ter.net.in, rok.ter.net.in, and mail.ter.net.in. Each app keeps its own navigation and workflows.
- Apply security fixes and compatible dependency updates. Broader upgrades require a demonstrated need and a separate migration decision.
- Preserve responsive behavior, light/dark support, accessible interactions, and the editable-source distribution model.

Success is a developer composing a normal application screen without selecting corners, elevation, page gutters, or heading styles, and a user recognizing the same controls across the three apps.

## Proposed visual rules

The confirmed house rules below apply to all components. Verify them on authentication, administration, and mail workspaces in both themes.

| Role                                 | Proposed rule                                                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controls: buttons, inputs, selects   | 6px corners; no ambient shadow; shared height and label baseline                                                                                   |
| Containers: cards, dialogs, popovers | 8px corners; borders define static surfaces                                                                                                        |
| Floating surfaces                    | Two fixed elevation tokens: compact popups and modal surfaces; no selectable shadow scale                                                          |
| Structural regions                   | Square shared edges for headers, sidebars, table rows, and adjoining panes                                                                         |
| Circular affordances                 | Radio indicators, switch tracks, avatars, and slider thumbs retain geometry appropriate to their function                                          |
| Joined controls                      | An input group owns its outer corners; inner seams are square without a radius prop                                                                |
| Typography                           | System/Inter sans; 14px application body, 12px metadata, 24–30px page titles; code uses the existing mono stack                                    |
| Labels and headings                  | Sentence case for task language; uppercase only for occasional metadata; avoid global heading rules that impose display typography on applications |
| Control sizes                        | Keep meaningful size variants; 36px default, 32px compact, 44px large; at least 44px touch targets for primary mobile interactions                 |
| Spacing                              | 4px base rhythm; page gutters 16px / 24px / 32px; normal content capped at 80rem; workspaces can fill available width                              |
| Navigation                           | A shared 56px header rhythm and 224px sidebar baseline; application-specific destinations and controls                                             |
| Color                                | Preserve blue as the action/focus identity; neutral surfaces and semantic status colors; verify text, controls, and focus contrast in both themes  |
| Motion                               | Short feedback and overlay transitions; no decorative springs on routine actions; respect reduced motion                                           |

Do not add a second cosmetic variant system to replace the removed knobs. `variant` for action meaning, `size` for density, native props, and `className` remain supported. House corners and elevation come from semantic CSS tokens, consistently applied by the component source. Source ownership still permits consumers to edit their copies; the library does not attempt to forbid CSS overrides.

Retain corner-bracket card composition for selected public surfaces only. Do not create separate competing implementations of buttons, inputs, or dialogs for public pages.

## Component and layout boundaries

All shared source lives under `packages/ui`; registry items declare their own dependencies. Prefer ordinary composition to a schema describing an entire application. Names below are proposed exports, not implemented APIs.

| Registry item             | Exports / responsibility                                                                                                       | Explicit boundary                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Existing 41 components    | Apply the house tokens and remove cosmetic props while keeping behavior and useful semantic variants                           | Preserve Base UI composition, keyboard behavior, focus, and controlled state |
| `page-layout`             | `PageContainer`, `PageHeader`, `PageTitle`, `PageDescription`, `PageActions`, `PageSection`                                    | No routing, request data, or hidden page state                               |
| `app-shell`               | `AppShell`, `AppHeader`, `AppBody`, `AppMain`; independent scrolling where composed                                            | No app switcher, account model, or forced sidebar                            |
| `sidebar`                 | Header/content/footer composition, navigation items, active state, and a mobile drawer using the existing accessible primitive | Active route and destinations belong to the app; preserve link semantics     |
| `auth-layout`             | A centered, bounded form region with optional brand/help content                                                               | No authentication requests, redirects, OAuth configuration, or invite policy |
| `split-pane`              | List/detail regions; controlled active pane on small screens; app sidebar supplied separately                                  | No message fetching, selection ownership, or resize engine                   |
| `settings-section`        | Section title, help, content, and optional actions                                                                             | No form submission or persistence behavior                                   |
| `stat`                    | A compact label/value/help composition used in dashboard metric groups                                                         | No invented trends, statistics, or chart dependency                          |
| `badge`, `alert`          | Shared status labels and inline feedback, using text and semantic colors                                                       | A status must remain understandable without color                            |
| `empty-state`, `spinner`  | Reusable empty/loading presentation with optional recovery action or accessible label                                          | Retry, fetching, and application state remain app-owned                      |
| `textarea`, `input-group` | Complete the form vocabulary already needed by mail and auth                                                                   | Preserve native editing, labels, validation, and joined-control geometry     |

Start with the elements exercised by the first real app migration. Add the remaining items as rok and mail need them; do not build unused abstraction layers in advance. Keep static layout wrappers server-compatible. Only interactive wrappers require a client boundary. Reuse existing SVG/Lucide assets with consistent sizing; this proposal does not require a new icon dependency.

Examples must include: centered authentication, an admin page with metric tiles and a filterable table, a settings form, and a responsive folder/list/detail workspace. Use clearly fictional fixture data, no live personal data or product adoption claims. Each example must compile from installed registry source in a normal React application; it must not depend on Next.js-only navigation or private workspace imports.

## Registry and CLI migration contract

1. New installs emit the house theme and components without a `defaults` block or a `ui-defaults.ts` runtime/source dependency.
2. A legacy `defaults` block must not restore old styling. Recognize it, explain that it is obsolete, and continue with the house rules without silently rewriting the consumer's configuration.
3. Preserve configured paths, aliases, overwrite prompts, registry overrides, transitive dependency resolution, and TypeScript output. Never bulk overwrite local component copies.
4. Remove defaults substitution and obsolete radius/shadow helpers only after all current library components and stories stop depending on them. Remove preview globals and CSS overrides in the same coherent change.
5. Do not silently mix an older public registry requiring defaults substitution with the revised CLI. Test a versioned registry/CLI compatibility check or fail clearly with a migration message before writing files when a known legacy item is encountered.
6. Treat cosmetic-prop removal and registry changes as a breaking source update. Provide a migration guide with before/after examples and a deliberate pre-1.0 CLI release/version decision; the source package remains private.
7. Replace unbounded registry dependencies with tested compatible ranges. Keep the Motion 12 and TanStack Table 8 contracts unless a separate migration is justified; a fresh install must not silently receive an incompatible major.
8. Preview migrations against the generated local registry, not a future public deployment. Validate imports and dependencies in a temporary consumer project before using the result in the real apps.

Application code changes from choosing geometry to expressing intent:

```tsx
// Before
<Button radius="md" variant="outline">Cancel</Button>
<DialogContent radius="lg" shadow="md">...</DialogContent>

// After: geometry and elevation belong to these components' shared styles.
<Button variant="outline">Cancel</Button>
<DialogContent>...</DialogContent>
```

Do not retain deprecated cosmetic props as silently ignored TypeScript fields in newly generated components. Migrate known call sites and give external consumers an explicit guide.

## Repository inventory and ownership

| Repository     | Existing frontend                                                                                     | Migration scope                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `internet-ui`  | React 19; Base UI; Tailwind 4; Motion 12; Next.js 15 docs; Storybook 9; Bun CLI                       | Component source, theme, registry, CLI, stories, documentation, examples, agent instructions           |
| `../authkit`   | Next.js; copied components under `apps/web/src/ui`; theme under `apps/web/src/theme`                  | Login, invite acceptance, consent, public page, admin metrics/invites/OAuth management                 |
| `../ternetrok` | Next.js; copied components under `apps/web/src/components/ui`                                         | Preserve expressive landing page; standardize signed-in tunnel/token views and admin tables            |
| `../mail`      | React/Vite; copied components under `apps/web/src/components/ui`; styles in `apps/web/src/styles.css` | Authentication/onboarding, folder/list/detail shell, compose, settings, feedback and mobile navigation |

internet-ui authoring aliases remain `@/lib/*` and `@/ui/*`; consumer imports follow each repository's actual configuration. Mail currently uses local relative `.js` imports and a legacy config without `paths`; normalize a reviewed config before any CLI migration. Authkit has copied defaults but no config was found in its root or web app during inventory; establish paths deliberately rather than guessing.

There are unrelated uncommitted changes in the three consumer repositories. Before each migration, record the actual baseline, review the specific files to be changed, and preserve concurrent work. Auth/config, rok TCP/CLI/server changes, and mail deployment/Caddy work are not UI cleanup opportunities. Do not read, stage, or copy local secret files.

## Dependency policy

The read-only baseline is recorded in [tasks/dependency-baseline.md](tasks/dependency-baseline.md). Check current ranges and advisories again when implementing; it is not a pinned upgrade manifest.

- Resolve compatible patches before judging visual changes, with a separate manifest/lockfile change per repository.
- Keep React/React DOM/types and related Better Auth packages mutually compatible. Bun runtime, runtime types, formatter schema, and container/CI versions must be checked together; avoid advancing pinned runtime types blindly.
- Treat breaking pre-1.0 minor changes as migrations too. A `0.44` to `0.45` jump is outside a `^0.44` range even though the major number is unchanged.
- If a security fix is unavailable within the permitted range, document the dependency path, relevant exposure, and smallest supported fix. Propose that exception explicitly; do not force a broad upgrade, hide the advisory, or lower an audit gate.
- No new production dependency is needed simply to standardize spacing or layouts. Keep compatible existing UI primitives and build tools.

## Commands and project conventions

Run commands from the named repository root. These are existing scripts unless marked as an implementation deliverable.

| Repository  | Verification commands                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| internet-ui | `bun run lint`; `bun run typecheck`; `bun run build:registry`; `bun run build`; `bun run --filter '@internet-ui/docs' build-storybook`; `bun audit` |
| authkit     | `bun run lint`; `bun run typecheck`; `bun run build`; `bun audit`                                                                                   |
| ternetrok   | `bun run typecheck`; `bun test`; `bun run --filter '@ternetrok/web' build`; `bun run build:cli`; `bun audit`                                        |
| mail        | `bun run lint`; `bun run typecheck`; `bun test`; `bun run build`; `bun audit --audit-level=high`                                                    |

For read-only dependency discovery, use `bun outdated --filter '*'` and `bun audit`. For future installs in mail, its contract requires `bun install --ignore-scripts`, with a frozen lockfile in CI. Do not invoke `bun update --latest` for this initiative.

internet-ui development: `bun run dev` and `bun run --filter '@internet-ui/docs' storybook`. Auth: `bun run dev`. Rok web: `bun run dev:web`. Mail: `bun run dev` with separate development services configured. Do not connect smoke tests to production data to make a local screenshot possible.

Follow each repository's formatter and conventions. internet-ui uses TypeScript, two-space indentation, single quotes, no trailing commas, named React exports, and `cn` to compose classes. For example, the current source utility in `packages/ui/src/lib/utils.ts` is:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

New CLI/registry behavior tests belong beside their modules as `*.test.ts` and run with `bun test apps/cli/src scripts/registry`. This command becomes a required check once those tests exist. Existing UI stories remain in `packages/ui/src/ui/*.stories.tsx`. Keep fixtures and new browser checks isolated from real services; use the existing Playwright dependency for focused browser coverage when warranted.

## Acceptance and validation

- A fresh CLI install resolves a layout with its declared components, valid aliases, and tested dependency ranges; repeated installs preserve overwrite decisions. Legacy cosmetic defaults produce a clear migration notice. Unsupported legacy registry/CLI combinations fail before writing partial files.
- No active component API, generated registry item, docs control, or app call site relies on selectable radius/shadow props. Literal circles and internal joined-control geometry are not mistaken for obsolete public options.
- Corresponding controls have the same corner, typography, sizing, border, focus, and state treatments in all migrated apps. Static containers have no decorative elevation. Public and application typography are scoped deliberately.
- Examples and real apps render at 390px and 1440px in both themes without page-level horizontal overflow. Long tables/code may scroll within their own region. Long labels, empty/populated data, loading, errors, and disabled controls remain usable.
- Dialogs, menus, selects, and the mobile sidebar retain keyboard access, focus trapping/restoration where appropriate, accessible names, Escape behavior, portal theming, and reduced-motion behavior. Target WCAG 2.2 AA for changed surfaces.
- Auth's login/invite/consent and admin actions, rok's token/tunnel/table workflows, and mail's onboarding/folders/search/pagination/read/compose/settings preserve their existing behavior.
- Mail still renders messages as plain text, blocks remote images, preserves mailbox ownership, and keeps verified forwarding behavior. Navigation/layout changes must not relax those constraints.
- All repository checks pass, or a pre-existing failure is documented with a reproduction and kept distinct from this change. Do not report an integration check as passed when its required services or credentials were unavailable.
- Generated registry, docs catalog, LLM output, and component counts agree. Inspect desktop/mobile together, fix the findings in one batch, and use at most one confirmation pass before moving on.

Avoid snapshot tests that merely repeat class strings. Tests should protect install compatibility, dependency resolution, focus/state behavior, and the app workflows affected by layout changes.

## Boundaries

Always preserve existing product behavior, inspect source before replacing copies, keep generated output reproducible, record each changed repository's verification, and maintain a migration guide. Use small coherent changes; a source batch plus its stories/generated registry may exceed five files when they must move atomically.

Seek a specific decision when a required security fix breaks the agreed compatibility policy, the public interface materially exceeds this proposal, or validation requires an external effect not already authorized. Routine styling and layout choices within this brief do not need repeated approval.

Never add a runtime component package, replace Base UI as part of this work, invent a suite-wide router/account system, change authentication or data ownership contracts, alter database schemas, rewrite tunnel transport, send real email from tests, suppress checks, overwrite concurrent work, or publish/deploy as a side effect of preparing the migration.

## Review checkpoint

The brief is confirmed. Proposed measurements, export names, compatibility handling, and delivery sequence still need implementation review. A representative authentication/admin composition is the first visual checkpoint; do not polish every component before verifying the direction there. Record review outcomes in `tasks/plan.md` and update this document when a technical decision changes.
