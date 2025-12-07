<script setup lang="ts">
import { computed, ref } from 'vue'

// --- Types ---
interface SubCategory {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
  isOpen: boolean
  subCategories?: SubCategory[]
}

interface Major {
  id: string
  name: string
  code: string
  subCategoryName: string
  duration: string
  genderRatio: string
  avgSalary: string
}

// --- Mock Data ---
const categories = ref<Category[]>([
  { id: '1', name: '热门', isOpen: false },
  {
    id: '2',
    name: '医药卫生大类',
    isOpen: true,
    subCategories: [
      { id: '2-1', name: '中医药类' },
      { id: '2-2', name: '临床医学类' },
      { id: '2-3', name: '健康管理与促进类' },
      { id: '2-4', name: '医学技术类' },
      { id: '2-5', name: '护理类' },
      { id: '2-6', name: '康复治疗类' },
      { id: '2-7', name: '公共卫生与卫生管理类' },
      { id: '2-8', name: '眼视光类' },
      { id: '2-9', name: '药学类' },
    ],
  },
  { id: '3', name: '文化艺术大类', isOpen: false, subCategories: [] },
  { id: '4', name: '交通运输大类', isOpen: false, subCategories: [] },
  { id: '5', name: '装备制造大类', isOpen: false, subCategories: [] },
])

const majorsData: Major[] = [
  { id: 'm1', name: '中医学', code: '520401K', subCategoryName: '中医药类', duration: '三年', genderRatio: '40:60', avgSalary: '¥-' },
  { id: 'm2', name: '中医康复技术', code: '520416', subCategoryName: '中医药类', duration: '三年', genderRatio: '--', avgSalary: '¥8300' },
  { id: 'm3', name: '朝医学', code: '520409K', subCategoryName: '中医药类', duration: '三年', genderRatio: '--', avgSalary: '¥-' },
  { id: 'm4', name: '中药材生产与加工', code: '520414', subCategoryName: '中医药类', duration: '三年', genderRatio: '--', avgSalary: '¥6800' },
  { id: 'm5', name: '口腔医学', code: '520102K', subCategoryName: '临床医学类', duration: '三年', genderRatio: '42:58', avgSalary: '¥-' },
  { id: 'm6', name: '临床医学', code: '520101K', subCategoryName: '临床医学类', duration: '三年', genderRatio: '44:56', avgSalary: '¥-' },
]

// --- State ---
const activeTab = ref<'general' | 'vocational_bs' | 'vocational_hs'>('vocational_hs')
const searchQuery = ref('')
const activeCategory = ref('医药卫生大类')
const activeSubCategory = ref('')

// --- Logic ---
function toggleCategory(cat: Category) {
  cat.isOpen = !cat.isOpen
}

const groupedMajors = computed(() => {
  const groups: Record<string, Major[]> = {}
  majorsData.forEach((major) => {
    if (!groups[major.subCategoryName]) {
      groups[major.subCategoryName] = []
    }
    groups[major.subCategoryName].push(major)
  })
  return groups
})
</script>

<template>
  <!-- Global Wrapper with Dark Mode Background -->
  <div class="min-h-screen bg-[#f9f9f9] text-gray-700 font-sans transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <!-- Top Header / Tabs Area -->
      <div class="mb-6 mt-6 rounded-lg bg-white p-4 shadow transition-colors dark:bg-gray-800 sm:p-6">
        <div class="mx-auto max-w-7xl">
          <!-- Flex Container: Stacks on mobile, Row on md+ -->
          <div class="flex flex-col justify-between bg-white pt-2 md:flex-row md:items-center dark:bg-gray-800 sm:pt-4">
            <!-- Tabs (Scrollable on mobile) -->
            <div class="scrollbar-hide flex overflow-x-auto pb-2 space-x-1 md:pb-0">
              <button
                class="whitespace-nowrap rounded-t-lg px-6 py-3 text-base font-medium transition-colors sm:px-8 sm:text-lg" :class="[activeTab === 'general' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600']"
                @click="activeTab = 'general'"
              >
                本科(普通)
              </button>
              <button
                class="whitespace-nowrap rounded-t-lg px-6 py-3 text-base font-medium transition-colors sm:px-8 sm:text-lg" :class="[activeTab === 'vocational_bs' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600']"
                @click="activeTab = 'vocational_bs'"
              >
                本科(职业)
              </button>
              <button
                class="relative whitespace-nowrap rounded-t-lg px-6 py-3 text-base font-medium transition-colors sm:px-8 sm:text-lg" :class="[activeTab === 'vocational_hs' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600']"
                @click="activeTab = 'vocational_hs'"
              >
                专科(高职)
                <!-- blue bottom line fix for active state -->
                <span v-if="activeTab === 'vocational_hs'" class="absolute bottom-[-1px] left-0 h-1 w-full bg-blue-500" />
              </button>
            </div>

            <!-- Search & Sort -->
            <div class="mt-4 w-full flex flex-col items-start pb-2 md:mt-0 md:w-auto sm:flex-row sm:items-center space-y-3 sm:space-x-4 sm:space-y-0">
              <div class="hidden cursor-pointer text-sm text-gray-500 sm:block dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600">
                默认排序 ▼
              </div>
              <div class="w-full flex sm:w-auto">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="输入专业名称"
                  class="w-full flex-grow border rounded-l px-3 py-2 text-sm transition-colors sm:w-48 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700 light:bg-white dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:placeholder-gray-400"
                >
                <button class="whitespace-nowrap rounded-r bg-blue-500 px-5 py-2 text-sm text-white transition-colors hover:bg-blue-600">
                  搜索
                </button>
              </div>
            </div>
          </div>
          <!-- blue Bar Line -->
          <div class="h-1 w-full bg-blue-500" />
        </div>
      </div>

      <!-- Main Content Area -->
      <!-- Flex-col on mobile (sidebar stacks on top), lg:flex-row on desktop -->
      <div class="mx-auto flex flex-col gap-6 rounded-lg py-2 lg:flex-row sm:py-6">
        <!-- Left Sidebar -->
        <div class="w-full flex-shrink-0 self-start overflow-hidden rounded-lg bg-white pb-4 shadow-sm transition-colors lg:w-64 dark:bg-gray-800">
          <ul>
            <li v-for="cat in categories" :key="cat.id" class="border-b border-gray-100 border-dashed last:border-0 dark:border-gray-700">
              <!-- Main Category Header -->
              <div
                class="flex cursor-pointer items-center justify-between px-4 py-4 transition-colors hover:text-blue-600" :class="[
                  activeCategory === cat.name
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    : 'text-gray-700 dark:text-gray-300 border-l-4 border-transparent',
                ]"
                @click="toggleCategory(cat)"
              >
                <span class="font-medium">{{ cat.name }}</span>
                <span v-if="cat.subCategories && cat.subCategories.length > 0" class="text-xs">
                  <!-- Icons -->
                  <svg v-if="cat.isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </span>
              </div>

              <!-- Sub Categories -->
              <ul v-show="cat.isOpen && cat.subCategories" class="bg-white dark:bg-gray-800">
                <li
                  v-for="sub in cat.subCategories"
                  :key="sub.id"
                  class="cursor-pointer py-3 pl-8 pr-4 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-600"
                  @click.stop="activeSubCategory = sub.name"
                >
                  {{ sub.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Right Content List -->
        <div class="flex-grow space-y-6">
          <!-- Loop through Groups -->
          <div v-for="(majors, groupName) in groupedMajors" :key="groupName" class="overflow-hidden rounded-sm bg-white shadow-sm transition-colors dark:bg-gray-800">
            <!-- Group Header (Banner) -->
            <div class="border-b border-blue-100 bg-blue-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700">
              <h2 class="text-center text-lg text-blue-500 font-bold">
                {{ groupName }}
              </h2>
            </div>

            <!-- List Items -->
            <div class="p-4 space-y-8 sm:p-6">
              <div v-for="major in majors" :key="major.id" class="flex flex-col gap-3">
                <!-- Top Row: Title + Code + Action -->
                <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                  <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-lg text-gray-800 font-normal transition-colors sm:text-xl dark:text-gray-100">
                      {{ major.name }}
                    </h3>
                    <span class="flex items-center gap-1 border border-gray-300 rounded bg-gray-50 px-1 py-0.5 text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      专业代码:{{ major.code }}
                    </span>
                  </div>
                  <!-- Mobile: Button moves to its own row if needed, but flex-col handles it.
                       Here we make it stretch on very small screens or auto on sm -->
                  <button class="mt-2 w-full border border-blue-500 rounded px-4 py-1.5 text-center text-sm text-blue-500 transition-colors sm:mt-0 sm:w-auto hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    开设院校
                  </button>
                </div>

                <!-- Bottom Row: Stats -->
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div class="rounded-sm bg-gray-100 px-3 py-1 transition-colors dark:bg-gray-700">
                    修业年限：{{ major.duration }}
                  </div>
                  <div class="rounded-sm bg-gray-100 px-3 py-1 transition-colors dark:bg-gray-700">
                    男女比例：{{ major.genderRatio }}
                  </div>
                  <div class="rounded-sm bg-gray-100 px-3 py-1 transition-colors dark:bg-gray-700">
                    平均薪酬：{{ major.avgSalary }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-center py-8 space-x-2">
            <span class="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">首页</span>
            <span class="flex cursor-pointer items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg> 上一页</span>

            <button class="h-8 w-8 flex items-center justify-center rounded bg-blue-500 text-sm text-white shadow-sm">
              1
            </button>
            <button class="h-8 w-8 flex items-center justify-center border border-gray-200 rounded bg-white text-sm text-gray-600 transition-colors dark:border-gray-600 hover:border-blue-500 dark:bg-gray-800 dark:text-gray-300 hover:text-blue-600">
              2
            </button>
            <button class="h-8 w-8 flex items-center justify-center border border-gray-200 rounded bg-white text-sm text-gray-600 transition-colors dark:border-gray-600 hover:border-blue-500 dark:bg-gray-800 dark:text-gray-300 hover:text-blue-600">
              3
            </button>

            <span class="flex cursor-pointer items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">下一页 <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></span>
            <span class="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600">尾页</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Buttons Area -->
    <div class="fixed bottom-10 right-6 z-20 flex flex-col gap-4 sm:right-10">
      <!-- Back to Top -->
      <!-- <button @click="scrollToTop" class="bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600 shadow-lg text-blue-500 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button> -->
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}
::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Hide scrollbar for tabs on mobile but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
