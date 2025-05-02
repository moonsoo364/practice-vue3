<template>
    <h1>{{title}}</h1>
    <p>Open time: 8am ~ 4pm</p>
    <ul>
        <li v-for="menuItem in menu" :key="menuItem.id">
            {{ menuItem.name }}

        </li>
    </ul>
    <button @click="acceptPayment">Accept a payment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {retraurantMixin} from '@/components/do/ch03/3_10_mixin/restaurantMixin'

export default defineComponent({
    name: 'CafeComponent',
    mixins: [retraurantMixin],
    data() {
        return {
            title: 'Cafe',
            menu: [
                { id: 'menu01', name: 'Cafe' ,price:5},
                { id: 'menu02', name: 'Tea' ,price:3},
                { id: 'menu03', name: 'Cale' ,price:7},
            ] as { id: string; name: string; price: number }[],
        };
    },
    methods:{
        getDressCode(){
            console.log('Dress code: Casual');
        }
    },
    created() {
     console.log('CafeComponent component created');   
    }
})
</script>
