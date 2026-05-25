# Tommie Muller — Profile Website

A plain HTML + CSS profile site styled to match Tommie Muller's 2026 CV.
No build step, no dependencies. Open `index.html` in a browser to preview.

## Files

| File              | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `index.html`      | Home — hero, objective, core strengths, contact              |
| `experience.html` | Full work history                                            |
| `projects.html`   | Project gallery with photo slots                             |
| `credentials.html`| Achievements, awards, certificates                           |
| `styles.css`      | Shared stylesheet                                            |
| `images/`         | Project photos go here — see `images/README.txt`             |
| `.nojekyll`       | Stops GitHub Pages from running its Jekyll preprocessor      |

## Editing content

All text lives directly in the HTML files. To change a job title, project
description, or phone number — open the relevant `.html` file and edit the
text. No coding required for content updates.

## Adding photos

Drop JPGs into `images/projects/` using the filenames listed in
`images/README.txt`. The site auto-detects them — refresh the page and they
appear. Missing photos are hidden gracefully.

## Deploying to GitHub Pages

1. Create a new GitHub repository (public).
2. Upload every file in this folder to the repo root (drag-and-drop in the
   GitHub web UI works fine).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   **Branch** to `main`, folder `/ (root)`. Save.
5. After ~1 minute, GitHub gives you a URL like
   `https://<your-username>.github.io/<repo-name>/`.

To update the site later, just commit + push (or re-upload) the changed
files. Pages redeploys automatically.
