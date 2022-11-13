<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="full-page mt-5">
    <section class="h-100">
      <header class="container-fluid h-100">
        <div class="d-flex flex-column align-items-center justify-content-center h-100">
          <div>
            <a href="/" class="display-6 fw-bold text-decoration-none text-white text-uppercase">
              Auto sorting liked songs
            </a>
          </div>
          <div class="container my-4">
            <RouterView />
          </div>
        </div>
      </header>
    </section>
  </div>

</template>
<style>
html, body {
  background: #151521;
}
</style>
