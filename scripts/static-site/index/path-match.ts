export class PathMatch {
  constructor(private readonly path: string[]) {}

  isSame(other: string[]): boolean {
    return this.path.length === other.length && this.startsWith(other)
  }

  startsWith(prefix: string[]): boolean {
    return prefix.every((part, index) => this.path[index] === part)
  }

  isDirectChildOf(parent: string[]): boolean {
    return this.path.length === parent.length + 1 && this.startsWith(parent)
  }
}
