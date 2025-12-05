<script setup lang="ts">
defineOptions({
  name: 'UniversitiesPage'
})

useHead({
  title: '找大学'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">找大学</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center py-6">
            <div class="text-4xl mb-3">🏫</div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">大学查询系统</h2>
            <p class="text-gray-600 mb-4">
              查找全国各地的艺术体育类大学
            </p>
            <div class="space-y-3">
              <input 
                type="text"
                placeholder="输入大学名称"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center py-6">
            <div class="text-4xl mb-3">📌</div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">按地区筛选</h2>
            <p class="text-gray-600 mb-4">
              按照省份和城市查找大学
            </p>
            <div class="space-y-3">
              <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">选择省份</option>
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="广州">广州</option>
                <option value="深圳">深圳</option>
              </select>
              <button class="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">
                筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>