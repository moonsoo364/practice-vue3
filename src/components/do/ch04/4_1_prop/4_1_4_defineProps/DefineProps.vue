<template>
    <header>Name : {{ name }}</header>
  </template>
  
  <script lang="ts">
  import { defineProps } from 'vue'
//   import PizzaComponent from '@/components/do/ch04/4_1_prop/4_1_3_custom_prop/PizzaComponent.vue'
  const props = defineProps({
    name:{
        type: String,
        default: "Hello from the child component"
    }
  })
  </script>
  