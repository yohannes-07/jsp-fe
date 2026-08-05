# Landing-page image assets

The homepage currently renders these replaceable assets:

- `job-seeker-journey.svg` — main job-seeker image.
- `recruiter-team.svg` — employer and recruiting image.
- `support-community.svg` — practical support and community image.

To use your own images, place them in this directory and update the three `src` values in `app/(marketing)/_components/landing-sections.tsx`. Use WebP images at least 1200 pixels wide and keep the main subject near the center for responsive cropping.

The product-interface visuals in the hero, AI assistant, and employer sections are HTML mockups. They can later be replaced with screenshots stored in this same directory.
