import type { HomepageRouteRegistry } from './homepage-route-registry'

export class StaticRouteGuard {
  constructor(private readonly routes: HomepageRouteRegistry) {}

  allows(path: string): boolean {
    return this.routes.has(path)
  }

  redirectUnknown(path: string): void {
    if (!this.allows(path)) {
      window.location.replace('/404.html')
    }
  }
}
