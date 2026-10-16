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

The public Netlify site currently injects a "Powered by Netlify" badge outside the
React application. Manage this through the hosting account; repository styles do
not hide or remove hosting-injected UI.

## Design and behavior

- The physical opening and blush/ivory/champagne palette are intentionally retained.
  Its choreography runs in approximately four seconds, with an immediate
  reduced-motion path.
- Each fresh visit starts with the date concealed.
- The hero offers a direct link to the date reveal, or to celebrations after
  discovery, without forcing guests through the family and heritage chapters.
- Calendar and directions content is immediately visible; entrance animations
  are reserved for storytelling and the closing signature.
- Reduced motion and unavailable canvas support preserve an explicit reveal control.
- The shorter reading flow keeps the families, Gwalior artwork and scratch reveal,
  followed by a compact countdown, the three ceremonies, directions and a quiet
  closing. The invitation wording remains in the unchanged physical opening;
  there is no second letter or decorative calendar-date page.
- Dates appear only in the scratch keepsake and practical ceremony details after
  discovery, not in chapter introductions, directions or the footer.
- Local environments, build output and research screenshots are excluded from Git.
- RSVP is intentionally not part of this version; there is no guest-submission
  endpoint. Local reviews must not simulate a successful RSVP.
- The menu keeps keyboard focus inside it, restores focus when dismissed, and
  uses a compact two-column layout on short landscape screens. Decorative motion
  respects preference changes without increasing the petal density on resize.
- The music control appears only when `public/assets/audio/song.mp3` is supplied.
  Use an authorized track, then restart the development server or rebuild the site.
  Without a track, no empty music control or audio request is presented.

See [the visual plan](./INNER-EXPERIENCE-PLAN.md) for the chapter design and validation
record.
