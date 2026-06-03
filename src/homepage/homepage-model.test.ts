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
        { sourcePath: 'content/insights/meta.json', relativePath: 'insights/meta.json', path: ['insights'], categoryName: '洞见' },
        {
          sourcePath: 'content/engineering-practice/release-build/checklist/meta.json',
          relativePath: 'engineering-practice/release-build/checklist/meta.json',
          path: ['engineering-practice', 'release-build', 'checklist'],
          categoryName: '审查清单',
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
          sourcePath: 'content/engineering-practice/release-build/checklist/smoke-test.md',
          relativePath: 'engineering-practice/release-build/checklist/smoke-test.md',
          url: '/engineering-practice/release-build/checklist/smoke-test.html',
          categoryPath: ['engineering-practice', 'release-build', 'checklist'],
          title: '冒烟检查',
          updatedAt: '2026-06-04',
          body: 'Body',
        },
        {
          sourcePath: 'content/insights/article.md',
          relativePath: 'insights/article.md',
          url: '/insights/article.html',
          categoryPath: ['insights'],
          title: '洞见文章',
          updatedAt: '2026-06-03',
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
        count: 2,
        children: [
          expect.objectContaining({
            slug: 'release-build',
            label: '发布与构建',
            position: 'child-slot-1',
            count: 2,
            children: [expect.objectContaining({ slug: 'checklist', label: '审查清单', position: 'grandchild-slot-1', articles: [expect.objectContaining({ title: '冒烟检查' })] })],
          }),
        ],
      }),
      expect.objectContaining({
        slug: 'insights',
        label: '洞见',
        count: 1,
        description: '1 篇文章',
        articles: [expect.objectContaining({ title: '洞见文章' })],
        children: [],
      }),
    ])
  })
})
