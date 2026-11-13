# Snehal Shelar — React Portfolio

A responsive personal portfolio built with React, Vite, Three.js / React Three Fiber, Motion and custom CSS.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder.
3. Open the folder in VS Code.
4. In the terminal, run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Personalize before publishing

- Add your portrait as `public/images/snehal-portrait.jpg`.
- Add your resume as `public/resume.pdf`.
- Replace project repository links in `src/data.js` with the correct repositories.
- Add real project screenshots to `public/images/` and update `src/data.js`.
- Add your actual Figma/Canva work to the Design Gallery.
- Check all content and links before deployment.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy

Push the project to GitHub, then import the repository into Vercel. Use the default Vite settings:
- Build command: `npm run build`
- Output directory: `dist`

The portrait and resume are intentionally placeholders until you add your own files.