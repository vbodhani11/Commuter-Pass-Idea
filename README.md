# Waymo Commuter Pass Concept

An unofficial, interactive product concept showing how a bounded monthly commuter subscription could work inside a Waymo-style rider experience.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev`.

## Deploy to Netlify

### From GitHub

1. Create a new GitHub repository and upload this folder.
2. In Netlify, select **Add new site → Import an existing project**.
3. Connect the repository. Netlify will read `netlify.toml` automatically.
4. Deploy. The build command is `npm run build` and the publish directory is `dist`.

### Manual drag-and-drop

1. Run `npm install` and then `npm run build` on your computer.
2. Drag the generated `dist` folder into Netlify Drop.

## Customize

- App content and interactions: `src/App.tsx`
- Colors and layout: `src/styles.css`
- Page title and description: `index.html`

## Disclaimer

This is an unofficial product concept. It is not affiliated with or endorsed by Waymo LLC. Waymo is a trademark of its respective owner.
