<template>
  <div
    class="mx-auto px-2 sm:px-6 lg:px-32"
    :class="`bg-[#${background ?? '#121212'}]`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    background: {
      type: String,
    },
  },
};
</script>

<style scoped>

</style>
