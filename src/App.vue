<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link :to="{ name: 'home' }" class="link">home</router-link>
    <router-link :to="{ name: 'about' }" class="link">About</router-link>
    <router-link :to="{ name: 'pizzas' }" class="link">pizzas</router-link>
    <router-link :to="{ name: 'pizzas', query: { id: 1 } }" class="link">Pizza 1</router-link>
    <router-link :to="{ name: 'contact' }" class="link">contact</router-link>
    <router-link :to="{ name: 'login' }" class="link">login</router-link>
  </nav>
  <RouterView class="view" />
</template>

<style scoped>
nav {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.link.router-link-active,
.link.rotuer-link-exact-active {
  text-decoration: underline;
}

.view h1 {
  text-align: center;
}
</style>
