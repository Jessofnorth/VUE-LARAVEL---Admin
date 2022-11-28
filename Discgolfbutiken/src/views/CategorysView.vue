<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Kategorier</h1>
    <section>
      <!-- show/hide form -->
      <button
        @click="showAdd()"
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Lägg till kategori
      </button>
      <AddCategoryComp :token="token" @categoryAdded="getCategorys()" />
    </section>
    <!-- print categorys -->
    <section>
      <h2 class="text-2xl pt-3">Hantera kategorier</h2>
      <div
        v-if="errormsg"
        class="bg-red-500 text-white text-bold text-center p-2"
      >
        <p>{{ errormsg }}</p>
      </div>
      <div class="flex flex-wrap place-content-evenly md:gap-4">
        <CategorysComp
          @deleteCategory="deleteCategory(category.id)"
          @editCategory="editCategory(category.id)"
          v-for="category in categorys"
          :category="category"
          :key="category.id"
        />
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import AddCategoryComp from "../components/AddCategoryComp.vue";
import CategorysComp from "../components/CategorysComp.vue";
import router from "../router";
export default {
  name: "CategorysView",
  data() {
    return {
      categorys: [],
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    AddCategoryComp,
    CategorysComp,
  },
  methods: {
    // get all categorys
    async getCategorys() {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/api/category", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // controll array
        const data = resp.data;
        if (data.length === 0) {
          this.errormsg = "Det finns inga kategorier att hämta.";
        } else {
          this.errormsg = "";
          this.categorys = data;
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av kategorier.";
      }
    },
    // delete category
    async deleteCategory(id) {
      try {
        const resp = await axios("http://127.0.0.1:8000/api/category/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // eslint-disable-next-line no-unused-vars
        const data = resp.data;
        // reload categorys list
        this.errormsg = "Kategorin raderad.";
        setTimeout(() => this.getCategorys(), 3000);
      } catch (error) {
        this.errormsg =
          "Kan inte radera kategori som har produkter kopplade till sig.";
      }
    },
    // redirect to edit category page and send id
    editCategory(id) {
      router.push("/editcategory/" + id);
    },
    // show add form
    showAdd() {
      let btn = document.querySelector("#addCategory");
      btn.classList.toggle("block");
      btn.classList.toggle("hidden");
    },
  },
  mounted() {
    this.getCategorys();
  },
};
</script>
