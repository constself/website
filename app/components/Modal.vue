<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  class: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

function close() {
  emit('update:visible', false)
}

// Watch for changes in visibility to toggle body scrolling
watch(() => props.visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})

// Ensure overflow is reset when component is unmounted
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="props.visible" class="modal-overlay" @click="close">
    <div class="modal-content" :class="props.class" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal-content {
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}
</style>
