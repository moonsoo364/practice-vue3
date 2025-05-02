<template>
    <section class="wrapper">
      <span class="heading">{{ name }}</span>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  
  export default defineComponent({
    name: 'ChildComponent',
    props:{
      // name: {
      //   type: String,
      //   default: 'Child Component'
      // },
      name: {
        type: String, required: true,
        validator: value => value !== "Child component"
      },
    },
  })
  </script>
  
  