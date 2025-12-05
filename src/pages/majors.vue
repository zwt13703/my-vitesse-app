<script setup lang="ts">
defineOptions({
  name: 'MajorsPage'
})

useHead({
  title: '查专业'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">查专业</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <div class="text-center py-6">
            <div class="text-5xl mb-4">🎨</div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">艺术体育专业查询</h2>
            <p class="text-gray-600 mb-6">
              详细了解各类艺术体育专业的培养目标和就业方向
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-2xl mb-2">🎭</div>
                <h3 class="text-sm font-semibold text-gray-900">表演专业</h3>
                <p class="text-xs text-gray-500 mt-1">戏剧、影视表演方向</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-2xl mb-2">🎨</div>
                <h3 class="text-sm font-semibold text-gray-900">美术专业</h3>
                <p class="text-xs text-gray-500 mt-1">绘画、设计、雕塑等方向</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-2xl mb-2">🎵</div>
                <h3 class="text-sm font-semibold text-gray-900">音乐专业</h3>
                <p class="text-xs text-gray-500 mt-1">声乐、器乐、作曲等方向</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-2xl mb-2">⚽</div>
                <h3 class="text-sm font-semibold text-gray-900">体育专业</h3>
                <p class="text-xs text-gray-500 mt-1">各类体育项目专业</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-center py-6">
            <div class="text-4xl mb-3">🔍</div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">专业搜索</h2>
            <p class="text-gray-600 mb-4">
              快速查找你感兴趣的专业
            </p>
            <div class="space-y-3">
              <input 
                type="text"
                placeholder="输入专业名称"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">
                搜索专业
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>