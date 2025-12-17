<!-- eslint-disable no-console -->
<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: '艺体志愿宝 - 专业的艺术体育类志愿填报辅助平台',
})

// User store for login status
const userStore = useUserStore()

const responseMenus = [
  {
    url: '/universities',
    label: '查大学',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',

    animationDelay: '0.1s',
    darkMode: true,
  },
  {
    url: '/majors',
    label: '查专业',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    animationDelay: '0.2s',
    darkMode: true,
  },
  {
    url: '/cutoff-scores',
    label: '省控线',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    animationDelay: '0.3s',
    darkMode: true,
  },
  {
    url: '/culture-test',
    label: '测文化',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    animationDelay: '0.4s',
    darkMode: true,
  },
  {
    url: '/rank-checker',
    label: '查位次',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    animationDelay: '0.5s',
    darkMode: true,
  },
  {
    url: '/calculator',
    label: '算投档',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    animationDelay: '0.6s',
    darkMode: true,
  },
  {
    url: '/sports-calculator',
    label: '体育计分器',
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 1.657 0 3 .895 3 2 0 1-1 2-1 2s1.5.5 2 1.5c.5 1 .5 2.5-.5 3.5zM10 11l2 2 4-4',
    animationDelay: '0.7s',
    darkMode: true,
  },
  {
    url: '/regulations',
    label: '招生章程',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    animationDelay: '0.8s',
    darkMode: true,
  },
]

// Carousel images
const carouselImages = [
  {
    id: 1,
    imageUrl: 'https://cdn.jsdelivr.net/gh/zwt13703/note-gen-image-sync@main/d7e9af38-9292-4e7a-bb24-9321c8e1b931.png',
    linkUrl: '/simulate',
    altText: '艺术考生',
  },
  {
    id: 2,
    imageUrl: 'https://cdn.jsdelivr.net/gh/zwt13703/note-gen-image-sync@main/13274cb8-2c88-452b-b70b-9ca4e603606a.jpeg',
    linkUrl: '/universities',
    altText: '体育考生',
  },
]

// Carousel state
const currentSlide = ref(0)
let carouselInterval: any

// Auto-play carousel
function startCarousel() {
  carouselInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselImages.length
  }, 5000)
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
}

// Navigation to previous slide
function prevSlide() {
  stopCarousel()
  currentSlide.value = (currentSlide.value - 1 + carouselImages.length) % carouselImages.length
  startCarousel()
}

// Navigation to next slide
function nextSlide() {
  stopCarousel()
  currentSlide.value = (currentSlide.value + 1) % carouselImages.length
  startCarousel()
}

// Navigation to specific slide
function goToSlide(index: number) {
  stopCarousel()
  currentSlide.value = index
  startCarousel()
}

// Start carousel on mount
onMounted(() => {
  startCarousel()
})

// Cleanup on unmount
onUnmounted(() => {
  stopCarousel()
})

// 招生章程数据
const admissionRegulations = ref([
  { title: '2025年艺术类本科招生章程', link: '/regulations/art-2025' },
  { title: '2025年体育类本科招生章程', link: '/regulations/sports-2025' },
  { title: '2025年音乐类专业招生章程', link: '/regulations/music-2025' },
  { title: '2025年舞蹈类专业招生章程', link: '/regulations/dance-2025' },
  { title: '2025年美术类专业招生章程', link: '/regulations/art-2025' },
])

// 高考动态数据
const examNews = ref([
  { title: '2025年高考政策解读', link: '/news/policy-2025' },
  { title: '艺术类招生趋势分析', link: '/news/art-trends' },
  { title: '体育类专业录取规则', link: '/news/sports-rules' },
  { title: '新高考选科指导', link: '/news/new-gaokao' },
  { title: '志愿填报技巧分享', link: '/news/volunteer-tips' },
])

// 热门院校数据
const popularSchools = ref([
  {
    name: '中央美术学院',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '美术学、设计学',
    tag: '艺术类名校',
    region: '省外本科', // 添加区域信息
  },
  {
    name: '北京体育大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '体育教育、运动训练',
    tag: '体育类名校',
    region: '省外本科', // 添加区域信息
  },
  {
    name: '中国音乐学院',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '音乐表演、音乐学',
    tag: '音乐类名校',
    region: '省外本科', // 添加区域信息
  },
  {
    name: '上海戏剧学院',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '表演、导演',
    tag: '艺术类名校',
    region: '省外本科', // 添加区域信息
  },
  {
    name: '河南大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '美术学、音乐学',
    tag: '河南名校',
    region: '河南本科', // 添加区域信息
  },
  {
    name: '郑州大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '体育教育、设计学',
    tag: '河南名校',
    region: '河南本科', // 添加区域信息
  },
  {
    name: '河南师范大学',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '音乐学、美术学',
    tag: '河南名校',
    region: '河南本科', // 添加区域信息
  },
  {
    name: '河南职业技术学院',
    logo: 'http://img1.youzy.cn/content/media/thumbs/p00026840.jpeg',
    major: '艺术设计、音乐表演',
    tag: '河南专科',
    region: '河南专科', // 添加区域信息
  },
])

// 区域过滤状态
const regionFilter = ref('全部') // 默认显示全部

// 区域选项
const regionOptions = [
  { label: '全部', value: '全部' },
  { label: '河南本科', value: '河南本科' },
  { label: '河南专科', value: '河南专科' },
  { label: '省外本科', value: '省外本科' },
  { label: '省外专科', value: '省外专科' },
]

// 根据区域过滤学校
const filteredSchools = computed(() => {
  if (regionFilter.value === '全部') {
    return popularSchools.value
  }
  return popularSchools.value.filter(school => school.region === regionFilter.value)
})
</script>

<template>
  <div class="mx-auto max-w-7xl select-none px-4 py-8 lg:px-8 sm:px-6">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <!-- Left Carousel (70% width on lg) -->
      <div class="lg:col-span-7">
        <div class="relative overflow-hidden rounded-2xl bg-white shadow-xl">
          <div class="relative aspect-video overflow-hidden">
            <!-- Carousel images -->
            <transition-group name="fade" tag="div">
              <div
                v-for="(image, index) in carouselImages"
                v-show="index === currentSlide"
                :key="image.id"
                class="absolute inset-0"
              >
                <a :href="image.linkUrl" class="block h-full w-full">
                  <img
                    :src="image.imageUrl"
                    :alt="image.altText"
                    class="h-full w-full object-cover"
                  >
                </a>
              </div>
            </transition-group>
          </div>

          <!-- Carousel navigation -->
          <div class="absolute bottom-4 left-1/2 flex transform -translate-x-1/2 space-x-2">
            <button
              v-for="(image, index) in carouselImages"
              :key="image.id"
              class="h-3 w-3 rounded-full bg-dark-1 hover:bg-dark-3 focus:outline-none"
              :class="index === currentSlide ? 'opacity-100' : 'opacity-50'"
              @click="goToSlide(index)"
            >
              <span class="sr-only">Slide {{ index + 1 }}</span>
            </button>
          </div>
          <!-- Previous/Next buttons -->
          <button
            class="absolute left-4 top-1/2 transform rounded-full bg-gray/20 p-2 text-gray-800 transition-all-300 -translate-y-1/2 hover:bg-gray focus:outline-none"
            @click="prevSlide"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            class="absolute right-4 top-1/2 transform rounded-full bg-gray/20 p-2 text-gray-800 transition-all-300 -translate-y-1/2 hover:bg-gray focus:outline-none"
            @click="nextSlide"
          >
            <span class="sr-only">Next</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Responsive Menu with 8 Functional Buttons -->
        <div class="grid grid-cols-2 mt-4 gap-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
          <a
            v-for="(menu, index) in responseMenus"
            :key="index"
            :href="menu.url"
            class="group relative flex flex-col transform animate-fade-in-up items-center justify-center border border-gray-100 rounded-xl bg-white p-4 text-gray-700 shadow-md transition-all duration-300 hover:border-blue-200 dark:text-light-700 group-hover:text-blue-800 hover:shadow-lg hover:-translate-y-1"
            :style="{ 'animation-delay': menu.animationDelay }"
            :class="{
              'dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-500': menu.darkMode,
            }"
            :aria-label="menu.label"
          >
            <div class="mb-2 h-12 w-12 flex items-center justify-center">
              <svg class="h-6 w-6 text-blue-600 transition-colors group-hover:text-blue-800" :class="{ 'dark:text-light': menu.darkMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="menu.icon" />
              </svg>
            </div>
            <span class="text-sm text-gray-700 font-medium group-hover:text-blue-800" :class="{ 'dark:text-light-700': menu.darkMode }"> {{ menu.label }} </span>
          </a>
        </div>
      </div>

      <!-- Right Form (30% width on lg) -->
      <div class="select-none lg:col-span-3">
        <div class="rounded-2xl bg-white p-6 text-gray-700 shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          <!-- Show different content based on login status -->
          <div v-if="!userStore.user">
            <div class="mb-4 text-center">
              <p class="mb-4 text-gray-600">
                请先登录，开始志愿填报
              </p>
              <button
                class="w-full rounded-full bg-blue-600 px-6 py-3 text-lg text-white font-semibold shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
                @click="$router.push('/login')"
              >
                登录
              </button>
            </div>
          </div>

          <div v-else>
            <score-form />
          </div>
        </div>
      </div>
    </div>

    <!-- 招生章程、高考动态和热门院校推荐部分 -->
    <div class="content-section mt-12 select-none">
      <div class="dual-column-layout mb-10">
        <div class="left-column border-r-2 border-r-gray-800 border-dashed pr-4 dark:border-r-gray-400">
          <h3 class="mb-4 text-xl text-gray-800 font-bold dark:text-white">
            招生章程
          </h3>
          <ul class="article-list space-y-2">
            <li v-for="(item, index) in admissionRegulations" :key="`reg-${index}`">
              <a :href="item.link" :title="item.title" class="block rounded-lg px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400">
                <div class="flex items-center">
                  <svg class="mr-2 h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="truncate">{{ item.title }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="right-column">
          <h3 class="mb-4 text-xl text-gray-800 font-bold dark:text-white">
            高考动态
          </h3>
          <ul class="article-list space-y-2">
            <li v-for="(item, index) in examNews" :key="`news-${index}`">
              <a :href="item.link" :title="item.title" class="block rounded-lg px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400">
                <div class="flex items-center">
                  <svg class="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="truncate">{{ item.title }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="popular-schools">
        <h3 class="mb-4 text-xl text-gray-800 font-bold dark:text-white">
          热门院校推荐
        </h3>

        <!-- 区域过滤器 -->
        <div class="region-filter mb-6">
          <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="选择院校区域">
            <button
              v-for="option in regionOptions"
              :key="option.value"
              class="region-filter-btn transform rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 aria-checked:bg-blue-600 aria-checked:text-white aria-checked:font-semibold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" :class="[
                regionFilter === option.value
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
              ]"
              :aria-checked="regionFilter === option.value"
              role="radio"
              @click="regionFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div class="school-grid grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          <div v-for="(school, index) in filteredSchools" :key="`school-${index}`" class="border border-gray-200 rounded-xl bg-white p-4 transition-all duration-300 dark:border-gray-700 hover:border-blue-300 dark:bg-gray-800 hover:shadow-lg dark:hover:border-blue-500 dark:hover:shadow-xl">
            <div class="flex">
              <div class="school-logo mr-4 h-16 w-16 flex-shrink-0">
                <img :src="school.logo" :alt="school.name" class="h-full w-full rounded-full object-contain">
              </div>
              <div class="school-info min-w-0 flex-1">
                <div class="school-name mb-1 truncate text-gray-800 font-bold dark:text-white" :title="school.name">
                  {{ school.name }}
                </div>
                <div class="school-major mb-2 truncate text-sm text-gray-600 dark:text-gray-400" :title="school.major">
                  热门专业：{{ school.major }}
                </div>
                <div class="flex items-center justify-between">
                  <span class="school-tag max-w-[80px] truncate rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300" :title="school.tag">{{ school.tag }}</span>
                  <button class="view-btn rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-blue-700">
                    查看院校
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Staggered animation for menu items */
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
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* 招生章程、高考动态和热门院校推荐部分样式 */
.dual-column-layout {
  display: flex;
  gap: 30px;
}

.left-column,
.right-column {
  flex: 1;
}

.article-list {
  list-style: none;
  padding: 0;
}

.article-list li {
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popular-schools h3 {
  margin-bottom: 20px;
}

.school-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.school-logo {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.school-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.school-info {
  flex: 1;
}

.school-name {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.school-major {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.school-tag {
  font-size: 12px;
  color: #888;
}

.view-btn {
  padding: 4px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .dual-column-layout {
    flex-direction: column;
  }

  .school-grid {
    grid-template-columns: 1fr;
  }
}

/* 区域过滤器样式 */
.region-filter-btn {
  position: relative;
  overflow: hidden;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  white-space: nowrap;
}

.region-filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.region-filter-btn:hover::before {
  left: 100%;
}

.region-filter-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* 为活动状态添加更明显的视觉效果 */
.region-filter-btn.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
