# Rich compose, icons, and primary actions

Requested: shared Tiptap editor installed through the existing CLI and used in Mail compose; more prominent Cloudflare-inspired primary actions; fix the docs components gutter; make Lucide reusable throughout the system.

Scope: classic formatting, accessible keyboard toolbar and link controls, HTML plus plain-text alternatives, server HTML allowlist, draft retention after send failure, preserved received-message text-only rendering. Mail's existing identity, confirmation, recipient/reply checks, OAuth, and forwarding workflows remain owned by Mail. Editor code loads on compose; no attachment or external-image features are introduced.

The shared button finish and action tokens are copied to auth, rok, and mail. Lucide stays on the compatible 0.577 range already used by Mail; Tiptap is 3.32.1. Registry dependency declarations include all needed transitive components. No new CLI binary publication is required.

Verification: the gutter test failed at x=160px on a 1920px screen before the fix. Rich-mail body and sanitizer tests failed before implementation. Final results and deployment evidence follow in the release handoff.

## Local verification

- UI/docs type checks, production docs build, Storybook build, and four CLI migration tests pass. All 15 browser tests pass, including classic marks/lists/undo, keyboard toolbar navigation, link cancellation, older-theme action fallbacks, and the wide-screen gutter.
- A fresh project initialized with CLI 0.2.0 installed rich-text-editor, icon, data-table, spinner, and sidebar-drawer from the staged registry, installed all declared dependencies, and passed TypeScript. Its npm audit reports no vulnerabilities.
- Mail type checks, lint, production builds, 50 unit/backend tests, and eight browser workflows pass. HTML/plain-text JMAP alternatives, sanitation, failed new/reply draft preservation, successful-send reset, received-message safety, and responsive compose are covered.
- UI and Mail high-severity audit gates pass. Auth/Rok type checks pass for the same two-file action style/token update; their full builds and image checks run in CI.
- The editor vendor chunk is separate from Mail's initial inbox bundle. No attachment or remote-image editing support is enabled.
- Independent review identified two required fixes: keyboard Cancel handling and old-theme CTA compatibility. Both are fixed and covered by browser regressions. No other blockers were reported.
- Visual inspection covered docs/icons/editor and Mail compose at mobile/desktop sizes. Existing Mail theme selection is explicit, so the dark compose test selects it via account settings and asserts the root class.

Existing unrelated local backend/TCP/infra changes remain outside all release branches. No database changes or credential changes are required. Each repository's existing main-branch deployment pipeline is used; reverting the corresponding PR restores its previous behavior.
