<template>
  <FetchComponent url="https:/api.github.com/users/mayashavin">
    <template #default="defaultProps">
      <div class="user-profile">
        <img
          :src="(defaultProps.data as User).avatar_url"
          :alt="(defaultProps.data as User).name"
          width="200"
        />
        <div>
          <h1>{{ (defaultProps.data as User).name }}</h1>
          <p>{{ (defaultProps.data as User).bio }}</p>
          <p>Twitter : {{ (defaultProps.data as User).twitter_username }}</p>
          <p>Blog : {{ (defaultProps.data as User).blog }}</p>
        </div>
      </div>
    </template>
  </FetchComponent>
</template>

<script lang="ts" setup>
import FetchComponent from '@/components/do/ch06/6_5_fetch/FetchComponent.vue'
import type { User } from '@/types/ch06/User'
import axios from 'axios'

async function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user) return (user.value = user)
    const response = await axios.get('https://api.github.com/users/mayashavin')
    user.value = response.data
    localStorage.setItem('user', JSON.stringify(user.value))
  } catch (err) {
    console.error(err)
  }
}
getUser()
</script>
