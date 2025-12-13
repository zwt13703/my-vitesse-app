<script setup lang="ts">
// 模拟异步删除
const isDeleting = ref(false)
function confirmDelete() {
  isDeleting.value = true
  setTimeout(() => {
    console.warn('删除成功')
    isDeleting.value = false
  }, 1000)
}

function handleCancel() {
  console.warn('用户取消了操作')
}
</script>

<template>
  <div class="h-screen flex flex-wrap items-center justify-center gap-4 p-20">
    <!-- 1. 标准上方 (Top) -->
    <w-popconfirm title="默认上方" placement="top">
      <button class="btn">
        Top
      </button>
    </w-popconfirm>

    <!-- 2. 左上对齐 (Top Left) -->
    <w-popconfirm title="左上对齐" placement="top-left">
      <button class="btn">
        Top Left
      </button>
    </w-popconfirm>

    <!-- 3. 左上对齐 + 箭头指向中心 -->
    <w-popconfirm
      title="左上 + 箭头居中"
      placement="top-left"
      arrow-point-at-center
    >
      <button class="w-32 btn">
        Top Left Center
      </button>
    </w-popconfirm>

    <!-- 4. 右侧 (Right) -->
    <w-popconfirm title="右侧显示" placement="right">
      <button class="btn">
        Right
      </button>
    </w-popconfirm>

    <!-- 5. 底部右对齐 (Bottom Right) -->
    <w-popconfirm title="底部右对齐" placement="bottom-right">
      <button class="btn">
        Bottom Right
      </button>
    </w-popconfirm>

    <!-- 1. 基础用法 -->
    <w-popconfirm
      title="确认移除此专业？"
      @confirm="confirmDelete"
    >
      <a href="#" class="text-blue-600 hover:underline">移除 (基础)</a>
    </w-popconfirm>

    <!-- 2. 危险操作 + 异步加载 + 描述 -->
    <w-popconfirm
      title="确定要删除这个任务吗？"
      description="删除后无法恢复，请谨慎操作。"
      ok-text="是的，删除"
      ok-type="danger"
      :ok-button-props="{ loading: isDeleting }"
      @confirm="confirmDelete"
      @cancel="handleCancel"
    >
      <button class="rounded bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200">
        删除任务 (高级)
      </button>
    </w-popconfirm>

    <!-- 3. 自定义 Icon 和 Slot 内容 -->
    <w-popconfirm title="" ok-text="立即保存">
      <!-- Trigger -->
      <button class="border border-slate-300 rounded px-4 py-2 shadow-sm">
        自定义插槽
      </button>

      <!-- Slots -->
      <template #icon>
        <span class="text-xl">🎉</span>
      </template>
      <template #title>
        <span class="text-purple-600">恭喜你发现彩蛋</span>
      </template>
      <template #description>
        这里可以放很长很长的<br>HTML内容哦。
      </template>
    </w-popconfirm>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 bg-white border border-slate-300 rounded hover:border-blue-500 transition-colors shadow-sm;
}
</style>
