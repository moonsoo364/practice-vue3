<template>
    <header>Title : {{ pizza.title }}</header>
    <div class="pizza--details-wrapper">
        <img :src="pizza.image" :alt="pizza.title" width="300"/>
        <p>Description : {{ pizza.description }}</p>
        <div class="pizza-inventory">
            <div class="pizza--invertory-stock">Quantity: {{ pizza.quantity }}</div>
            <div class="pizza--invertory-price">Price: {{ pizza.price }}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type {PropType} from 'vue';

interface Pizza{
    title: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
}

export default defineComponent({
    name: 'PizzaComponent',
    props:{
        pizza:{
            type: Object as PropType<Pizza>,
            required: true
        }
    }
})
</script>
