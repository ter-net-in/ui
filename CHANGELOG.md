# Changelog

## Unreleased

- Improve rich-editor touch targets at 320–390px and on coarse pointers; restore typing focus after link editing.

- Add a source-owned Tiptap rich text editor with classic controls and HTML/plain-text output.
- Standardize Lucide icons and provide an icon catalog and usage guidance.
- Strengthen primary actions with a fixed blue finish in both themes.
- Remove the component browser’s wide-screen left gutter.


## 0.2.0

This is a breaking source-copy update. Controls use fixed 6px corners, containers use 8px corners, and floating surfaces use fixed elevation. Radius/shadow props, CLI defaults substitution, and preview controls are removed. Existing config defaults produce a migration notice; updating the CLI does not rewrite installed source.

Adds installable page/auth/app-shell/sidebar/drawer/split-pane/settings layouts, shared status/form elements, and complete authentication, admin, settings, and workspace examples. Applications retain routing, data, authentication, and navigation ownership.

See https://ui.ter.net.in/migration before updating existing components. Compare local source before using `--overwrite`.

Compatible dependencies and targeted security fixes retain Next 15 and Storybook 9. Transitive PostCSS and Storybook webpack middleware overrides close high-severity advisories without broad framework upgrades.
