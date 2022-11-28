<template>
  <article>
    <h1 class="pt-5 font-bold text-center drop-shadow text-2xl tracking-wider">
      Inloggning Discgolfbutiken
    </h1>
    <p class="text-center">Logga in med din email och lösenord.</p>
    <!-- login form component -->
    <LoginForm :token="token" @updateToken="findToken" />
    <RouterLink to="/register">
      <p class="text-lg font-bold text-center hover:text-lime-800 underline">
        Registrera användare
      </p>
    </RouterLink>
  </article>
</template>
<script>
import { RouterLink } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
export default {
  name: "LoginView",
  components: {
    LoginForm,
    RouterLink,
  },
  props: ["token"],
  methods: {
    findToken() {
      this.$emit("updateToken", this.token);
    },
  },
};
</script>
