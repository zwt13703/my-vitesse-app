<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

// --- 类型定义 ---
type Placement =
  | 'top' | 'top-left' | 'top-right'
  | 'bottom' | 'bottom-left' | 'bottom-right'
  | 'left' | 'left-top' | 'left-bottom'
  | 'right' | 'right-top' | 'right-bottom'

interface ButtonProps {
  size?: 'small' | 'medium'
  disabled?: boolean
  loading?: boolean
}

interface Props {
  title?: string
  description?: string
  okText?: string
  cancelText?: string
  okType?: 'primary' | 'danger' | 'default'
  showCancel?: boolean
  icon?: string
  disabled?: boolean
  open?: boolean

  // 新增位置参数
  placement?: Placement
  arrowPointAtCenter?: boolean

  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  okText: '确定',
  cancelText: '取消',
  okType: 'primary',
  showCancel: true,
  disabled: false,
  open: undefined,
  placement: 'top', // 默认上方
  arrowPointAtCenter: false, // 默认不强制居中
  okButtonProps: () => ({}),
  cancelButtonProps: () => ({}),
})

const emit = defineEmits<{
  (e: 'update:open', visible: boolean): void
  (e: 'confirm', ev: MouseEvent): void
  (e: 'cancel', ev: MouseEvent): void
  (e: 'openChange', visible: boolean): void
}>()

// --- 状态与逻辑 ---
const internalVisible = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const isVisible = computed({
  get: () => props.open !== undefined ? props.open : internalVisible.value,
  set: (val) => {
    internalVisible.value = val
    emit('update:open', val)
    emit('openChange', val)
  },
})

function handleTriggerClick() {
  if (props.disabled)
    return
  isVisible.value = !isVisible.value
}

function handleCancel(e: MouseEvent) {
  isVisible.value = false
  emit('cancel', e)
}

function handleConfirm(e: MouseEvent) {
  isVisible.value = false
  emit('confirm', e)
}

function handleClickOutside(event: MouseEvent) {
  if (!isVisible.value)
    return
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isVisible.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// --- 核心：位置样式计算系统 ---

// 1. 气泡容器的位置 (相对于 Trigger)
const overlayPositionClass = computed(() => {
  const map: Record<Placement, string> = {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2.5',
    'top-left': 'bottom-full left-0 mb-2.5',
    'top-right': 'bottom-full right-0 mb-2.5',

    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2.5',
    'bottom-left': 'top-full left-0 mt-2.5',
    'bottom-right': 'top-full right-0 mt-2.5',

    'left': 'right-full top-1/2 -translate-y-1/2 mr-2.5',
    'left-top': 'right-full top-0 mr-2.5',
    'left-bottom': 'right-full bottom-0 mr-2.5',

    'right': 'left-full top-1/2 -translate-y-1/2 ml-2.5',
    'right-top': 'left-full top-0 ml-2.5',
    'right-bottom': 'left-full bottom-0 ml-2.5',
  }
  return map[props.placement] || map.top
})

// 2. 箭头的位置与旋转 (相对于 Popover)
const arrowPositionClass = computed(() => {
  const base = 'absolute h-3 w-3 bg-white border-slate-200 z-[-1]' // z-index -1 保证在阴影下方，但需要父级不遮挡

  // 基础偏移量
  // const centerOffset = props.arrowPointAtCenter ? 'left-1/2 -translate-x-1/2' : ''
  // 如果不是 PointAtCenter，根据 Left/Right 微调箭头位置，避免靠太边
  const hAlign = props.arrowPointAtCenter ? '' : (props.placement.includes('left') ? 'left-4' : props.placement.includes('right') ? 'right-4' : '')
  const vAlign = props.arrowPointAtCenter ? '' : (props.placement.includes('top') ? 'top-3' : props.placement.includes('bottom') ? 'bottom-3' : '')

  // 12个方向的箭头逻辑
  // 核心原理：Top 气泡，箭头在 Bottom，边框是 右下 (旋转45度)
  if (props.placement.startsWith('top')) {
    return `${base} -bottom-1.5 border-b border-r rotate-45 ${props.placement === 'top' || props.arrowPointAtCenter ? 'left-1/2 -translate-x-1/2' : hAlign}`
  }
  if (props.placement.startsWith('bottom')) {
    return `${base} -top-1.5 border-t border-l rotate-45 ${props.placement === 'bottom' || props.arrowPointAtCenter ? 'left-1/2 -translate-x-1/2' : hAlign}`
  }
  if (props.placement.startsWith('left')) {
    return `${base} -right-1.5 border-t border-r rotate-45 ${props.placement === 'left' || props.arrowPointAtCenter ? 'top-1/2 -translate-y-1/2' : vAlign}`
  }
  if (props.placement.startsWith('right')) {
    return `${base} -left-1.5 border-b border-l rotate-45 ${props.placement === 'right' || props.arrowPointAtCenter ? 'top-1/2 -translate-y-1/2' : vAlign}`
  }
  return ''
})

// 3. 过渡动画方向 (Transform Origin)
const transitionOriginClass = computed(() => {
  if (props.placement.startsWith('top'))
    return 'origin-bottom'
  if (props.placement.startsWith('bottom'))
    return 'origin-top'
  if (props.placement.startsWith('left'))
    return 'origin-right'
  if (props.placement.startsWith('right'))
    return 'origin-left'
  return 'origin-center'
})

// 按钮样式
const okBtnClass = computed(() => {
  const base = 'rounded px-3 py-1 text-xs text-white transition-colors'
  switch (props.okType) {
    case 'danger': return `${base} bg-red-500 hover:bg-red-600 border border-red-500`
    case 'default': return 'rounded px-3 py-1 text-xs text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-500 transition-colors bg-white'
    default: return `${base} bg-blue-600 hover:bg-blue-700 border border-blue-600`
  }
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <!-- Trigger -->
    <div class="inline-block cursor-pointer" @click.stop="handleTriggerClick">
      <slot />
    </div>

    <!-- Popover -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible"
        class="absolute z-50 w-45 cursor-default border border-slate-200 rounded-lg bg-white p-3 shadow-xl"
        :class="[overlayPositionClass, transitionOriginClass]"
        @click.stop
      >
        <!-- Arrow -->
        <div :class="arrowPositionClass" />

        <!-- Content -->
        <div class="relative z-10 flex items-start gap-3">
          <div class="mt-0.5 flex-shrink-0">
            <slot name="icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </slot>
          </div>
          <div class="flex-1">
            <div class="break-words text-sm text-slate-800 font-bold">
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <div v-if="description || $slots.description" class="mt-1 break-words text-xs text-slate-500">
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="relative z-10 mt-2 flex justify-end gap-2">
          <slot name="cancelButton">
            <button
              v-if="showCancel"
              class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100"
              :disabled="cancelButtonProps.disabled"
              @click="handleCancel"
            >
              <slot name="cancelText">
                {{ cancelText }}
              </slot>
            </button>
          </slot>

          <slot name="okButton">
            <button
              :class="okBtnClass"
              :disabled="okButtonProps.disabled || okButtonProps.loading"
              @click="handleConfirm"
            >
              <span v-if="okButtonProps.loading" class="mr-1 inline-block h-3 w-3 animate-spin border-2 border-white/30 border-t-white rounded-full" />
              <slot name="okText">
                {{ okText }}
              </slot>
            </button>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
