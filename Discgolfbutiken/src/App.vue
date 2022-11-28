<script>
// import components and routes
import { RouterView } from "vue-router";
import HeaderComp from "./components/HeaderComp.vue";
import FooterComp from "./components/FooterComp.vue";
import SidebarComp from "./components/SidebarComp.vue";
export default {
  data() {
    return {
      token: String,
    };
  },
  // components
  components: {
    HeaderComp,
    RouterView,
    FooterComp,
    SidebarComp,
  },
  methods: {
    // get token if any
    findToken() {
      this.token = localStorage.getItem("token");
    },
  },
  beforeMount() {
    this.findToken();
  },
};
</script>

<template>
  <HeaderComp />
  <div class="relative flex min-h-[90vh]">
    <SidebarComp
      :token="token"
      v-if="!['login', 'register'].includes($route.name)"
      @updateToken="findToken"
    />
    <main class="flex-1">
      <RouterView :token="token" @updateToken="findToken" />
    </main>
  </div>
  <FooterComp />
</template>
