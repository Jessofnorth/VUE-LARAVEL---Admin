<template>
  <article>
    <h1 class="pt-5 font-bold text-center drop-shadow text-2xl tracking-wider">
      Registrera Användare
    </h1>
    <p class="text-center">
      Skapa användare med din email, lösenord och ditt namn.
    </p>
    <!-- login form component -->
    <RegisterForm :token="token" @updateToken="findToken" />
  </article>
</template>
<script>
import RegisterForm from "../components/RegisterForm.vue";
export default {
  name: "RegisterView",
  components: {
    RegisterForm,
  },
  props: ["token"],
  methods: {
    // emit token
    findToken() {
      this.$emit("updateToken", this.token);
    },
  },
};
</script>
