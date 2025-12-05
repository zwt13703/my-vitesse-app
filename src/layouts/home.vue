<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
    <TheNavigation />
    <main class="flex-grow pt-16">
      <RouterView />
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>
