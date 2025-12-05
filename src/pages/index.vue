<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useHead({
  title: () => t('button.home'),
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="text-center py-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        艺体志愿宝
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        专业的艺术体育类志愿填报辅助平台
      </p>
      <div class="flex justify-center space-x-4">
        <button
          @click="$router.push('/simulate')"
          class="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          开始模拟填志愿
        </button>
        <button
          @click="$router.push('/universities')"
          class="bg-white text-blue-600 hover:bg-gray-100 border border-blue-600 px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          查找理想大学
        </button>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-3xl mb-4">🎯</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">智能匹配</h3>
          <p class="text-gray-600">根据你的成绩和偏好智能匹配适合的大学和专业</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-3xl mb-4">📊</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">数据准确</h3>
          <p class="text-gray-600">最新的招生数据和录取分数线，确保信息准确可靠</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-3xl mb-4">💡</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">专业指导</h3>
          <p class="text-gray-600">专业的志愿填报指导，帮你做出最优选择</p>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
