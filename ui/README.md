Admin UI Design System

Files:
- `design-system.css`: tokens, components, modals, utilities
- `index.html`: example dashboard using the styles
- `modal.js`: accessible modal behavior

How to integrate
1) Link the stylesheet in your app layout or root component:
   <link rel="stylesheet" href="/ui/design-system.css" />
2) Wrap content in `.container`. Use `.grid cols-3` for the three columns.
3) Replace your current elements with the following primitives:
   - Cards: `.card`, `.card__header`, `.card__body`
   - Buttons: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.btn-success`, `.btn-sm`
   - Badges: `.badge success|warning|info`
   - Inputs: `.input`, `.field`, `.label`
   - Table: `.table`
4) Modals: add the backdrop structure from `index.html`, include `modal.js` or re-implement events in your framework.

Notes
- Supports dark and light via `prefers-color-scheme`.
- Focus states are visible and accessible.
- The design aims to look premium with soft gradients and depth.

