export function wordCount(source: string): number {
  const compact = source.replace(/\s+/g, '')
  return Array.from(compact).length
}

export function readingMinutes(source: string): number {
  return Math.max(1, Math.ceil(wordCount(source) / 500))
}
