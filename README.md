# Anjali & Rushabh - Wedding Invitation

A mobile-first wedding invitation built with React, TypeScript, Vite and GSAP.
The physical opening leads into a Gwalior-inspired story; an intentional scratch
or tap reveal unlocks the celebration details.

## Local development

Use Node.js 22.12 or later in the Node 22 release line, or Node.js 24.

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The build runs TypeScript checks and writes the static website to `dist`.
For a standalone type check, run `npm run typecheck`.

## Deployment

Connect this repository to a static-site hosting provider with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework | Vite |
| Root directory | Repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

No environment variables or backend service are required. The Vite configuration
uses relative asset paths, so the production build can also be hosted under a
repository subpath. Deploy the contents of `dist`, not the development source
directory. This repository does not automatically publish a site when pushed.

Keep the public calendar file in the deployed output. The reveal is a storytelling
interaction, not access control for files or client-side source.

## Design and behavior

- The opening animation and blush/ivory/champagne palette are intentionally retained.
- Each fresh visit starts with the date concealed.
- Reduced motion and unavailable canvas support preserve an explicit reveal control.
- Local environments, build output and research screenshots are excluded from Git.

See [the visual plan](./INNER-EXPERIENCE-PLAN.md) for the chapter design and validation
record.
