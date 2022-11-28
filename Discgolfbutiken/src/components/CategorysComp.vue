<template>
  <!-- article with each product inside. eventlistener on delete btn -->
  <article
    class="border-2 p-5 rounded-lg drop-shadow-lg mb-3 mt-3 hover:bg-slate-50 w-64 md:w-80"
  >
    <!-- print all the category information -->
    <h3 class="font-bold text-lg pt-2 text-lime-800 text-center">
      {{ category.category }}
    </h3>
    <div class="flex justify-evenly mt-4">
      <button
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('editCategory')"
      >
        Ändra
      </button>
      <button
        class="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('deleteCategory')"
      >
        Radera
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "CategorysComp",
  props: {
    category: Object,
  },
};
</script>
