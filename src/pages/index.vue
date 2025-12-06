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

// Form state
const examType = ref('历史组') // 默认选中历史组
const selectedElectives = ref<string[]>([]) // 选考科目，最多2项
const majorCategory = ref('') // 专业类别
const selectedSubMajors = ref<string[]>([]) // 专业选课

// Form validation
const errors = ref({
  examType: '',
  electives: '',
  majorCategory: '',
  subMajors: '',
  scores: {
    unified: '',
    culture: '',
    chinese: '',
    english: '',
  },
})

// Score inputs
const scores = ref({
  unified: '', // 统考成绩/主项成绩
  culture: '', // 文化成绩
  chinese: '', // 语文成绩
  english: '', // 英语成绩
})

// Elective options (4选2)
const electiveOptions = [
  { label: '地理', value: '地理' },
  { label: '政治', value: '政治' },
  { label: '化学', value: '化学' },
  { label: '生物', value: '生物' },
]

// Major category options
const majorCategoryOptions = [
  { label: '美术与设计类', value: '美术与设计类' },
  { label: '播音与主持类', value: '播音与主持类' },
  { label: '表演类', value: '表演类' },
  { label: '音乐类', value: '音乐类' },
  { label: '舞蹈类', value: '舞蹈类' },
  { label: '书法类', value: '书法类' },
  { label: '戏曲类', value: '戏曲类' },
  { label: '体育类', value: '体育类' },
]

// Sub-major options based on major category
function getSubMajorOptions() {
  switch (majorCategory.value) {
    case '表演类':
      return [
        { label: '服装表演', value: '服装表演' },
        { label: '戏剧影视导演', value: '戏剧影视导演' },
        { label: '戏剧影视表演', value: '戏剧影视表演' },
      ]
    case '音乐类':
      return [
        { label: '音乐表演声乐', value: '音乐表演声乐', disabled: selectedSubMajors.value.includes('音乐表演器乐') },
        { label: '音乐表演器乐', value: '音乐表演器乐', disabled: selectedSubMajors.value.includes('音乐表演声乐') },
        { label: '音乐教育', value: '音乐教育' },
      ]
    default:
      return []
  }
}

// Handle elective selection (最多2项)
function handleElectiveChange(value: string) {
  const index = selectedElectives.value.indexOf(value)
  if (index === -1) {
    if (selectedElectives.value.length < 2) {
      selectedElectives.value.push(value)
    }
  }
  else {
    selectedElectives.value.splice(index, 1)
  }
  validateForm()
}

function handleMajorCategoryChange(val: any) {
  console.debug('handleMajorCategoryChange', val)
  majorCategory.value = val
  selectedSubMajors.value = [] // 清空专业选课
}

// Handle sub-major selection
function handleSubMajorChange(val: any) {
  console.debug('handleSubMajorChange', val)
}
// function handleSubMajorChange(value: string) {
//   const index = selectedSubMajors.value.indexOf(value)
//   if (index === -1) {
//     selectedSubMajors.value.push(value)
//   }
//   else {
//     selectedSubMajors.value.splice(index, 1)
//   }
//   validateForm()
// }

// Validate form
function validateForm() {
  // Reset errors
  errors.value = {
    examType: '',
    electives: '',
    majorCategory: '',
    subMajors: '',
    scores: {
      unified: '',
      culture: '',
      chinese: '',
      english: '',
    },
  }

  // Validate exam type
  if (!examType.value) {
    errors.value.examType = '请选择考试类型'
  }

  // Validate electives (至少1项？需求中没说，但最多2项)
  if (selectedElectives.value.length === 0) {
    errors.value.electives = '请选择至少1门选考科目'
  }

  // Validate major category
  if (!majorCategory.value) {
    errors.value.majorCategory = '请选择专业类别'
  }

  // Validate subMajors based on major category
  if (majorCategory.value === 'performance') {
    // No specific minimum mentioned
  }
  else if (majorCategory.value === 'music') {
    // Must choose at least one of vocal or instrumental
    const hasVocalOrInstrumental = selectedSubMajors.value.some(item =>
      item === 'vocal' || item === 'instrumental',
    )
    if (!hasVocalOrInstrumental) {
      errors.value.subMajors = '音乐类必须选择声乐或器乐'
    }
  }

  // Validate scores
  if (scores.value.unified) {
    const unifiedScore = Number(scores.value.unified)
    if (Number.isNaN(unifiedScore) || unifiedScore < 0 || unifiedScore > 300) {
      errors.value.scores.unified = '统考成绩必须在0-300之间'
    }
  }

  if (scores.value.culture) {
    const cultureScore = Number(scores.value.culture)
    const maxCultureScore = majorCategory.value === 'sports' ? 150 : 300
    if (Number.isNaN(cultureScore) || cultureScore < 0 || cultureScore > maxCultureScore) {
      errors.value.scores.culture = `文化成绩必须在0-${maxCultureScore}之间`
    }
  }

  if (scores.value.chinese) {
    const chineseScore = Number(scores.value.chinese)
    if (Number.isNaN(chineseScore) || chineseScore < 0 || chineseScore > 150) {
      errors.value.scores.chinese = '语文成绩必须在0-150之间'
    }
  }

  if (scores.value.english) {
    const englishScore = Number(scores.value.english)
    if (Number.isNaN(englishScore) || englishScore < 0 || englishScore > 150) {
      errors.value.scores.english = '英语成绩必须在0-150之间'
    }
  }

  // Return true if no errors
  return Object.values(errors.value).every(error =>
    (typeof error === 'string' && error === '')
    || (typeof error === 'object' && Object.values(error).every(subError => subError === '')),
  )
}

// Form submission
function handleSubmit() {
  if (validateForm()) {
    // Form is valid, submit data
    console.log('Form submitted:', {
      examType: examType.value,
      selectedElectives: selectedElectives.value,
      majorCategory: majorCategory.value,
      selectedSubMajors: selectedSubMajors.value,
      scores: scores.value,
    })
    console.log('表单提交成功！')
  }
}

// Carousel images
const carouselImages = [
  {
    id: 1,
    imageUrl: 'https://mp-7a4eecb1-2a04-4d36-b050-1c4a78cc31a4.cdn.bspapp.com/images/web-bakground/20250619212930.png',
    linkUrl: '/simulate',
    altText: '艺术考生',
  },
  {
    id: 2,
    imageUrl: 'https://mp-7a4eecb1-2a04-4d36-b050-1c4a78cc31a4.cdn.bspapp.com/images/web-bakground/20250619212921.jpg',
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
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 lg:px-8 sm:px-6">
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
              class="h-3 w-3 rounded-full bg-white/70 hover:bg-white focus:outline-none"
              :class="index === currentSlide ? 'opacity-100' : 'opacity-50'"
              @click="goToSlide(index)"
            >
              <span class="sr-only">Slide {{ index + 1 }}</span>
            </button>
          </div>
          <!-- Previous/Next buttons -->
          <button
            class="absolute left-4 top-1/2 transform rounded-full bg-white/50 p-2 text-gray-800 -translate-y-1/2 hover:bg-white focus:outline-none"
            @click="prevSlide"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            class="absolute right-4 top-1/2 transform rounded-full bg-white/50 p-2 text-gray-800 -translate-y-1/2 hover:bg-white focus:outline-none"
            @click="nextSlide"
          >
            <span class="sr-only">Next</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium">考试类型</label>
              <div class="flex gap-4">
                <w-radio-group v-model="examType" size="small">
                  <w-radio-button value="历史组" label="历史组" />
                  <w-radio-button value="物理组" label="物理组" />
                </w-radio-group>
              </div>
            </div>
            <!-- Elective Subjects (4选2) -->
            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium">选考科目</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="option in electiveOptions"
                  :key="option.value"
                  class="border rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  :class="selectedElectives.includes(option.value)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'"
                  @click="handleElectiveChange(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
              <div v-if="errors.electives" class="mt-2 text-sm text-red-600">
                {{ errors.electives }}
              </div>
            </div>

            <!-- Major Category -->
            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium">专业类别</label>
              <div class="flex" gap-4>
                <w-select
                  v-model:value="majorCategory"
                  placeholder="请选择专业类别"
                  :options="majorCategoryOptions"
                  @change="handleMajorCategoryChange"
                />
              </div>
              <div v-if="errors.majorCategory" class="mt-2 text-sm text-red-600">
                {{ errors.majorCategory }}
              </div>
            </div>

            <!-- Sub-major Category (条件显示) -->
            <div v-if="majorCategory === '表演类' || majorCategory === '音乐类'" class="mb-6">
              <label class="mb-2 block text-sm font-medium">
                {{ majorCategory === '表演类' ? '表演类' : '音乐类' }}专业选课
              </label>
              <div class="flex gap-4">
                <w-select
                  v-model:value="selectedSubMajors"
                  mode="multiple"
                  placeholder="请选择技术栈..."
                  :max-tag-count="2"
                  :max-select-count="2"
                  :options="getSubMajorOptions()"
                  @change="handleSubMajorChange"
                />
              </div>
              <div v-if="errors.subMajors" class="mt-2 text-sm text-red-600">
                {{ errors.subMajors }}
              </div>
            </div>

            <!-- Scores Section -->
            <div class="mb-6">
              <h3 class="mb-3 text-sm font-semibold">
                成绩输入
              </h3>

              <!-- Unified Exam Score -->
              <div class="mb-4">
                <label class="mb-2 block text-sm font-medium">
                  {{ majorCategory === '音乐类' ? '主项成绩' : '统考成绩' }}
                </label>
                <input
                  v-model="scores.unified"
                  type="number"
                  min="0"
                  :max="majorCategory === '体育类' ? 150 : 300"
                  :placeholder="majorCategory === '体育类' ? '0-150' : '0-300'"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <div v-if="errors.scores.unified" class="mt-2 text-sm text-red-600">
                  {{ errors.scores.unified }}
                </div>
              </div>

              <!-- Culture Score -->
              <div class="mb-4">
                <label class="mb-2 block text-sm font-medium">文化成绩</label>
                <input
                  v-model="scores.culture"
                  type="number"
                  min="0"
                  max="300"
                  placeholder="0-300"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <div v-if="errors.scores.culture" class="mt-2 text-sm text-red-600">
                  {{ errors.scores.culture }}
                </div>
              </div>

              <!-- Chinese & English Scores -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-2 block text-sm font-medium">语文成绩</label>
                  <input
                    v-model="scores.chinese"
                    type="number"
                    min="0"
                    max="150"
                    placeholder="0-150"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <div v-if="errors.scores.chinese" class="mt-2 text-sm text-red-600">
                    {{ errors.scores.chinese }}
                  </div>
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium">英语成绩</label>
                  <input
                    v-model="scores.english"
                    type="number"
                    min="0"
                    max="150"
                    placeholder="0-150"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <div v-if="errors.scores.english" class="mt-2 text-sm text-red-600">
                    {{ errors.scores.english }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              class="w-full rounded-full bg-blue-600 px-6 py-3 text-lg text-white font-semibold shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
              @click="handleSubmit"
            >
              确认
            </button>
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
</style>

<route lang="yaml">
meta:
  layout: home
</route>
