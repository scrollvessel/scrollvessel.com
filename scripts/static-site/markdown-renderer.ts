export class MarkdownRenderer {
  render(source: string): string {
    const blocks = source.trim().split(/\n{2,}/)

    return blocks
      .map((block) => {
        const trimmed = block.trim()
        if (!trimmed) return ''
        if (trimmed.startsWith('### ')) return `<h3>${this.renderInline(trimmed.slice(4))}</h3>`
        if (trimmed.startsWith('## ')) return `<h2>${this.renderInline(trimmed.slice(3))}</h2>`
        if (trimmed.startsWith('# ')) return `<h2>${this.renderInline(trimmed.slice(2))}</h2>`
        if (trimmed.startsWith('- ')) return `<ul>${trimmed.split('\n').map((line) => `<li>${this.renderInline(line.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`
        if (/^```/.test(trimmed)) return `<pre><code>${escapeHtml(trimmed.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, ''))}</code></pre>`
        return `<p>${this.renderInline(trimmed.replace(/\n/g, ' '))}</p>`
      })
      .join('\n')
  }

  private renderInline(source: string): string {
    return escapeHtml(source)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => `<a href="${safeHref(href)}">${label}</a>`)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
  }
}

export function escapeHtml(value: string | number): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value)
}

function safeHref(raw: string): string {
  const trimmed = raw.trim()
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed)
  ) {
    return escapeAttribute(trimmed)
  }

  return '#'
}
