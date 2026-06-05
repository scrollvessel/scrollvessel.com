import { ReadingMetric } from './reading-metric.js'

export function wordCount(source: string): number {
  return new ReadingMetric(source).wordCount()
}

export function readingMinutes(source: string): number {
  return new ReadingMetric(source).readingMinutes()
}
