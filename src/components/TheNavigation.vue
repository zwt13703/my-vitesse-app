<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const isLoginModalOpen = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')

// Scroll handling
const { y } = useWindowScroll()
const isVisible = ref(true)

watch(y, (newY, oldY) => {
  // Always show at the very top
  if (newY <= 0) {
    isVisible.value = true
    return
  }

  const dy = newY - oldY

  // Scroll down > 50px (absolute position) and moving down
  if (dy > 0 && newY > 50) {
    isVisible.value = false
  }

  // Scroll up
  // If we are scrolling up, show the navbar
  if (dy < 0) {
    isVisible.value = true
  }
})

// Function to open login modal
function openLoginModal() {
  isLoginModalOpen.value = true
  username.value = ''
  password.value = ''
  error.value = ''
}

// Function to close login modal
function closeLoginModal() {
  isLoginModalOpen.value = false
  username.value = ''
  password.value = ''
  error.value = ''
}

// Function to handle login
function handleLogin() {
  // Basic non-empty validation
  if (!username.value || !password.value) {
    error.value = '请输入用户名和密码'
    return
  }

  // Login the user
  userStore.login(username.value, password.value)
  closeLoginModal()
}

// Function to handle logout
function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-50 bg-white shadow-md transition-transform duration-300 dark:bg-gray-900"
    :class="isVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <div class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
      <div class="h-16 flex items-center justify-between">
        <!-- Left-aligned system icon -->
        <div class="flex items-center">
          <div class="text-2xl text-blue-600 dark:text-blue-400">
            🎨
          </div>
        </div>

        <!-- Middle navigation tabs -->
        <div class="flex items-center space-x-8">
          <router-link
            to="/"
            class="rounded-md px-3 py-2 text-sm text-gray-700 font-medium transition-colors dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            首页
          </router-link>
          <router-link
            to="/simulate"
            class="rounded-md px-3 py-2 text-sm text-gray-700 font-medium transition-colors dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            模拟填志愿
          </router-link>
          <router-link
            to="/universities"
            class="rounded-md px-3 py-2 text-sm text-gray-700 font-medium transition-colors dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            找大学
          </router-link>
          <router-link
            to="/majors"
            class="rounded-md px-3 py-2 text-sm text-gray-700 font-medium transition-colors dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            查专业
          </router-link>
        </div>

        <!-- Right-aligned buttons -->
        <div class="flex items-center space-x-4">
          <button
            v-if="!userStore.user"
            class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium transition-colors dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
            @click="openLoginModal"
          >
            登录
          </button>

          <button
            v-if="!userStore.user"
            class="border border-blue-600 rounded-md bg-white px-4 py-2 text-sm text-blue-600 font-medium transition-colors dark:border-blue-400 dark:bg-gray-800 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            注册
          </button>

          <div v-else class="flex items-center space-x-2">
            <span class="text-sm text-gray-700 dark:text-gray-200">欢迎, {{ userStore.user.username }}</span>
            <button
              class="rounded-md bg-red-600 px-4 py-2 text-sm text-white font-medium transition-colors dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
              @click="handleLogout"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div
      v-if="isLoginModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="max-w-md w-full rounded-lg bg-white p-6 dark:bg-gray-800">
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
          >
        </div>

        <div class="mb-4">
          <label class="mb-1 block text-sm text-gray-700 font-medium dark:text-gray-300">密码</label>
          <input
            v-model="password"
            type="password"
            class="w-full border border-gray-300 rounded-md bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          >
        </div>

        <div class="flex justify-end space-x-3">
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
  </nav>
</template>
