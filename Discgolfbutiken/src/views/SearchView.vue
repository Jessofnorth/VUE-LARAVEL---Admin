<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Sökresultat</h1>
    <div
      v-if="errormsg"
      class="bg-red-500 text-white text-bold text-center p-2"
    >
      <p>{{ errormsg }}</p>
    </div>
    <!-- print products if any matches search -->
    <div class="flex flex-wrap place-content-evenly md:gap-4">
      <ProductComp
        @deleteProduct="deleteProduct(product.id)"
        @editProduct="editProduct(product.id)"
        v-for="product in products"
        :product="product"
        :key="product.id"
      />
    </div>
  </article>
</template>

<script>
import axios from "axios";
import router from "../router";
import ProductComp from "../components/ProductComp.vue";
export default {
  name: "SearchView",
  data() {
    return {
      products: [],
      str: "",
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    ProductComp,
  },
  computed: {
    searchStr() {
      return this.$route.params.str;
    },
  },
  watch: {
    searchStr() {
      this.getSearch(this.searchStr);
    },
  },
  methods: {
    // find matches to search string
    async getSearch(id) {
      try {
        const resp = await axios.get(
          "http://127.0.0.1:8000/api/search/product/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // controll array
        const data = resp.data;
        if (data.length === 0) {
          this.products = {};
          this.errormsg = "Det finns inga produkter som matchar sökningen.";
        } else {
          this.errormsg = "";
          this.products = data;
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av produkterna.";
      }
    },
    // delete product
    async deleteProduct(id) {
      const resp = await axios("http://127.0.0.1:8000/api/product/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      // eslint-disable-next-line no-unused-vars
      const data = resp.data;
      this.errormsg = "Produkten är raderad.";
      setTimeout(() => this.getSearch(this.searchStr), 3000);
    },
    // redirect to edit product page and send id
    editProduct(id) {
      router.push("/editproduct/" + id);
    },
  },
  mounted() {
    this.getSearch(this.searchStr);
  },
};
</script>
