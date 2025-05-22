<template>
  <div class="pizzas-view--container">
    <h1>Pizzas</h1>
    <input type="text" v-model="search" placeholder="search for a pizza" />
    <ul>
        <li v-for="pizza in searchResults" :key="pizza.id">
          <PizzaCard :pizza="pizza" />
        </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import PizzaCard from '@/components/do/ch09/PizzaCard.vue'

import type { Pizza } from '@/types/ch08/Pizza'
import { watch, onBeforeMount, type Ref } from 'vue'
import { usePizzasStore } from '@/stores/pizzas'
import { useSearch } from '@/composables/ch09/useSearch'
import { storeToRefs } from 'pinia'

const props = defineProps({
  searchTerm: {
    type: String,
    required: false,
    default: '',
  },
})

const router = useRouter()

const pizzasStore = usePizzasStore()

type PizzaSearch = {
  search: Ref<string>
  searchResults: Ref<Pizza[]>
}

const { pizzas } = storeToRefs(pizzasStore)

const { search, searchResults }: PizzaSearch = useSearch({
  items: pizzas,
  defaultSearch: props.searchTerm,
})

watch(search, (value, prevValue) => {
  if (value === prevValue) return
  router.replace({ query: { search: value } })
})

onBeforeMount(() => {
  pizzasStore.fetchPizzas()
})
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
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
