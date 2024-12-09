<script setup lang="ts">
import { HomeView } from './components/home'

definePageMeta({
  layout: 'home',
})

const online = useOnline()
</script>

<template>
  <div>
    <ClientOnly>
      <Suspense>
        <HomeView v-if="online" />
        <div v-else text-gray:80>
          您在离线状态
        </div>
        <template #fallback>
          <div italic op50>
            <span animate-pulse>加载中...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div op50>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
