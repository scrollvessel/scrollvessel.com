export type CategoryLayer = 'parent' | 'child' | 'grandchild'

export class CategoryPosition {
  static forDepth(depth: number, index: number): string {
    return this.forLayer(this.layerFor(depth), index)
  }

  private static layerFor(depth: number): CategoryLayer {
    if (depth === 1) return 'parent'
    if (depth === 2) return 'child'
    return 'grandchild'
  }

  private static forLayer(layer: CategoryLayer, index: number): string {
    if (layer === 'parent') return `parent-slot-${(index % 4) + 1}`
    if (layer === 'child') return `child-slot-${(index % 8) + 1}`
    return `grandchild-slot-${(index % 8) + 1}`
  }
}
