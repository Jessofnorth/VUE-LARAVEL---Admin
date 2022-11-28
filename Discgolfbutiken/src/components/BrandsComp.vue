<template>
  <!-- article with each brand inside. eventlistener on delete btn -->
  <article
    class="border-2 p-5 rounded-lg drop-shadow-lg mb-3 mt-3 hover:bg-slate-50 w-64 md:w-80"
  >
    <!-- print all the category information -->
    <h3 class="font-bold text-lg pt-2 text-lime-800">
      {{ brand.brand_name }}
    </h3>
    <p class="pt-2">
      <strong>Kontaktperson:</strong> {{ brand.brand_contact }}
    </p>
    <p class="pt-2"><strong>Telefon:</strong> {{ brand.brand_phone }}</p>
    <p class="pt-2"><strong>Email:</strong> {{ brand.brand_email }}</p>
    <div class="flex justify-evenly mt-4">
      <button
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('editBrand')"
      >
        Ändra
      </button>
      <button
        class="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="$emit('deleteBrand')"
      >
        Radera
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "BrandComp",
  props: {
    brand: Object,
  },
};
</script>
