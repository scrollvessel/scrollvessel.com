import { computed, ref, watch, type Ref } from 'vue'
import { buildFocusedRouteItems, type HomepageCategoryNode } from '../homepage-model'
import { SelectableChartCategories } from './selectable-chart-categories'

export class CategoryChartState {
  readonly selectedCategory
  readonly selectedCategoryLabel
  readonly focusedRouteItems

  constructor(private readonly categories: Ref<HomepageCategoryNode[]>) {
    this.selectedCategory = ref(SelectableChartCategories.fromTree(categories.value).firstSlug())
    this.selectedCategoryLabel = computed(() => this.selectableCategories().labelFor(this.selectedCategory.value))
    this.focusedRouteItems = computed(() => buildFocusedRouteItems(this.categories.value, this.selectedCategory.value))

    watch(
      this.categories,
      () => {
        if (!this.selectableCategories().hasSlug(this.selectedCategory.value)) {
          this.selectedCategory.value = this.selectableCategories().firstSlug()
        }
      },
    )
  }

  private selectableCategories(): SelectableChartCategories {
    return SelectableChartCategories.fromTree(this.categories.value)
  }
}
