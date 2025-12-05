<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ContactUsPage',
})

useHead({
  title: '联系我们 - 艺体志愿宝',
  meta: [
    {
      name: 'description',
      content: '艺体志愿宝平台联系方式，包括地址、电话、邮箱以及在线留言功能',
    },
  ],
})

// Contact info
const contactInfo = {
  address: '河南省郑州市金水区文化路100号创新大厦A座12层',
  phone: '400-123-4567',
  email: 'contact@yitisheng.com',
  workingHours: '周一至周五 9:00-18:00',
  social: [
    { name: '微信', icon: 'i-carbon-logo-wechat', url: '#', qrCode: 'https://via.placeholder.com/150' },
    { name: '微博', icon: 'i-carbon-logo-sina-weibo', url: '#', qrCode: 'https://via.placeholder.com/150' },
    { name: '知乎', icon: 'i-carbon-logo-zhihu', url: '#', qrCode: 'https://via.placeholder.com/150' },
    { name: '抖音', icon: 'i-carbon-logo-douyin', url: '#', qrCode: 'https://via.placeholder.com/150' },
  ],
}

// Form state
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const formErrors = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

// Validate email
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
function validatePhone(phone: string) {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// Validate form
function validateForm() {
  formErrors.value = { name: '', email: '', phone: '', message: '' }
  let isValid = true

  if (!formData.value.name.trim()) {
    formErrors.value.name = '请输入您的姓名'
    isValid = false
  }

  if (!formData.value.email.trim()) {
    formErrors.value.email = '请输入您的邮箱'
    isValid = false
  }
  else if (!validateEmail(formData.value.email)) {
    formErrors.value.email = '请输入有效的邮箱地址'
    isValid = false
  }

  if (!formData.value.phone.trim()) {
    formErrors.value.phone = '请输入您的手机号码'
    isValid = false
  }
  else if (!validatePhone(formData.value.phone)) {
    formErrors.value.phone = '请输入有效的手机号码'
    isValid = false
  }

  if (!formData.value.message.trim()) {
    formErrors.value.message = '请输入您的留言内容'
    isValid = false
  }

  return isValid
}

// Form submission
function handleSubmit() {
  if (validateForm()) {
    // Here you would typically send the form data to your backend
    console.warn('Form submitted:', formData.value)

    // Reset form
    formData.value = { name: '', email: '', phone: '', message: '' }

    // Show success message
    console.warn('留言提交成功！我们将尽快与您联系。')
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 lg:px-8 sm:px-6">
    <!-- Hero Section -->
    <section class="mb-16 text-center">
      <h1 class="mb-4 text-4xl text-gray-900 font-bold sm:text-5xl dark:text-white">
        联系我们
      </h1>
      <p class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
        欢迎您通过以下方式与我们联系，我们将竭诚为您服务。
      </p>
    </section>

    <!-- Contact Us Section -->
    <section id="contact-us" class="mb-20">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Contact Information -->
        <div class="md:col-span-2 space-y-8">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div class="flex items-start gap-3">
              <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
                📞
              </div>
              <div>
                <h4 class="mb-1 text-lg text-gray-900 font-semibold dark:text-white">
                  联系电话
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ contactInfo.phone }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ contactInfo.workingHours }}
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
                📧
              </div>
              <div>
                <h4 class="mb-1 text-lg text-gray-900 font-semibold dark:text-white">
                  电子邮箱
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ contactInfo.email }}
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 text-2xl text-blue-600 dark:text-blue-400">
                📍
              </div>
              <div>
                <h4 class="mb-1 text-lg text-gray-900 font-semibold dark:text-white">
                  公司地址
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ contactInfo.address }}
                </p>
              </div>
            </div>
          </div>

          <!-- Map Component -->
          <div class="rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <h4 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
              办公地点
            </h4>
            <div class="relative h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.151107753289!2d113.62540441531296!3d34.80746378036473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b5535493c1a78b%3A0x9c6b3f7150250000!2sZhengzhou+University!5e0!3m2!1sen!2scn!4v1577848192056!5m2!1sen!2scn"
                width="100%"
                height="100%"
                style="border: 0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div>
          <h4 class="mb-4 text-lg text-gray-900 font-semibold dark:text-white">
            社交媒体
          </h4>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(item, index) in contactInfo.social"
              :key="index"
              class="rounded-xl bg-white p-4 text-center shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl"
            >
              <div :class="item.icon" class="mx-auto mb-2 text-3xl" />
              <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
                {{ item.name }}
              </p>
              <div class="relative mx-auto h-32 w-32">
                <img
                  :src="item.qrCode"
                  :alt="`${item.name}二维码`"
                  class="h-full w-full rounded-lg object-cover"
                >
              </div>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-3 block text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                关注我们
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Message Form Section -->
    <section id="message-form" class="mb-20">
      <h2 class="mb-8 text-2xl text-gray-900 font-bold sm:text-3xl dark:text-white">
        在线留言
      </h2>
      <div class="mx-auto max-w-4xl">
        <form class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 md:p-8" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 mb-6 gap-6 md:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-300">姓名</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的姓名"
              >
              <div v-if="formErrors.name" class="mt-2 text-sm text-red-600">
                {{ formErrors.name }}
              </div>
            </div>
            <div>
              <label for="email" class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-300">邮箱</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的邮箱"
              >
              <div v-if="formErrors.email" class="mt-2 text-sm text-red-600">
                {{ formErrors.email }}
              </div>
            </div>
            <div class="md:col-span-2">
              <label for="phone" class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-300">手机号码</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的手机号码"
              >
              <div v-if="formErrors.phone" class="mt-2 text-sm text-red-600">
                {{ formErrors.phone }}
              </div>
            </div>
            <div class="md:col-span-2">
              <label for="message" class="mb-2 block text-sm text-gray-700 font-medium dark:text-gray-300">留言内容</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="6"
                class="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的留言内容"
              />
              <div v-if="formErrors.message" class="mt-2 text-sm text-red-600">
                {{ formErrors.message }}
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg text-white font-semibold shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
          >
            提交留言
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
