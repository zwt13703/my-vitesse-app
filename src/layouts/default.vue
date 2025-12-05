<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
    <TheNavigation />
    <main class="flex-grow pt-16 px-4 py-10 text-center">
      <RouterView />
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>
