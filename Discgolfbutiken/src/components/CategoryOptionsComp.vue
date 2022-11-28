<template>
  <option :value="category.id">{{ category.category }}</option>
</template>
<script>
export default {
  name: "CategoryOptionsComp",
  props: {
    category: Object,
  },
};
</script>
