<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve the supplied static content as sanitized, lazy-loaded JSON documents in TanStack routes; this keeps the archive intact without executing imported scripts.
- Keep shared navigation and reader controls in dedicated React components and all visual roles in global semantic tokens; this makes every archive page consistent.
- Transform family imagery locally and do not externalize it to a public asset CDN; the project is a private family design preview.
- Do not import the separately protected family register or publish the preview before server-enforced access controls are verified; noindex is not authentication.
- The current work is frontend-only: missing production recordings and authenticated admin services remain explicit blockers, not simulated integrations.
