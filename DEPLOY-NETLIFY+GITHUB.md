# Deploy Harsha Events & Decor to Netlify and link it with GitHub

The project already ships with a `netlify.toml`, so the settings below are already the
intended ones. The zip at the top of this guide is a fallback if you do not want to use Git.

- Project root: `D:\PROJECTS\harsha-events-decor`
- Built site lives in: `dist/`
- Zip you can download here: [harsha-events-decor-full.zip](harsha-events-decor-full.zip)
- Zip size: 57,633,419 bytes (about 55 MB)
- Zip contains 83,449 files inside (it is the full workspace including `node_modules`)

If you want the smallest deployable package, deploy `dist/` instead. The workflow below
explains both.

## What is already configured for Netlify

The repo includes this:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22.12.0"
```

That means Netlify should:
1. Install dependencies with `npm install`
2. Run `npm run build`
3. Publish the contents of `dist/`

There is no server, database, or environment variable to set. The WhatsApp phone number is
hardcoded in `src/data/site.js`, so the site deploys as-is.

## Option A — deploy from Git (recommended if you push the code to GitHub)

This is the path that keeps future changes in sync: every push to the connected branch
triggers a new Netlify build.

### 1. Put the project on GitHub

1. Create a new GitHub repo (for example `harsha-events-decor`).
2. Push the project into it. From `D:\PROJECTS\harsha-events-decor`:
   ```bash
   git init
   git remote add origin git@github.com:<you>/harsha-events-decor.git
   git add .
   git commit -m "Initial commit: Harsha Events & Decor static site"
   git push -u origin main
   ```
3. If `node_modules` or the big zip should not be in Git, make sure `.gitignore` keeps them
   out before the first commit.

### 2. Connect the repo in Netlify

1. Sign in at [netlify.com](https://www.netlify.com).
2. Choose **Add new site** → **Import an existing project**.
3. Select **GitHub**.
4. Authorize Netlify to see your repos if prompted.
5. Pick `harsha-events-decor`.

### 3. Use the build settings from `netlify.toml`

Netlify usually detects `netlify.toml` automatically. If the UI asks for build settings,
enter exactly:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22.12.0`

Leave environment variables blank unless you add something later.

### 4. Deploy

1. Click **Deploy site**.
2. Wait for the first build to finish.
3. Open the produced Netlify URL and check:
   - home, services, gallery, about, and contact sections
   - gallery photos load
   - clicking a photo or the WhatsApp buttons opens WhatsApp with the right message

After the first successful deploy, every push to the connected branch rebuilds the site.

## Option B — deploy the built `dist/` folder directly

Use this if you only want a quick deploy and do not need Git syncing.

1. In Netlify, choose **Add new site** → **Deploy manually**.
2. Drag the `dist` folder from `D:\PROJECTS\harsha-events-decor\dist` into the upload area.
3. Netlify publishes it as a live site.

This skips the build step because `dist/` is already built.

If you want a smaller zip for manual deploy, zip only `dist/` rather than the whole workspace.

## If you want the full workspace zip anyway

The file already in the project is:

- [harsha-events-decor-full.zip](harsha-events-decor-full.zip)

It contains the entire workspace, including `node_modules`, so it is large. Netlify does not
need that zip if you use the Git workflow — it installs dependencies itself.

## Linking Netlify and GitHub the way you probably want

The useful link is not a magic single button; it is the connection described in Option A:

- GitHub holds the source.
- Netlify watches that repo and deploys from it.

Once connected:
- The Netlify site URL is your public link.
- You can share that URL anywhere.
- Changes go out by pushing to GitHub, not by re-uploading files.

If you have not created the GitHub repo yet, do that first, then connect it in Netlify as
described above.

## Quick local sanity check before deploying

From `D:\PROJECTS\harsha-events-decor`:

```bash
npm install
npm run build
npm run preview
```

Then open the local preview and confirm the site works before pushing or uploading.

## After deploy

- Update the `og:image` placeholder in `index.html` once you have a real Netlify domain.
- If you later change the phone number or services, edit `src/data/site.js`, commit, push,
  and let Netlify rebuild.
- If you add or re-categorize photos, update `tools/source/` and `tools/prepare-assets.mjs`,
  run `npm run prepare-assets`, commit, push, and rebuild.
