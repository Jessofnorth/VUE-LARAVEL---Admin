<template>
  <!-- login form -->
  <form
    @submit.prevent="registerUser()"
    class="grid grid-cols-1 space-y-2 max-w-lg mx-auto p-5 rounded-lg drop-shadow-lg"
  >
    <div class="bg-blue-500 text-center font-bold text-white" v-if="message">
      <p>{{ message }}</p>
    </div>
    <div class="bg-red-500 text-center font-bold text-white" v-if="errmessage">
      <p>{{ errmessage }}</p>
    </div>
    <label class="text-lg font-bold" for="name">Namn:</label>
    <input
      class="p-2 border-2 border-blue-500 focus:bg-blue-200 hover:bg-blue-200"
      type="text"
      id="name"
      name="name"
      placeholder="Sven Sveningsson"
      v-model="user.name"
      required
    />
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
      value="Registrera"
    />
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      message: "",
      errmessage: "",
    };
  },
  methods: {
    // method for sending user info to API for register user, reroute to login if sucess
    registerUser() {
      if (this.user.name.length > 2) {
        if (this.user.password.length > 5) {
          this.errmessage = "";
          axios
            .post("http://127.0.0.1:8000/api/register", this.user)
            .then((response) => {
              if (response.status === 201) {
                // show msg and rerout after 5sec
                this.message = "Användaren registrerad!";
                setTimeout(() => this.$router.push({ name: "login" }), 5000);
              }
            })
            .catch(() => {
              this.errmessage =
                "Något gick fel med registrering av användaren. Säkerställ att email inte redan är registrerad.";
            });
        } else {
          this.errmessage = "Lösenordet måste vara minst 6 tecken.";
        }
      } else {
        this.errmessage = "Namnet måste vara minst 3 tecken.";
      }
    },
  },
};
</script>
