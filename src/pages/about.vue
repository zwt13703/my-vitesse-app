<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'AboutPage',
})

useHead({
  title: '关于艺体志愿宝平台 - 艺体志愿宝',
  meta: [
    {
      name: 'description',
      content: '了解艺体志愿宝平台的创立背景、服务宗旨、核心功能以及联系方式',
    },
  ],
})

// Team members data
const teamMembers = [
  {
    id: 1,
    name: '张三',
    position: '创始人兼CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bio: '毕业于清华大学计算机系，拥有10年互联网行业经验，专注于教育科技领域。',
  },
  {
    id: 2,
    name: '李四',
    position: '技术总监',
    avatar: 'https://images.unsplash.com/photo-1500648767291-0a08a98c3703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    bio: '前BAT高级工程师，拥有8年前端开发经验，擅长Vue.js和React等现代前端框架。',
  },
  {
    id: 3,
    name: '王五',
    position: '产品经理',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    bio: '毕业于北京大学光华管理学院，拥有6年教育产品经验，深刻理解学生需求。',
  },
]

// Timeline data
const timeline = [
  {
    year: '2022.03',
    title: '公司成立',
    description: '艺体志愿宝正式成立，专注于艺术体育类志愿填报辅助平台的开发。',
  },
  {
    year: '2022.12',
    title: '产品上线',
    description: '艺体志愿宝1.0版本正式上线，支持全国各大艺术体育类院校的数据查询。',
  },
  {
    year: '2023.06',
    title: '功能升级',
    description: '推出AI智能匹配系统，为用户提供个性化的志愿填报方案。',
  },
  {
    year: '2023.12',
    title: '用户突破',
    description: '平台用户突破10万，服务覆盖全国20多个省份。',
  },
  {
    year: '2024.09',
    title: '技术创新',
    description: '优化大数据算法，提高志愿匹配准确率至98%。',
  },
  {
    year: '2025.01',
    title: '服务升级',
    description: '新增在线客服系统和专家咨询服务，提升用户体验。',
  },
]

// Select component state
const selectedValue = ref<string>('platform-intro')

// Smooth scroll to section
function scrollToSection(section: string) {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Smooth scroll behavior
onMounted(() => {
  document.documentElement.style.scrollBehavior = 'smooth'
})

onUnmounted(() => {
  document.documentElement.style.scrollBehavior = 'auto'
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 lg:px-8 sm:px-6">
    <!-- Hero Section -->
    <section class="mb-16 text-center">
      <h1 class="mb-4 text-4xl text-gray-900 font-bold sm:text-5xl dark:text-white">
        关于艺体志愿宝平台
      </h1>
      <p class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
        艺体志愿宝是专为艺术体育类考生打造的志愿填报辅助平台，致力于为考生提供全方位的数据支持和个性化的志愿填报方案。
      </p>

      <!-- Quick Navigation Select -->
      <div class="mx-auto mt-8 max-w-md">
        <select
          v-model="selectedValue"
          class="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="scrollToSection(selectedValue)"
        >
          <option value="platform-intro">
            平台介绍
          </option>
          <option value="development-history">
            发展历程
          </option>
          <option value="team-intro">
            团队介绍
          </option>
        </select>
      </div>
    </section>

    <!-- Platform Introduction Section -->
    <section id="platform-intro" class="mb-20">
      <h2 class="mb-8 text-2xl text-gray-900 font-bold sm:text-3xl dark:text-white">
        平台介绍
      </h2>

      <!-- Founding Background -->
      <div class="mb-12">
        <h3 class="mb-4 text-xl text-gray-900 font-semibold dark:text-white">
          创立背景
        </h3>
        <p class="text-gray-600 leading-relaxed dark:text-gray-300">
          随着艺术体育类高考的不断发展，考生和家长面临着越来越复杂的志愿填报决策。传统的志愿填报方式往往依赖经验和有限的信息，容易导致误判和滑档。为了解决这一痛点，艺体志愿宝于2022年应运而生。我们汇聚了教育专家、数据分析师和技术团队，旨在为艺体考生提供科学、智能、精准的志愿填报辅助服务。
        </p>
      </div>

      <!-- Service Purpose -->
      <div class="mb-12">
        <h3 class="mb-4 text-xl text-gray-900 font-semibold dark:text-white">
          服务宗旨
        </h3>
        <p class="text-gray-600 leading-relaxed dark:text-gray-300">
          我们的服务宗旨是"以考生为中心，以数据为依据，以服务为宗旨"。我们致力于为每一位艺体考生提供个性化的志愿填报方案，帮助他们找到最适合自己的大学和专业。我们的目标是让志愿填报变得简单、科学、高效，让每一位考生都能实现自己的大学梦想。
        </p>
      </div>

      <!-- Core Features -->
      <div class="mb-12">
        <h3 class="mb-4 text-xl text-gray-900 font-semibold dark:text-white">
          核心功能
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="rounded-xl bg-white p-5 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl">
            <div class="mb-3 text-3xl text-blue-600 dark:text-blue-400">
              📊
            </div>
            <h4 class="mb-2 text-lg text-gray-900 font-bold dark:text-white">
              数据查询
            </h4>
            <p class="text-gray-600 dark:text-gray-300">
              提供全国各大艺术体育类院校的最新招生简章、录取分数线和招生计划。
            </p>
          </div>
          <div class="rounded-xl bg-white p-5 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl">
            <div class="mb-3 text-3xl text-blue-600 dark:text-blue-400">
              🤖
            </div>
            <h4 class="mb-2 text-lg text-gray-900 font-bold dark:text-white">
              智能匹配
            </h4>
            <p class="text-gray-600 dark:text-gray-300">
              基于AI智能算法，结合考生的文化课成绩和专业课成绩，智能匹配最适合的大学和专业。
            </p>
          </div>
          <div class="rounded-xl bg-white p-5 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl">
            <div class="mb-3 text-3xl text-blue-600 dark:text-blue-400">
              📈
            </div>
            <h4 class="mb-2 text-lg text-gray-900 font-bold dark:text-white">
              录取预测
            </h4>
            <p class="text-gray-600 dark:text-gray-300">
              根据历年录取数据和当前考生情况，预测录取概率，降低滑档风险。
            </p>
          </div>
          <div class="rounded-xl bg-white p-5 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl">
            <div class="mb-3 text-3xl text-blue-600 dark:text-blue-400">
              👨🏫
            </div>
            <h4 class="mb-2 text-lg text-gray-900 font-bold dark:text-white">
              专家咨询
            </h4>
            <p class="text-gray-600 dark:text-gray-300">
              提供在线专家咨询服务，为考生解答志愿填报中的各种问题。
            </p>
          </div>
        </div>
      </div>

      <!-- Platform Advantages -->
      <div>
        <h3 class="mb-4 text-xl text-gray-900 font-semibold dark:text-white">
          平台优势
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="flex items-start gap-3">
            <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
              ✅
            </div>
            <div>
              <h4 class="mb-1 text-lg text-gray-900 font-bold dark:text-white">
                数据准确
              </h4>
              <p class="text-gray-600 dark:text-gray-300">
                实时更新全国各大艺术体育类院校的最新数据。
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
              ✅
            </div>
            <div>
              <h4 class="mb-1 text-lg text-gray-900 font-bold dark:text-white">
                算法智能
              </h4>
              <p class="text-gray-600 dark:text-gray-300">
                采用先进的AI智能算法，提高志愿匹配准确率。
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
              ✅
            </div>
            <div>
              <h4 class="mb-1 text-lg text-gray-900 font-bold dark:text-white">
                服务专业
              </h4>
              <p class="text-gray-600 dark:text-gray-300">
                拥有专业的教育专家和技术团队，为用户提供优质服务。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Development History Timeline Section -->
    <section id="development-history" class="mb-20">
      <h2 class="mb-8 text-2xl text-gray-900 font-bold sm:text-3xl dark:text-white">
        发展历程
      </h2>
      <div class="relative">
        <div class="absolute left-1/2 h-full w-1 transform bg-gray-200 -translate-x-1/2 dark:bg-gray-700" />
        <div class="space-y-12">
          <div
            v-for="(item, index) in timeline"
            :key="index"
            class="relative flex items-center"
          >
            <div class="absolute left-1/2 z-10 h-8 w-8 transform border-4 border-white rounded-full bg-blue-600 -translate-x-1/2 dark:border-gray-800 dark:bg-blue-400" />
            <div
              :class="{
                'order-1 ml-auto w-5/12': index % 2 === 0,
                'order-3 mr-auto w-5/12': index % 2 !== 0,
              }"
            >
              <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <div class="mb-2 text-blue-600 font-bold dark:text-blue-400">
                  {{ item.year }}
                </div>
                <h3 class="mb-2 text-xl text-gray-900 font-bold dark:text-white">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <div class="order-2 hidden w-1/12 md:block" />
          </div>
        </div>
      </div>
    </section>

    <!-- Team Introduction Section -->
    <section id="team-intro" class="mb-20">
      <h2 class="mb-8 text-2xl text-gray-900 font-bold sm:text-3xl dark:text-white">
        团队介绍
      </h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl"
        >
          <div class="relative mx-auto mb-4 h-32 w-32">
            <img
              :src="member.avatar"
              :alt="member.name"
              class="h-full w-full rounded-full object-cover"
            >
          </div>
          <h3 class="mb-1 text-xl text-gray-900 font-bold dark:text-white">
            {{ member.name }}
          </h3>
          <p class="mb-3 text-blue-600 dark:text-blue-400">
            {{ member.position }}
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            {{ member.bio }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth transition for page sections */
section {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
</style>
