export class ReadingMetric {
  constructor(private readonly source: string) {}

  wordCount(): number {
    const compact = this.source.replace(/\s+/g, '')
    return Array.from(compact).length
  }

  readingMinutes(): number {
    return Math.max(1, Math.ceil(this.wordCount() / 500))
  }
}
