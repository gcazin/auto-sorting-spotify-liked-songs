<template>
  <button
    v-if="!isLink"
    class="btn"
    :class="property"
    type="button"
    :disabled="disabled"
  >
    <template v-if="icon">
      <ion-icon
        class="text-inherit align-middle px-1"
        :name="`${icon}-outline`"
      ></ion-icon>
    </template>
    <slot></slot>
  </button>
  <router-link v-else class="btn" :class="property" :to="{ name: to }" :disabled="disabled">
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
      default: 'primary',
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
        [`btn-${this.size}`]: true,
        [`btn-${this.color}`]: this.color && !this.outline,
        [`btn-outline-${this.color}`]: this.color && this.outline,
        'border-none hover:border-2 border-primary': this.borderless,
        'btn-disabled': this.disabled,
      };
    },
  },
};
</script>

<style scoped>

</style>
