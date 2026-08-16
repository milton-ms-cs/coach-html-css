# html-css-helper

Codio Custom Assistant ("HTML/CSS Coach") for 7th grade students learning HTML and CSS at Milton Academy.

A single `index.js` + `metadata.json`, no build step. On every question it reads the student's open editor files **plus all project `.html`/`.css` files** via `codioIDE.files` — cross-file questions ("why isn't my CSS applying?") need both files visible even when only one is open — along with the assignment guide. Uses visual, kid-friendly language and a diagnose-vs-solve Socratic split: direct fixes for validation issues and typos, guided questions for design asks, never a complete page.

## Development

```bash
node --check index.js
```

See the parent `coaches/CLAUDE.md` for the shared coach architecture and API quirks. Deployment: bump `VERSION` in `index.js`, commit, then run `../publish_coaches.sh --publish` from the parent folder and Check for Updates in Codio (this repo's release tags are unprefixed, e.g. `2.4.0` — the script handles that). Typing `version` at any coach prompt confirms the release propagated.
