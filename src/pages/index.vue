<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: '艺体志愿宝 - 专业的艺术体育类志愿填报辅助平台',
})
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Hero Section -->
    <div class="relative overflow-hidden from-blue-600 to-indigo-800 bg-gradient-to-br text-white dark:from-blue-900 dark:to-indigo-950">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20" />
      <div class="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32 sm:px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="mb-6 animate-fade-in-up text-4xl font-bold tracking-tight lg:text-6xl sm:text-5xl">
            艺体志愿宝
          </h1>
          <p class="mx-auto mb-10 max-w-2xl animate-fade-in-up text-xl text-blue-100 leading-relaxed delay-100 sm:text-2xl">
            专业的艺术体育类志愿填报辅助平台，助你圆梦理想大学
          </p>
          <div class="flex flex-col animate-fade-in-up justify-center gap-4 delay-200 sm:flex-row">
            <button
              class="transform border-2 border-white rounded-full bg-white px-8 py-4 text-lg text-blue-600 font-bold shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1"
              @click="$router.push('/simulate')"
            >
              开始模拟填志愿
            </button>
            <button
              class="border-2 border-white rounded-full bg-transparent px-8 py-4 text-lg text-white font-bold backdrop-blur-sm transition-all hover:bg-white/10"
              @click="$router.push('/universities')"
            >
              查找理想大学
            </button>
          </div>
        </div>
      </div>

      <!-- Decorative shapes -->
      <div class="clip-path-slant absolute bottom-0 left-0 right-0 h-16 bg-gray-50 dark:bg-gray-900" />
    </div>

    <!-- Stats Section -->
    <div class="relative z-20 mx-auto mb-16 max-w-7xl px-4 -mt-12 lg:px-8 sm:px-6">
      <div class="grid grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-xl md:grid-cols-3 dark:bg-gray-800">
        <div class="border-b border-gray-100 p-4 text-center md:border-b-0 md:border-r dark:border-gray-700">
          <div class="mb-2 text-4xl text-blue-600 font-bold dark:text-blue-400">
            2000+
          </div>
          <div class="text-gray-600 dark:text-gray-300">
            收录院校
          </div>
        </div>
        <div class="border-b border-gray-100 p-4 text-center md:border-b-0 md:border-r dark:border-gray-700">
          <div class="mb-2 text-4xl text-blue-600 font-bold dark:text-blue-400">
            5万+
          </div>
          <div class="text-gray-600 dark:text-gray-300">
            历年数据
          </div>
        </div>
        <div class="p-4 text-center">
          <div class="mb-2 text-4xl text-blue-600 font-bold dark:text-blue-400">
            98%
          </div>
          <div class="text-gray-600 dark:text-gray-300">
            录取参考率
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mx-auto max-w-7xl px-4 py-16 lg:px-8 sm:px-6">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl text-gray-900 font-bold dark:text-white">
          核心功能
        </h2>
        <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          全方位的数据支持，智能化的推荐算法，为你的升学之路保驾护航
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Feature 1 -->
        <div class="group border border-gray-100 rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl">
          <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-100 text-4xl transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30">
            🎯
          </div>
          <h3 class="mb-3 text-xl text-gray-900 font-bold dark:text-white">
            智能匹配
          </h3>
          <p class="text-gray-600 leading-relaxed dark:text-gray-400">
            根据你的文化课成绩和专业课成绩，结合历年录取数据，智能匹配最适合你的大学和专业，降低滑档风险。
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group border border-gray-100 rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl">
          <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-2xl bg-green-100 text-4xl transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30">
            📊
          </div>
          <h3 class="mb-3 text-xl text-gray-900 font-bold dark:text-white">
            数据准确
          </h3>
          <p class="text-gray-600 leading-relaxed dark:text-gray-400">
            实时更新全国各大艺术体育类院校的最新招生简章、录取分数线和招生计划，确保每一条信息都准确可靠。
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group border border-gray-100 rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl">
          <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-2xl bg-purple-100 text-4xl transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30">
            💡
          </div>
          <h3 class="mb-3 text-xl text-gray-900 font-bold dark:text-white">
            专业指导
          </h3>
          <p class="text-gray-600 leading-relaxed dark:text-gray-400">
            提供详细的志愿填报规则解读和技巧分享，更有专家团队在线答疑，帮你做出最优的升学选择。
          </p>
        </div>
      </div>
    </div>

    <!-- Content Block -->
    <div class="bg-gray-50 py-16 dark:bg-gray-800/50">
      <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
        <div class="flex flex-col items-center gap-12 lg:flex-row">
          <div class="w-full lg:w-1/2">
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Art student"
                class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
              >
              <div class="absolute inset-0 flex items-end from-black/60 to-transparent bg-gradient-to-t p-8">
                <div class="text-white">
                  <p class="text-lg font-bold">
                    专注艺考升学
                  </p>
                  <p class="text-sm opacity-80">
                    为梦想插上翅膀
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <h2 class="mb-6 text-3xl text-gray-900 font-bold dark:text-white">
              为什么选择艺体志愿宝？
            </h2>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/50 dark:text-blue-400">
                  1
                </div>
                <div class="ml-4">
                  <h4 class="text-lg text-gray-900 font-semibold dark:text-white">
                    针对性强
                  </h4>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    专为艺术体育生打造，算法模型考虑了艺体类特殊的录取规则（综合分计算等）。
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/50 dark:text-blue-400">
                  2
                </div>
                <div class="ml-4">
                  <h4 class="text-lg text-gray-900 font-semibold dark:text-white">
                    覆盖面广
                  </h4>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    涵盖美术、音乐、舞蹈、表演、体育等多个细分专业方向。
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/50 dark:text-blue-400">
                  3
                </div>
                <div class="ml-4">
                  <h4 class="text-lg text-gray-900 font-semibold dark:text-white">
                    使用便捷
                  </h4>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    界面简洁直观，操作简单，手机端/电脑端完美适配。
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button class="flex items-center gap-2 text-blue-600 font-semibold transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" @click="$router.push('/about')">
                了解更多关于我们要做的 <span class="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-blue-600 px-4 py-16 dark:bg-blue-800">
      <div class="mx-auto max-w-4xl text-center text-white">
        <h2 class="mb-6 text-3xl font-bold md:text-4xl">
          准备好开启你的大学之旅了吗？
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          立即注册账号，免费获取你的个性化志愿填报方案。
        </p>
        <button
          class="rounded-full bg-white px-10 py-4 text-lg text-blue-600 font-bold shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          @click="$router.push('/simulate')"
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
