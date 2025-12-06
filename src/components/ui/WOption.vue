<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

// 定义 Props
const props = defineProps<{
  label: string
  value: string | number
  disabled?: boolean
}>()

// 注入父组件的方法
// 注意：这里需要和 WSelect 里的 provide key 保持一致
const selectContext = inject<{
  registerOption: (opt: any) => void
  unregisterOption: (val: string | number) => void
}>('w-select-context')

if (!selectContext) {
  console.warn('WOption must be used inside WSelect')
}

// 构建选项对象
const optionData = {
  label: props.label,
  value: props.value,
  disabled: props.disabled,
}

// 1. 组件挂载时，向父组件注册自己
onMounted(() => {
  selectContext?.registerOption(optionData)
})

// 2. 组件卸载时，通知父组件移除自己
onUnmounted(() => {
  selectContext?.unregisterOption(props.value)
})

// 3. (可选) 如果 props 变了，也可以更新（这里简化处理，假设 value 不变）
</script>

<template>
  <div style="display: none;" />
</template>
