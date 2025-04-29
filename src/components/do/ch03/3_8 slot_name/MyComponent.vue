<template>
  <ProductItemList></ProductItemList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductItemList from './ProductItemList.vue';


export default defineComponent({
  components: {ProductItemList},

  name: 'MyComponent',

})
</script>
