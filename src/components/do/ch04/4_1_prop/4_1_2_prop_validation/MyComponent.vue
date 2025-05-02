<template>
  <!-- <ProductComp :name="product.name" :price="product.price" /> -->
  <ChildComponent :name="product.name" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChildComponent from '@/components/do/ch04/4_1_2_prop_validation/ChildComponent.vue'

export default defineComponent({
  name: 'ProductList',
  components: { ChildComponent },
  data(): { product: { name: string; price: number } } {
    return {
      product: {
        name: 'Child component',
        price: 19.99
      }
    }
  },
})
</script>

<style scoped>

</style>
