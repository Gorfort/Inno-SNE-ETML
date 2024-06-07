<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'

onMounted(() => {
  localStorage.clear()
})
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
</template>

<style scoped></style>
