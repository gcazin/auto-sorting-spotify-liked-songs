<template>
  <div class="card mb-4">
    <div class="card-header" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <h5 class="card-title text-white">{{ title }}</h5>
      <div class="card-text">
        <slot></slot>
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
  },
};
</script>

<style scoped>
.card {
  background: #1e1e2d;
  border-radius: 1.5rem;
}
</style>
