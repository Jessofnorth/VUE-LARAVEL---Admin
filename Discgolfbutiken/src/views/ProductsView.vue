<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Produkter</h1>
    <section>
      <!-- Show/hide form -->
      <button
        @click="showAdd()"
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Lägg till produkt
      </button>
      <AddProductComp :token="token" @productAdded="getProducts()" />
    </section>
    <!-- print products -->
    <section>
      <h2 class="text-2xl pt-3">Hantera produkter</h2>
      <div
        v-if="errormsg"
        class="bg-red-500 text-white text-bold text-center p-2"
      >
        <p>{{ errormsg }}</p>
      </div>
      <div class="flex flex-wrap place-content-evenly md:gap-4">
        <ProductComp
          @deleteProduct="deleteProduct(product.id)"
          @editProduct="editProduct(product.id)"
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import ProductComp from "../components/ProductComp.vue";
import AddProductComp from "../components/AddProductComp.vue";
import router from "../router";
export default {
  name: "ProductView",
  data() {
    return {
      products: [],
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    ProductComp,
    AddProductComp,
  },
  methods: {
    // get all products
    async getProducts() {
      try {
        if (this.token) {
          const resp = await axios.get("http://127.0.0.1:8000/api/product", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // controll array
          const data = resp.data;
          if (data.length === 0) {
            this.errormsg = "Det finns inga produkter att hämta.";
          } else {
            this.errormsg = "";
            this.products = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av produkter.";
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
      this.errormsg = "Produkten raderad.";
      // reload product list
      setTimeout(() => this.getProducts(), 3000);
    },
    // redirect to edit product page and send id
    editProduct(id) {
      router.push("/editproduct/" + id);
    },
    // show add form
    showAdd() {
      let btn = document.querySelector("#addProduct");
      btn.classList.toggle("block");
      btn.classList.toggle("hidden");
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
