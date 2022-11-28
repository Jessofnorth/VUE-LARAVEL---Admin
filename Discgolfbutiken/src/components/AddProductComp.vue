<template>
  <div
    id="addProduct"
    class="border-2 p-1 md:p-10 rounded-lg mb-3 mt-3 md:w-fit hidden"
  >
    <div class="bg-red-500 text-center font-bold text-white">
      <p>{{ errormsg }}</p>
    </div>
    <div class="bg-blue-500 text-center font-bold text-white">
      <p>{{ msg }}</p>
    </div>
    <p class="block mb-2 font-medium text-blue-500">
      Alla fält, utom bild, måste fyllas i. Bilder måste vara i formatet JPG.
    </p>
    <!-- form for products -->
    <form
      class="md:w-fit md:grid md:gap-10 md:grid-cols-2"
      @submit.prevent="addProduct()"
      ref="addproduct"
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
          required
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
          required
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
          required
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
          required
        />
      </div>
      <div>
        <label
          class="block mb-2 mt-4 text-sm font-medium text-gray-900"
          for="img"
          >Bild:</label
        >
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          id="img"
          type="file"
          ref="file"
          @change="fileUpload()"
        />
        <div>
          <label
            class="block mb-2 mt-7 text-sm font-medium text-gray-900"
            for="category"
            >Kategori</label
          >
          <select
            class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="category"
            id="category"
            v-model="product.category_id"
            required
          >
            <option value="0" disabled selected>Välj kategori</option>
            <CategoryOptionsComp
              v-for="category in categorys"
              :category="category"
              :key="category.id"
            />
          </select>
        </div>
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
          required
        >
          <option value="0" disabled selected>Välj märke</option>
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
          required
        >
          <option value="0" disabled selected>Välj rabatt</option>
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
</template>

<script>
import CategoryOptionsComp from "../components/CategoryOptionsComp.vue";
import BrandOptionsComp from "../components/BrandOptionsComp.vue";
import DiscountOptionsComp from "../components/DiscountOptionsComp.vue";
import axios from "axios";
export default {
  name: "AddProductComp",
  data() {
    return {
      product: {
        name: "",
        price: 0,
        info: "",
        stock: 0,
        category_id: 0,
        brand_id: 0,
        discount_id: 0,
        img: "",
      },
      categorys: [],
      brands: [],
      discounts: [],
      errormsg: "",
      msg: "",
    };
  },
  props: ["token"],
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
          if (data.lenght === 0) {
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
          if (data.lenght === 0) {
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
          if (data.lenght === 0) {
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
    // handle files
    fileUpload() {
      this.product.img = this.$refs.file.files[0];
    },
    //add product
    addProduct() {
      // send request with axions
      try {
        axios
          .post("http://127.0.0.1:8000/api/product", this.product, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((resp) => {
            if (resp.status === 201) {
              this.msg = "Produkten sparad!";
              // clear form
              this.product = {};
              this.$refs.file.value = "";
              this.$emit("productAdded");
            }
          });
      } catch (error) {
        this.errormsg = "Något gick fel med lagrningen av produkten.";
      }
    },
  },
  mounted() {
    this.getCategorys();
    this.getBrands();
    this.getDiscounts();
  },
};
</script>
