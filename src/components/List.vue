<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead>
    <tr>
      <th
        scope="col"
        class="py-4"
        :class="{'text-right': column?.align === 'right'}"
        v-for="(column, index) in properties"
        :key="index"
      >
        {{ column.name }}
      </th>
      <th v-if="hasActions" scope="col" class="text-right py-4"></th>
    </tr>
    </thead>
    <tbody>
    <tr class="text-base" v-for="(item, index) in data" :key="index">
      <td
        v-for="(property, index) in properties"
        :key="index"
        class="uppercase text-white pb-2"
        :class="{'text-right': property?.align === 'right'}"
      >
        <slot :name="property.property" :item="item">
          {{ item[property.property] }}
        </slot>
      </td>
      <td v-if="hasActions" class="space-x-1 flex justify-end items-center pb-4">
        <slot name="actions" :item="item" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'List',

  props: {
    properties: {
      type: Array,
    },
    data: {
      type: Array,
    },
    hasActions: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

</style>
