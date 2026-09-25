# Fickle Dragon Publishing

This repository is the authoritative code and project home for the future
Fickle Dragon Publishing website at `fickledragon.com`.

The site is currently in planning and non-production development. The existing
WordPress site remains live and unchanged until the migration, redirect,
rollback, and launch work is complete and explicitly approved. This repository
is for the publisher site; Jamie McFarlane and Mac Worden remain distinct
reader-facing author brands.

The authoritative local checkout is:

```text
~/Projects/fickledragon.com
```

## Current state

There is no website application or local runtime yet. No dependency install,
build, or development-server command is currently required. The application
and its documented setup will be introduced by the non-production MVP work.

`WORDPRESS_SERIES_AND_BOOK_INVENTORY.md` is a dated factual inventory of the
legacy site's published series and book pages. It is migration reference
material, not a complete bibliography and not an instruction to change the live
WordPress site.

## Project plan

GitHub issues are the authoritative plan. Work follows dependency order rather
than issue-number order:

1. [#4 Bootstrap the repository and import the current project plans](https://github.com/novelcoder/FickleDragon.com/issues/4)
2. [#1 Create a non-production code-first MVP with the intended homepage aesthetic](https://github.com/novelcoder/FickleDragon.com/issues/1)
3. [#5 Define the holistic site design, content disposition, routes, and blog strategy](https://github.com/novelcoder/FickleDragon.com/issues/5)
4. [#3 Create the Appwrite Site and stage custom domains without DNS cutover](https://github.com/novelcoder/FickleDragon.com/issues/3)
5. [#6 Audit Appwrite, prove one publisher record, and define the publishing workflow](https://github.com/novelcoder/FickleDragon.com/issues/6)
6. [#12 Track deferred master-plan scope not covered by implementation issues](https://github.com/novelcoder/FickleDragon.com/issues/12)
7. [#7 Create the publisher business, contact, and policy pages](https://github.com/novelcoder/FickleDragon.com/issues/7)
8. [#8 Implement metadata, structured data, canonicals, sitemap, and indexability rules](https://github.com/novelcoder/FickleDragon.com/issues/8)
9. [#2 Add and test legacy redirects in the non-production site](https://github.com/novelcoder/FickleDragon.com/issues/2)
10. [#9 Prepare the production cutover and rollback runbook without executing it](https://github.com/novelcoder/FickleDragon.com/issues/9)
11. [#10 Execute the approved DNS cutover and launch the Appwrite site](https://github.com/novelcoder/FickleDragon.com/issues/10)
12. [#11 Monitor the launch and retire or archive WordPress only after stabilization](https://github.com/novelcoder/FickleDragon.com/issues/11)

Issue #12 is a deferred-scope umbrella. Its contents should be promoted into
focused implementation issues only when they become necessary for launch.

## Workflow

- Associate work with a GitHub issue before creating a branch.
- Use pull requests for changes to `main`.
- Keep all work non-production unless a later issue explicitly authorizes a
  production action.
- Do not alter WordPress, Appwrite, hosting, DNS, or public URLs as part of
  repository bootstrap work.

