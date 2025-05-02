<template>
    <header>Name : {{ name }}</header>
  </template>
  
  <script lang="ts">
  import { defineProps } from 'vue'
  type ChildProps = {
    name?: string
  }
 const props = defineProps<ChildProps>()
  </script>
  