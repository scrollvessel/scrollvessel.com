import { escapeAttribute, escapeHtml } from './markdown-renderer.js'

export class HtmlDocument {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly body: string,
  ) {}

  render(): string {
    return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(this.description)}" />
    <title>${escapeHtml(this.title)}</title>
    <style>
      :root { color-scheme: light; --paper: #f6e4ad; --paper-warm: #efd18a; --ink: #2f210f; --ink-soft: rgba(47, 33, 15, 0.72); --hairline: rgba(47, 33, 15, 0.28); }
      * { box-sizing: border-box; }
      html { min-height: 100%; scroll-behavior: smooth; }
      body { min-height: 100%; margin: 0; color: var(--ink); background: radial-gradient(circle at 18% 18%, rgba(255, 249, 214, 0.45), transparent 18rem), linear-gradient(135deg, #f9e9b7 0%, var(--paper) 48%, var(--paper-warm) 100%); font-family: 'Crimson Pro', 'Noto Serif SC', Georgia, serif; }
      a { color: inherit; text-decoration: none; }
      .shell { width: min(1040px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
      .site-nav { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 52px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
      .page-hero { border-bottom: 1px solid var(--hairline); padding-bottom: 28px; }
      .eyebrow { margin: 0 0 12px; color: var(--ink-soft); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
      .trail { display: flex; flex-wrap: wrap; gap: 8px 12px; margin-bottom: 18px; color: var(--ink-soft); font-size: 14px; }
      .trail a, .site-nav a, .route-link { display: inline-flex; min-height: 44px; align-items: center; }
      .external-links { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 4px; }
      .external-link { display: inline-flex; min-height: 44px; align-items: center; gap: 8px; border: 1px solid var(--hairline); border-radius: 999px; padding: 0 14px; background: rgba(255, 249, 214, 0.22); color: var(--ink); }
      .external-link-icon { display: inline-grid; width: 1.45em; height: 1.45em; place-items: center; border: 1px solid rgba(47, 33, 15, 0.2); border-radius: 50%; line-height: 1; }
      .external-link-svg { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      h1 { margin: 0; font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9; letter-spacing: -0.055em; }
      h2 { margin: 0 0 16px; font-size: clamp(2rem, 4vw, 3.25rem); line-height: 0.95; letter-spacing: -0.045em; }
      .page-hero p:not(.eyebrow) { color: var(--ink-soft); font-size: 18px; line-height: 1.75; }
      .page-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px; margin-top: 36px; }
      .panel { border-top: 1px solid var(--hairline); padding-top: 18px; }
      .wide { grid-column: 1 / -1; }
      .list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
      .list a { display: grid; gap: 6px; min-height: 44px; padding: 12px 0; }
      .list li + li { border-top: 1px solid rgba(47,33,15,.12); }
      .list strong { width: fit-content; background-image: linear-gradient(currentcolor, currentcolor); background-position: 0 100%; background-repeat: no-repeat; background-size: 100% 1px; font-size: 22px; line-height: 1.12; }
      .list span, .empty { color: var(--ink-soft); line-height: 1.65; }
      .metadata { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 22px 0; color: var(--ink-soft); }
      .metadata div { min-width: 96px; }
      .metadata dt { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
      .metadata dd { margin: 4px 0 0; color: var(--ink); }
      .route-link { display: inline-flex; min-height: 44px; align-items: center; }
      .reader { }
      .prose { margin-top: 34px; font-size: 18px; line-height: 1.86; }
      .prose h2 { margin-top: 2em; }
      .prose h3 { margin-top: 1.6em; font-size: 1.5rem; }
      .prose p { margin: 1.1em 0; }
      .prose ul, .prose ol { padding-left: 1.35em; }
      .prose blockquote { margin: 1.45em 0; border-left: 1px solid var(--hairline); padding: 0.1em 0 0.1em 1.1em; color: var(--ink-soft); }
      .prose blockquote p { margin: 0.65em 0; }
      .prose img { display: block; width: min(100%, 760px); height: auto; margin: 1.8em auto; border: 1px solid rgba(47, 33, 15, 0.18); box-shadow: 0 18px 48px rgba(47, 33, 15, 0.13); }
      .prose hr { margin: 2.2em auto; border: 0; border-top: 1px solid var(--hairline); }
      .prose table { display: table; width: auto; max-width: 100%; margin: 1.6em auto; border-collapse: collapse; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); }
      .prose th, .prose td { padding: 0.72em 0.9em; border-bottom: 1px solid rgba(47, 33, 15, 0.16); text-align: left; vertical-align: top; }
      .prose th { color: var(--ink); font-size: 0.82em; letter-spacing: 0.08em; text-transform: uppercase; }
      .prose tr:last-child td { border-bottom: 0; }
      .prose code { border-bottom: 1px solid rgba(47, 33, 15, 0.22); background: transparent; padding: 0 0.08em; font-size: 0.92em; }
      .prose pre { margin: 1.45em 0; overflow-x: auto; border-left: 1px solid var(--hairline); background: rgba(255, 249, 214, 0.28); padding: 1em 1.1em; white-space: pre-wrap; }
      .prose pre code { display: block; border: 0; background: transparent; padding: 0; font-size: 0.92em; line-height: 1.78; }
      :focus-visible { outline: 2px solid var(--ink); outline-offset: 5px; }
      @media (max-width: 760px) { .site-nav { flex-direction: column; } .page-grid { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
    </style>
  </head>
  <body>
    <div class="shell">
      <nav class="site-nav" aria-label="主要导航">
        <a href="/">卷书成船 / Scroll Vessel</a>
        <a href="/">Home</a>
      </nav>
      ${this.body}
    </div>
  </body>
</html>
`
  }
}
