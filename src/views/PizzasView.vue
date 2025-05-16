<template>
  <div>
    <h1>This is an Pizzas page</h1>
    <ul>
      <li v-for="pizza in searchResults" :key="pizza.id">
        <PizzaCard :pizza="pizza"/>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import {usePizzas} from '@/composables/ch08/usePizzas'
import PizzaCard from '@/components/do/ch08/PizzaCard.vue'
import {useSearch} from '@/composables/ch08/useSearch'
import type {Pizza} from '@/types/ch08/Pizza'
import {watch,type Ref} from 'vue';








const route = useRoute();
// const pizzaId = route.query?.id

type PizzaSearch ={
  search: Ref<string>;
  searchResults: Ref<Pizza[]>;
};
const {search, searchResults}: PizzaSearch = useSearch({
  items:pizzas,
  defaultSearch: route.query?.search as string
})

</script>
<style scoped>
.pizza--container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 2rem 0;
}

.pizza-stock--section {
  display: flex;
  gap: 2rem;
}

.pizza--details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
