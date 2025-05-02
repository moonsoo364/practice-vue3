<template>
  <div>
    <h2>Bad usage of pizza component</h2>
    <pizza-component :pizza="{name: 'Pinia', description: 'Hawaian pizza'}"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PizzaComponent from '@/components/do/ch04/4_1_prop/4_1_3_custom_prop/PizzaComponent.vue'

export default defineComponent({
  name: 'ProductList',
  components: { PizzaComponent },
  
})
</script>
