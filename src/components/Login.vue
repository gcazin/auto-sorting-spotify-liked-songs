<template>

</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },
  props: {
    text: {
      type: String,
    },
  },
  watch: {
    '$route.query': function () {
      console.log('oui');
    },
  },
  methods: {

  },
};
</script>
