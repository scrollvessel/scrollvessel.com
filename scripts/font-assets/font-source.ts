export interface FontSource {
  fontFaces(): Promise<string[]>
}
