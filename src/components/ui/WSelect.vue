<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

// --- Types ---
export interface OptionItem {
  label: string
  value: string | number
  disabled?: boolean
}

// --- Props ---
const props = withDefaults(defineProps<{
  // 支持 v-model:value
  value?: string | number | (string | number)[]
  options?: OptionItem[]
  mode?: 'single' | 'multiple'
  placeholder?: string
  disabled?: boolean
  maxTagCount?: number // 限制 Input 显示多少个 tag
  maxSelectCount?: number // 限制最多选多少个
}>(), {
  value: undefined,
  options: () => [],
  mode: 'single',
  placeholder: 'Select Item...',
  disabled: false,
  maxTagCount: undefined,
  maxSelectCount: undefined,
})

// --- Emits ---
const emit = defineEmits<{
  (e: 'update:value', val: string | number | (string | number)[] | undefined): void
  (e: 'change', val: string | number | (string | number)[] | undefined): void
}>()

// --- State ---
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// --- Computed Helper ---
const isMultiple = computed(() => props.mode === 'multiple')

// 当前选中的值（统一转为数组处理逻辑，如果是单选则是数组第一个）
const internalValue = computed(() => {
  return props.value
})

const isEmpty = computed(() => {
  if (isMultiple.value) {
    return !Array.isArray(props.value) || props.value.length === 0
  }
  return props.value === undefined || props.value === null || props.value === ''
})

// 获取选中项的完整对象数组（用于显示 Tag）
const selectedOptions = computed(() => {
  if (!isMultiple.value)
    return []
  const vals = Array.isArray(props.value) ? props.value : []
  // 按照值在 options 中找到对应的 label
  return vals.map(val => props.options.find(opt => opt.value === val) || { label: String(val), value: val })
})

// 计算显示的 Tags (Max Tag Count Logic)
const visibleTags = computed(() => {
  if (!props.maxTagCount)
    return selectedOptions.value
  return selectedOptions.value.slice(0, props.maxTagCount)
})

// 计算被隐藏的 Tags 数量
const hiddenTagCount = computed(() => {
  if (!props.maxTagCount)
    return 0
  return Math.max(0, selectedOptions.value.length - props.maxTagCount)
})

// --- Actions ---

function toggleDropdown() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function getLabel(val: string | number | undefined) {
  const opt = props.options.find(o => o.value === val)
  return opt ? opt.label : val
}

function isSelected(val: string | number) {
  if (isMultiple.value) {
    return Array.isArray(props.value) && props.value.includes(val)
  }
  return props.value === val
}

// 检查是否达到最大选择限制
const isMaxLimitReached = computed(() => {
  if (!isMultiple.value || !props.maxSelectCount)
    return false
  const currentLen = Array.isArray(props.value) ? props.value.length : 0
  return currentLen >= props.maxSelectCount
})

// 判断选项是否禁用（原生禁用 或 达到最大限制且未选中该项）
function isDisabledOption(option: OptionItem) {
  if (option.disabled)
    return true
  // 如果已经达到最大限制，并且当前项没有被选中，则禁用
  if (isMultiple.value && isMaxLimitReached.value && !isSelected(option.value)) {
    return true
  }
  return false
}

function handleSelect(option: OptionItem) {
  if (isDisabledOption(option))
    return

  if (isMultiple.value) {
    // 多选逻辑
    const currentList = Array.isArray(props.value) ? [...props.value] : []
    const index = currentList.indexOf(option.value)

    if (index > -1) {
      // 取消选择
      currentList.splice(index, 1)
    }
    else {
      // 选择 (需要再次检查 Limit，双重保险)
      if (props.maxSelectCount && currentList.length >= props.maxSelectCount)
        return
      currentList.push(option.value)
    }
    emit('update:value', currentList)
    emit('change', currentList)
    // 多选模式下通常不自动关闭下拉框，方便继续选
  }
  else {
    // 单选逻辑
    if (props.value !== option.value) {
      emit('update:value', option.value)
      emit('change', option.value)
    }
    closeDropdown()
  }
}

function removeTag(val: string | number) {
  if (!isMultiple.value)
    return
  const currentList = Array.isArray(props.value) ? [...props.value] : []
  const index = currentList.indexOf(val)
  if (index > -1) {
    currentList.splice(index, 1)
    emit('update:value', currentList)
    emit('change', currentList)
  }
}

// --- Click Outside Logic ---
// 简单的点击外部关闭逻辑
function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="containerRef" class="relative w-full">
    <div
      class="min-h-[40px] w-full flex cursor-pointer items-center justify-between border rounded-md bg-white px-3 py-1.5 transition-colors"
      :class="[
        isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-blue-400',
        disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '',
      ]"
      @click="toggleDropdown"
    >
      <div class="flex flex-1 flex-wrap items-center gap-2 overflow-hidden">
        <span v-if="isEmpty" class="select-none text-gray-400">{{ placeholder }}</span>

        <span v-else-if="!isMultiple" class="select-none text-gray-700">
          {{ getLabel(Array.isArray(internalValue) ? internalValue[0] : internalValue) }}
        </span>

        <template v-else>
          <div
            v-for="item in visibleTags"
            :key="item.value"
            class="flex items-center gap-1 border border-gray-200 rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-700"
          >
            <span>{{ item.label }}</span>
            <button
              class="hover:text-red-500 focus:outline-none"
              @click.stop="removeTag(item.value)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div v-if="hiddenTagCount > 0" class="border border-gray-200 rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-500">
            +{{ hiddenTagCount }}
          </div>
        </template>
      </div>

      <div class="ml-2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto border border-gray-200 rounded-md bg-white shadow-lg"
      >
        <ul class="py-1">
          <li v-if="options.length === 0" class="px-4 py-2 text-center text-sm text-gray-400">
            No data
          </li>

          <li
            v-for="option in options"
            :key="option.value"
            class="group flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors"
            :class="[
              isSelected(option.value) ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100',
              isDisabledOption(option) ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
            ]"
            @click="handleSelect(option)"
          >
            <span>{{ option.label }}</span>

            <span v-if="isSelected(option.value)" class="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
