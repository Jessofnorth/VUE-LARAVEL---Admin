<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3 pb-3">Användare</h1>
    <section>
      <!-- btn for showing/hiding form -->
      <button
        @click="showAdd()"
        class="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Lägg till användare
      </button>
      <!-- register user form -->
      <div id="addUser" class="hidden">
        <RegisterFormLoggedin :token="token" @userAdded="getUsers()" />
      </div>
    </section>
    <!-- print users -->
    <section>
      <h2 class="text-2xl pt-3">Hantera Användare</h2>
      <div
        v-if="errormsg"
        class="bg-red-500 text-white text-bold text-center p-2"
      >
        <p>{{ errormsg }}</p>
      </div>
      <div class="flex flex-wrap place-content-evenly md:gap-4">
        <UsersComp
          @deleteUser="deleteUser(user.id)"
          v-for="user in users"
          :user="user"
          :key="user.id"
        />
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import RegisterFormLoggedin from "../components/RegisterFormLoggedin.vue";
import UsersComp from "../components/UsersComp.vue";
export default {
  name: "UsersView",
  data() {
    return {
      users: [],
      errormsg: "",
    };
  },
  props: ["token"],
  components: {
    RegisterFormLoggedin,
    UsersComp,
  },
  methods: {
    // get all users
    async getUsers() {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // controll array
        const data = resp.data;
        if (data.length === 0) {
          this.errormsg = "Det finns inga användare att hämta.";
        } else {
          this.errormsg = "";
          this.users = data;
        }
      } catch (error) {
        this.errormsg = "Något gick fel med hämtningen av användarna.";
      }
    },

    // delete user
    async deleteUser(id) {
      const resp = await axios("http://127.0.0.1:8000/api/users/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      // eslint-disable-next-line no-unused-vars
      const data = resp.data;
      this.errormsg = "Användaren raderad.";
      // reload users list
      setTimeout(() => this.getUsers(), 3000);
    },
    // show add form
    showAdd() {
      let btn = document.querySelector("#addUser");
      btn.classList.toggle("block");
      btn.classList.toggle("hidden");
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
