<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="px-4 py-5">
      <div class="text-center">
        <a href="/" class="display-5 fw-bold text-decoration-none text-white">Auto sorting liked songs</a>
      </div>
      <hr>
      <div class="my-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
