<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Ändra produkt: {{ product.name }}</h1>
    <section>
      <div class="border-2 p-1 md:p-10 rounded-lg mb-3 mt-3 md:w-fit">
        <p class="block mb-2 font-medium text-blue-500">
          Bilder går ej att uppdatera. Vill du ändra bild så radera produkten
          och lägg till den igen.
        </p>
        <div
          v-if="errormsg"
          class="bg-red-500 text-white text-bold text-center p-2"
        >
          <p>{{ errormsg }}</p>
        </div>
        <!-- form for updating product, get id from url -->
        <form
          class="md:w-fit md:grid md:gap-10 md:grid-cols-2"
          @submit.prevent="updateProduct(linkId)"
          ref="updateproduct"
        >
          <div>
            <label
              class="block mb-2 mt-4 text-sm font-medium text-gray-900"
              for="name"
              >Namn:</label
            >
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              name="name"
              id="name"
              v-model="product.name"
            />
            <label
              class="block mb-2 mt-4 text-sm font-medium text-gray-900"
              for="price"
              >Pris:</label
            >
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              name="price"
              id="price"
              v-model="product.price"
            />
            <label
              class="block mb-2 mt-4 text-sm font-medium text-gray-900"
              for="info"
              >Info:</label
            >
            <textarea
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="info"
              id="info"
              cols="20"
              rows="3"
              v-model="product.info"
            ></textarea>
            <label
              class="block mb-2 mt-4 text-sm font-medium text-gray-900"
              for="stock"
              >Antal:</label
            >
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              name="stock"
              id="stock"
              v-model="product.stock"
            />
          </div>
          <div>
            <label
              class="block mb-2 mt-7 text-sm font-medium text-gray-900"
              for="category"
              >Kategori</label
            >
            <!-- loop out categorys, brand and discounts -->
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="category"
              id="category"
              v-model="product.category_id"
            >
              <CategoryOptionsComp
                v-for="category in categorys"
                :category="category"
                :key="category.id"
              />
            </select>
            <label
              class="block mb-2 mt-7 text-sm font-medium text-gray-900"
              for="brand"
              >Märke</label
            >
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="brand"
              id="brand"
              v-model="product.brand_id"
            >
              <BrandOptionsComp
                v-for="brand in brands"
                :brand="brand"
                :key="brand.id"
              />
            </select>
            <label
              class="block mb-2 mt-7 text-sm font-medium text-gray-900"
              for="discount"
              >Rabatt</label
            >
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="discount"
              id="discount"
              v-model="product.discount_id"
            >
              <DiscountOptionsComp
                v-for="discount in discounts"
                :discount="discount"
                :key="discount.id"
              />
            </select>
          </div>
          <input
            class="col-span-2 mt-4 p-3 w-full font-bold flex justify-center bg-blue-200 hover:bg-blue-700 text-white rounded"
            type="submit"
            value="Spara"
          />
        </form>
      </div>
    </section>
  </article>
</template>

<script>
// import sourceData from "vue";
import CategoryOptionsComp from "../components/CategoryOptionsComp.vue";
import BrandOptionsComp from "../components/BrandOptionsComp.vue";
import DiscountOptionsComp from "../components/DiscountOptionsComp.vue";
import axios from "axios";
export default {
  name: "EditProductsView",
  data() {
    return {
      product: [],
      categorys: [],
      brands: [],
      discounts: [],
      errormsg: "",
    };
  },
  props: ["token"],
  // get id from url
  computed: {
    linkId() {
      return parseInt(this.$route.params.id);
    },
  },
  components: {
    CategoryOptionsComp,
    BrandOptionsComp,
    DiscountOptionsComp,
  },
  methods: {
    // get all categorys
    async getCategorys() {
      try {
        if (this.token) {
          const resp = await axios.get("http://127.0.0.1:8000/api/category", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // controll array
          const data = resp.data;
          if (data.length === 0) {
            this.errormsg += "Det finns inga kategorier att hämta.";
          } else {
            this.errormsg = "";
            this.categorys = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av kategorier.";
      }
    },
    // get all brands
    async getBrands() {
      try {
        if (this.token) {
          const resp = await axios.get("http://127.0.0.1:8000/api/brand", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // controll array
          const data = resp.data;
          if (data.length === 0) {
            this.errormsg += "Det finns inga märken att hämta.";
          } else {
            this.errormsg = "";
            this.brands = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av märkena.";
      }
    },
    // get all discounts
    async getDiscounts() {
      try {
        if (this.token) {
          const resp = await axios.get("http://127.0.0.1:8000/api/discount", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // controll array
          const data = resp.data;
          if (data.length === 0) {
            this.errormsg += "Det finns inga rabatter att hämta.";
          } else {
            this.errormsg = "";
            this.discounts = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av rabatterna.";
      }
    },
    // get product by id
    async getProductById(id) {
      try {
        if (this.token) {
          const resp = await axios.get(
            "http://127.0.0.1:8000/api/product/" + id,
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
            this.errormsg = "Det finns ingen produkt med detta IDt.";
          } else {
            this.errormsg = "";
            this.product = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av produkten.";
      }
    },
    //update product
    updateProduct(id) {
      axios
        .put("http://127.0.0.1:8000/api/product/" + id, this.product, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$router.push("/products");
          }
        });
    },
  },
  mounted() {
    this.getCategorys();
    this.getBrands();
    this.getDiscounts();
    this.getProductById(this.linkId);
  },
};
</script>
