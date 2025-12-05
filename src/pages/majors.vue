<script setup lang="ts">
defineOptions({
  name: 'MajorsPage',
})

useHead({
  title: '查专业',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <div class="py-8">
      <h1 class="mb-6 text-3xl text-gray-900 font-bold">
        查专业
      </h1>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-lg bg-white p-6 shadow-md md:col-span-2">
          <div class="py-6 text-center">
            <div class="mb-4 text-5xl">
              🎨
            </div>
            <h2 class="mb-2 text-xl text-gray-900 font-semibold">
              艺术体育专业查询
            </h2>
            <p class="mb-6 text-gray-600">
              详细了解各类艺术体育专业的培养目标和就业方向
            </p>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 text-2xl">
                  🎭
                </div>
                <h3 class="text-sm text-gray-900 font-semibold">
                  表演专业
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  戏剧、影视表演方向
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 text-2xl">
                  🎨
                </div>
                <h3 class="text-sm text-gray-900 font-semibold">
                  美术专业
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  绘画、设计、雕塑等方向
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 text-2xl">
                  🎵
                </div>
                <h3 class="text-sm text-gray-900 font-semibold">
                  音乐专业
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  声乐、器乐、作曲等方向
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 text-2xl">
                  ⚽
                </div>
                <h3 class="text-sm text-gray-900 font-semibold">
                  体育专业
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  各类体育项目专业
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-md">
          <div class="py-6 text-center">
            <div class="mb-3 text-4xl">
              🔍
            </div>
            <h2 class="mb-2 text-lg text-gray-900 font-semibold">
              专业搜索
            </h2>
            <p class="mb-4 text-gray-600">
              快速查找你感兴趣的专业
            </p>
            <div class="space-y-3">
              <input
                type="text"
                placeholder="输入专业名称"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button class="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-700">
                搜索专业
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
