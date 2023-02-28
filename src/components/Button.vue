<template>
  <button
    v-if="!isLink"
    :class="property"
    type="button"
    :disabled="disabled"
  >
    <template v-if="icon">
      <ion-icon
        class="text-2xl align-middle bg-blue-500 p-2 rounded-full text-white"
        :name="`${icon}-outline`"
      ></ion-icon>
    </template>
    <slot></slot>
  </button>
  <router-link v-else :class="property" :to="{ name: to }" :disabled="disabled">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'Button',
  props: {
    // Style
    size: {
      type: String,
      default: 'normal',
    },
    color: {
      type: String,
      default: 'success',
    },
    outline: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    // Link
    isLink: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
    },
    // State
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    property() {
      return {
        'btn fw-bold': true,
        [`btn-${this.size}`]: true,
        [`btn-${this.color}`]: this.color && !this.outline,
        [`btn-outline-${this.color}`]: this.color && this.outline,
        'border-0': this.borderless,
      };
    },
  },
};
</script>

<style scoped>

</style>
