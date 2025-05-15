<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>

<template>
  <router-link :to="{name:'home'}">home</router-link>
  <router-link :to="{name:'about'}">About</router-link>
  <router-link :to="{name:'pizzas'}">pizzas</router-link>
  <router-link :to="{name:'contact'}">contact</router-link>
  <router-link :to="{name:'login'}">login</router-link>
  <RouterView class="view"/>
</template>


<style scoped>

</style>
