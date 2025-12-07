<script setup lang="ts">
import { onMounted, ref } from 'vue'

// --- 类型定义 ---
type TabKey = 'all' | 'hard' | 'risky' | 'safe'

interface YearData {
  count?: number
  minScore?: number
  diff?: number
  method?: string
}

interface School {
  id: number
  name: string
  tags: string[]
  code: string
  probability: string
  statusLabel: '保' | '冲' | '稳' | '难'
  calcScore: number
  diffScore: number
  majorName: string
  requirements: string
  tuition: string
  majorCode: string
  planCount: number
  history: { [key: string]: YearData }
}

interface MajorDetail {
  code: string
  name: string
  prob: number
  score: number
  req: string
}

// --- 状态数据 ---
const currentTab = ref<TabKey>('all')
const tabs = [
  { key: 'all', label: '全部', count: 157 },
  { key: 'hard', label: '难录取', count: 145 },
  { key: 'risky', label: '可冲击', count: 11 },
  { key: 'safe', label: '可保底', count: 1 },
]

const schools = ref<School[]>([]) // 列表数据
const isLoading = ref(false)
const isFinished = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

// 弹窗相关状态
const showModal = ref(false)
const currentSchool = ref<School | null>(null)
const modalLoading = ref(false)
const modalMajors = ref<MajorDetail[]>([])

// --- 模拟数据生成器 ---
function generateMockData(count: number, startId: number) {
  const result: School[] = []
  for (let i = 0; i < count; i++) {
    const id = startId + i
    result.push({
      id,
      name: `模拟院校名称 ${id}号`,
      tags: i % 2 === 0 ? ['湖北', '公办', '师范'] : ['陕西', '民办', '综合'],
      code: (5000 + id).toString(),
      probability: (Math.random() * 100).toFixed(2),
      statusLabel: Math.random() > 0.5 ? '保' : '冲',
      calcScore: 450 + Math.floor(Math.random() * 50),
      diffScore: 20 + Math.floor(Math.random() * 30),
      majorName: i % 3 === 0 ? '音乐学 (师范)' : '计算机科学与技术',
      requirements: '再选: 不限',
      tuition: '5000元/年',
      majorCode: `0${i % 9}`,
      planCount: 5 + Math.floor(Math.random() * 10),
      history: {
        2024: { count: 8, minScore: 450.8, diff: 64.2, method: '文*0.6+专*1' },
      },
    })
  }
  return result
}

// --- 无限滚动逻辑 ---
async function loadMore() {
  if (isLoading.value || isFinished.value)
    return

  isLoading.value = true

  // 模拟网络延迟
  setTimeout(() => {
    const newItems = generateMockData(5, schools.value.length + 1)
    schools.value = [...schools.value, ...newItems]
    isLoading.value = false

    // 假设总数达到 50 就停止加载
    if (schools.value.length >= 25) {
      isFinished.value = true
    }
  }, 800)
}

function handleScroll() {
  if (!scrollContainer.value)
    return
  const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value
  // 距离底部 50px 时触发加载
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMore()
  }
}

// --- 弹窗逻辑 ---
async function openMajorModal(school: School) {
  currentSchool.value = school
  showModal.value = true
  modalLoading.value = true
  modalMajors.value = []

  // 模拟获取该学校其他专业
  setTimeout(() => {
    modalMajors.value = [
      { code: '02', name: '汉语言文学', prob: 98, score: 460, req: '历史+不限' },
      { code: '03', name: '学前教育', prob: 92, score: 455, req: '历史/政治' },
      { code: '04', name: '英语 (师范)', prob: 75, score: 470, req: '不限' },
      { code: '05', name: '网络工程', prob: 60, score: 440, req: '物理+化学' },
    ]
    modalLoading.value = false
  }, 600)
}

function closeModal() {
  showModal.value = false
}

function getStatusColor(status: string) {
  switch (status) {
    case '保': return 'border-green-500 text-green-600 bg-green-50'
    case '冲': return 'border-orange-500 text-orange-500 bg-orange-50'
    default: return 'border-gray-400 text-gray-400'
  }
}

// 为了节省流量，我们可以加一个简单的判断：只有是 PC 端时才初始加载数据
onMounted(() => {
  // 检查窗口宽度是否大于 1024px
  if (window.innerWidth >= 1024) {
    loadMore()
  }

  // 监听窗口大小变化（可选：如果用户旋转屏幕或拖拽窗口，动态决定是否加载）
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  // 如果之前没加载过，且现在变宽了，则加载数据
  if (window.innerWidth >= 1024 && schools.value.length === 0 && !isLoading.value) {
    loadMore()
  }
}
</script>

<template>
  <!-- =========================================================
      1. 移动端提示层 (Phone View)
      逻辑：默认显示 (flex)，在 lg (1024px) 及以上屏幕隐藏
  ========================================================== -->
  <div class="w-full flex flex-col items-center justify-center bg-gray-50 p-8 text-center lg:hidden">
    <div class="max-w-sm w-full rounded-2xl bg-white p-8 shadow-lg">
      <!-- 图标 (手机) -->
      <div class="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      <h3 class="mb-2 text-xl text-slate-800 font-bold">
        请访问小程序
      </h3>
      <p class="mb-6 text-sm text-slate-500 leading-relaxed">
        当前页面包含大量数据表格，<br>为保证最佳体验，请在 PC 端浏览<br>或前往微信小程序查看。
      </p>

      <!-- 模拟一个小程序跳转按钮 -->
      <button class="w-full rounded-full bg-blue-600 py-2.5 text-sm text-white font-medium shadow-blue-200 shadow-md transition-colors hover:bg-blue-700">
        打开微信小程序
      </button>
    </div>
  </div>

  <div class="mx-auto hidden h-screen max-w-7xl flex-col px-4 text-slate-700 font-sans lg:flex lg:px-8 sm:px-6">
    <!-- <div class="h-screen mx-auto max-w-7xl select-none px-4 py-8 lg:px-8 sm:px-6"> -->

    <!-- 顶部筛选栏 (保持不变) -->
    <div class="flex flex-shrink-0 space-x-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="border-x border-t border-transparent rounded-t-md px-6 py-2 text-sm font-medium transition-colors duration-200" :class="[
          currentTab === tab.key
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-slate-600 hover:text-blue-500 border-slate-200',
        ]"
        @click="currentTab = tab.key"
      >
        {{ tab.label }} <span class="ml-1 opacity-90">{{ tab.count }}</span>
      </button>
    </div>

    <!-- 表格容器：限制高度 + 滚动监听 -->
    <!-- 关键点：h-[calc(100vh-150px)] 用于限制高度，overflow-auto 用于滚动 -->
    <div
      ref="scrollContainer"
      class="relative flex-1 overflow-auto scroll-smooth border border-slate-200 rounded-b-md bg-white shadow-sm"
      @scroll="handleScroll"
    >
      <table class="relative min-w-[1500px] w-full border-collapse text-sm">
        <!-- 表头 -->
        <thead class="sticky top-0 z-30 bg-slate-50 text-center text-slate-500 font-medium shadow-sm">
          <tr>
            <!-- 左侧冻结列：院校 -->
            <th class="sticky left-0 z-40 w-64 border-r border-slate-200 bg-slate-50 p-4 text-left shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              招生院校
            </th>
            <th class="w-32 p-4">
              录取概率
            </th>
            <th class="w-64 p-4">
              招生专业
            </th>
            <th class="w-24 p-4">
              25省内<br>招生
            </th>
            <!-- 假设中间有很多历年数据列，撑开宽度 -->
            <th class="w-20 p-4">
              历年
            </th>
            <th class="w-32 p-4">
              2024
            </th>
            <th class="w-32 p-4">
              2023
            </th>
            <th class="w-32 p-4">
              2022
            </th>
            <th class="w-32 p-4">
              2021 (模拟)
            </th>
            <th class="w-32 p-4">
              2020 (模拟)
            </th>
            <!-- 右侧冻结列：操作 -->
            <th class="sticky right-0 z-40 w-40 border-l border-slate-200 bg-slate-50 p-4 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">
              操作
            </th>
          </tr>
        </thead>

        <!-- 表格内容 -->
        <tbody class="divide-y divide-slate-200">
          <template v-for="school in schools" :key="school.id">
            <!-- Row 1 -->
            <tr class="group transition-colors hover:bg-slate-50">
              <!-- Sticky Left: 院校信息 -->
              <!-- 注意：bg-white 是为了遮挡滚动的文字，group-hover:bg-slate-50 是为了保持 hover 效果 -->
              <td rowspan="4" class="sticky left-0 z-20 border-r border-slate-200 bg-white p-4 align-top shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] group-hover:bg-slate-50">
                <div class="mb-1 w-56 truncate text-left text-base text-slate-900 font-bold" :title="school.name">
                  {{ school.name }}
                </div>
                <div class="mb-2 flex flex-wrap gap-1 text-xs text-slate-500">
                  <span v-for="tag in school.tags" :key="tag" class="rounded bg-slate-100 px-1 py-0.5">{{ tag }}</span>
                </div>
                <div class="text-left text-xs text-slate-400">
                  代码 {{ school.code }}
                </div>
              </td>

              <!-- 中间普通滚动列 -->
              <td rowspan="4" class="border-r border-slate-100 bg-white p-4 text-center align-top group-hover:bg-slate-50">
                <div class="mb-2 text-lg font-bold">
                  {{ school.probability }}%
                </div>
                <div class="mb-2 flex justify-center">
                  <div class="h-8 w-8 flex items-center justify-center border-2 rounded-full text-xs font-bold" :class="getStatusColor(school.statusLabel)">
                    {{ school.statusLabel }}
                  </div>
                </div>
              </td>

              <td rowspan="4" class="border-r border-slate-100 bg-white p-4 align-top group-hover:bg-slate-50">
                <div class="mb-1 text-slate-900 font-bold">
                  {{ school.majorName }}
                </div>
                <div class="mb-1 text-xs text-slate-500">
                  {{ school.requirements }}
                </div>
                <div class="mt-2 text-xs text-slate-400">
                  {{ school.tuition }}
                </div>
              </td>

              <td rowspan="4" class="border-r border-slate-100 bg-white p-4 text-center align-top group-hover:bg-slate-50">
                <div class="text-lg font-medium">
                  {{ school.planCount }}人
                </div>
              </td>

              <!-- 历年数据区域 (横向较宽) -->
              <td class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500">
                招生人数
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                {{ school.history['2024']?.count || '-' }}
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                -
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                -
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                -
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                -
              </td>

              <!-- Sticky Right: 操作 -->
              <td rowspan="4" class="sticky right-0 z-20 border-l border-slate-200 bg-white p-4 text-center align-middle shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] group-hover:bg-slate-50">
                <button
                  class="whitespace-nowrap border border-blue-500 rounded-full bg-white px-3 py-1.5 text-xs text-blue-500 transition-colors hover:bg-blue-50"
                  @click="openMajorModal(school)"
                >
                  查看可选专业
                </button>
              </td>
            </tr>

            <!-- Row 2: 最低分数 -->
            <tr class="group hover:bg-slate-50">
              <td class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500">
                最低分数
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm font-medium">
                {{ school.history['2024']?.minScore || '-' }}
              </td>
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
            </tr>

            <!-- Row 3: 历年线差 -->
            <tr class="group hover:bg-slate-50">
              <td class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500">
                历年线差
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                {{ school.history['2024']?.diff || '-' }}
              </td>
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
            </tr>

            <!-- Row 4: 录取方式 -->
            <tr class="group border-b border-slate-200 hover:bg-slate-50">
              <td class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500">
                录取方式
              </td>
              <td class="border-r border-slate-100 px-2 py-2 text-center text-xs text-slate-600">
                {{ school.history['2024']?.method || '-' }}
              </td>
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
              <td class="border-r border-slate-100 px-2 py-2" />
            </tr>
          </template>

          <!-- 加载状态条 -->
          <tr v-if="isLoading || isFinished">
            <td colspan="100%" class="sticky left-0 bg-slate-50 p-4 text-center text-sm text-slate-500">
              <span v-if="isLoading" class="flex items-center justify-center gap-2">
                <svg class="h-5 w-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                正在加载更多数据...
              </span>
              <span v-else-if="isFinished">没有更多数据了</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 弹窗层 (Modal) -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="closeModal">
        <div class="max-h-[80vh] w-[800px] flex flex-col animate-fade-in-up overflow-hidden rounded-lg bg-white shadow-xl">
          <!-- 弹窗头部 -->
          <div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4">
            <div>
              <h3 class="text-lg text-slate-800 font-bold">
                {{ currentSchool?.name }}
              </h3>
              <p class="text-xs text-slate-500">
                其他可报专业列表
              </p>
            </div>
            <button class="text-slate-400 hover:text-slate-600" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 弹窗内容 -->
          <div class="flex-1 overflow-auto p-0">
            <table class="w-full text-left text-sm">
              <thead class="sticky top-0 bg-slate-50 text-xs text-slate-500 uppercase">
                <tr>
                  <th class="px-6 py-3">
                    专业名称
                  </th>
                  <th class="px-6 py-3">
                    录取概率
                  </th>
                  <th class="px-6 py-3">
                    最低分
                  </th>
                  <th class="px-6 py-3">
                    选科要求
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-if="modalLoading">
                  <td colspan="4" class="p-8 text-center text-slate-500">
                    加载中...
                  </td>
                </tr>
                <tr v-for="major in modalMajors" :key="major.code" class="hover:bg-slate-50">
                  <td class="px-6 py-4 text-slate-900 font-medium">
                    {{ major.name }}
                  </td>
                  <td class="px-6 py-4">
                    <span :class="{ 'text-green-600': major.prob >= 80, 'text-orange-500': major.prob < 80 }">
                      {{ major.prob }}%
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    {{ major.score }}
                  </td>
                  <td class="px-6 py-4 text-xs text-slate-500">
                    {{ major.req }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 弹窗底部 -->
          <div class="border-t border-slate-200 p-4 text-right">
            <button class="rounded bg-slate-100 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-200" @click="closeModal">
              关闭
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* 定义淡入动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
</style>
