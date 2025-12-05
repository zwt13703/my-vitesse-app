<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-12 pb-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="col-span-1 md:col-span-1">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">艺体志愿宝</div>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            专业的艺术体育类志愿填报辅助平台，致力于帮助每一位艺体生找到理想的大学。
          </p>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">平台服务</h3>
          <ul class="space-y-3">
            <li><router-link to="/simulate" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">模拟填报</router-link></li>
            <li><router-link to="/universities" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">找大学</router-link></li>
            <li><router-link to="/majors" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">查专业</router-link></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">关于我们</h3>
          <ul class="space-y-3">
            <li><router-link to="/about" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">关于平台</router-link></li>
            <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">联系我们</a></li>
            <li><a href="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">隐私政策</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">设置</h3>
          <div class="flex space-x-4">
             <!-- Toggle Buttons -->
             <button :title="t('button.toggle_dark')" @click="toggleDark()" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <div i="carbon-sun dark:carbon-moon" class="text-xl" />
             </button>
             
             <a :title="t('button.toggle_langs')" @click="toggleLocales()" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                <div i-carbon-language class="text-xl" />
             </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm text-center md:text-left">
          &copy; {{ new Date().getFullYear() }} 艺体志愿宝. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
           <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
             <span class="sr-only">WeChat</span>
             <div i-carbon-logo-wechat class="text-xl" />
           </a>
           <a href="https://github.com/antfu/vitesse" target="_blank" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
             <span class="sr-only">GitHub</span>
             <div i-carbon-logo-github class="text-xl" />
           </a>
        </div>
      </div>
    </div>
  </footer>
</template>
