<template>
    <section class="wrapper">
      <span class="heading">!!This is span a element in parent</span>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
    name: 'ChildComponent',
    props:{
      name: String  
    },
    data(): { title: string; description: string } {
      return {
        title: 'Welcome to Vue Restaurant',
        description: 'A Vue.js project to learn Vue.js',
      }
    },
  })
  </script>
  
  <style scoped>
  
  </style>
  