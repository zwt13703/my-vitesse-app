<script setup lang="ts">
defineOptions({
  name: 'SimulatePage',
})

useHead({
  title: '模拟填志愿',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <div class="py-8">
      <h1 class="mb-6 text-3xl text-gray-900 font-bold">
        模拟填志愿
      </h1>

      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="py-8 text-center">
          <div class="mb-4 text-6xl">
            🎓
          </div>
          <h2 class="mb-2 text-xl text-gray-900 font-semibold">
            志愿填报模拟系统
          </h2>
          <p class="mb-4 text-gray-600">
            在这里你可以根据自己的成绩和偏好模拟填报志愿
          </p>
          <div class="mt-8">
            <button class="rounded-md bg-blue-600 px-6 py-3 text-lg text-white font-medium transition-colors hover:bg-blue-700">
              开始模拟
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
