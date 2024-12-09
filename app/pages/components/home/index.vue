<script setup lang="ts">
import { MobilePage, PcPage } from './index'

defineOptions({
  name: 'HomeView',
})
</script>

<template>
  <div class="HomeView">
    <PcPage />
    <MobilePage />
  </div>
</template>

<style scoped>

</style>
