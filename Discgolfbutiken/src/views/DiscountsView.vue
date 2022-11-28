<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Rabatter</h1>
    <section>
      <!-- show/hide form -->
      <button
        @click="showAdd()"
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Lägg till rabatt
      </button>
      <AddDiscountsComp :token="token" @discountAdded="getDiscounts()" />
    </section>
    <!-- print discounts -->
    <section>
      <h2 class="text-2xl pt-3">Hantera rabatter</h2>
      <div
        v-if="errormsg"
        class="bg-red-500 text-white text-sm text-bold text-center p-2"
      >
        <p>{{ errormsg }}</p>
      </div>
      <div class="flex flex-wrap place-content-evenly md:gap-4">
        <DiscountsComp
          @deleteDiscount="deleteDiscount(discount.id)"
          @editDiscount="editDiscount(discount.id)"
          v-for="discount in discounts"
          :discount="discount"
          :key="discount.id"
        />
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import AddDiscountsComp from "../components/AddDiscountsComp.vue";
import DiscountsComp from "../components/DiscountsComp.vue";
import router from "../router";
export default {
  name: "DiscountsView",
  data() {
    return {
      discounts: [],
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    AddDiscountsComp,
    DiscountsComp,
  },
  methods: {
    // get all discounts
    async getDiscounts() {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/api/discount", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // controll array
        const data = resp.data;
        if (data.length === 0) {
          this.errormsg = "Det finns inga rabatter att hämta.";
        } else {
          this.errormsg = "";
          this.discounts = data;
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av rabatter.";
      }
    },

    // delete discount
    async deleteDiscount(id) {
      try {
        const resp = await axios("http://127.0.0.1:8000/api/discount/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // eslint-disable-next-line no-unused-vars
        const data = resp.data;
        // reload discount list
        this.errormsg = "Rabatten raderad.";
        // reload users list
        setTimeout(() => this.getDiscounts(), 3000);
      } catch (error) {
        this.errormsg =
          "Kan inte radera rabatt som har produkter kopplade till sig.";
      }
    },
    // redirect to edit discount page and send id
    editDiscount(id) {
      router.push("/editdiscount/" + id);
    },
    // show add form
    showAdd() {
      let btn = document.querySelector("#addDiscount");
      btn.classList.toggle("block");
      btn.classList.toggle("hidden");
    },
  },
  mounted() {
    this.getDiscounts();
  },
};
</script>
