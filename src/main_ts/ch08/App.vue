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
