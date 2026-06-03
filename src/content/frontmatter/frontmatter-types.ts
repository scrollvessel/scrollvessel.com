export const requiredFields = ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang'] as const
export const stringFields = ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang', 'cover'] as const
export const booleanFields = ['featured', 'draft', 'demo'] as const
export const externalLinkFields = ['platform', 'label', 'url'] as const

export type ScalarFrontMatterValue = string | number | boolean | null
export type FrontMatterObject = Record<string, ScalarFrontMatterValue>
export type FrontMatterValue = ScalarFrontMatterValue | ScalarFrontMatterValue[] | FrontMatterObject[]
export type FrontMatterData = Record<string, FrontMatterValue>

export interface ParsedFrontMatter {
  data: FrontMatterData
  body: string
}
