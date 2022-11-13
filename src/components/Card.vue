<template>
  <div class="card mb-4">
    <div class="card-header" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <h5 class="card-title text-white text-uppercase">{{ title }}</h5>
      <div class="card-text">
        <div class="d-flex align-items-center gap-3 py-2" v-if="iconName">
          <div class="fs-1">
            <ion-icon class="bg-success rounded align-middle text-white p-2" :name="iconName"></ion-icon>
          </div>
          <div class="text-white d-flex align-items-center fs-2">
            <slot></slot>
          </div>
        </div>
        <slot v-else></slot>
      </div>
    </div>
    <div class="card-footer" v-if="hasFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
    },
    hasHeader: {
      type: Boolean,
      default: false,
    },
    hasFooter: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card {
  background: #1e1e2d;
  border-radius: 1.5rem;
}
</style>
