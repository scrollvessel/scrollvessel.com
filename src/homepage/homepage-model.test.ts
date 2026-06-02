import { describe, expect, it } from 'vitest'
import { HomepageModel } from './homepage-model'

describe('HomepageModel', () => {
  it('uses category metadata as display authority and ignores categories without metadata', () => {
    const model = new HomepageModel({
      categoryMetadata: [
        { sourcePath: 'content/engineering-practice/meta.json', relativePath: 'engineering-practice/meta.json', path: ['engineering-practice'], categoryName: '工程实践' },
        {
          sourcePath: 'content/engineering-practice/release-build/meta.json',
          relativePath: 'engineering-practice/release-build/meta.json',
          path: ['engineering-practice', 'release-build'],
          categoryName: '发布与构建',
        },
      ],
      categories: [],
      articles: [
        {
          sourcePath: 'content/engineering-practice/release-build/frontend-release-review.md',
          relativePath: 'engineering-practice/release-build/frontend-release-review.md',
          url: '/engineering-practice/release-build/frontend-release-review.html',
          categoryPath: ['engineering-practice', 'release-build'],
          title: '发布审查',
          updatedAt: '2026-06-02',
          body: 'Body',
        },
        {
          sourcePath: 'content/missing/category/article.md',
          relativePath: 'missing/category/article.md',
          url: '/missing/category/article.html',
          categoryPath: ['missing', 'category'],
          title: '缺失元数据文章',
          updatedAt: '2026-06-02',
          body: 'Body',
        },
      ],
    })

    expect(model.topCategories()).toEqual([
      expect.objectContaining({
        slug: 'engineering-practice',
        label: '工程实践',
        position: 'parent-slot-1',
        children: [expect.objectContaining({ slug: 'release-build', label: '发布与构建', position: 'child-slot-1' })],
      }),
    ])
  })
})
