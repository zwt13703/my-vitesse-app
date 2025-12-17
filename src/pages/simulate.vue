<script setup lang="ts">
import type { FilterState } from '~/components/FilterBar.vue'
import { onMounted, ref } from 'vue'

// --- 类型定义 ---
type TabKey = 'all' | 'hard' | 'risky' | 'safe' | '本科' | '专科'
type PanelType = 'market' | 'my-volunteers'

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
  score: number // 最低分
  diff: number // 线差
  plan: number // 计划数
  req: string // 选科
  tuition: string
}

// --- 状态数据 ---
const showSwitchModal = ref(false) // 控制切换方案弹窗显示
const activePlanId = ref('2025121426') // 当前选中的方案ID
// 模拟方案列表数据 (对应截图)
const volunteerPlans = ref([
  {
    id: '2025121426',
    name: '志愿2025121426',
    tag: '手动', // 截图中的橙色标签
    province: '北京',
    artType: '美术与设计类',
    cultureScore: 450,
    cultureSubjects: '物化生',
    artScore: 250,
    updateTime: '2025-12-14 10:33:46',
    status: '有效',
  },
  {
    id: '2025121427',
    name: '志愿2025121427',
    tag: '智能',
    province: '湖北',
    artType: '音乐类',
    cultureScore: 480,
    cultureSubjects: '历史',
    artScore: 240,
    updateTime: '2025-12-13 14:20:00',
    status: '有效',
  },
])

const activePanel = ref<PanelType>('market') // 当前激活的面板

// 模拟“我的志愿”数据 (为了演示Panel B，初始化一些数据)
// 在实际业务中，这应该由 selectedMajorCodes 对应的完整数据填充
const myVolunteers = ref<School[]>([])

const volunteerCurrentTab = ref<TabKey>('本科')
const volunteerTabs = [
  { key: '本科', label: '本科', count: 1, max: 64 },
  { key: '专科', label: '专科', count: 2, max: 64 },
]

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

// 选课/志愿相关状态
const selectedMajorCodes = ref<string[]>([]) // 存储已选的专业Code，数组顺序即为志愿顺序
const showSaveConfirm = ref(false) // 控制气泡确认框显示
const isSaving = ref(false) // 保存接口Loading状态

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
  // 重置弹窗内的状态
  selectedMajorCodes.value = []
  showSaveConfirm.value = false

  // 模拟获取该学校其他专业（更丰富的数据）
  setTimeout(() => {
    modalMajors.value = [
      {
        code: '02',
        name: '汉语言文学',
        prob: 98,
        score: 460,
        diff: 45,
        plan: 12,
        req: '历史+不限',
        tuition: '4000/年',
      },
      {
        code: '03',
        name: '学前教育',
        prob: 92,
        score: 455,
        diff: 40,
        plan: 8,
        req: '历史/政治',
        tuition: '4000/年',
      },
      {
        code: '04',
        name: '英语 (师范)',
        prob: 75,
        score: 470,
        diff: 55,
        plan: 5,
        req: '不限',
        tuition: '5000/年',
      },
      {
        code: '05',
        name: '网络工程',
        prob: 60,
        score: 440,
        diff: 25,
        plan: 20,
        req: '物理+化学',
        tuition: '5500/年',
      },
      {
        code: '06',
        name: '数据科学',
        prob: 45,
        score: 480,
        diff: 65,
        plan: 4,
        req: '物理+化学',
        tuition: '6000/年',
      },
    ]
    modalLoading.value = false
  }, 400)
}

// 2. 选择/取消专业 (点击行内按钮)
function toggleMajor(major: MajorDetail) {
  const index = selectedMajorCodes.value.indexOf(major.code)
  if (index > -1) {
    // 已存在，移除
    selectedMajorCodes.value.splice(index, 1)
  }
  else {
    // 不存在，加入
    selectedMajorCodes.value.push(major.code)
  }
}

// 获取按钮状态显示文本
function getVolunteerBtnText(code: string) {
  const index = selectedMajorCodes.value.indexOf(code)
  if (index > -1) {
    return `志愿 ${index + 1}`
  }
  return '加入志愿单'
}

// 3. 保存逻辑
async function saveVolunteers() {
  if (isSaving.value)
    return
  isSaving.value = true

  // 模拟 API 调用
  setTimeout(() => {
    console.warn('保存成功，已选专业代码:', selectedMajorCodes.value)

    // 成功后关闭
    isSaving.value = false
    showSaveConfirm.value = false
    closeModal()

    // 这里可以加一个全局 Toast 提示 "保存成功"
    console.warn('保存志愿成功！')
  }, 1000)
}

function closeModal() {
  showModal.value = false
  showSaveConfirm.value = false
}

function getStatusColor(status: string) {
  switch (status) {
    case '保':
      return 'border-green-500 text-green-600 bg-green-50'
    case '冲':
      return 'border-orange-500 text-orange-500 bg-orange-50'
    default:
      return 'border-gray-400 text-gray-400'
  }
}

// 为了节省流量，我们可以加一个简单的判断：只有是 PC 端时才初始加载数据
onMounted(() => {
  // 检查窗口宽度是否大于 1024px
  if (window.innerWidth >= 1024) {
    loadMore()
  }

  // 生成一些模拟的“我的志愿”数据
  const initialVols = generateMockData(5, 1000)
  // 为了模拟真实志愿，给它们加上自定义的序号或者直接利用数组索引
  myVolunteers.value = initialVols

  // 监听窗口大小变化（可选：如果用户旋转屏幕或拖拽窗口，动态决定是否加载）
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  // 如果之前没加载过，且现在变宽了，则加载数据
  if (
    window.innerWidth >= 1024
    && schools.value.length === 0
    && !isLoading.value
  ) {
    loadMore()
  }
}

const currentFilters = ref<FilterState | null>(null)
const currentKeyword = ref('')
function handleDataChange(data: { keyword: string, filters: FilterState }) {
  console.warn('发起请求:', data.keyword, data.filters)
  currentKeyword.value = data.keyword
  currentFilters.value = data.filters
}

// 用于记录当前鼠标是否悬停在手柄上，悬停时该行的索引存入这里
const dragEnabledIndex = ref<number | null>(null)
// --- 拖拽排序逻辑 (Panel B) ---
const dragStartIndex = ref<number | null>(null)

function switchVolunteerTab(tabKey: string) {
  volunteerCurrentTab.value = tabKey
}

function handleDragStart(e: DragEvent, index: number) {
  dragStartIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    // 某些浏览器需要设置数据才能拖拽
    e.dataTransfer.setData('text/plain', index.toString())
    // 可选：设置拖拽时的重影图像（使其看起来更好看，不包含多余背景）
    // e.dataTransfer.setDragImage(target.closest('tr') as Element, 0, 0)
  }
}

function handleDragOver(e: DragEvent) {
  // 必须阻止默认行为才能触发 drop
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
}

function handleDrop(index: number) {
  if (dragStartIndex.value === null || dragStartIndex.value === index)
    return

  // 移动数组元素
  const draggedItem = myVolunteers.value[dragStartIndex.value]
  // 1. 删除原位置
  myVolunteers.value.splice(dragStartIndex.value, 1)
  // 2. 插入新位置
  myVolunteers.value.splice(index, 0, draggedItem)

  // 触发结束事件
  handleDragEnd()

  dragStartIndex.value = null
}

function handleDragEnd() {
  console.warn('拖拽排序结束，当前志愿顺序ID:', myVolunteers.value.map(v => v.id))
  // 这里可以调用保存接口 API
}

function removeVolunteer(index: number) {
  myVolunteers.value.splice(index, 1)
}

function handleCreatePlan() {
  console.warn('点击新建方案')
  // 逻辑：弹出新建表单...
}

function handleEditPlan() {
  console.warn('点击修改方案信息')
  // 逻辑：修改当前方案的分数/选科等...
}

function handleSwitchPlan() {
  showSwitchModal.value = true
}

function handleExportPlan() {
  console.warn('点击导出当前方案')
}

// 切换到指定方案
function switchActivePlan(planId: string) {
  activePlanId.value = planId
  showSwitchModal.value = false
  console.warn('切换到了方案:', planId)
  // 逻辑：重新加载 myVolunteers 数据...
  // isLoading.value = true ...
}

function deletePlan(planId: string) {
  console.warn('删除方案:', planId)
  // 逻辑：删除API调用...
}
</script>

<template>
  <div>
    <!-- =========================================================
      1. 移动端提示层 (Phone View)
      逻辑：默认显示 (flex)，在 lg (1024px) 及以上屏幕隐藏
  ========================================================== -->
    <div class="w-full flex flex-col items-center justify-center bg-gray-50 p-8 text-center lg:hidden">
      <div class="max-w-sm w-full rounded-2xl bg-white p-8 shadow-lg">
        <!-- 图标 (手机) -->
        <div class="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 class="mb-2 text-xl text-slate-800 font-bold">
          请访问小程序
        </h3>
        <p class="mb-6 text-sm text-slate-500 leading-relaxed">
          当前页面包含大量数据表格，<br>为保证最佳体验，请在 PC 端浏览<br>或前往微信小程序查看。
        </p>

        <!-- 模拟一个小程序跳转按钮 -->
        <button
          class="w-full rounded-full bg-blue-600 py-2.5 text-sm text-white font-medium shadow-blue-200 shadow-md transition-colors hover:bg-blue-700"
        >
          打开微信小程序
        </button>
      </div>
    </div>

    <!-- =========================================================
         新增：左侧固定侧边栏
    ========================================================== -->
    <div
      class="fixed left-0 top-24 z-50 hidden w-15 flex-col select-none items-center border-r border-slate-200 rounded-lg bg-white py-8 shadow-lg lg:flex"
    >
      <!-- Logo 占位 -->
      <!-- <div class="mb-8">
        <div class="h-10 w-10 rounded-lg bg-blue-600"></div>
      </div> -->

      <div class="w-full flex flex-col gap-6 px-2">
        <button
          class="group flex flex-col items-center gap-1 rounded-lg p-2 transition-colors"
          :class="activePanel === 'market' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'"
          @click="activePanel = 'market'"
        >
          <div
            class="rounded-full p-2"
            :class="activePanel === 'market' ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-slate-200'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <span class="text-xs font-medium">模拟填报</span>
        </button>

        <button
          class="group flex flex-col items-center gap-1 rounded-lg p-2 transition-colors"
          :class="activePanel === 'my-volunteers' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'"
          @click="activePanel = 'my-volunteers'"
        >
          <div
            class="relative rounded-full p-2"
            :class="activePanel === 'my-volunteers' ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-slate-200'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <!-- 数量角标 -->
            <span
              v-if="myVolunteers.length > 0"
              class="absolute h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-[10px] text-white -right-1 -top-1"
            >
              {{ myVolunteers.length }}
            </span>
          </div>
          <span class="text-xs font-medium">我的志愿</span>
        </button>
      </div>
    </div>

    <div
      id="bPanel"
      class="mx-auto hidden h-screen max-w-7xl flex-col select-none px-4 text-slate-700 font-sans lg:flex lg:px-8 sm:px-6"
    >
      <!-- =========================================================
           Panel A: 模拟填志愿 (原有的市场列表)
           使用 v-show 控制显示
      ========================================================== -->
      <div v-show="activePanel === 'market'" class="h-full flex flex-col">
        <!-- 顶部筛选栏 (保持不变) -->
        <div class="mb-8 mt-8 rounded-lg bg-white p-6 shadow">
          <div class="grid grid-cols-1 select-none gap-6 lg:grid-cols-6">
            <!-- Top Toolbar -->
            <div class="lg:col-span-4">
              <FilterBar :sort-enabled="false" @change="handleDataChange" />
            </div>
          </div>
        </div>
        <div class="flex flex-shrink-0 space-x-2">
          <button
            v-for="tab in tabs" :key="tab.key"
            class="border-x border-t border-transparent rounded-t-md px-6 py-2 text-sm font-medium transition-colors duration-200"
            :class="[
              currentTab === tab.key
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-slate-600 hover:text-blue-500 border-slate-200',
            ]" @click="currentTab = tab.key"
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
                <th
                  class="sticky left-0 z-40 w-44 border-r border-slate-200 bg-slate-50 p-4 text-left shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]"
                >
                  招生院校
                </th>
                <th class="w-40 border-r border-slate-200 p-4">
                  招生专业
                </th>
                <th class="w-32 border-r border-slate-200 p-4">
                  录取概率
                </th>
                <th class="w-24 border-r border-slate-200 p-4">
                  25省内<br>招生
                </th>
                <!-- 假设中间有很多历年数据列，撑开宽度 -->
                <th class="w-20 border-r border-slate-200 p-4">
                  历年
                </th>
                <th class="w-32 border-r border-slate-200 p-4">
                  2024
                </th>
                <th class="w-32 border-r border-slate-200 p-4">
                  2023
                </th>
                <th class="w-32 border-r border-slate-200 p-4">
                  2022
                </th>
                <!-- 右侧冻结列：操作 -->
                <th
                  class="sticky right-0 z-40 w-40 border-l border-slate-200 bg-slate-50 p-4 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]"
                >
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
                  <td
                    rowspan="4"
                    class="sticky left-0 z-20 border-r border-slate-200 bg-white p-4 align-top shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] group-hover:bg-slate-50"
                  >
                    <div class="mb-1 w-56 truncate text-left text-base text-slate-900 font-bold" :title="school.name">
                      {{ school.name }}
                    </div>
                    <div class="mb-2 flex flex-wrap gap-1 text-xs text-slate-500">
                      <span v-for="tag in school.tags" :key="tag" class="rounded bg-slate-100 px-1 py-0.5">{{ tag
                      }}</span>
                    </div>
                    <div class="text-left text-xs text-slate-400">
                      代码 {{ school.code }}
                    </div>
                  </td>

                  <!-- 中间普通滚动列 -->

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

                  <td
                    rowspan="4"
                    class="border-r border-slate-100 bg-white p-4 text-center align-top group-hover:bg-slate-50"
                  >
                    <div class="mb-2 text-lg font-bold">
                      {{ school.probability }}%
                    </div>
                    <div class="mb-2 flex justify-center">
                      <div
                        class="h-8 w-8 flex items-center justify-center border-2 rounded-full text-xs font-bold"
                        :class="getStatusColor(school.statusLabel)"
                      >
                        {{ school.statusLabel }}
                      </div>
                    </div>
                  </td>

                  <td
                    rowspan="4"
                    class="border-r border-slate-100 bg-white p-4 text-center align-top group-hover:bg-slate-50"
                  >
                    <div class="text-lg font-medium">
                      {{ school.planCount }}人
                    </div>
                  </td>

                  <!-- 历年数据区域 (横向较宽) -->
                  <td
                    class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500"
                  >
                    招生人数
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                    {{ school.history["2024"]?.count || "-" }}
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                    -
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                    -
                  </td>
                  <!-- Sticky Right: 操作 -->
                  <td
                    rowspan="4"
                    class="sticky right-0 z-20 border-l border-slate-200 bg-white p-4 text-center align-middle shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] group-hover:bg-slate-50"
                  >
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
                  <td
                    class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500"
                  >
                    最低分数
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-sm font-medium">
                    {{ school.history["2024"]?.minScore || "-" }}
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2" />
                  <td class="border-r border-slate-100 px-2 py-2" />
                </tr>

                <!-- Row 3: 历年线差 -->
                <tr class="group hover:bg-slate-50">
                  <td
                    class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500"
                  >
                    历年线差
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-sm">
                    {{ school.history["2024"]?.diff || "-" }}
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2" />
                  <td class="border-r border-slate-100 px-2 py-2" />
                </tr>

                <!-- Row 4: 录取方式 -->
                <tr class="group border-b border-slate-200 hover:bg-slate-50">
                  <td
                    class="h-10 border-r border-slate-100 bg-slate-50/50 px-2 py-2 text-center text-xs text-slate-500"
                  >
                    录取方式
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2 text-center text-xs text-slate-600">
                    {{ school.history["2024"]?.method || "-" }}
                  </td>
                  <td class="border-r border-slate-100 px-2 py-2" />
                  <td class="border-r border-slate-100 px-2 py-2" />
                </tr>
              </template>

              <!-- 加载状态条 -->
              <tr v-if="isLoading || isFinished">
                <td colspan="100%" class="sticky left-0 bg-slate-50 p-4 text-center text-sm text-slate-500">
                  <span v-if="isLoading" class="flex items-center justify-center gap-2">
                    <svg
                      class="h-5 w-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path
                        class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    正在加载更多数据...
                  </span>
                  <span v-else-if="isFinished">没有更多数据了</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- =========================================================
           Panel B: 我的志愿表 (新增)
           v-show="activePanel === 'my-volunteers'"
      ========================================================== -->
      <div v-show="activePanel === 'my-volunteers'" class="h-full flex flex-col animate-fade-in-up">
        <div
          class="mb-6 mt-8 flex flex-col gap-4 rounded-lg bg-white p-6 shadow lg:flex-row lg:items-center lg:justify-between"
        >
          <!-- 左侧：标题与统计 -->
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-2xl text-slate-800 font-bold">
                {{ volunteerPlans.find(p => p.id === activePlanId)?.name || '未命名方案' }}
              </h2>
              <span class="border border-orange-100 rounded bg-orange-50 px-2 py-0.5 text-xs text-orange-500">
                {{ volunteerPlans.find(p => p.id === activePlanId)?.tag || '手动' }}
              </span>
            </div>
            <p class="mt-2 text-sm text-slate-500">
              拖拽左侧手柄可调整顺序，共 <span class="text-blue-600 font-bold">{{ myVolunteers.length }}</span> 个志愿
            </p>
          </div>

          <!-- 右侧：功能按钮组 -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- 新建 -->
            <button
              class="flex items-center gap-1.5 border border-transparent rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
              @click="handleCreatePlan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              新建
            </button>

            <!-- 修改 -->
            <button
              class="flex items-center gap-1.5 border border-transparent rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
              @click="handleEditPlan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              修改
            </button>

            <!-- 切换 (点击触发弹窗) -->
            <button
              class="flex items-center gap-1.5 border border-transparent rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
              @click="handleSwitchPlan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              切换
            </button>

            <!-- 导出 -->
            <button
              class="flex items-center gap-1.5 border border-transparent rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-blue-600"
              @click="handleExportPlan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              导出
            </button>

            <!-- 提交按钮 (突出显示) -->
            <div class="mx-1 h-6 w-px bg-slate-200" />
            <button
              class="ml-1 rounded bg-blue-600 px-5 py-2 text-sm text-white font-medium shadow-md transition-all active:scale-95 hover:bg-blue-700"
            >
              提交志愿表
            </button>
          </div>
        </div>

        <div class="flex flex-shrink-0 space-x-2">
          <button
            v-for="tab in volunteerTabs" :key="tab.key"
            class="border-x border-t border-transparent rounded-t-md px-6 py-2 text-sm font-medium transition-colors duration-200"
            :class="[
              volunteerCurrentTab === tab.key
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-slate-600 hover:text-blue-500 border-slate-200',
            ]" @click="switchVolunteerTab(tab.key)"
          >
            {{ tab.label }} <span class="ml-1 opacity-90">({{ `${tab.count}/${tab.max}` }})</span>
          </button>
        </div>
        <div
          class="relative flex-1 overflow-auto scroll-smooth border border-slate-200 rounded-b-md bg-white shadow-sm"
        >
          <table class="w-full border-collapse text-sm">
            <thead class="sticky top-0 z-30 bg-slate-50 text-slate-500 font-medium shadow-sm">
              <tr>
                <th class="w-16 border-r border-slate-200 p-4 text-center">
                  排序
                </th>
                <th class="w-20 border-r border-slate-200 p-4 text-center">
                  序号
                </th>
                <th class="border-r border-slate-200 p-4 text-left">
                  院校信息
                </th>
                <th class="border-r border-slate-200 p-4 text-left">
                  专业信息
                </th>
                <th class="border-r border-slate-200 p-4 text-center">
                  概率/分数
                </th>
                <th class="border-r border-slate-200 p-4 text-center">
                  25省内招生
                </th>
                <th class="w-32 p-4 text-center">
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr
                v-for="(vol, index) in myVolunteers" :key="vol.id"
                class="group bg-white transition-colors hover:bg-slate-50" :draggable="dragEnabledIndex === index"
                @dragstart="handleDragStart($event, index)" @dragover="handleDragOver($event)"
                @drop="handleDrop(index)"
              >
                <!-- 拖拽手柄列 -->
                <td
                  class="cursor-move cursor-move border-r border-slate-200 p-4 text-center text-slate-400 active:text-blue-700 hover:text-blue-500" @mouseenter="dragEnabledIndex = index"
                  @mouseleave="dragEnabledIndex = null"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg" class="pointer-events-none mx-auto h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                  </svg>
                </td>

                <!-- 志愿序号 -->
                <td class="border-r border-slate-200 p-4 text-center text-lg text-slate-500 font-bold">
                  {{ index + 1 }}
                </td>

                <!-- 院校信息 -->
                <td class="border-r border-slate-200 p-4 text-left">
                  <div class="text-base text-slate-900 font-bold">
                    {{ vol.name }}
                  </div>
                  <div class="mt-1 flex gap-2">
                    <span
                      v-for="tag in vol.tags" :key="tag"
                      class="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500"
                    >{{ tag }}</span>
                  </div>
                  <div class="mt-1 text-xs text-slate-400">
                    代码: {{ vol.code }}
                  </div>
                </td>

                <!-- 专业信息 -->
                <td class="border-r border-slate-200 p-4">
                  <div class="text-slate-800 font-bold">
                    {{ vol.majorName }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    {{ vol.requirements }} | {{ vol.tuition }}
                  </div>
                  <div class="text-xs text-slate-400">
                    代码: {{ vol.majorCode }}
                  </div>
                </td>

                <!-- 分数/概率 -->
                <td class="border-r border-slate-200 p-4 text-center">
                  <div class="text-lg text-blue-600 font-bold">
                    {{ vol.probability }}%
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    最低 {{ vol.calcScore }}分
                  </div>
                  <div
                    class="mt-1 inline-block border rounded px-2 py-0.5 text-xs"
                    :class="getStatusColor(vol.statusLabel)"
                  >
                    {{ vol.statusLabel }}
                  </div>
                </td>

                <!-- 25省内招生 -->
                <td class="border-r border-slate-200 p-4 text-center">
                  <div class="text-lg font-bold">
                    {{ vol.planCount }}人
                  </div>
                </td>

                <!-- 操作：移除 -->
                <td class="p-4 text-center">
                  <button
                    class="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                    title="移除此志愿"
                    @click="removeVolunteer(index)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- 空状态 -->
              <tr v-if="myVolunteers.length === 0">
                <td colspan="6" class="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                  <div class="mb-3 rounded-full bg-slate-100 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-300" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p>暂无志愿，请前往“模拟填报”添加</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Panel B End -->
    </div>
    <!-- =========================================================
        弹窗层 (Modal) - 重点更新区域
  ========================================================== -->
    <Teleport to="body">
      <div
        v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <!-- 宽度加宽至 1100px 以容纳更多列 -->
        <div
          class="h-[85vh] w-[1100px] flex flex-col animate-fade-in-up overflow-hidden rounded-lg bg-white shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div>
              <div class="flex items-end gap-3">
                <h3 class="text-xl text-slate-800 font-bold">
                  {{ currentSchool?.name }}
                </h3>
                <span class="text-sm text-slate-500">院校代码: {{ currentSchool?.code }}</span>
              </div>
              <p class="mt-1 text-xs text-slate-500">
                该院校下符合您选科要求的其他专业列表
              </p>
            </div>
            <button class="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600" @click="closeModal">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content: Table -->
          <div class="flex-1 overflow-auto bg-slate-50 p-0">
            <table class="w-full border-collapse text-left text-sm">
              <thead
                class="sticky top-0 z-10 bg-slate-100 text-xs text-slate-500 font-semibold tracking-wider uppercase shadow-sm"
              >
                <tr>
                  <th class="w-16 px-6 py-3">
                    代码
                  </th>
                  <th class="px-6 py-3">
                    专业名称 / 选科 / 学费
                  </th>
                  <th class="px-6 py-3 text-center">
                    录取概率
                  </th>
                  <th class="px-6 py-3 text-center">
                    24年最低分
                  </th>
                  <th class="px-6 py-3 text-center">
                    24年线差
                  </th>
                  <th class="px-6 py-3 text-center">
                    招生计划
                  </th>
                  <th
                    class="sticky right-0 bg-slate-100 px-6 py-3 text-center shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]"
                  >
                    加入志愿
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-100">
                <tr v-if="modalLoading">
                  <td colspan="7" class="p-12 text-center text-slate-400">
                    <svg class="mx-auto mb-2 h-8 w-8 animate-spin text-blue-400" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z" opacity="0.2" />
                      <path fill="currentColor" d="M12 2A10 10 0 0 1 22 12h-2a8 8 0 0 0-8-8V2Z" />
                    </svg>
                    正在获取专业数据...
                  </td>
                </tr>
                <tr
                  v-for="major in modalMajors" v-else :key="major.code"
                  class="group transition-colors hover:bg-blue-50/30"
                >
                  <td class="px-6 py-4 text-xs text-slate-400 font-mono">
                    {{ major.code }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-base text-slate-800 font-bold">
                      {{ major.name }}
                    </div>
                    <div class="mt-1 flex gap-2 text-xs text-slate-500">
                      <span class="rounded bg-slate-100 px-1.5 py-0.5">{{
                        major.req
                      }}</span>
                      <span class="rounded bg-slate-100 px-1.5 py-0.5">{{
                        major.tuition
                      }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-bold" :class="major.prob >= 80 ? 'text-green-600' : 'text-orange-500'
                      "
                    >{{ major.prob }}%</span>
                  </td>
                  <td class="px-6 py-4 text-center font-medium">
                    {{ major.score }}
                  </td>
                  <td class="px-6 py-4 text-center text-slate-500">
                    {{ major.diff }}
                  </td>
                  <td class="px-6 py-4 text-center text-slate-500">
                    {{ major.plan }}人
                  </td>

                  <!-- 操作列：加入/移除 -->
                  <td
                    class="sticky right-0 bg-white px-6 py-4 text-center shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/30"
                  >
                    <button
                      class="min-w-[90px] rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                      :class="[
                        selectedMajorCodes.includes(major.code)
                          ? 'bg-red-50 text-red-500 border border-red-200 hover:bg-red-100' // 选中状态：红色，显示志愿序号
                          : 'bg-white text-blue-600 border border-blue-500 hover:bg-blue-50', // 未选状态：蓝色
                      ]" @click="toggleMajor(major)"
                    >
                      {{ getVolunteerBtnText(major.code) }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer: Confirm with Popover -->
          <div class="relative flex items-center justify-between border-t border-slate-200 bg-white p-4">
            <div class="text-sm text-slate-500">
              已选
              <span class="text-lg text-blue-600 font-bold">{{
                selectedMajorCodes.length
              }}</span>
              个志愿
            </div>

            <div class="relative flex gap-3">
              <button class="px-5 py-2 text-sm text-slate-600 hover:text-slate-900" @click="closeModal">
                取消
              </button>

              <!--
              气泡确认框 (Popconfirm) 实现逻辑
              如果不想封装组件，这种 inline 方式最简单
            -->
              <div class="relative">
                <!-- 主按钮 -->
                <w-popconfirm
                  title="底部右对齐" placement="top-right" :ok-button-props="{ loading: isSaving }"
                  @confirm="saveVolunteers"
                >
                  <button
                    :disabled="isSaving"
                    class="rounded bg-blue-600 px-6 py-2 text-sm text-white font-medium shadow-md transition-colors disabled:cursor-not-allowed hover:bg-blue-700 disabled:opacity-50"
                  >
                    确认保存
                  </button>
                  <!-- Slots -->
                  <template #icon>
                    <span class="text-xl">🎉</span>
                  </template>
                  <template #title>
                    <span class="text-purple-600">确认要保存吗？</span>
                  </template>
                  <template #description>
                    这里可以放很长很长的<br>HTML内容哦。
                  </template>
                </w-popconfirm>

                <!-- 气泡层 -->
                <div
                  v-if="showSaveConfirm"
                  class="absolute bottom-full right-0 z-50 mb-3 w-64 animate-fade-in-up border border-slate-200 rounded-lg bg-white p-4 shadow-xl"
                >
                  <!-- 小三角 -->
                  <div
                    class="absolute right-6 h-3 w-3 rotate-45 border-b border-r border-slate-200 bg-white -bottom-1.5"
                  />

                  <div class="mb-3 flex items-start gap-3">
                    <div class="mt-0.5 text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-800 font-bold">
                        确认提交志愿？
                      </p>
                      <p class="mt-1 text-xs text-slate-500">
                        提交后将更新您的志愿表，已选
                        {{ selectedMajorCodes.length }} 个专业。
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button
                      class="rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
                      @click="showSaveConfirm = false"
                    >
                      再想想
                    </button>
                    <button
                      class="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      :disabled="isSaving" @click="saveVolunteers"
                    >
                      <span
                        v-if="isSaving"
                        class="h-3 w-3 animate-spin border-2 border-white/30 border-t-white rounded-full"
                      />
                      {{ isSaving ? "保存中" : "确定" }}
                    </button>
                  </div>
                </div>
              </div>
              <!-- End of Popconfirm -->
            </div>
          </div>
        </div>
      </div>

      <!-- =========================================================
     方案切换模态框 (新增)
========================================================== -->
      <div
        v-if="showSwitchModal"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showSwitchModal = false"
      >
        <div
          class="max-h-[80vh] w-[1000px] flex flex-col animate-fade-in-up overflow-hidden rounded-lg bg-white shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h3 class="text-lg text-slate-800 font-bold">
              我的志愿方案
            </h3>

            <!-- 简单的关闭按钮 -->
            <button class="text-slate-400 hover:text-slate-600" @click="showSwitchModal = false">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Toolbar / Filter -->
          <div class="flex justify-end border-b border-slate-100 bg-slate-50 px-6 py-3">
            <div class="relative">
              <select
                class="appearance-none border border-slate-300 rounded bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>请选择省份</option>
                <option>北京</option>
                <option>湖北</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="flex-1 overflow-auto p-6">
            <table class="w-full border border-slate-200 text-left text-sm">
              <thead class="bg-slate-50 text-slate-500">
                <tr>
                  <th class="border-b border-r border-slate-200 px-4 py-3 font-medium">
                    名称
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    省份
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    艺术类别
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    文化分
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    统考分
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    最后更新时间
                  </th>
                  <th class="border-b border-r border-slate-200 px-4 py-3 text-center font-medium">
                    状态
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3 text-center font-medium">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="plan in volunteerPlans" :key="plan.id" class="transition-colors hover:bg-slate-50">
                  <td class="border-r border-slate-100 px-4 py-3">
                    <div class="flex items-center gap-2">
                      <span class="text-slate-700 font-medium">{{ plan.name }}</span>
                      <span
                        class="rounded px-1.5 py-0.5 text-[10px]"
                        :class="plan.tag === '手动' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'"
                      >
                        {{ plan.tag }}
                      </span>
                    </div>
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center text-slate-600">
                    {{ plan.province }}
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center text-slate-600">
                    {{ plan.artType }}
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center">
                    <span class="text-slate-800 font-medium">{{ plan.cultureScore }}</span>
                    <span class="ml-1 text-xs text-slate-400">{{ plan.cultureSubjects }}</span>
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center text-slate-800 font-medium">
                    {{
                      plan.artScore }}
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center text-xs text-slate-500 font-mono">
                    {{
                      plan.updateTime }}
                  </td>
                  <td class="border-r border-slate-100 px-4 py-3 text-center text-slate-600">
                    {{ plan.status }}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <!-- 当前选中状态 -->
                      <span v-if="activePlanId === plan.id" class="text-xs text-orange-500 font-bold">当前</span>
                      <!-- 切换按钮 -->
                      <button
                        v-else class="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        @click="switchActivePlan(plan.id)"
                      >
                        切换
                      </button>
                      <span class="text-slate-300">|</span>
                      <button class="text-xs text-slate-600 hover:text-slate-900 hover:underline">
                        导出
                      </button>
                      <span class="text-slate-300">|</span>
                      <button
                        class="text-xs text-slate-600 hover:text-red-600 hover:underline"
                        @click="deletePlan(plan.id)"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
