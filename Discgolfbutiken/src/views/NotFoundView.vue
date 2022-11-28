<template>
  <article class="p-2">
    <h1 class="text-4xl pt-3">Sidan kan inte hittas!</h1>
    <RouterLink to="/">
      <p class="text-blue-500 underline text-bold text-xl pt-6">
        Tillbaka till Admin-sidan->
      </p>
    </RouterLink>
  </article>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NotFoundView",
  props: ["token"],
  components: { RouterLink },
};
</script>
