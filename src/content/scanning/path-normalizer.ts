import { sep } from 'node:path'

export class PathNormalizer {
  static normalize(path: string): string {
    return path.split(sep).join('/')
  }
}
