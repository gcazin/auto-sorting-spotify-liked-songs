<template>
  <div class="relative">
    <button
      @click="openDropdown = !openDropdown"
      id="dropdownMenuIconButton"
      data-dropdown-toggle="dropdownDots"
      class="inline-flex items-center p-2 text-sm font-medium text-center text-primary focus:ring-4 focus:outline-none focus:ring-primary rounded-lg"
      type="button"
    >
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownDots"
      class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 bg-[#121212] absolute top-12 right-0"
      :class="{'hidden': !openDropdown}"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-primary text-white">View genres</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View tracks</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      openDropdown: false,
    };
  },
};
</script>

<style scoped>

</style>
