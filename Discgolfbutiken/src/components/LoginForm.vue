<template>
  <!-- login form -->
  <form
    @submit.prevent="login()"
    class="grid grid-cols-1 space-y-2 max-w-lg mx-auto p-5 rounded-lg drop-shadow-lg"
  >
    <div class="bg-red-500 text-center font-bold text-white" v-if="message">
      <p>{{ message }}</p>
    </div>
    <label class="text-lg font-bold" for="email">Email:</label>
    <input
      class="p-2 border-2 border-blue-500 focus:bg-blue-200 hover:bg-blue-200"
      type="email"
      id="email"
      name="email"
      placeholder="namn@epost.se"
      v-model="user.email"
      required
    />
    <label class="text-lg font-bold" for="password">Lösenord:</label>
    <input
      class="p-2 border-2 border-blue-500 focus:bg-blue-200 hover:bg-blue-200"
      type="password"
      id="password"
      name="password"
      placeholder="********"
      v-model="user.password"
      required
    />
    <input
      class="mt-4 p-3 w-full font-bold flex justify-center bg-blue-200 hover:bg-blue-700 text-white rounded"
      type="submit"
      value="Logga in"
    />
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  props: ["token"],
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    // method for sending user info to API for login, save token if any returned
    login() {
      axios
        .post("http://127.0.0.1:8000/api/login", this.user)
        .then((response) => {
          if (response.status === 200) {
            var token = response.data.token;
            localStorage.setItem("token", token);
            this.$emit("updateToken", token);
            this.$router.push({ name: "admin" });
          }
        })
        .catch(() => {
          this.message = "Email eller lösenord är felaktigt.";
        });
    },
  },
};
</script>
