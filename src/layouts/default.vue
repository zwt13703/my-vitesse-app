<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
    <TheNavigation />
    <main class="flex-grow px-4 py-10 pt-16 text-center">
      <RouterView />
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>
