import { computed, ref, watch, type Ref } from 'vue'
import type { HomepageCategoryNode } from '../homepage-model'
import { HomepageCategorySelection } from '../model/homepage-category-selection'
import { SelectableChartCategories } from './selectable-chart-categories'

export class CategoryChartState {
  readonly selectedCategory
  readonly selectedCategoryLabel
  readonly focusedRouteItems

  constructor(private readonly categories: Ref<HomepageCategoryNode[]>) {
    this.selectedCategory = ref(new HomepageCategorySelection(categories.value).firstSlug())
    this.selectedCategoryLabel = computed(() => this.selectableCategories().labelFor(this.selectedCategory.value))
    this.focusedRouteItems = computed(() => new HomepageCategorySelection(this.categories.value).focusedRouteItems(this.selectedCategory.value))

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
