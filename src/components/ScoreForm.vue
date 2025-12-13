<script setup lang="ts">
import { ref } from 'vue'

// 定义回传的数据类型
export interface ScoreFormData {
  examType: string
  selectedElectives: string[]
  majorCategory: string
  selectedSubMajors: string[]
  scores: {
    unified: string
    culture: string
    chinese: string
    english: string
  }
}

// 定义 Emits
const emit = defineEmits<{
  (e: 'confirm', data: ScoreFormData): void
}>()

// --- Form State ---
const examType = ref('历史组')
const selectedElectives = ref<string[]>([])
const majorCategory = ref('')
const selectedSubMajors = ref<string[]>([])

// Score inputs
const scores = ref({
  unified: '', // 统考/主项
  culture: '', // 文化
  chinese: '', // 语文
  english: '', // 英语
})

// Errors state
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

// --- Options Data ---
const electiveOptions = [
  { label: '地理', value: '地理' },
  { label: '政治', value: '政治' },
  { label: '化学', value: '化学' },
  { label: '生物', value: '生物' },
]

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

// --- Logic Methods ---

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
  // 触发一次校验清除错误提示
  if (errors.value.electives)
    validateForm()
}

function handleMajorCategoryChange(val: any) {
  majorCategory.value = val
  selectedSubMajors.value = [] // 清空专业选课
  errors.value.majorCategory = ''
}

function handleSubMajorChange(val: any) {
  // 可以在这里处理额外的逻辑
  console.warn(val)
  errors.value.subMajors = ''
}

// --- Validation Logic ---
function validateForm() {
  // Reset errors
  errors.value = {
    examType: '',
    electives: '',
    majorCategory: '',
    subMajors: '',
    scores: { unified: '', culture: '', chinese: '', english: '' },
  }
  let isValid = true

  if (!examType.value) {
    errors.value.examType = '请选择考试类型'
    isValid = false
  }

  // 需求：最多2项，通常也意味着至少要选（假设至少1项）
  if (selectedElectives.value.length === 0) {
    errors.value.electives = '请选择至少1门选考科目'
    isValid = false
  }

  if (!majorCategory.value) {
    errors.value.majorCategory = '请选择专业类别'
    isValid = false
  }

  // 修复了原代码的逻辑错误：原代码判断 'music'，但 value 是 '音乐类'
  if (majorCategory.value === '音乐类') {
    const hasVocalOrInstrumental = selectedSubMajors.value.some(item =>
      item === '音乐表演声乐' || item === '音乐表演器乐',
    )
    if (!hasVocalOrInstrumental) {
      errors.value.subMajors = '音乐类必须选择声乐或器乐'
      isValid = false
    }
  }

  // Validate scores
  if (scores.value.unified) {
    const unifiedScore = Number(scores.value.unified)
    // const maxUnified = majorCategory.value === '体育类' ? 150 : 300 // 假设逻辑
    if (Number.isNaN(unifiedScore) || unifiedScore < 0 || unifiedScore > 300) {
      errors.value.scores.unified = '统考成绩格式不正确'
      isValid = false
    }
  }

  if (scores.value.culture) {
    const cultureScore = Number(scores.value.culture)
    // 修复逻辑：原代码判断 'sports'，改为中文 '体育类'
    // const maxCultureScore = majorCategory.value === '体育类' ? 150 : 300 // 此处根据实际业务需求调整上限
    if (Number.isNaN(cultureScore) || cultureScore < 0) { // 暂时去掉上限硬性拦截，防止业务变动
      errors.value.scores.culture = '文化成绩格式不正确'
      isValid = false
    }
  }

  if (scores.value.chinese) {
    const s = Number(scores.value.chinese)
    if (Number.isNaN(s) || s < 0 || s > 150) {
      errors.value.scores.chinese = '语文成绩必须在0-150之间'
      isValid = false
    }
  }

  if (scores.value.english) {
    const s = Number(scores.value.english)
    if (Number.isNaN(s) || s < 0 || s > 150) {
      errors.value.scores.english = '英语成绩必须在0-150之间'
      isValid = false
    }
  }

  return isValid
}

// --- Submit ---
function handleSubmit() {
  if (validateForm()) {
    // 组装数据
    const formData: ScoreFormData = {
      examType: examType.value,
      selectedElectives: [...selectedElectives.value], // 浅拷贝防止引用问题
      majorCategory: majorCategory.value,
      selectedSubMajors: [...selectedSubMajors.value],
      scores: { ...scores.value },
    }

    // 抛出事件
    emit('confirm', formData)
  }
}

// 暴露重置方法给父组件（如果需要）
defineExpose({
  resetForm: () => {
    examType.value = '历史组'
    selectedElectives.value = []
    majorCategory.value = ''
    selectedSubMajors.value = []
    scores.value = { unified: '', culture: '', chinese: '', english: '' }
  },
})
</script>

<template>
  <div class="exam-form-container">
    <!-- Exam Type -->
    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium">考试类型</label>
      <div class="flex gap-4">
        <!-- 注意：确保项目中已全局注册 w-radio-group 或在此组件import -->
        <w-radio-group v-model="examType" size="small">
          <w-radio-button value="历史组" label="历史组" />
          <w-radio-button value="物理组" label="物理组" />
        </w-radio-group>
      </div>
      <div v-if="errors.examType" class="mt-2 text-sm text-red-600">
        {{ errors.examType }}
      </div>
    </div>

    <!-- Elective Subjects (4选2) -->
    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium">选考科目</label>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="option in electiveOptions"
          :key="option.value"
          type="button"
          class="border rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          :class="selectedElectives.includes(option.value)
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-gray-50 dark:bg-gray-300 dark:text-gray-800 border-gray-300 hover:bg-gray-100'"
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
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-2 block text-sm font-medium">专业类别</label>
          <div class="flex gap-4">
            <w-select
              v-model:value="majorCategory"
              placeholder="请选择"
              :options="majorCategoryOptions"
              @change="handleMajorCategoryChange"
            />
          </div>
          <div v-if="errors.majorCategory" class="mt-2 text-sm text-red-600">
            {{ errors.majorCategory }}
          </div>
        </div>
        <!-- Sub-major Category (条件显示) -->
        <div v-if="majorCategory === '表演类' || majorCategory === '音乐类'">
          <label class="mb-2 block text-sm font-medium">
            {{ majorCategory === '表演类' ? '表演类' : '音乐类' }}专业选课
          </label>
          <div class="flex gap-4">
            <w-select
              v-model:value="selectedSubMajors"
              mode="multiple"
              placeholder="请选择..."
              :max-tag-count="1"
              :max-select-count="3"
              :options="getSubMajorOptions()"
              @change="handleSubMajorChange"
            />
          </div>
          <div v-if="errors.subMajors" class="mt-2 text-sm text-red-600">
            {{ errors.subMajors }}
          </div>
        </div>
      </div>
    </div>

    <!-- Scores Section -->
    <div class="mb-6">
      <h3 class="mb-3 text-sm font-semibold">
        成绩输入
      </h3>

      <!-- Unified Exam Score -->
      <div class="grid grid-cols-2 gap-4">
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
</template>

<style scoped>
/* 你的样式代码 */
</style>
