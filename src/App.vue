<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
html, body {
  background: #121212;
}

h1 {
  font-weight: 800;
  line-height: 0.9em;
}

.rainbow-text {
  background:-webkit-linear-gradient(180deg, var(--bs-primary), var(--bs-success));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
</style>
