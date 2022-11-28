<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Ändra Kategori: {{ category.category }}</h1>
    <section>
      <div class="border-2 p-1 md:p-10 rounded-lg mb-3 mt-3 md:w-fit">
        <div
          v-if="errormsg"
          class="bg-red-500 text-white text-bold text-center p-2"
        >
          <p>{{ errormsg }}</p>
        </div>
        <!-- form for updating category, get id from url -->
        <form
          class="md:w-fit md:grid md:gap-10 md:grid-cols-2"
          @submit.prevent="updateCategory(linkId)"
          ref="updatecategory"
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
              v-model="category.category"
              required
            />
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
import axios from "axios";
export default {
  name: "EditCategoryView",
  data() {
    return {
      category: [],
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
  methods: {
    // get category by id
    async getCategoryById(id) {
      try {
        if (this.token) {
          const resp = await axios.get(
            "http://127.0.0.1:8000/api/category/" + id,
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
            this.errormsg = "Det finns ingen kategori med detta IDt.";
          } else {
            this.errormsg = "";
            this.category = data;
          }
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av kategorin.";
      }
    },
    //update category
    updateCategory(id) {
      axios
        .put("http://127.0.0.1:8000/api/category/" + id, this.category, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$router.push("/categorys");
          }
        });
    },
  },
  mounted() {
    this.getCategoryById(this.linkId);
  },
};
</script>
