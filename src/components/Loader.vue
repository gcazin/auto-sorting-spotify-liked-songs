<template>
  <div class="loader">
    <div class="loader-bars mx-auto">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="loader-text text-center mt-3 text-uppercase fs-5">
      <div class="d-flex justify-content-center align-items-center mx-auto">
        <div class="spinner-border text-success" role="status"></div>
        <div class="ms-2">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @see https://codepen.io/MyXoToD/pen/nqjjNN
 */

export default {
  name: 'Loader',
  props: {
    text: {
      type: String,
    },
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
  background: #ccc;
  width: 7px;
  height: 10%;
  border-radius: 14px;
  margin-right: 5px;
  float: left;
  margin-top: 25%;
}
.loader .loader-bars span:last-child {
  margin-right: 0px;
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
