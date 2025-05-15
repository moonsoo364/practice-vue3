<template>
  <div>
    <h1>This is an Pizzas page</h1>
    <p v-if="pizzaId">Pizza Id: {{ pizzaId }}</p>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const pizzaId = route.query?.id
</script>
