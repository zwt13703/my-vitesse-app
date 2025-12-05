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
  <footer class="border-t border-gray-100 bg-white pb-8 pt-12 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <div class="grid grid-cols-1 mb-8 gap-8 md:grid-cols-4">
        <div class="col-span-1 md:col-span-1">
          <div class="mb-4 text-2xl text-blue-600 font-bold dark:text-blue-400">
            艺体志愿宝
          </div>
          <p class="text-sm text-gray-500 leading-relaxed dark:text-gray-400">
            专业的艺术体育类志愿填报辅助平台，致力于帮助每一位艺体生找到理想的大学。
          </p>
        </div>

        <div>
          <h3 class="mb-4 text-sm text-gray-900 font-semibold tracking-wider uppercase dark:text-white">
            平台服务
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/simulate" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                模拟填报
              </router-link>
            </li>
            <li>
              <router-link to="/universities" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                找大学
              </router-link>
            </li>
            <li>
              <router-link to="/majors" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                查专业
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm text-gray-900 font-semibold tracking-wider uppercase dark:text-white">
            关于我们
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/about" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                关于平台
              </router-link>
            </li>
            <li><a href="#" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">联系我们</a></li>
            <li><a href="#" class="text-sm text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">隐私政策</a></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm text-gray-900 font-semibold tracking-wider uppercase dark:text-white">
            设置
          </h3>
          <div class="flex space-x-4">
            <!-- Toggle Buttons -->
            <button :title="t('button.toggle_dark')" class="text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" @click="toggleDark()">
              <div i="carbon-sun dark:carbon-moon" class="text-xl" />
            </button>

            <a :title="t('button.toggle_langs')" class="cursor-pointer text-gray-500 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" @click="toggleLocales()">
              <div i-carbon-language class="text-xl" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between border-t border-gray-100 pt-8 md:flex-row dark:border-gray-800">
        <p class="text-center text-sm text-gray-400 md:text-left">
          &copy; {{ new Date().getFullYear() }} 艺体志愿宝. All rights reserved.
        </p>
        <div class="mt-4 flex md:mt-0 space-x-6">
          <a href="#" class="text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300">
            <span class="sr-only">WeChat</span>
            <div i-carbon-logo-wechat class="text-xl" />
          </a>
          <a href="https://github.com/antfu/vitesse" target="_blank" class="text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300">
            <span class="sr-only">GitHub</span>
            <div i-carbon-logo-github class="text-xl" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
