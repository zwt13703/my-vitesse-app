<script setup lang="ts">
defineOptions({
  name: 'SimulatePage'
})

useHead({
  title: '模拟填志愿'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">模拟填志愿</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="text-center py-8">
          <div class="text-6xl mb-4">🎓</div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">志愿填报模拟系统</h2>
          <p class="text-gray-600 mb-4">
            在这里你可以根据自己的成绩和偏好模拟填报志愿
          </p>
          <div class="mt-8">
            <button class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition-colors">
              开始模拟
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>