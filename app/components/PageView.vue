<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(() => data.value?.startAt || 0)
</script>

<template>
  <div v-animate="{ name: 'fadeInUp', duration: '1s' }" text-gray:80>
    <span text-gray font-500>{{ data?.pageview }}</span>
    page views since
    <span text-gray>{{ time }}</span>
    <span v-number-scroll="{ endVal: 5500, duration: 2000, useEasing: true }" class="number" /><span class="unit">万 <sup>+</sup></span>
  </div>
</template>
