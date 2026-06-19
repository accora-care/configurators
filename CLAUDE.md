# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install          # first-time setup
yarn dev              # dev server with live reload at localhost:8080
yarn start            # serve already-built files
yarn check            # TypeScript type checking (svelte-check)
yarn build:embed:test # build all UMD embed bundles (no git commit)
yarn build:embed      # build all UMD embed bundles AND commit to git
```

There is no test suite beyond `yarn check`.

## Architecture

Svelte 3 + TypeScript + SCSS configurators for Accora healthcare furniture. Each configurator lets users customise a product and submit a form (HubSpot for US, Cognito Forms for UK).

### Built files must be committed

Files in `public/` are served via jsDelivr CDN — **compiled output must always be committed alongside source changes**. Use `yarn build:embed` to build and commit in one step. A new GitHub release is then needed to promote changes.

### Two build modes (both from `rollup.createConfig.js`)

- **Dev** (`rollup.config.js` → `src/main.ts`): IIFE, `process.env.IMAGE_URL = ''`
- **Embed** (`rollup.config.<name>.js` → `src/<name>/embed.ts`): UMD, `process.env.IMAGE_URL` = jsDelivr CDN base URL

The combined bundle (`rollup.config.all.js` → `src/embed.ts`) registers all configurators on `window.AccoraConfigurators`.

### Per-configurator structure

Each configurator in `src/<name>/` follows this layout:

```
<Name>.svelte         # root component; receives config: InitConfig prop
configStore.ts        # Svelte writable store with typed StoreValues + initVal
embed.ts              # standalone UMD entry point
Preview.svelte        # visual product preview
CustomizationBlock.svelte
Select/               # one .svelte per option group
data/                 # option arrays (colours, fabrics, side panels, etc.)
assets/               # SVG icons
```

### Shared code

- `src/components/` — reusable UI: `ConfiguratorContainer`, `PreviewFrame`, `SelectionGrid`, `Radio`, `Img`, `booking-form/BookingForm`, etc.
- `src/Config.types.ts` — `InitConfig`, `HubspotFormConfig`, `CognitoFormConfig`, `SubmitFormDescription`
- `src/imageUrl.ts` — `getImageUrl(path)`: always use this for image `src` attributes so paths resolve correctly in both dev and embed builds

### US vs UK configurators

| | US (no `-uk` suffix) | UK (`-uk` suffix) |
|---|---|---|
| Form | HubSpot | Cognito Forms |
| InitConfig field | `hubspotFormConfig` | `cognitoFormConfig` |

### Adding a new configurator

1. Create `src/<name>/` following the structure above.
2. Register it in `src/embed.ts` and add it to `window.AccoraConfigurators`.
3. Create `rollup.config.<name>.js` using `createRollupConfigEmbed`.
4. Add the new rollup config to the `build:embed:test` script in `package.json`.
