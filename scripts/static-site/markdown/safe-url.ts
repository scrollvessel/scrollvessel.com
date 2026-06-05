export class SafeUrl {
  private readonly trimmed: string

  constructor(raw: string) {
    this.trimmed = raw.trim()
  }

  isSafe(): boolean {
    return (
      this.trimmed.startsWith('/') ||
      this.trimmed.startsWith('#') ||
      this.trimmed.startsWith('./') ||
      this.trimmed.startsWith('../') ||
      /^[^:/?#]+(?:[/?#].*)?$/i.test(this.trimmed) ||
      /^https?:\/\//i.test(this.trimmed) ||
      /^mailto:/i.test(this.trimmed)
    )
  }

  isExternalHttp(): boolean {
    return /^https?:\/\//i.test(this.trimmed)
  }

  hasProtocolOrRoot(): boolean {
    return /^[a-z]+:/i.test(this.trimmed) || this.trimmed.startsWith('/') || this.trimmed.startsWith('#')
  }

  hasRelativePrefix(): boolean {
    return this.trimmed.startsWith('./') || this.trimmed.startsWith('../')
  }

  value(): string {
    return this.trimmed
  }
}
