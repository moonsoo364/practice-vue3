<template>
  <section v-if="pizza" class="pizza--container">
    <img :src="pizza.image" :alt="pizza.title" width="500" />
    <div class="pizza--details">
      <div>
        <p>{{ pizza.description }}</p>
        <div class="pizza-stock--section">
          <span>Stock : {{ pizza.quantity || 0 }}</span>
          <span>Price : ${{ pizza.price }}</span>
        </div>
      </div>
    </div>
  </section>
  <p v-else>No pizza found</p>
</template>
<script setup lang="ts">
import { usePizzas } from '@/composables/ch08/usePizzas'

const props = defineProps({
  id:{//8-7
    type: String,
    required: true
  },
})


const { pizzas } = usePizzas()

const pizza = pizzas.value.find((pizza) => pizza.id === props.id);

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
