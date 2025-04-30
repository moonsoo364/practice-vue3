<template>
    <h1>{{title}}</h1>
    <button @click="getDressCode">getDressCode</button>
    <button @click="makeReservation">Make a reservation</button>
    <button @click="acceptPayment">Accept a payment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {retraurantMixin} from '@/components/do/ch03/3_10_mixin/RestaurantMixin'

export default defineComponent({
    name: 'DiningComponent',
    mixins: [retraurantMixin],
    data() {
        return {
            title: 'Dining',
            menu: [
                { id: 'menu01', name: 'Steak' },
                { id: 'menu02', name: 'Salad' },
                { id: 'menu03', name: 'Soup' },
            ]
        };
    },
    methods:{
        getDressCode(){
            console.log('Dress code: Casual');
        }
    },
    created() {
     console.log('DiningComponent component created');   
    }
})
</script>
