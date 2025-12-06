<!-- eslint-disable no-console -->
<!-- WRadioGroup.vue -->
<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface Props {
  modelValue: string | number
  size?: 'large' | 'middle' | 'small'
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'middle',
})

const emit = defineEmits<Emits>()

const selectedValue = ref(props.modelValue)
const options = ref<Array<{ value: string | number, label: string }>>([])

// 提供上下文给子组件
provide('radioGroupContext', {
  modelValue: selectedValue,
  updateValue: (value: string | number) => {
    selectedValue.value = value
    emit('update:modelValue', value)
  },
  registerOption: (option: { value: string | number, label: string }) => {
    options.value.push(option)
  },
  unregisterOption: (value: string | number) => {
    const index = options.value.findIndex(opt => opt.value === value)
    if (index > -1) {
      options.value.splice(index, 1)
    }
  },
  getOptionIndex: (value: string | number) => {
    return options.value.findIndex(opt => opt.value === value)
  },
  getOptionCount: () => {
    return options.value.length
  },
})

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

const sizeClass = computed(() => {
  console.log(props.size)
  switch (props.size) {
    case 'large':
      return 'px-6 py-3 border'
    case 'middle':
      return 'px-4 py-2 border'
    case 'small':
      return 'px-3 py-1.5 border text-sm'
    default:
      return 'px-4 py-2 border'
  }
})
</script>

<template>
  <div class="w-radio-group flex select-none overflow-hidden border border-gray-300 rounded-md shadow-sm" :class="[sizeClass]">
    <slot />
  </div>
</template>

<style scoped>
.w-radio-group {
  /* 样式已通过 Tailwind 类定义，在这里不需要额外样式 */
}
</style>
