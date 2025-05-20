<template>
    <div class="pizzas-view--container">
      <h1>Pizzas</h1>
      <ul>
        <li v-for="pizza in searchResults" :key="pizza.id">
          <PizzaCard :pizza="pizza" />
        </li>
      </ul>
    </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePizzas } from '@/composables/ch08/usePizzas'
import PizzaCard from '@/components/do/ch08/PizzaCard.vue'
import { useSearch } from '@/composables/ch08/useSearch'
import type { Pizza } from '@/types/ch08/Pizza'
import { watch, type Ref } from 'vue'

const props = defineProps({
  id:{//8-7
    type: String,
    required: true
  },
  searchTerm: {
    type: String,
    required: false,
    default: '',
  },
})

const route = useRoute()
const pizzaId = route.query?.id
const router = useRouter()

const { pizzas } = usePizzas()

type PizzaSearch = {
  search: Ref<string>
  searchResults: Ref<Pizza[]>
}

const { search, searchResults }: PizzaSearch = useSearch<Pizza>({
  items: pizzas,
  defaultSearch: props.searchTerm,
  //defaultSearch: route.query?.search as string,
})

watch(search, (value, preValue) => {
  if (value === preValue) return
  router.replace({ query: { search: value } })
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
