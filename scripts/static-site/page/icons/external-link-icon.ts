export function svgIconForPlatform(platform: string): string {
  if (platform === 'source') return svgIcon('<path d="M8 12h8M12 8l4 4-4 4"/>')
  if (platform === 'wechat') return svgIcon('<path d="M8.5 9.5c-2.8 0-5 1.8-5 4 0 1.2.7 2.3 1.8 3l-.5 1.8 2.1-1.1c.5.1 1 .2 1.6.2 2.8 0 5-1.8 5-4s-2.2-4-5-4z"/><path d="M13 6c3.1 0 5.5 1.9 5.5 4.4 0 1.3-.7 2.5-1.9 3.3l.5 1.9-2.2-1.1-.9.1"/><path d="M7.2 13.3h.1M10 13.3h.1"/>')
  if (platform === 'zhihu') return svgIcon('<path d="M6 5h7v14H6zM10 5v14M15 5h3l-3 7h4l-4 7"/>')

  return svgIcon('<path d="M9 7h8v8M17 7 7 17"/>')
}

function svgIcon(paths: string): string {
  return `<svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false">${paths}</svg>`
}
