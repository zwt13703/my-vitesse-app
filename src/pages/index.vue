<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useHead({
  title: '艺体志愿宝 - 专业的艺术体育类志愿填报辅助平台',
})
</script>

<template>
  <div class="flex flex-col w-full">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            艺体志愿宝
          </h1>
          <p class="text-xl sm:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            专业的艺术体育类志愿填报辅助平台，助你圆梦理想大学
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200">
            <button
              @click="$router.push('/simulate')"
              class="bg-white text-blue-600 hover:bg-blue-50 border-2 border-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              开始模拟填志愿
            </button>
            <button
              @click="$router.push('/universities')"
              class="bg-transparent text-white hover:bg-white/10 border-2 border-white px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm"
            >
              查找理想大学
            </button>
          </div>
        </div>
      </div>
      
      <!-- Decorative shapes -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-900 clip-path-slant"></div>
    </div>
    
    <!-- Stats Section -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div class="text-center p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2000+</div>
          <div class="text-gray-600 dark:text-gray-300">收录院校</div>
        </div>
        <div class="text-center p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700">
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5万+</div>
          <div class="text-gray-600 dark:text-gray-300">历年数据</div>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</div>
          <div class="text-gray-600 dark:text-gray-300">录取参考率</div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">核心功能</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          全方位的数据支持，智能化的推荐算法，为你的升学之路保驾护航
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
            🎯
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">智能匹配</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            根据你的文化课成绩和专业课成绩，结合历年录取数据，智能匹配最适合你的大学和专业，降低滑档风险。
          </p>
        </div>
        
        <!-- Feature 2 -->
        <div class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
            📊
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">数据准确</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            实时更新全国各大艺术体育类院校的最新招生简章、录取分数线和招生计划，确保每一条信息都准确可靠。
          </p>
        </div>
        
        <!-- Feature 3 -->
        <div class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
            💡
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">专业指导</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            提供详细的志愿填报规则解读和技巧分享，更有专家团队在线答疑，帮你做出最优的升学选择。
          </p>
        </div>
      </div>
    </div>
    
    <!-- Content Block -->
    <div class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="w-full lg:w-1/2">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Art student" 
                class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div class="text-white">
                  <p class="font-bold text-lg">专注艺考升学</p>
                  <p class="text-sm opacity-80">为梦想插上翅膀</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">为什么选择艺体志愿宝？</h2>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                <div class="ml-4">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">针对性强</h4>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">专为艺术体育生打造，算法模型考虑了艺体类特殊的录取规则（综合分计算等）。</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">2</div>
                <div class="ml-4">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">覆盖面广</h4>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">涵盖美术、音乐、舞蹈、表演、体育等多个细分专业方向。</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">3</div>
                <div class="ml-4">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">使用便捷</h4>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">界面简洁直观，操作简单，手机端/电脑端完美适配。</p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button @click="$router.push('/about')" class="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 transition-colors">
                了解更多关于我们要做的 <span class="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-blue-600 dark:bg-blue-800 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">准备好开启你的大学之旅了吗？</h2>
        <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          立即注册账号，免费获取你的个性化志愿填报方案。
        </p>
        <button
          @click="$router.push('/simulate')"
          class="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl"
        >
          立即体验
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped>
.clip-path-slant {
  clip-path: polygon(0 100%, 100% 100%, 100% 0);
}
</style>
