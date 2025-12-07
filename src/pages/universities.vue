<script setup lang="ts">
import type { FilterState } from '~/components/FilterBar.vue'

defineOptions({
  name: 'UniversitiesPage',
})

useHead({
  title: '找大学',
})

const currentFilters = ref<FilterState | null>(null)
const currentKeyword = ref('')

function handleDataChange(data: { keyword: string, filters: FilterState }) {
  console.warn('发起请求:', data.keyword, data.filters)
  currentKeyword.value = data.keyword
  currentFilters.value = data.filters
}

// Define reactive data for filters
const selectedRegions = ref<string[]>([])
const selectedTags = ref<string[]>([])
const selectedSchoolTypes = ref<string[]>([])
const selectedCategories = ref<string[]>([])
const universityName = ref('')

// Sample university data
const universities = ref([
  {
    id: 1,
    name: '中国石油大学（华东）',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '山东青岛',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['211', 'Double First-Class'],
    campus: 'East China',
  },
  {
    id: 2,
    name: '清华大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '北京',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 3,
    name: '北京大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '北京',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 4,
    name: '上海交通大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '上海',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 5,
    name: '复旦大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '上海',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 6,
    name: '浙江大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '浙江杭州',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 7,
    name: '南京大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '江苏南京',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 8,
    name: '中山大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '广东广州',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 9,
    name: '华中科技大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '湖北武汉',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 10,
    name: '西安交通大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '陕西西安',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 11,
    name: '哈尔滨工业大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '黑龙江哈尔滨',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 12,
    name: '北京理工大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '北京',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 13,
    name: '电子科技大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '四川成都',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 14,
    name: '南开大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '天津',
    tags: ['Comprehensive', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
  {
    id: 15,
    name: '天津大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    location: '天津',
    tags: ['STEM', 'Public', 'Ministry-affiliated'],
    rankTags: ['985', '211', 'Double First-Class'],
    campus: '',
  },
])

// New filter data for the updated UI
const selectedProvinces = ref<string[]>([])

// Updated filter function to include province filtering
const filteredUniversities = computed(() => {
  return universities.value.filter((university) => {
    // Filter by name
    if (
      universityName.value
      && !university.name
        .toLowerCase()
        .includes(universityName.value.toLowerCase())
    ) {
      return false
    }

    // Filter by province if not '不限'
    if (
      selectedProvinces.value.length > 0
      && !selectedProvinces.value.includes('不限')
    ) {
      // Extract province from location (first character or first two characters)
      const universityProvince = extractProvinceFromLocation(
        university.location,
      )
      if (!selectedProvinces.value.includes(universityProvince)) {
        return false
      }
    }

    // Filter by region (simplified - in real app, would match location to regions)
    if (selectedRegions.value.length > 0) {
      // For demo, we'll skip region filtering
    }

    // Filter by tags
    if (
      selectedTags.value.length > 0
      && !selectedTags.value.some(tag => university.rankTags.includes(tag))
    ) {
      return false
    }

    // Filter by school type (simplified - in real app, would match school type)
    if (selectedSchoolTypes.value.length > 0) {
      // For demo, we'll skip school type filtering
    }

    // Filter by category (simplified - in real app, would match category)
    if (selectedCategories.value.length > 0) {
      // For demo, we'll skip category filtering
    }

    return true
  })
})

// Helper function to extract province from location
function extractProvinceFromLocation(location: string): string {
  // Common provinces that are 2 characters
  const twoCharProvinces = [
    '北京',
    '上海',
    '天津',
    '重庆',
    '香港',
    '澳门',
    '台湾',
  ]

  for (const province of twoCharProvinces) {
    if (location.startsWith(province)) {
      return province
    }
  }

  // For other provinces, take the first character
  if (location.length > 0) {
    return location.charAt(0)
  }

  return ''
}

// Pagination data
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() =>
  Math.ceil(universities.value.length / itemsPerPage),
)

// Add helper function for pagination
function getPageNumber(index: number) {
  if (totalPages.value <= 5) {
    return index
  }

  const currentPageValue = currentPage.value
  const totalPagesValue = totalPages.value

  if (currentPageValue <= 3) {
    // First few pages: show 1, 2, 3, 4, 5
    return index
  }
  else if (currentPageValue >= totalPagesValue - 2) {
    // Last few pages: show last 5 pages
    return totalPagesValue - 5 + index
  }
  else {
    // Middle pages: show current page in center
    return currentPageValue - 3 + index
  }
}

// Get universities for current page
const paginatedUniversities = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredUniversities.value.slice(
    startIndex,
    startIndex + itemsPerPage,
  )
})

// Search function
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <!-- Top Section: Filters -->
    <div class="mb-8 mt-8 rounded-lg bg-white p-6 shadow">
      <div class="grid grid-cols-1 select-none gap-6 lg:grid-cols-6">
        <!-- Top Toolbar -->
        <div class="lg:col-span-4">
          <FilterBar @change="handleDataChange" />
          <div class="mb-4 mt-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              大学: {{ filteredUniversities.length }}
            </h2>
          </div>

          <div class="space-y-4">
            <div
              v-for="university in paginatedUniversities"
              :key="university.id"
              class="flex justify-between border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md"
            >
              <!-- Left: Logo and Name -->
              <div class="mr-4 flex items-center">
                <img
                  :src="university.logo"
                  :alt="university.name"
                  class="mr-3 h-12 w-12 object-contain"
                >
                <div class="flex flex-col space-y-2">
                  <!-- name location -->
                  <div class="w-full flex items-center">
                    <h3 class="text-gray-900 font-bold">
                      {{ university.name }}
                    </h3>
                    <div class="ml-5 flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{{ university.location }}</span>
                    </div>
                  </div>
                  <div class="w-full flex flex-wrap gap-2">
                    <span
                      v-for="tag in university.tags"
                      :key="tag"
                      class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  <!-- Middle: Location and Tags -->
                  <div class="w-full flex flex-wrap gap-2">
                    <span
                      v-for="rankTag in university.rankTags"
                      :key="rankTag"
                      class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                    >
                      {{ rankTag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right: Action Button -->
              <div class="flex-3">
                <button
                  class="flex items-center rounded-md bg-orange-100 px-3 py-2 text-orange-700 transition-colors hover:bg-orange-200"
                >
                  <span>录取概率</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-8 flex items-center justify-center space-x-2">
            <button
              :disabled="currentPage === 1"
              class="border border-gray-300 rounded-md bg-white px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
              @click="currentPage = 1"
            >
              首页
            </button>
            <button
              :disabled="currentPage === 1"
              class="border border-gray-300 rounded-md bg-white px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
              @click="currentPage = currentPage - 1"
            >
              上一页
            </button>

            <!-- Page numbers -->
            <div class="flex space-x-1">
              <button
                v-for="page in Math.min(5, totalPages)"
                :key="page"
                :class="[
                  currentPage === getPageNumber(page)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50',
                ]"
                class="border border-gray-300 rounded-md px-3 px-3 py-2 py-2 text-sm text-sm font-medium"
                @click="currentPage = getPageNumber(page)"
              >
                {{ getPageNumber(page) }}
              </button>
            </div>

            <button
              :disabled="currentPage === totalPages"
              class="border border-gray-300 rounded-md bg-white px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
              @click="currentPage = currentPage + 1"
            >
              下一页
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="border border-gray-300 rounded-md bg-white px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
              @click="currentPage = totalPages"
            >
              末页
            </button>
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="h-full flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 p-6">
            <p class="text-gray-500">
              预留空间
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="flex space-x-4">
        <div class="mt-8 p-4 border border-dashed border-gray-300 rounded">
          <p>当前筛选条件: {{ JSON.stringify(currentFilters) }}</p>
          <p>当前搜索词: {{ currentKeyword }}</p>
        </div>
      </div> -->
    </div>

    <!-- Bottom Section: Reserved Space -->
    <div class="mb-8 border border-gray-200 rounded-lg bg-gray-50 p-6">
      <p class="text-center text-gray-500">
        预留空间
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling for the university cards */
.university-card {
  transition: box-shadow 0.2s ease;
}

.university-card:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Pagination styling */
.pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s ease;
}

.pagination-btn:hover {
  background-color: #f3f4f6;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-page {
  background-color: #f97316;
  color: white;
  border-color: #f97316;
}
</style>
