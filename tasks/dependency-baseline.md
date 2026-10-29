# Read-only dependency baseline

Captured 2026-10-29 from local working trees using `bun outdated --filter '*'` and `bun audit`, Bun 1.3.13. No dependency or lockfile was changed. The internet-ui audit was captured during the initial inventory in this conversation; consumer audits were captured while preparing this plan.

Counts are advisory findings in local lockfiles, not a measurement of deployed exposure. The same advisory can appear in several repositories; do not add these rows together as distinct vulnerabilities. Working trees contain uncommitted work, so the commits below are context rather than complete reproducible snapshots.

| Repository  | HEAD at inspection                         | Audit findings                              |
| ----------- | ------------------------------------------ | ------------------------------------------- |
| internet-ui | `8ccfd529994b79a8491419cf0421a95b0653662b` | 48: 4 critical, 24 high, 15 moderate, 5 low |
| authkit     | `c0a39683c9199c87dbdac215ac02dead1a0bef4f` | 19: 3 critical, 8 high, 5 moderate, 3 low   |
| ternetrok   | `61bf692674cb23e1f12efbf0315e16d1f32ca8d7` | 44: 4 critical, 16 high, 21 moderate, 3 low |
| mail        | `e6aebd1731d36e7f1de8a00f359955425da65f0f` | 1 low; no high or critical findings         |

## Candidate compatible updates

These are registry results observed at inspection, not promises of compatibility. Verify peers, release notes, runtime requirements, and existing tests before applying them.

| Dependency                     | Locked version by repository              | Within declared range at inspection |
| ------------------------------ | ----------------------------------------- | ----------------------------------- |
| Next.js                        | ui 15.5.21; auth 15.5.25; rok 15.5.19     | 15.5.28                             |
| Storybook and its integrations | ui 9.1.20                                 | 9.1.21                              |
| Base UI                        | ui/rok 1.6.0; auth 1.7.0                  | 1.9.0                               |
| React / React DOM              | ui/auth 19.2.8; rok 19.2.7                | 19.3.1                              |
| Better Auth                    | auth/rok 1.7.2                            | 1.7.14                              |
| Better Auth OAuth provider     | auth 1.7.2                                | 1.7.14                              |
| Motion                         | ui 12.42.2; consumers observed at 12.43.0 | 12.43.0                             |
| Hono                           | rok 4.12.25                               | 4.13.14                             |
| Biome                          | ui 2.5.5; auth 2.5.11                     | 2.6.4                               |
| Drizzle Kit                    | auth/rok 0.31.10                          | 0.31.11                             |

Mail's selected UI/auth packages did not appear as compatible update candidates; its remaining newer releases primarily require reviewing pinned ranges or broader migrations. Do not change its pinned Bun types without checking the runtime contract.

## Exceptions to investigate before updating

- Auth and rok contain `drizzle-orm` 0.44.7; the audit lists affected versions below 0.45.2. Their `^0.44.2` range cannot reach that fix. Do not silently move to a different pre-1.0 minor series.
- The audits also identify older Zod and esbuild versions in transitive paths. Resolve the exact dependency chain and supported fix before proposing a direct upgrade or override. An audit package name alone is not proof of runtime reachability.
- Keep Next.js 16, Storybook 10, Motion 14, TanStack Table 9, TypeScript 7, Vite 8, and newer build-tool majors outside the default update set.
- internet-ui currently declares many registry dependencies without a version range. Fresh installs could pick a different major than the source was tested against; fix the registry's tested compatibility ranges as part of the migration.

## Deployment context and primary references

internet-ui's Next.js configuration uses `output: 'export'`; its Docker targets export static docs and Storybook files. Assess advisories for that deployment and for local development separately. Auth and rok have server-side behavior; do not assume their exposure matches the static docs host.

- [Storybook origin-validation advisory](https://github.com/advisories/GHSA-f2ph-cmg5-wxc8): fixed in 9.1.21 for the 9.x line; the advisory distinguishes development servers from built Storybooks.
- [Next.js AVIF image-optimization advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4): one of the initial audit findings; inspect the actual server/image usage rather than inferring exposure from the count.
- [Bun outdated version columns](https://bun.sh/docs/pm/cli/outdated): distinguish the current install, versions within the declared range, and the latest registry tag.

## Working-tree context

internet-ui has existing untracked agent/design files. Authkit has authentication/config edits; rok has TCP transport, CLI, protocol, documentation, and task work; mail has deployment/Caddy/test edits. Preserve those files and inspect status again before starting each implementation slice. No existing task plan in a consumer repository is replaced by this initiative.

Only read-only inventory commands have run for this baseline. Application builds, type checks, and authenticated runtime checks have not been executed during the planning pass.
