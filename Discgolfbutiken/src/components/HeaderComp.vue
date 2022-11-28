<template>
  <!-- header -->
  <header class="bg-lime-800">
    <div class="pt-2 flex">
      <!-- mobile menu btn -->
      <button @click="showSide()">
        <i
          class="visible lg:invisible fa-solid fa-bars fa-2xl ml-4 mr-4 text-white"
        ></i>
      </button>
      <img
        class="max-h-12 max-w-full my-0 mx-auto"
        src="../assets/img/logo.svg"
        alt="Discgolfbutiken logotyp"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComp",
  // show/hide sidebar
  methods: {
    showSide() {
      const sidebar = document.querySelector("#sidebar");
      sidebar.classList.toggle("-translate-x-0");
      sidebar.classList.toggle("-translate-x-full");
      sidebar.classList.toggle("left-0");
      sidebar.classList.toggle("left-1");
    },
  },
};
</script>
