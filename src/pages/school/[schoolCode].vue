<script setup lang="ts">
import { computed, ref } from 'vue'

// --- 类型定义 ---
// interface StatItem {
//   label: string;
//   value: string | number;
//   icon?: string;
// }

interface Ranking {
  label: string
  value: number
  trend?: 'up' | 'down' | 'flat'
}

interface Major {
  college: string
  majors: string[]
}

// --- 状态数据 ---
const route = useRoute('/school/[schoolCode]')
const schoolCode = ref('')

const activeLocationTab = ref('唐岛湾校区')

// 基础信息数据
// const stats: StatItem[] = [
//   { label: '建校时间', value: '1953年', icon: '📅' },
//   { label: '占地面积', value: '5000亩', icon: '⛳' },
//   { label: '主管部门', value: '教育部', icon: '🏛️' },
//   { label: '博士点', value: '16个', icon: '🎓' },
//   { label: '硕士点', value: '33个', icon: '📜' },
//   { label: '国家重点学科', value: '5个', icon: '⭐' },
// ];

const rankings: Ranking[] = [
  { label: '软科综合', value: 67 },
  { label: '校友会综合', value: 80 },
  { label: 'US世界', value: 500 },
  { label: '人气值排名', value: 70 },
]

// 院系设置数据 (模拟部分)
const departments: Major[] = [
  { college: '地球科学与技术学院', majors: ['勘查技术与工程', '地质学', '资源勘查工程', '地球物理学'] },
  { college: '石油工程学院', majors: ['海洋油气工程', '石油工程', '碳储科学与工程'] },
  { college: '化学化工学院', majors: ['化学', '化学工程与工艺', '应用化学', '环境工程', '能源化学工程'] },
  { college: '机电工程学院', majors: ['安全工程', '工业设计', '智能制造工程', '机械设计制造及其自动化'] },
  { college: '储运与建筑工程学院', majors: ['土木工程', '工程力学', '建筑环境与能源应用工程', '油气储运工程'] },
]

// 校园配置数据
const facilities = [
  { name: '4人/间', icon: '🛏️' },
  { name: '5个食堂', icon: '🍚' },
  { name: '上床下桌', icon: '🪑' },
  { name: '独立卫浴', icon: '🚿' },
  { name: '有空调', icon: '❄️' },
  { name: '有游泳馆', icon: '🏊' },
]

// 模拟图片 (使用占位符)
const bgHeader = 'https://via.placeholder.com/1200x300/e6f2ff/0056b3?text=University+Header'
const sceneryImages = [
  'https://via.placeholder.com/300x200/ffedcc/e67e22?text=Scenery+1',
  'https://via.placeholder.com/300x200/d4edda/155724?text=Scenery+2',
  'https://via.placeholder.com/300x200/f8d7da/721c24?text=Scenery+3',
  'https://via.placeholder.com/300x200/cce5ff/004085?text=Scenery+4',
]

// 校区地址数据
const locationInfo = computed(() => {
  return activeLocationTab.value === '唐岛湾校区'
    ? { address: '山东省青岛市黄岛区长江西路66号', details: '附近3km内分布着 58个餐饮场所...' }
    : { address: '山东省东营市...', details: '老校区历史悠久...' }
})

watchEffect(() => {
  schoolCode.value = route.params.schoolCode
})
useHead({
  title: () => { return `${schoolCode.value}|艺体志愿宝` },
})
</script>

<template>
  <div class="mx-auto max-w-7xl min-h-screen bg-gray-50 px-4 transition-colors duration-300 dark:bg-slate-900 lg:px-8 sm:px-6">
    <!-- 顶部导航 & Header sticky -->
    <header class="top-0 z-50 shadow-sm">
      <div class="mb-8 mt-8 rounded-lg bg-white dark:bg-slate-800">
        <div class="h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-900 text-xs text-white font-bold">
              Logo
            </div>
            <div>
              <h1 class="text-xl text-gray-900 font-bold dark:text-white">
                中国石油大学（华东）
              </h1>
              <div class="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>公办</span><span>|</span><span>理工类</span><span>|</span><span>教育部直属</span>
              </div>
            </div>
            <!-- 标签 -->
            <div class="ml-4 hidden gap-1 md:flex">
              <span class="border border-orange-500 rounded px-1.5 py-0.5 text-xs text-orange-500">211</span>
              <span class="border border-orange-500 rounded px-1.5 py-0.5 text-xs text-orange-500">双一流</span>
            </div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="scrollbar-hide flex overflow-x-auto pb-2 text-sm text-gray-500 font-medium space-x-8 sm:pb-0 dark:text-gray-400">
          <a href="#" class="whitespace-nowrap border-b-2 border-orange-500 pb-3 text-orange-600 dark:text-orange-400">学校概况</a>
          <a href="#" class="whitespace-nowrap pb-3 hover:text-gray-700 dark:hover:text-gray-200">历年分数</a>
          <a href="#" class="whitespace-nowrap pb-3 hover:text-gray-700 dark:hover:text-gray-200">招生计划</a>
          <a href="#" class="whitespace-nowrap pb-3 hover:text-gray-700 dark:hover:text-gray-200">开设专业</a>
          <a href="#" class="whitespace-nowrap pb-3 hover:text-gray-700 dark:hover:text-gray-200">录取预测</a>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="mx-auto max-w-7xl px-4 py-6 lg:px-8 sm:px-6">
      <!-- 顶部 Banner 信息卡片 -->
      <div class="mb-6 overflow-hidden rounded-lg bg-white shadow dark:bg-slate-800">
        <!-- Banner 图片 -->
        <div class="relative h-48 bg-cover bg-center md:h-64" :style="{ backgroundImage: `url(${bgHeader})` }">
          <div class="absolute bottom-4 right-4 flex gap-2">
            <button class="rounded bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm hover:bg-black/70">
              📺 视频
            </button>
            <button class="rounded bg-white/90 px-3 py-1 text-sm text-gray-800 backdrop-blur-sm hover:bg-white">
              📷 校园风光
            </button>
          </div>
        </div>

        <!-- 快速统计信息栏 -->
        <div class="grid grid-cols-2 gap-4 border-b border-gray-100 p-3 md:grid-cols-5 sm:grid-cols-4 dark:border-slate-700">
          <div class="flex items-start gap-2">
            <div class="text-xl text-orange-500">
              🕒
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                建校时间
              </p>
              <p class="text-gray-900 font-medium dark:text-white">
                1953年
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="text-xl text-purple-500">
              ⛳
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                占地面积
              </p>
              <p class="text-gray-900 font-medium dark:text-white">
                5000亩
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="text-xl text-blue-500">
              🎓
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                主管部门
              </p>
              <p class="text-gray-900 font-medium dark:text-white">
                教育部
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="text-xl text-blue-500">
              📞
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                联系电话
              </p>
              <p class="text-gray-900 font-medium dark:text-white">
                0532-86983086
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="text-xl text-blue-500">
              📧
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                邮箱
              </p>
              <p class="text-gray-900 font-medium dark:text-white">
                zhaosheng@upc.edu.cn
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 网格布局：左侧主内容，右侧简单侧边栏(可选) -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <!-- 左侧/主体内容 (占3份宽度) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- 1. 基本信息模块 -->
          <section class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="border-l-4 border-orange-500 pl-3 text-lg text-gray-900 font-bold dark:text-white">
                基本信息
              </h2>
              <a href="#" class="text-xs text-gray-500 hover:text-orange-500">[详情]</a>
            </div>

            <p class="mb-6 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
              中国石油大学（华东）是教育部直属全国重点大学，是国家“211工程”重点建设和开展“985工程优势学科创新平台”建设并建有研究生院的高校之一。学校是教育部和五大能源企业集团公司、教育部和山东省人民政府共建的高校...
            </p>

            <!-- 排名与数据 -->
            <div class="mb-6 rounded-lg bg-orange-50 p-4 dark:bg-slate-700/50">
              <div class="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <div v-for="(rank, idx) in rankings" :key="idx" class="border-r border-orange-200 last:border-0 dark:border-slate-600">
                  <div class="text-xl text-orange-600 font-bold dark:text-orange-400">
                    {{ rank.value }}
                  </div>
                  <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {{ rank.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 地理位置 & 地图 -->
            <div class="overflow-hidden border border-gray-200 rounded-lg dark:border-slate-700">
              <div class="flex border-b border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-700">
                <button
                  v-for="tab in ['唐岛湾校区', '东营科教园区', '古镇口校区']" :key="tab"
                  class="px-4 py-2 text-sm transition-colors"
                  :class="activeLocationTab === tab ? 'bg-white dark:bg-slate-800 text-orange-500 border-t-2 border-orange-500' : 'text-gray-600 dark:text-gray-400'"
                  @click="activeLocationTab = tab"
                >
                  {{ tab }}
                </button>
              </div>
              <div class="h-64 flex flex-col md:flex-row">
                <!-- 模拟地图 -->
                <div class="group relative w-full flex items-center justify-center bg-blue-50 md:w-1/2 dark:bg-slate-900">
                  <span class="text-4xl text-blue-300">MAP</span>
                  <div class="absolute inset-0 bg-black/5 transition dark:bg-white/5 group-hover:bg-transparent" />
                  <div class="absolute bottom-2 right-2 rounded bg-white px-2 py-1 text-xs shadow dark:bg-slate-700">
                    地图详情 >
                  </div>
                </div>
                <!-- 地址详情 -->
                <div class="w-full flex flex-col justify-center p-4 md:w-1/2">
                  <h4 class="mb-2 flex items-center gap-2 text-gray-800 font-bold dark:text-white">
                    📍 {{ activeLocationTab }}
                  </h4>
                  <p class="mb-3 text-sm text-orange-500">
                    {{ locationInfo.address }}
                  </p>
                  <p class="text-xs text-gray-500 leading-relaxed dark:text-gray-400">
                    {{ locationInfo.details }}
                  </p>
                  <div class="mt-4 flex gap-4 text-center">
                    <div>
                      <div class="text-sm font-bold dark:text-white">
                        58
                      </div><div class="text-xs text-gray-400">
                        餐饮场所
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-bold dark:text-white">
                        27
                      </div><div class="text-xs text-gray-400">
                        酒店
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-bold dark:text-white">
                        7
                      </div><div class="text-xs text-gray-400">
                        购物中心
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 2. 院系设置模块 -->
          <section class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="border-l-4 border-orange-500 pl-3 text-lg text-gray-900 font-bold dark:text-white">
                院系设置
              </h2>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 text-xs text-gray-500 dark:bg-slate-700 dark:text-gray-400">
                  <tr>
                    <th class="w-1/4 px-4 py-3">
                      学院
                    </th>
                    <th class="px-4 py-3">
                      专业
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                  <tr v-for="(dept, idx) in departments" :key="idx" class="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td class="px-4 py-3 text-gray-900 font-medium dark:text-white">
                      {{ dept.college }}
                    </td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      <div class="flex flex-wrap gap-2">
                        <span v-for="major in dept.majors" :key="major" class="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-slate-600">
                          {{ major }} <span class="ml-1 text-gray-300">本科</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分页模拟 -->
            <div class="mt-4 flex justify-center gap-2 text-xs text-gray-500">
              <button class="px-2 py-1 hover:text-orange-500">
                首页
              </button>
              <button class="px-2 py-1 hover:text-orange-500">
                上一页
              </button>
              <button class="h-6 w-6 flex items-center justify-center rounded-full bg-orange-500 text-white">
                1
              </button>
              <button class="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                2
              </button>
              <button class="px-2 py-1 hover:text-orange-500">
                下一页
              </button>
            </div>
          </section>

          <!-- 3. 校园风光 -->
          <section class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="border-l-4 border-orange-500 pl-3 text-lg text-gray-900 font-bold dark:text-white">
                校园风光
              </h2>
              <a href="#" class="text-xs text-orange-500">更多 ></a>
            </div>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div v-for="(img, i) in sceneryImages" :key="i" class="group relative h-32 cursor-pointer overflow-hidden rounded-lg">
                <img :src="img" class="h-full w-full transform object-cover transition group-hover:scale-110" alt="scenery">
                <div class="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
              </div>
            </div>
          </section>

          <!-- 4. 校园配置 & 奖学金 (两列并排) -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- 校园配置 -->
            <section class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="border-l-4 border-orange-500 pl-3 text-lg text-gray-900 font-bold dark:text-white">
                  校园配置
                </h2>
                <!-- 简单下拉模拟 -->
                <span class="cursor-pointer rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-slate-700">唐岛湾校区 ▾</span>
              </div>

              <div class="grid grid-cols-3 mb-4 gap-4">
                <div v-for="item in facilities" :key="item.name" class="flex flex-col items-center rounded bg-gray-50 p-2 dark:bg-slate-700/30">
                  <span class="mb-1 text-2xl">{{ item.icon }}</span>
                  <span class="text-xs text-gray-600 dark:text-gray-300">{{ item.name }}</span>
                </div>
              </div>

              <div class="flex gap-2 overflow-x-auto pb-2">
                <div class="h-24 w-24 flex flex-shrink-0 items-center justify-center rounded bg-gray-200 text-xs text-gray-400 dark:bg-slate-700">
                  食堂图片
                </div>
                <div class="h-24 w-24 flex flex-shrink-0 items-center justify-center rounded bg-gray-200 text-xs text-gray-400 dark:bg-slate-700">
                  宿舍图片
                </div>
              </div>
            </section>

            <!-- 奖学金设置 -->
            <section class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="border-l-4 border-orange-500 pl-3 text-lg text-gray-900 font-bold dark:text-white">
                  奖学金设置
                </h2>
                <span class="text-xs text-gray-400">更新: 2024-06-18</span>
              </div>
              <div class="custom-scrollbar h-48 overflow-y-auto pr-2 text-sm text-gray-600 space-y-4 dark:text-gray-300">
                <div>
                  <h4 class="mb-1 text-gray-800 font-bold dark:text-gray-200">
                    奖学金设置
                  </h4>
                  <p class="text-xs leading-relaxed">
                    目前学校已经建立起以各类奖学金、助学金、助学贷款、勤工助学、困难补助为主体的多元化资助体系。
                  </p>
                </div>
                <div>
                  <h4 class="mb-1 text-gray-800 font-bold dark:text-gray-200">
                    困难资助办法
                  </h4>
                  <p class="text-xs leading-relaxed">
                    家庭经济特别困难的新生如暂时筹集不齐学费和住宿费，可在报到当天，通过学校开设的“绿色通道”办理入学手续。
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- 右侧侧边栏 (保留男女比例，其他已移除) -->
        <div class="hidden lg:col-span-1 lg:block space-y-6">
          <!-- 男女比例 -->
          <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
            <h3 class="mb-4 text-gray-900 font-bold dark:text-white">
              男女比例
            </h3>
            <div class="mb-2 flex items-end justify-between">
              <div class="text-xl text-blue-500 font-bold">
                ♂ 70.12%
              </div>
              <div class="text-xl text-pink-500 font-bold">
                ♀ 29.88%
              </div>
            </div>
            <!-- 进度条 -->
            <div class="h-2 w-full flex overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
              <div class="h-full bg-blue-500" style="width: 70%" />
              <div class="h-full bg-pink-500" style="width: 30%" />
            </div>
            <div class="mt-1 flex justify-between text-xs text-gray-400">
              <span>男生</span>
              <span>女生</span>
            </div>
          </div>

          <!-- 此处原有：毕业去向、分数推荐、留言板、高考工具箱等，均已移除 -->

          <!-- 占位：如果觉得右侧太空，可以放联系方式或者简单的文字链接 -->
          <div class="border border-blue-100 rounded-lg bg-blue-50 p-4 dark:border-slate-600 dark:bg-slate-700/50">
            <h4 class="mb-2 text-sm text-blue-800 font-bold dark:text-blue-300">
              招生办联系方式
            </h4>
            <p class="mb-1 text-xs text-gray-600 dark:text-gray-400">
              电话：0532-86983086
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              邮箱：zhaosheng@upc.edu.cn
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
}
</style>
