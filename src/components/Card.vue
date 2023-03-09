<template>
  <div class="px-5 py-3 bg-[#161616] rounded-lg shadow">
    <div class="card-header" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div :class="{'flex space-x-4': iconName}">
      <div
        class="flex items-center text-3xl bg-primary/10 text-primary rounded-full px-3"
        v-if="iconName"
      >
        <ion-icon :name="iconName"></ion-icon>
      </div>
      <div
        class="flex flex-col justify-between"
        :class="{
          'flex-row!': iconName,
        }"
      >
        <div
          class="flex"
          :class="{'justify-between items-center': hasPagination}"
        >
          <p class="text text-white uppercase">{{ title }}</p>
        </div>
        <div v-if="iconName">
          <div class="text-primary font-semibold text-3xl">
            <slot></slot>
          </div>
        </div>
        <slot v-else></slot>
      </div>
    </div>
  </div>
  <div v-if="hasPagination" class="text-center my-2">
    <slot name="pagination"></slot>
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
    hasPagination: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>

<style scoped>
.card {
  background: #1e1e1e;
}
</style>
