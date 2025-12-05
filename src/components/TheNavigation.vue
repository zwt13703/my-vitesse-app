<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const isLoginModalOpen = ref(false)
const username = ref('')
const password = ref('')
const error = ref('')

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
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left-aligned system icon -->
        <div class="flex items-center">
          <div class="text-2xl text-blue-600">🎨</div>
        </div>
        
        <!-- Middle navigation tabs -->
        <div class="flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            首页
          </router-link>
          <router-link 
            to="/simulate" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            模拟填志愿
          </router-link>
          <router-link 
            to="/universities" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            找大学
          </router-link>
          <router-link 
            to="/majors" 
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            查专业
          </router-link>
        </div>
        
        <!-- Right-aligned buttons -->
        <div class="flex items-center space-x-4">
          <button 
            v-if="!userStore.user"
            @click="openLoginModal"
            class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            登录
          </button>
          
          <button 
            v-if="!userStore.user"
            class="bg-white text-blue-600 hover:bg-gray-100 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            注册
          </button>
          
          <div v-else class="flex items-center space-x-2">
            <span class="text-gray-700 text-sm">欢迎, {{ userStore.user.username }}</span>
            <button 
              @click="handleLogout"
              class="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
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
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">登录</h2>
          <button 
            @click="closeLoginModal"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div v-if="error" class="mb-4 text-red-600 text-sm">
          {{ error }}
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <input 
            v-model="username"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入用户名"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input 
            v-model="password"
            type="password"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          />
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="closeLoginModal"
            class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            取消
          </button>
          <button 
            @click="handleLogin"
            class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>