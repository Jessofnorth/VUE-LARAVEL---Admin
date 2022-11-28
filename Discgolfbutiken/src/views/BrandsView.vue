<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Märken</h1>
    <section>
      <!-- btn show/hide form -->
      <button
        @click="showAdd()"
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Lägg till märke
      </button>
      <AddBrandsComp :token="token" @brandAdded="getBrands()" />
    </section>
    <!-- print brands -->
    <section>
      <h2 class="text-2xl pt-3">Hantera märken</h2>
      <div
        v-if="errormsg"
        class="bg-red-500 text-white text-sm text-bold text-center p-2"
      >
        <p>{{ errormsg }}</p>
      </div>
      <div class="flex flex-wrap place-content-evenly md:gap-4">
        <BrandsComp
          @editBrand="editBrand(brand.id)"
          @deleteBrand="deleteBrand(brand.id)"
          v-for="brand in brands"
          :brand="brand"
          :key="brand.id"
        />
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import AddBrandsComp from "../components/AddBrandsComp.vue";
import BrandsComp from "../components/BrandsComp.vue";
import router from "../router";
export default {
  name: "BrandsView",
  data() {
    return {
      brands: [],
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    AddBrandsComp,
    BrandsComp,
  },
  methods: {
    // get all brands
    async getBrands() {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/api/brand", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // controll array
        const data = resp.data;
        if (data.length === 0) {
          this.errormsg = "Det finns inga märken att hämta.";
        } else {
          this.errormsg = "";
          this.brands = data;
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av märkena.";
      }
    },

    // delete brand
    async deleteBrand(id) {
      try {
        const resp = await axios("http://127.0.0.1:8000/api/brand/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // eslint-disable-next-line no-unused-vars
        const data = resp.data;
        // reload brand list
        this.errormsg = "Märke raderad.";
        setTimeout(() => this.getBrands(), 3000);
      } catch (error) {
        this.errormsg =
          "Kan inte radera märke som har produkter kopplade till sig.";
      }
    },
    // redirect to edit brand page and send id
    editBrand(id) {
      router.push("/editbrand/" + id);
    },
    // show add form
    showAdd() {
      let btn = document.querySelector("#addBrand");
      btn.classList.toggle("block");
      btn.classList.toggle("hidden");
    },
  },
  mounted() {
    this.getBrands();
  },
};
</script>
