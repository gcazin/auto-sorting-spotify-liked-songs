<template>
  <Button
    :disabled="findPagination(name)?.currentPage === 0"
    class="rounded-circle"
    outline
    icon="chevron-back"
    style="min-width: auto"
    size="sm"
    @click="changePage(findPagination(name)?.currentPage - 1, name)"
  >
  </Button>
  <span class="badge badge-success">
    {{ findPagination(name)?.currentPage + 1 }} / {{ findPagination(name)?.chunks?.length }}
  </span>
  <Button
    :disabled="findPagination(name)?.currentPage + 1 === findPagination(name)?.chunks?.length"
    class="rounded-circle"
    icon="chevron-forward"
    style="min-width: auto"
    size="sm"
    outline
    @click="changePage(findPagination(name)?.currentPage + 1, name)"
  ></Button>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Pagination',
  components: {
    Button,
  },
  props: {
    name: {
      type: String,
    },
    data: {
      type: Array,
    },
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      pagination: [
        {
          name: this.name,
          number: null,
          chunks: null,
          currentPage: 0,
        },
      ],
    };
  },
  mounted() {
    this.getPagination(this.data, this.name);
  },
  methods: {
    findPagination(paginationName) {
      return this.pagination
        .find((pagination) => pagination.name === paginationName);
    },
    changePage(page, paginationName) {
      this.findPagination(paginationName).currentPage = page;
      this.emit();
    },
    /**
     * Create a pagination for a given data
     * @param data
     * @param paginationName
     */
    getPagination(data, paginationName) {
      const chunks = [];
      for (let i = 0; i < data.length; i += this.perPage) {
        const chunk = data.slice(i, i + this.perPage);
        chunks.push(chunk);
      }
      const findPagination = this.findPagination(paginationName);
      findPagination.number = chunks.length;
      findPagination.chunks = chunks;
      this.emit();
      return chunks;
    },
    emit() {
      this.$emit('data', {
        name: this.name,
        data: this.findPagination(this.name).chunks[this.findPagination(this.name).currentPage],
      });
    },
  },
};
</script>

<style scoped>

</style>
