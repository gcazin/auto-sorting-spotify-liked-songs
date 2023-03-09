<template>
  <div class="loader">
    <div class="loader-bars mx-auto">
      <span v-for="n in numberOfBars" :key="n"></span>
    </div>
    <div class="text-center mt-8 uppercase">
      <Text>{{ text }}</Text>
    </div>
  </div>
</template>

<script>/**
 * @see https://codepen.io/MyXoToD/pen/nqjjNN
 */
import Text from '@/components/Text.vue';

export default {
  name: 'Loader',
  components: { Text },
  props: {
    text: {
      type: String,
    },
  },
  data() {
    return {
      numberOfBars: 15,
    };
  },
};
</script>

<style scoped>
.loader {

}
.loader-bars {
  width: 175px;
  height: 100px;
}
.loader .loader-bars span {
  display: block;
  background: var(--primary);
  width: 7px;
  height: 10%;
  border-radius: 14px;
  margin-right: 5px;
  float: left;
  margin-top: 25%;
}
.loader .loader-bars span:last-child {
  margin-right: 0;
}
.loader .loader-bars span:nth-child(1) {
  animation: load 2.5s 1.4s infinite linear;
}
.loader .loader-bars span:nth-child(2) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader .loader-bars span:nth-child(3) {
  animation: load 2.5s 1s infinite linear;
}
.loader .loader-bars span:nth-child(4) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader .loader-bars span:nth-child(5) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader .loader-bars span:nth-child(6) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader .loader-bars span:nth-child(7) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader .loader-bars span:nth-child(8) {
  animation: load 2.5s 0s infinite linear;
}
.loader .loader-bars span:nth-child(9) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader .loader-bars span:nth-child(10) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader .loader-bars span:nth-child(11) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader .loader-bars span:nth-child(12) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader .loader-bars span:nth-child(13) {
  animation: load 2.5s 1s infinite linear;
}
.loader .loader-bars span:nth-child(14) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader .loader-bars span:nth-child(15) {
  animation: load 2.5s 1.4s infinite linear;
}

@keyframes load {
  0% {
    background: var(--bs-success);
    margin-top: 25%;
    height: 10%;
  }
  50% {
    background: var(--bs-success);
    height: 100%;
    margin-top: 0;
  }
  100% {
    background: var(--bs-success);
    height: 10%;
    margin-top: 25%;
  }
}
</style>
