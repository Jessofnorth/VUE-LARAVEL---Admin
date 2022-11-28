<template>
  <option :value="brand.id">{{ brand.brand_name }}</option>
</template>
<script>
export default {
  name: "BrandOptionsComp",
  props: {
    brand: Object,
  },
};
</script>
