<script setup lang="ts">
import { RouterView } from 'vue-router'
import RouterComponent from '@/components/do/ch08/8_8/RotuerComponent.vue'
import CartComponent from './components/do/ch09/CartComponent.vue';
</script>

<template>
  <header>
    <div>Pizza House</div>
    <CartComponent />
  </header>
  <nav>
    <router-link :to="{ name: 'home' }" class="link">home</router-link>
    <router-link :to="{ name: 'about' }" class="link">About</router-link>
    <router-link :to="{ name: 'pizzas' }" class="link">pizzas</router-link>
    <!-- <router-link :to="{ name: 'pizzas', query: { id: 1 } }" class="link">Pizza 1</router-link> -->
    <router-link :to="{ name: 'contact' }" class="link">contact</router-link>
    <router-link :to="{ name: 'login' }" class="link">login</router-link>
  </nav>
  <RouterComponent></RouterComponent>
  <RouterView class="view" />
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    padding: 0;
}
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

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  }
</style>
