<template>
    <header>Name : {{ name }}</header>
  </template>
  
  <script lang="ts">
  import { defineProps, withDefaults } from 'vue'
  type ChildProps = {
    name?: string
  }
 const props = withDefaults(defineProps<ChildProps>(),{
  name: 'Hello from the child component'
 }) 
  </script>
  