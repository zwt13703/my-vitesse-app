<script setup lang="ts">
import type { FilterState } from '~/components/FilterBar.vue'

defineOptions({
  name: 'SimulatePage',
})

const currentFilters = ref<FilterState | null>(null)
const currentKeyword = ref('')

function handleDataChange(data: { keyword: string, filters: FilterState }) {
  console.warn('发起请求:', data.keyword, data.filters)
  currentKeyword.value = data.keyword
  currentFilters.value = data.filters
}

useHead({
  title: '模拟填志愿',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <div class="py-8">
      <h1 class="mb-6 text-3xl text-gray-900 font-bold">
        模拟填志愿
      </h1>

      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="min-h-screen bg-gray-50 p-10">
          <FilterBar @change="handleDataChange" />
          <!-- 用于演示结果 -->
          <div class="mt-8 border border-gray-300 rounded border-dashed p-4">
            <p>当前筛选条件: {{ JSON.stringify(currentFilters) }}</p>
            <p>当前搜索词: {{ currentKeyword }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
