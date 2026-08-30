# SAM Data Formatter

A standalone, browser-only tool that converts data between **JSON, XML, CSV and Excel (.xlsx)**. Nothing is uploaded anywhere — all parsing and generation happens client-side in a SvelteKit app built as static files.

## Project structure

```
sam-data-formatter/
├── src/
│   ├── app.html                  # HTML shell + fonts
│   ├── app.css                   # Global styles & default theme tokens
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Select.svelte     # Themed dropdown used for format pickers
│   │   │   ├── Footer.svelte     # "Explore our other projects" footer
│   │   │   └── ToastHost.svelte  # Success/error toast notifications
│   │   └── stores/
│   │       └── toast.js          # Toast store
│   └── routes/
│       ├── +layout.js            # prerender = true (static export)
│       ├── +layout.svelte        # Header, applies theme.json, footer
│       └── +page.svelte          # Hero + the format-conversion tool
└── static/
    ├── CNAME                     # Your custom domain (edit this!)
    ├── .nojekyll                 # Tells GitHub Pages to skip Jekyll
    ├── favicon.svg
    └── config/
        ├── theme.json            # Configurable color/font/radius tokens
        └── projects.json         # Configurable footer project links
```

## Configuration (no code changes needed)

- **Theme** — edit `static/config/theme.json`. Every color, font and border-radius token is applied at runtime to CSS custom properties, so you can reskin the whole site by editing hex values. It ships with a professional reddish-pink ("Garnet Rose") theme by default.
- **Footer projects** — edit `static/config/projects.json`. Add, remove, or rename entries; each needs a `name`, `url` (route or external link) and optional `description`. The heading text is configurable too.

## Local development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages (gh-pages branch)

1. **Install the gh-pages package**
   ```bash
   npm install -D gh-pages
   ```
   This is already listed in `package.json`, so `npm install` covers it.

2. **Deploy script** — already added to `package.json`:
   ```json
   "deploy": "npm run build && gh-pages -d build"
   ```
   This builds the site, then pushes the contents of `build/` to the `gh-pages` branch.

3. **Confirm CNAME and .nojekyll are in place**
   - Edit `static/CNAME` to contain your actual domain (e.g. `formatter.example.com`), replacing the placeholder `yourdomain.com`.
   - `static/.nojekyll` already exists.
   - Both are copied into `build/` automatically by `npm run build`, so they'll be included in what gets pushed.

4. **Run the deploy command**
   ```bash
   npm run deploy
   ```
   This builds the site and pushes the build output to the `gh-pages` branch — no manual git branch switching needed.

5. **Point GitHub Pages at the gh-pages branch**
   Repo → **Settings → Pages** → under "Build and deployment": Source = **Deploy from a branch**, Branch = **gh-pages**, Folder = **/ (root)**. Save.

6. **Future updates**
   Push changes to `main` as normal, then run `npm run deploy` again whenever you want to publish. Your source code stays on `main`, untouched.

### No custom domain?

If you're deploying to `https://<username>.github.io/<repo-name>` instead of a custom domain:
1. Delete `static/CNAME`.
2. In `svelte.config.js`, set `paths.base` to `'/<repo-name>'`.
