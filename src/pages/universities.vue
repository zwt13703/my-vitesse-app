<script setup lang="ts">
defineOptions({
  name: 'UniversitiesPage',
})

useHead({
  title: '找大学',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <div class="py-8">
      <h1 class="mb-6 text-3xl text-gray-900 font-bold">
        找大学
      </h1>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-white p-6 shadow-md">
          <div class="py-6 text-center">
            <div class="mb-3 text-4xl">
              🏫
            </div>
            <h2 class="mb-2 text-lg text-gray-900 font-semibold">
              大学查询系统
            </h2>
            <p class="mb-4 text-gray-600">
              查找全国各地的艺术体育类大学
            </p>
            <div class="space-y-3">
              <input
                type="text"
                placeholder="输入大学名称"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button class="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-700">
                搜索
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-md">
          <div class="py-6 text-center">
            <div class="mb-3 text-4xl">
              📌
            </div>
            <h2 class="mb-2 text-lg text-gray-900 font-semibold">
              按地区筛选
            </h2>
            <p class="mb-4 text-gray-600">
              按照省份和城市查找大学
            </p>
            <div class="space-y-3">
              <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">
                  选择省份
                </option>
                <option value="北京">
                  北京
                </option>
                <option value="上海">
                  上海
                </option>
                <option value="广州">
                  广州
                </option>
                <option value="深圳">
                  深圳
                </option>
              </select>
              <button class="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-700">
                筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
