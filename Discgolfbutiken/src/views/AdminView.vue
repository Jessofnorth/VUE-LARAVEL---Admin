<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3">Admin för Discgolfbutiken</h1>
    <h2 class="text-2xl pt-3 text-lime-800 text-bold">
      Totalt antal produkter på lager: {{ this.products.total }} st
    </h2>
    <div
      v-if="errormsg"
      class="bg-red-500 text-white text-sm text-bold text-center p-2"
    >
      <p>{{ errormsg }}</p>
    </div>
    <div class="my-6">
      <p class="pt-2">
        Hantera produkter, kategorier, rabatter, märken och användare via menyn
        till vänster, eller genom att klicka på meny knappen i header på mindre
        skärmar.
      </p>
      <p class="pt-2">Sök på produkters namn i sökrutan.</p>
      <p class="pt-2">
        Sortera på märke, kategori och rabatt med rullistorna i menyn.
      </p>
    </div>
  </article>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminView",
  data() {
    return {
      products: [],
      errormsg: "",
    };
  },
  props: ["token"],
  methods: {
    // get all products
    async getProducts() {
      try {
        if (this.token) {
          const resp = await axios.get("http://127.0.0.1:8000/api/calculate", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // controll array
          const data = resp.data;
          if (data.length === 0) {
            this.products.total = "0";
          } else {
            this.errormsg = "";
            this.products = data;
          }
        }
      } catch (error) {
        this.products.total = "0";
        this.errormsg = "Något gick fel med hämtningen av produkter.";
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
