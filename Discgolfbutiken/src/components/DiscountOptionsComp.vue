<template>
  <option :value="discount.id">{{ discount.discount }} %</option>
</template>
<script>
export default {
  name: "DiscountOptionsComp",
  props: {
    discount: Object,
  },
};
</script>
