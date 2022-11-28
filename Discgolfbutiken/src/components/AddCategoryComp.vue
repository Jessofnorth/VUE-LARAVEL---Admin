<template>
  <div
    id="addCategory"
    class="border-2 p-1 md:p-10 rounded-lg mb-3 mt-3 md:w-fit hidden"
  >
    <div
      v-if="errormsg"
      class="bg-red-500 text-white text-sm text-bold text-center p-2"
    >
      <p>{{ errormsg }}</p>
    </div>
    <div
      v-if="msg"
      class="bg-blue-500 text-white text-sm text-bold text-center p-2"
    >
      <p>{{ msg }}</p>
    </div>
    <form
      class="md:w-fit md:grid md:gap-10 md:grid-cols-2"
      @submit.prevent="addCategory()"
      ref="addcategory"
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
</template>

<script>
import axios from "axios";
export default {
  name: "AddCategoryComp",
  data() {
    return {
      category: {},
      errormsg: "",
      msg: "",
    };
  },
  props: {
    token: String,
  },
  methods: {
    //add category
    addCategory() {
      // send request with axions
      axios
        .post("http://127.0.0.1:8000/api/category", this.category, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((resp) => {
          if (resp.status === 201) {
            this.msg = "Kategorin sparad!";
            // clear form
            this.category = {};
            this.$emit("categoryAdded");
          }
        });
    },
  },
};
</script>
