<script setup lang="ts">
import type { ScoreFormData } from './ScoreForm.vue'
import { useWindowScroll } from '@vueuse/core' // 假设你使用了 VueUse
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const isLoginModalOpen = ref(false)
// 新增：控制移动端菜单开关的状态
const isMobileMenuOpen = ref(false)

const username = ref('')
const password = ref('')
const error = ref('')
const route = useRoute()

const routerLinkList = [
  { path: '/', name: 'home', label: '首页' },
  { path: '/simulate', name: 'simulate', label: '模拟填志愿' },
  { path: '/universities', name: 'universities', label: '找大学' },
  { path: '/majors', name: 'majors', label: '找专业' },
] as const

// 编辑成绩菜单
const isScoreModalOpen = ref(false)

// 处理表单提交的回调
function handleScoreFormConfirm(data: ScoreFormData) {
  console.warn('接收到表单数据:', data)

  // 这里可以进行 API 调用
  // api.submit(data).then(...)
}
function openScoreFormModal() {
  isScoreModalOpen.value = true
}

function closeScoreFormModal() {
  isScoreModalOpen.value = false
}

// Scroll handling
const { y } = useWindowScroll()
const isVisible = ref(true)

watch(y, (newY, oldY) => {
  // 如果移动端菜单打开了，不要自动隐藏导航栏
  if (isMobileMenuOpen.value)
    return

  if (newY <= 0) {
    isVisible.value = true
    return
  }
  const dy = newY - oldY
  if (dy > 0 && newY > 50) {
    isVisible.value = false
  }
  if (dy < 0) {
    isVisible.value = true
  }
})

function openLoginModal() {
  isLoginModalOpen.value = true
  // 打开登录弹窗时，顺便关闭移动端菜单
  isMobileMenuOpen.value = false
  username.value = ''
  password.value = ''
  error.value = ''
}

function closeLoginModal() {
  isLoginModalOpen.value = false
  username.value = ''
  password.value = ''
  error.value = ''
}

function handleLogin() {
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }
  userStore.login(username.value, password.value)
  closeLoginModal()
}

function handleLogout() {
  userStore.logout()
  // 登出后关闭菜单
  isMobileMenuOpen.value = false
}

// 新增：切换移动端菜单
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 新增：移动端点击链接后关闭菜单
function handleMobileLinkClick() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-40 select-none bg-white shadow-md transition-transform duration-300 dark:bg-gray-900"
    :class="isVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <div class="h-16 flex items-center justify-between">
        <!-- 1. Logo (左侧，始终显示) -->
        <div class="w-48 flex flex-none items-center">
          <img
            src="https://yitisheng.vip/assets/logo.0e7b79fc.png"
            alt="艺体志愿宝logo"
            class="h-8 w-auto"
          >
        </div>

        <!-- 2. 桌面端菜单 (在大屏幕 md 以上显示，小屏幕隐藏) -->
        <div class="hidden flex-1 items-center md:flex space-x-8">
          <router-link
            v-for="item in routerLinkList"
            :id="item.name"
            :key="item.name"
            :to="item.path"
            class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            :class="{ 'text-blue-600 dark:text-blue-400': route.path === item.path, 'text-gray-700 dark:text-gray-200': route.path !== item.path }"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- 3. 桌面端按钮 (在大屏幕 md 以上显示，小屏幕隐藏) -->
        <div class="hidden items-center md:flex space-x-4">
          <template v-if="!userStore.user">
            <button
              class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium transition-colors dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
              @click="openLoginModal"
            >
              登录
            </button>
            <button
              class="border border-blue-600 rounded-md bg-white px-4 py-2 text-sm text-blue-600 font-medium transition-colors dark:border-blue-400 dark:bg-gray-800 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              注册
            </button>
          </template>

          <div v-else class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <span class="border-r-2 border-gray-3 pr-2 text-sm text-gray-700 dark:text-gray-200">音乐类</span>
              <span class="border-r-2 border-gray-3 pr-2 text-sm text-gray-700 dark:text-gray-200">文化成绩</span>
              <span class="text-sm text-gray-700 dark:text-gray-200">334分</span>
              <a target="_blank" class="cursor-pointer text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300" @click="openScoreFormModal">
                <div i-carbon:edit class="text-xs" />
              </a>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-700 dark:text-gray-200">欢迎, {{ userStore.user.username }}</span>
              <a href="https://github.com/antfu/vitesse" target="_blank" class="text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300">
                <span class="sr-only">GitHub</span>
                <div i-carbon:document-horizontal class="text-xl text-gray-8" />
              </a>
              <button
                v-show="false"
                class="rounded-md bg-red-600 px-4 py-2 text-sm text-white font-medium transition-colors dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
                @click="handleLogout"
              >
                退出
              </button>
            </div>
          </div>
        </div>

        <!-- 4. 移动端汉堡包按钮 (仅在小屏幕 md 以下显示) -->
        <div class="flex md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-white"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">打开主菜单</span>
            <!-- 菜单关闭时显示汉堡图标 -->
            <svg
              v-if="!isMobileMenuOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- 菜单打开时显示 X 图标 -->
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. 移动端菜单下拉面板 (仅在 isMobileMenuOpen 为真且屏幕较小时显示) -->
    <div v-show="isMobileMenuOpen" class="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900">
      <div class="px-2 pb-3 pt-2 space-y-1">
        <router-link
          v-for="item in routerLinkList"
          :key="item.name"
          :to="item.path"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="{ 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400': route.path === item.path, 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white': route.path !== item.path }"
          @click="handleMobileLinkClick"
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- 移动端底部的登录/用户信息区域 -->
      <div class="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
        <div class="px-2 space-y-2">
          <template v-if="!userStore.user">
            <button
              class="block w-full rounded-md px-3 py-2 text-left text-base text-gray-700 font-medium hover:bg-gray-50 dark:text-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="openLoginModal"
            >
              登录
            </button>
            <button
              class="block w-full rounded-md px-3 py-2 text-left text-base text-blue-600 font-medium hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800"
            >
              注册
            </button>
          </template>

          <template v-else>
            <div class="mb-3 flex items-center px-3">
              <span class="border-r-2 border-gray-3 pr-2 text-sm text-gray-700 dark:text-gray-200">音乐类</span>
              <span class="border-r-2 border-gray-3 pl-2 pr-2 text-sm text-gray-700 dark:text-gray-200">文化成绩</span>
              <span class="pl-2 pr-2 text-sm text-gray-700 dark:text-gray-200">334</span>
              <a target="_blank" class="cursor-pointer text-gray-400 transition-colors hover:text-gray-500 dark:hover:text-gray-300" @click="openScoreFormModal">
                <div i-carbon:edit class="text-xs" />
              </a>
            </div>
            <div class="mb-3 flex items-center px-3">
              <span>欢迎, {{ userStore.user.username }}</span>
              <button
                class="block rounded-md px-3 py-2 text-left text-base text-red-600 font-medium hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-800"
                @click="handleLogout"
              >
                退出登录
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <!-- Login Modal (Z-index 调高，确保覆盖导航栏) -->
  <div
    v-if="isLoginModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
  >
    <!-- Modal Content -->
    <div class="max-w-md w-full border rounded-lg bg-white p-6 shadow-xl transition-all dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl text-gray-900 font-bold dark:text-white">
          登录
        </h2>
        <button
          class="text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="closeLoginModal"
        >
          ×
        </button>
      </div>

      <div v-if="error" class="mb-4 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </div>

      <div class="mb-4">
        <label class="mb-1 block text-sm text-gray-700 font-medium dark:text-gray-300">用户名</label>
        <input
          v-model="username"
          type="text"
          class="w-full border border-gray-300 rounded-md bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入用户名"
          @keyup.enter="handleLogin"
        >
      </div>

      <div class="mb-4">
        <label class="mb-1 block text-sm text-gray-700 font-medium dark:text-gray-300">密码</label>
        <input
          v-model="password"
          type="password"
          class="w-full border border-gray-300 rounded-md bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        >
      </div>

      <div class="flex justify-end pt-2 space-x-3">
        <button
          class="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 font-medium transition-colors dark:bg-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600"
          @click="closeLoginModal"
        >
          取消
        </button>
        <button
          class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium transition-colors dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
          @click="handleLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
  <div v-if="isScoreModalOpen" class="fixed inset-0 z-50 flex select-none items-center justify-center bg-black bg-opacity-50 px-4">
    <div class="max-w-md w-full border rounded-lg bg-white p-6 shadow-xl transition-all dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-xl text-gray-900 font-bold dark:text-white">
          修改你的高考信息
        </h3>
        <button
          class="text-3xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          @click="closeScoreFormModal"
        >
          ×
        </button>
      </div>
      <!-- 使用组件并监听 confirm 事件 -->
      <ScoreForm @confirm="handleScoreFormConfirm" />
    </div>
  </div>
</template>
