This module illustrates an issue with peer dependency resolution inside of pnpm workspaces.

This repository contains two packages:

1) `tsc-me`, a sample package that makes use of a workspaced library `lib-with-peers` and a single dependency on a randomly selected mainstream package: `ag-grid-community@29.0.0`.

2) `lib-with-peers`, has a peer and dev dependency on `ag-grid-community@31.0.0`

**Q: Why ag-grid-community?** *A: In order for this to be reproducible, we need non-workspaced, incompatible versions of a package. This isn't possible just inside of a repro clone so I picked a popular package. Replace it with any other equivalent and you'll see the same results.*

What I expect?
-
I expect that when running `tsc` on `tsc-me` that `ag-grid-community` will resolve to the top level node_modules `ag-grid-community@29.0.0`

What happens?
-
```
======== Resolving module 'ag-grid-community' from '/ts-pnpm-resolution-repro/packages/lib-with-peers/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'ag-grid-community' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community/package.json'.
File '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community.ts' does not exist.
File '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community.tsx' does not exist.
File '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field './main.d.ts' that references '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community/main.d.ts'.
File '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community/main.d.ts' exists - use it as a name resolution result.
Resolving real path for '/ts-pnpm-resolution-repro/packages/lib-with-peers/node_modules/ag-grid-community/main.d.ts', result '/ts-pnpm-resolution-repro/node_modules/.pnpm/ag-grid-community@31.0.0/node_modules/ag-grid-community/main.d.ts'.
======== Module name 'ag-grid-community' was successfully resolved to '/ts-pnpm-resolution-repro/node_modules/.pnpm/ag-grid-community@31.0.0/node_modules/ag-grid-community/main.d.ts' with Package ID 'ag-grid-community/main.d.ts@31.0.0'. ========

```

Workarounds?
-
PNPM has a feature to disable symlinks and treat them as hard links - injected dependencies. These have significant overhead and since other tooling seems able to resolve to the correct version of these packages that it may be possible for typescript to do the same.