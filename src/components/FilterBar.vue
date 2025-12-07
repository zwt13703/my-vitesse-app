<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

// 定义数据类型 (方便父组件有类型提示)
export interface FilterState {
  location: string
  type: string
  major: string
  sort: string
}

// 定义 Emits (声明组件会触发哪些事件)
const emit = defineEmits<{
  (e: 'change', payload: { keyword: string, filters: FilterState }): void

  // // 当点击下拉菜单里的“确定”时触发，回传筛选对象
  // (e: 'confirm', filters: FilterState): void;
  // // 当点击右侧“搜索”按钮时触发，回传搜索关键词
  // (e: 'search', keyword: string): void;
}>()

// --- 类型定义 ---
type FilterKey = 'location' | 'type' | 'major' | 'sort'

interface FilterConfig {
  key: FilterKey
  label: string
}

// --- 数据 ---
const filters: FilterConfig[] = [
  { key: 'location', label: '位置' },
  { key: 'type', label: '类型' },
  { key: 'major', label: '专业' },
  { key: 'sort', label: '排序' },
]

// 按照截图还原的省份数据
const locations = [
  '不限',
  '北京',
  '天津',
  '河北',
  '山西',
  '内蒙古',
  '辽宁',
  '吉林',
  '黑龙江',
  '上海',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '广西',
  '海南',
  '重庆',
  '四川',
  '贵州',
  '云南',
  '西藏',
  '陕西',
  '甘肃',
  '青海',
  '宁夏',
  '新疆',
  '台湾',
  '香港',
  '澳门',
]

// --- 状态 ---
const containerRef = ref<HTMLElement | null>(null) // 用于检测点击外部
const activeFilter = ref<FilterKey | null>(null) // 当前展开的菜单
const searchQuery = ref('')

// 选中的值
const selectedFilters = reactive({
  location: '不限',
  type: '不限',
  major: '不限',
  sort: '默认',
})

// 临时选中的值（用于在点击“确定”之前暂存，如果需要这种逻辑的话，本例为了简单直接修改 selectedFilters）
// 如果要严格复刻逻辑，通常点击选项时只变色，点确定才生效。这里简化为点击即选中高亮。

// --- 计算属性 ---
function getLabel(key: FilterKey) {
  // 如果不是默认值，可以显示选中的值，否则显示标题
  // 这里为了保持截图样式，保持显示标题
  const map = { location: '位置', type: '类型', major: '专业', sort: '排序' }
  return map[key]
}

const countSelected = computed(() => {
  // 简单计算：如果当前打开的是位置，且选的不是不限，则为1，否则0
  if (activeFilter.value === 'location') {
    return selectedFilters.location !== '不限' ? 1 : 0
  }
  return 0
})

// --- 方法 ---

// 切换下拉菜单
function toggleFilter(key: FilterKey) {
  if (activeFilter.value === key) {
    activeFilter.value = null // 关闭
  }
  else {
    activeFilter.value = key // 打开
  }
}

// 选择选项
function selectOption(type: FilterKey, value: string) {
  selectedFilters[type] = value
}

// 清空当前
function clearCurrentFilter() {
  if (activeFilter.value) {
    selectedFilters[activeFilter.value] = '不限'
  }
}

// 确定按钮
function confirmSelection() {
  emit('change', { keyword: searchQuery.value, filters: { ...selectedFilters } })
  // 使用展开运算符 {...} 创建副本，防止父组件修改影响子组件（可选）
  // emit('confirm', { ...selectedFilters });
  activeFilter.value = null // 关闭菜单
}

// 搜索按钮
function handleSearch() {
  emit('change', { keyword: searchQuery.value, filters: { ...selectedFilters } })
  // emit('search', searchQuery.value);
}

// --- 点击外部关闭逻辑 ---
function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    activeFilter.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- 最外层容器，用于定位下拉菜单和监听点击外部事件 -->
  <div ref="containerRef" class="relative mx-auto max-w-5xl w-full select-none text-sm text-gray-600 font-sans">
    <!-- 顶部栏：筛选按钮组 + 搜索框 -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- 左侧：4个下拉筛选器 -->
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-for="filter in filters"
          :key="filter.key"
          class="relative"
        >
          <!-- 筛选器按钮 -->
          <button
            class="h-9 w-24 flex items-center justify-between border rounded bg-white px-3 transition-colors hover:border-blue-400"
            :class="activeFilter === filter.key ? 'border-blue-500 ring-1 ring-blue-200' : 'border-gray-200'"
            @click="toggleFilter(filter.key)"
          >
            <span class="truncate">{{ getLabel(filter.key) }}</span>
            <!-- 下箭头图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': activeFilter === filter.key }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 右侧：搜索框 -->
      <div class="flex flex-wrap items-center">
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="h-9 w-50 border border-gray-300 rounded-l bg-white py-2 pl-9 pr-4 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 placeholder-gray-400"
            placeholder="输入院校名称"
          >
        </div>
        <button
          class="h-9 rounded-r bg-blue-500 px-6 text-white transition-colors active:bg-blue-700 hover:bg-blue-600 focus:outline-none"
          @click="handleSearch"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 下拉菜单面板 (绝对定位) -->
    <!-- 使用 Transition 添加简单的淡入淡出效果 -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <!-- style="min-width: 600px;" -->
      <div
        v-if="activeFilter"
        class="absolute left-0 top-full z-50 mt-2 border border-gray-100 rounded-lg bg-white p-5 shadow-xl"
      >
        <!-- 下拉内容区域 -->

        <!-- 1. 位置 (Location) 内容 -->
        <div v-if="activeFilter === 'location'">
          <div class="flex items-start gap-4">
            <span class="mt-1 shrink-0 text-gray-400 font-medium">院校所属</span>
            <div class="xs:grid-cols-3 grid gap-2 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3">
              <button
                v-for="city in locations"
                :key="city"
                class="rounded px-3 py-1.5 text-center transition-colors hover:text-blue-500"
                :class="selectedFilters.location === city
                  ? 'bg-blue-50 text-blue-500 font-medium'
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100'"
                @click="selectOption('location', city)"
              >
                {{ city }}
              </button>
            </div>
          </div>
        </div>

        <!-- 2. 其他筛选器占位内容 (类型、专业、排序) -->
        <div v-else class="p-4 text-center text-gray-400">
          这里是 {{ filters.find(f => f.key === activeFilter)?.label }} 的筛选选项
        </div>

        <!-- 底部操作按钮 -->
        <div class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div class="text-gray-500">
            已选 <span class="text-blue-500 font-bold">{{ countSelected }}</span> 个
          </div>
          <div class="flex gap-3">
            <button
              class="border border-blue-500 rounded px-4 py-1.5 text-blue-500 transition-colors hover:bg-blue-50"
              @click="clearCurrentFilter"
            >
              清空已选
            </button>
            <button
              class="rounded bg-blue-500 px-6 py-1.5 text-white transition-colors hover:bg-blue-600"
              @click="confirmSelection"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/*
如果你的 tailwind 配置没有自动移除按钮的默认样式，可能需要以下代码。
一般在 tailwind base 中已经处理好了。
*/
</style>
