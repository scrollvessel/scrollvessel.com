import type { SiteRoute } from '../site-route.js'

export interface RenderedStaticPage {
  route: SiteRoute
  html: string
}
