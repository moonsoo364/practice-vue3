<template>
  <div>
    <p>Product : {{ product.name }}</p>
    <p>Price : {{ product.price }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductComp',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        price: 0,
      }),
    },
  },
})
</script>

<style scoped>

</style>
