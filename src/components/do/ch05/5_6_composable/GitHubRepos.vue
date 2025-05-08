<script lang="ts" setup>
import { useGitHubRepos } from '@/composables/ch05/useGitHubRepos'
const { data: repos } = useGitHubRepos('mayashavin')
</script>
<template>
  <div>
    <h2 class="heading">GitHub Repositories</h2>
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
      </li>
    </ul>
  </div>
</template>
