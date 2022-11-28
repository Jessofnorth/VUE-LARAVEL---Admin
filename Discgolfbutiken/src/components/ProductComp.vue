<template>
  <!-- article with each product inside. eventlistener on delete btn -->
  <article
    class="border-2 p-5 rounded-lg drop-shadow-lg mb-3 mt-3 hover:bg-slate-50 w-64 md:w-80"
  >
    <!-- print all the product information -->
    <div v-if="product.image_url">
      <img
        class="max-h-72 max-w-72 my-0 mx-auto"
        :src="product.image_url"
        alt="Bild på disc"
      />
    </div>
    <h3 class="font-bold text-lg pt-2 text-lime-800">
      {{ product.name }}
    </h3>
    <p class="pt-2"><strong>Pris:</strong> {{ product.price }} kr</p>
    <p class="pt-2"><strong>Märke:</strong> {{ product.brand_name }}</p>
    <p class="pt-2"><strong>Kategori:</strong> {{ product.category_name }}</p>
    <p class="pt-2"><strong>Antal:</strong> {{ product.stock }}st</p>
    <p class="pt-2"><strong>Rabatt:</strong> {{ product.discount_name }}%</p>
    <p class="pt-2"><strong>Info:</strong> {{ product.info }}</p>
    <div class="flex justify-evenly mt-4">
      <!-- btns with eventlisteners -->
      <button
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('editProduct')"
      >
        Ändra
      </button>
      <button
        class="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('deleteProduct')"
      >
        Radera
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "ProductComp",
  props: {
    product: Object,
  },
};
</script>
