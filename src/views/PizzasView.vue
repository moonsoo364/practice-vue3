<template>
  <div>
    <h1>This is an Pizzas page</h1>
    <p v-if="pizzaId">Pizza Id: {{ pizzaId }}</p>
    <ul>
      <li v-for="pizza in pizzas" :key="pizza.id">
        <PizzaCard :pizza="pizza"/>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import PizzaCard from '@/components/do/ch08/PizzaCard.vue'
import {useSearch} from '@/composables/ch08/useSearch'
const route = useRoute()
const pizzaId = route.query?.id
</script>
