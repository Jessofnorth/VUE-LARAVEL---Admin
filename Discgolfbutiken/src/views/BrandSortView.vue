<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Sortering efter märke</h1>
    <p v-if="errmessage" class="bg-red-500 text-white text-bold">
      {{ errmessage }}
    </p>
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
  name: "BrandSortView",
  data() {
    return {
      products: [],
      id: "",
      errmessage: "",
    };
  },
  props: ["token"],
  components: {
    ProductComp,
  },
  computed: {
    brandId() {
      return this.$route.params.id;
    },
  },
  // watch for change and reload if any
  watch: {
    brandId() {
      this.getProductsByBrand(this.brandId);
    },
  },
  methods: {
    // get all brands
    async getProductsByBrand(id) {
      try {
        const resp = await axios.get(
          "http://127.0.0.1:8000/api/product/brand/" + id,
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
          this.errmessage = "Det finns inga produkter att hämta.";
        } else {
          this.errmessage = "";
          this.products = data;
        }
      } catch (error) {
        this.errmessage = "Något gick fel med hämtningen av produkterna.";
        return this.errormsg;
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
      this.errmessage = "Produkten är raderad.";
      this.getProductsByBrand(this.brandId);
    },
    // redirect to edit product page and send id
    editProduct(id) {
      router.push("/editproduct/" + id);
    },
  },
  mounted() {
    this.getProductsByBrand(this.brandId);
  },
};
</script>
