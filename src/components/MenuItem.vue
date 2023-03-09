<template>
  <li class="mr-2">
    <a
      href="#"
      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary"
      :class="{'text-primary !border-primary': active}"
    >
      {{ text }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'MenuItem',

  props: {
    text: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
