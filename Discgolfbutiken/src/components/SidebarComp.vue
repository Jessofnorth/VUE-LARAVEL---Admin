<template>
  <aside
    id="sidebar"
    class="bg-gray-200 text-black overflow-scroll w-64 lg:w-80 p-2 lg:p-4 z-50 absolute inset-y-0 left-0 lg:relative lg:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out block"
  >
    <!-- navigation  -->
    <nav class="text-center">
      <ul class="pb-10">
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/">Admin</RouterLink>
        </li>
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/products">Produkter</RouterLink>
        </li>
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/categorys">Kategorier</RouterLink>
        </li>
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/users">Användare</RouterLink>
        </li>
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/brands">Märken</RouterLink>
        </li>
        <li class="p-2 text-xl font-bold underline hover:text-lime-800">
          <RouterLink to="/discounts">Rabatter</RouterLink>
        </li>
      </ul>
      <!-- search bar -->
      <div>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-fit p-2.5"
          type="search"
          name="search"
          id="search"
          placeholder="Sök produktnamn"
          v-model="str"
        />
        <button
          @click="search()"
          class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 mt-5 mx-2 text-center"
        >
          Sök
        </button>
      </div>
      <!-- sorting products -->
      <div class="my-6 px-y">
        <h2 class="text-xl font-bold">Sortera på:</h2>
        <div
          v-if="errormsg"
          class="bg-red-500 text-white text-sm text-bold text-center p-2"
        >
          <p>{{ errormsg }}</p>
        </div>
        <label
          class="block mb-2 mt-7 text-sm font-bold text-gray-900"
          for="category"
          >Kategori</label
        >
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="category"
          id="category"
          @change="sortCategory($event)"
        >
          <option value="0" disabled selected>Välj kategori</option>
          <CategoryOptionsComp
            v-for="category in categorys"
            :category="category"
            :key="category.id"
          />
        </select>
        <label
          class="block mb-2 mt-7 text-sm font-bold text-gray-900"
          for="brand"
          >Märke</label
        >
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="brand"
          id="brand"
          @change="sortBrand($event)"
        >
          <option value="0" disabled selected>Välj märke</option>
          <BrandOptionsComp
            v-for="brand in brands"
            :brand="brand"
            :key="brand.id"
          />
        </select>
        <label
          class="block mb-2 mt-7 text-sm font-bold text-gray-900"
          for="discount"
          >Rabatt</label
        >
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="discount"
          id="discount"
          @change="sortDiscount($event)"
        >
          <option value="0" disabled selected>Välj rabatt</option>
          <DiscountOptionsComp
            v-for="discount in discounts"
            :discount="discount"
            :key="discount.id"
          />
        </select>
      </div>
      <!-- logout -->
      <button
        @click="logout()"
        class="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 mt-5 text-center"
      >
        Logga ut
      </button>
    </nav>
  </aside>
</template>

<script>
import axios from "axios";
import router from "../router";
import CategoryOptionsComp from "./CategoryOptionsComp.vue";
import BrandOptionsComp from "./BrandOptionsComp.vue";
import DiscountOptionsComp from "./DiscountOptionsComp.vue";
export default {
  name: "SidebarComp",
  props: ["token"],
  data() {
    return {
      str: "",
      categorys: [],
      discounts: [],
      brands: [],
      errormsg: "",
    };
  },
  components: { CategoryOptionsComp, BrandOptionsComp, DiscountOptionsComp },
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
          if (resp.status != 200) {
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
        if (this.token != null) {
          const resp = await axios.get("http://127.0.0.1:8000/api/discount", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          // contorll array
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
    logout() {
      axios
        .post("http://127.0.0.1:8000/api/logout", {
          headers: {
            "Content-Type": "application/json",
            // eslint-disable-next-line prettier/prettier
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => res.json())
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          localStorage.removeItem("token");
          this.$emit("updateToken", this.token);
          this.$router.push({ name: "login" });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          localStorage.removeItem("token");
          this.$emit("updateToken", this.token);
          this.$router.push({ name: "login" });
        });
    },
    // re-route to search and sorting views
    search() {
      if (this.str.length != "") {
        router.push("/search/" + this.str);
      } else {
        this.errormsg = "Du måste ange ett sökord.";
      }
    },
    sortBrand(event) {
      router.push("/brand/sort/" + event.target.value);
    },
    sortDiscount(event) {
      router.push("/discount/sort/" + event.target.value);
    },
    sortCategory(event) {
      router.push("/categorys/sort/" + event.target.value);
    },
  },
  mounted() {
    this.getBrands();
    this.getCategorys();
    this.getDiscounts();
  },
};
</script>
