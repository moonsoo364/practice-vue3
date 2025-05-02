<template>
  <!-- <ProductComp :name="product.name" :price="product.price" /> -->
  <ProductComp :product="product" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductComp from '@/components/do/ch04/4_1_1_product_exam/ProductComp.vue'

export default defineComponent({
  name: 'ProductList',
  components: { ProductComp },
  data(): { product: { name: string; price: number } } {
    return {
      product: {
        name: 'Red Sweater',
        price: 19.99
      }
    }
  },
})
</script>

<style scoped>

</style>
