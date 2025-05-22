<template>
    <div class="cart">
        <span class="cart__total" @click="showCartDetails = !showCartDetails" >Cart : {{ cart.total }}</span>
        <ul class="cart__list" v-show="showCartDetails">
            <li class="cart__list-item" v-for="item in cart.items" :key="item.id">
                <span>Id : {{ item.id }}</span>
                <span>Quantity: {{ item.quantity }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
    import { useCartStore } from '@/stores/ch09/cart';
    import {ref} from 'vue';
    const cart = useCartStore();
    const showCartDetails = ref(false);


</script>
<style scoped>
.cart__list {
    position: absolute;
    list-style: none;
    box-shadow: 2px 2px 3px #e3e0e0;
    border: 1px solid #e3e0e0;
    padding: 10px;
    inset-inline-end: 0;
    background-color: white;
    min-width: 500px
}

.cart {
    position: relative;
}

.cart__total {
    cursor: pointer;
    text-decoration: underline;
}

.cart__list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
</style>