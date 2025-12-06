<!-- WRadioButton.vue -->
<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'

interface Props {
  value: string | number
  label: string
}

const props = defineProps<Props>()

// 从父组件获取上下文
const radioGroupContext: any = inject('radioGroupContext')

// 使用计算属性获取当前选中值
const modelValue = computed(() => {
  return radioGroupContext?.modelValue?.value
})

function handleChange() {
  if (radioGroupContext?.updateValue) {
    radioGroupContext.updateValue(props.value)
  }
}

// 计算样式类，根据按钮在组中的位置
const positionClass = computed(() => {
  if (!radioGroupContext || !radioGroupContext.getOptionIndex)
    return 'rounded-md'

  const index = radioGroupContext.getOptionIndex(props.value)
  const totalCount = radioGroupContext.getOptionCount()

  if (totalCount === 1)
    return 'rounded-md border-x'

  if (index === 0) {
    return 'rounded-l-md border-r-0'
  }
  else if (index === totalCount - 1) {
    return 'rounded-r-md border-l-0'
  }
  else {
    return 'border-l-0 border-r-0'
  }
})

const sizeClasses = computed(() => {
  // 根据不同尺寸返回不同的 padding
  return 'px-4 py-2 border'
})

onMounted(() => {
  // 注册选项到父组件
  if (radioGroupContext?.registerOption) {
    radioGroupContext.registerOption({
      value: props.value,
      label: props.label,
    })
  }
})

onUnmounted(() => {
  // 注销选项从父组件
  if (radioGroupContext?.unregisterOption) {
    radioGroupContext.unregisterOption(props.value)
  }
})
</script>

<template>
  <div class="relative">
    <input
      :id="`radio-${value}`"
      type="radio"
      :value="value"
      :checked="modelValue === value"
      class="peer absolute h-0 w-0 opacity-0"
      @change="handleChange"
    >
    <label
      :for="`radio-${value}`"
      class="flex cursor-pointer items-center justify-center transition-colors duration-150 ease-in-out"
      :class="[
        sizeClasses,
        modelValue === value
          ? 'bg-blue-600 text-white border-blue-600 z-10'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
        positionClass,
      ]"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
