export interface FontFaceInput {
  family: string
  fileName: string
  weight: number
  unicodeRange: string
}

export class FontFace {
  constructor(private readonly input: FontFaceInput) {}

  render(): string {
    return `@font-face {
  font-family: '${this.input.family}';
  font-style: normal;
  font-display: swap;
  font-weight: ${this.input.weight};
  src: url('/fonts/${this.input.fileName}') format('woff2');
  unicode-range: ${this.input.unicodeRange};
}`
  }
}
